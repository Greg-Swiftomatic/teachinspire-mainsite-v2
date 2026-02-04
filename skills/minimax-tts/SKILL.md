# MiniMax TTS Skill

Generate high-quality voice messages using MiniMax Speech 2.8 API.

## When to Use

- User asks for audio/voice version of text
- User wants a voice message
- TTS is needed in French, English, Arabic, or 40+ other languages

## Requirements

- MiniMax API key (set in environment or config)
- `MINIMAX_API_KEY` environment variable

## Usage

Run the script with text to synthesize:

```bash
./tts.sh "Bonjour, comment ça va ?" --lang French --voice French_FriendlyPerson
```

Or use the Node.js version:

```bash
node tts.js --text "Hello world" --lang English --voice English_expressive_narrator
```

## Parameters

- `text` (required): Text to synthesize (max 10,000 chars)
- `lang`: Language boost (auto, French, English, Arabic, etc.)
- `voice`: Voice ID (see voices.json for options)
- `model`: speech-2.8-hd (quality) or speech-2.8-turbo (speed)
- `output`: Output file path (default: /tmp/minimax-tts-{timestamp}.mp3)

## Supported Languages

French, English, Arabic, Chinese, Spanish, German, Portuguese, Italian, Japanese, Korean, Russian, Turkish, Dutch, Vietnamese, Indonesian, Thai, Polish, Romanian, Greek, Hindi, Hebrew, and 20+ more.

## Voice IDs

Common voices:
- `English_expressive_narrator` - Expressive English narrator
- `French_FriendlyPerson` - Friendly French voice  
- `Arabic_narrator` - Arabic narrator
- `Wise_Woman` - Wise female voice
- `Friendly_Person` - Generic friendly voice

For custom voices, use the MiniMax platform to create or clone voices.

## Interjections (Speech 2.8 only)

Add emotion with tags: (laughs), (sighs), (coughs), (gasps), (humming), etc.

Example: "Oh wow (laughs), that's amazing!"

## Output

Returns path to generated MP3 file. Use with message tool to send as voice note.
