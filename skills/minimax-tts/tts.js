#!/usr/bin/env node
/**
 * MiniMax TTS - Text to Speech using MiniMax Speech 2.8 API
 * 
 * Usage: node tts.js --text "Hello" --lang English --voice English_expressive_narrator
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    text: '',
    lang: 'auto',
    voice: 'Friendly_Person',
    model: 'speech-2.8-hd',
    output: null,
    speed: 1,
    format: 'mp3'
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--text':
      case '-t':
        opts.text = args[++i];
        break;
      case '--lang':
      case '-l':
        opts.lang = args[++i];
        break;
      case '--voice':
      case '-v':
        opts.voice = args[++i];
        break;
      case '--model':
      case '-m':
        opts.model = args[++i];
        break;
      case '--output':
      case '-o':
        opts.output = args[++i];
        break;
      case '--speed':
      case '-s':
        opts.speed = parseFloat(args[++i]);
        break;
      case '--turbo':
        opts.model = 'speech-2.8-turbo';
        break;
      default:
        // If no flag, treat as text
        if (!args[i].startsWith('-') && !opts.text) {
          opts.text = args[i];
        }
    }
  }

  return opts;
}

// Auto-detect language and select appropriate voice
function getVoiceForLanguage(lang) {
  const voiceMap = {
    'French': 'French_FriendlyPerson',
    'English': 'English_expressive_narrator',
    'Arabic': 'Arabic_narrator',
    'Spanish': 'Spanish_narrator',
    'German': 'German_narrator',
    'Chinese': 'Chinese_FriendlyPerson',
    'Japanese': 'Japanese_narrator',
    'Korean': 'Korean_narrator',
    'auto': 'Friendly_Person'
  };
  return voiceMap[lang] || 'Friendly_Person';
}

// Make API request to MiniMax
async function synthesize(opts) {
  const apiKey = process.env.MINIMAX_API_KEY;
  
  if (!apiKey) {
    console.error('Error: MINIMAX_API_KEY environment variable not set');
    process.exit(1);
  }

  if (!opts.text) {
    console.error('Error: No text provided');
    process.exit(1);
  }

  // Auto-select voice if using default
  if (opts.voice === 'Friendly_Person' && opts.lang !== 'auto') {
    opts.voice = getVoiceForLanguage(opts.lang);
  }

  const payload = {
    model: opts.model,
    text: opts.text,
    stream: false,
    language_boost: opts.lang,
    output_format: 'hex',
    voice_setting: {
      voice_id: opts.voice,
      speed: opts.speed,
      vol: 1,
      pitch: 0
    },
    audio_setting: {
      sample_rate: 32000,
      bitrate: 128000,
      format: opts.format,
      channel: 1
    }
  };

  const postData = JSON.stringify(payload);

  const options = {
    hostname: 'api.minimax.io',
    port: 443,
    path: '/v1/t2a_v2',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.base_resp && response.base_resp.status_code !== 0) {
            reject(new Error(`API Error: ${response.base_resp.status_msg}`));
            return;
          }

          if (!response.data || !response.data.audio) {
            reject(new Error('No audio data in response'));
            return;
          }

          // Decode hex audio to buffer
          const audioBuffer = Buffer.from(response.data.audio, 'hex');
          
          // Generate output filename
          const outputPath = opts.output || `/tmp/minimax-tts-${Date.now()}.${opts.format}`;
          
          // Write audio file
          fs.writeFileSync(outputPath, audioBuffer);
          
          resolve({
            path: outputPath,
            size: audioBuffer.length,
            duration: response.extra_info?.audio_length,
            characters: response.extra_info?.usage_characters
          });
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Request error: ${e.message}`));
    });

    req.write(postData);
    req.end();
  });
}

// Main
async function main() {
  const opts = parseArgs();
  
  try {
    const result = await synthesize(opts);
    console.log(`AUDIO:${result.path}`);
    console.log(`SIZE:${result.size}`);
    if (result.duration) console.log(`DURATION:${result.duration}ms`);
    if (result.characters) console.log(`CHARS:${result.characters}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
