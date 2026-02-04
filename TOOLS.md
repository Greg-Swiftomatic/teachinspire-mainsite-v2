# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## TTS (Edge TTS)

**Français :**
- `fr-FR-DeniseNeural` — voix féminine naturelle (par défaut)
- `fr-FR-HenriNeural` — voix masculine

**English :**
- `en-US-JennyNeural` — natural female
- `en-US-GuyNeural` — professional male

**Arabe :**
- `ar-SA-ZariyahNeural` — Saudi female
- `ar-SA-HamedNeural` — Saudi male

**Usage :**
```bash
edge-tts --voice fr-FR-DeniseNeural --text "Texte" --write-media /tmp/voice.mp3
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
