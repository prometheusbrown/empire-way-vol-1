# Empire Way, Vol. 1

> A collaborative album project between Prometheus Brown (emcee) and Gabriel Teodros (producer) tracked with Git for transparent creative evolution and experimentation in platform release. Production, writing and recording began in October 2024 and eight songs were selected for inclusion in October 2025.
> This repository was created in January 2026 to retroactively track previous changes, as well as to track future changes on the way to a targeted final release in Spring 2026.

## 🔢 Version History
- October 15, 2025 - Vocals, Instrumentals arranged and mixed (unmastered), 8 songs 
- October 16, 2025 - Master 001 (mastered by Dume), 8 songs

## 🎵 Project Overview

This repository houses all creative assets for [Empire Way, Vol. 1], including:
- Lyrics and their evolution
- Demo versions and iterations
- Production notes and decisions
- Final masters for streaming and physical release
- Web interface for public exploration

## 📁 Repository Structure

```
album-name/
├── tracks/              # Individual song folders
├── artwork/             # Album art, single covers, promotional images
├── liner-notes/         # Album credits, thank yous, stories
├── production/          # Session files, stems (private)
├── docs/                # Production notes, mixing decisions
├── web/                 # Public-facing website
└── releases/            # Final masters
```

## 🚀 Quick Start for Collaborators

### If you're new to Git:
1. **Don't panic!** You don't need to learn complex Git commands
2. We'll primarily use the GitHub web interface for uploading files
3. Main things you need to know:
   4. **Commit** = saving a version of your work with a note
   5. **Push** = uploading your changes to GitHub
   6. **Pull** = downloading the latest changes

### For the Producer:
- Upload new demo versions to the appropriate track's `demos/` folder
- Add a brief commit message like "Demo 3 - added synth layers"
- I'll handle the technical Git stuff

## 📋 Workflow

### 1. Working on a Track
```bash
# Navigate to the track folder
cd tracks/01-song-title/

# Add new demo metadata
# (Upload actual audio to untitled.com first)

# Commit your changes
git add .
git commit -m "Added demo v3 with revised chorus"
git push
```

### 2. Tagging Milestones
When we reach important points:
- `demo-complete` - All demos recorded
- `mixing-start` - Sent to mixing engineer
- `mastering-start` - Sent to mastering engineer
- `streaming-final` - Ready for Spotify, Apple Music, etc.
- `physical-final` - Ready for vinyl/CD manufacturing

### 3. Final Release
- Streaming master goes in `releases/final/streaming/`
- Physical all-media master goes in `releases/final/physical-media/`
- Physical vinyl master goes in `releases/physical-vinyl/`
- All versions are tagged with release date (March 20, 2026)

## 🔒 Privacy Notes

- **Public**: Lyrics, demo links, artwork previews, production notes
- **Private**: Full-resolution stems, session files, unreleased material
- Private content is in the `production/` folder (configured separately)

## 🌐 Web Interface

The public website (`web/index.html`) provides:
- Interactive timeline of the creative process
- Embedded demo players from untitled.com
- Lyric evolution viewer
- Behind-the-scenes production notes

Visit: [prometheusbrown.github.io/empire-way-vol-1]

## 📝 Commit Message Guidelines

Good commit messages help us track what changed and why:

- ✅ "Updated verse 2 lyrics - removed cliché, added metaphor"
- ✅ "Demo 4 - experimented with half-time feel in bridge"
- ✅ "Added production note about reverb choice on vocals"
- ❌ "stuff"
- ❌ "changes"

## 🤝 Collaboration Tips

- **Review changes before committing** - GitHub Desktop shows what you're about to save
- **Pull before you work** - Always get the latest version first
- **Communicate** - Use commit messages or GitHub Issues to discuss ideas
- **No wrong moves** - Git keeps history, we can always go back

## 📦 Audio File Management

- Audio files are tracked with **Git LFS** (Large File Storage)
- Actual files stored on [untitled.stream](https://untitled.stream) + Git tracks metadata
- This keeps the repository fast and lightweight

## 🛠️ Technical Setup

### Prerequisites
- Git installed ([download here](https://git-scm.com/))
- GitHub account
- Git LFS installed (`git lfs install`)

### Clone this repository
```bash
git clone https://github.com/prometheusbrown/empire-way-vol-1.git
cd album-name
```

### Configure Git LFS for audio files
```bash
git lfs track "*.wav"
git lfs track "*.aif"
git lfs track "*.mp3"
git lfs track "*.flac"
```

## 📜 License

- Music: All Rights Reserved (or Creative Commons)
- Code (web interface): MIT License

## 🎤 Credits

- Artist: Prometheus Brown
- Producer: Gabriel Teodros
- Mixing: Gabriel Teodros
- Mastering: Dume

---

**Last Updated**: January 2026
**Status**: In Production
