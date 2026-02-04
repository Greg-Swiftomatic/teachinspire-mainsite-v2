# Edge TTS Skill

Text-to-Speech gratuit et illimité via Microsoft Edge. 300+ voix, 40+ langues.

## Quand utiliser

- Générer des messages vocaux
- Lire du texte à voix haute
- Créer du contenu audio

## Commande

```bash
edge-tts --voice <VOICE> --text "Texte à lire" --write-media /tmp/output.mp3
```

## Voix recommandées

### Français 🇫🇷
| Voice | Genre | Style |
|-------|-------|-------|
| `fr-FR-DeniseNeural` | Femme | Naturel, chaleureux |
| `fr-FR-HenriNeural` | Homme | Professionnel |
| `fr-FR-EloiseNeural` | Femme | Jeune |

### English 🇬🇧
| Voice | Genre | Style |
|-------|-------|-------|
| `en-US-JennyNeural` | Femme | Naturel |
| `en-US-GuyNeural` | Homme | Professionnel |
| `en-GB-SoniaNeural` | Femme | British |

### Arabe 🇸🇦
| Voice | Genre | Style |
|-------|-------|-------|
| `ar-SA-HamedNeural` | Homme | Saudi |
| `ar-SA-ZariyahNeural` | Femme | Saudi |
| `ar-EG-SalmaNeural` | Femme | Egyptian |

## Lister toutes les voix

```bash
edge-tts --list-voices
edge-tts --list-voices | grep "fr-"
edge-tts --list-voices | grep "ar-"
```

## Exemple d'utilisation

```bash
# Français
edge-tts --voice fr-FR-DeniseNeural --text "Bonjour !" --write-media /tmp/fr.mp3

# Anglais
edge-tts --voice en-US-JennyNeural --text "Hello!" --write-media /tmp/en.mp3

# Arabe
edge-tts --voice ar-SA-ZariyahNeural --text "مرحبا" --write-media /tmp/ar.mp3
```

## Intégration Clawdbot

Pour envoyer en vocal sur WhatsApp :
```bash
edge-tts --voice fr-FR-DeniseNeural --text "Message" --write-media /tmp/voice.mp3
# Puis utiliser message tool avec asVoice: true
```

## Notes

- 100% gratuit (utilise l'API Microsoft Edge)
- Pas de clé API requise
- Limite : textes < 5000 caractères recommandé
- Formats : mp3, wav
