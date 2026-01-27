# Contributing to This Album

Thank you for being part of this creative process! This guide will help you collaborate effectively using Git and GitHub.

---

## Getting Started

### First Time Setup

1. **Get invited**: Ask the artist to add you as a collaborator
2. **Accept invitation**: Check your email or GitHub notifications
3. **Install tools**: 
   - [GitHub Desktop](https://desktop.github.com) (recommended) or
   - [Git CLI](https://git-scm.com/downloads)
4. **Clone the repository**: Get a local copy to work with

**Using GitHub Desktop:**
- File → Clone Repository
- Choose this repo from the list
- Select where to save it locally

**Using command line:**
```bash
git clone https://github.com/username/album-name.git
cd album-name
```

---

## How We Work

### Communication
- **Git commits**: For tracking file changes
- **GitHub Issues**: For discussing ideas, problems, or tasks
- **Pull Requests**: For reviewing major changes (optional)
- **Direct messages**: For quick questions

### File Organization
```
tracks/
  01-song-title/
    lyrics/          ← Lyrics and their evolution
    demos/           ← Demo metadata (not audio files)
    notes/           ← Production notes
production/          ← Private submodule (stems, sessions)
artwork/             ← Album and single artwork
web/                 ← Website files
```

---

## Common Tasks

### 1. Adding a New Demo

**Step 1:** Upload audio to untitled.com (or your preferred host)

**Step 2:** Create metadata file
```bash
# Create the file
touch tracks/01-song-title/demos/demo-v4-2026-01-26.md

# Open it and use this template:
```

**Template:**
```markdown
# Demo Version 4

**Date**: January 26, 2026
**Duration**: 3:45
**Recording Location**: [Studio name]

## Listen
🎧 [Play on untitled.com](https://untitled.com/your-link)

## Changes from Previous Version
- [What changed?]
- [What was added?]
- [What was removed?]

## What's Working
- [Good stuff]

## What Needs Work
- [Things to improve]

## Next Steps
- [ ] [Task]
- [ ] [Task]
```

**Step 3:** Save to Git
```bash
git add tracks/01-song-title/demos/demo-v4-2026-01-26.md
git commit -m "Demo v4 - Song Title - added brass section"
git push
```

---

### 2. Updating Lyrics

**Step 1:** Make your changes to the lyrics file

**Step 2:** Save to Git
```bash
git add tracks/01-song-title/lyrics/v3-revised.txt
git commit -m "Revised chorus - stronger hook"
git push
```

**Pro tip:** Git will show exactly what lines you changed!

---

### 3. Adding Production Notes

**Step 1:** Open or create the notes file:
```
tracks/01-song-title/notes/production-notes.md
```

**Step 2:** Add your notes under the appropriate section

**Step 3:** Save to Git
```bash
git add tracks/01-song-title/notes/production-notes.md
git commit -m "Added notes on drum recording technique"
git push
```

---

### 4. Adding Stems or Session Files (Private)

**These go in the private submodule**, not the public repo!

```bash
# Navigate to private folder
cd production

# Add your files
cp ~/exports/vocals.wav tracks/01-song-title/stems/
git add tracks/01-song-title/stems/vocals.wav
git commit -m "Added vocal stems for Track 1"
git push

# Go back to main repo
cd ..

# Update the reference
git add production
git commit -m "Updated private production assets"
git push
```

---

## Commit Message Guidelines

Good commit messages help everyone understand what changed and why.

### Format
```
Brief summary (50 characters or less)

More detailed explanation if needed. What changed and why?
Reference any related issues or decisions.
```

### Examples

**Good:**
```
✅ Added demo 3 - experimented with half-time bridge

We tried slowing down the bridge to create more contrast
with the energetic chorus. Kept the original tempo for comparison.
```

**Also good:**
```
✅ Revised verse 2 lyrics - removed weather metaphor

Replaced rain imagery with something more specific to the story.
The weather angle felt clichéd.
```

**Bad:**
```
❌ stuff
❌ changes
❌ idk lol
❌ asdfasdf
```

**Why it matters:** Six months from now, you'll want to know WHY you made that change!

---

## Before You Commit

### Checklist
- [ ] Did I pull the latest changes first? (`git pull`)
- [ ] Am I in the right folder/repo?
- [ ] Did I review what I'm about to commit? (`git status`, `git diff`)
- [ ] Is my commit message clear and descriptive?
- [ ] Am I committing to the right place (public vs private)?

---

## Dealing with Conflicts

Sometimes two people edit the same file. Git will alert you with a "conflict."

### How to Resolve

**Step 1:** Pull the changes
```bash
git pull
# Git will say "CONFLICT" and show which file(s)
```

**Step 2:** Open the conflicted file
You'll see markers like this:
```
<<<<<<< HEAD
Your version of the line
=======
Their version of the line
>>>>>>> branch-name
```

**Step 3:** Choose which version to keep
- Keep yours, theirs, or combine them
- Delete the markers (`<<<<<<<`, `=======`, `>>>>>>>`)

**Step 4:** Mark as resolved
```bash
git add conflicted-file.txt
git commit -m "Resolved conflict in lyrics"
git push
```

**Pro tip:** Talk to the other person if you're unsure which version to keep!

---

## Branch Workflow (Optional)

For experimental work, use branches to avoid messing with the main version.

### Create a Branch
```bash
# Create and switch to new branch
git checkout -b experimental-mix

# Make your changes...
git add .
git commit -m "Trying extreme auto-tune effect"
git push -u origin experimental-mix
```

### Share Your Experiment
- Others can check out your branch to listen
- Discuss whether to merge it into main

### Merge if Approved
```bash
git checkout main
git merge experimental-mix
git push
```

### Delete if Not Needed
```bash
git branch -d experimental-mix
git push origin --delete experimental-mix
```

---

## Do's and Don'ts

### ✅ Do:
- Pull before you push
- Write clear commit messages
- Commit often (small, focused commits are better)
- Ask questions if unsure
- Review your changes before committing
- Keep private stuff in the private submodule

### ❌ Don't:
- Commit without testing/listening first
- Use vague commit messages
- Commit huge batches of unrelated changes
- Forget to pull before starting work
- Accidentally push private files to public repo
- Force push without asking (rewrites history)

---

## Getting Help

### Git Issues?
- **GitHub Desktop**: Usually shows what's wrong
- **Command line**: `git status` shows current state
- **Stuck?**: Ask the project owner or check docs

### File Organization Questions?
- Check the README.md
- Look at existing files for examples
- Ask in the group chat

### Conflicts?
- Talk to the other person who edited the file
- Keep both versions if unsure
- Worst case: start over from clean clone

---

## Useful Commands

### Check Status
```bash
git status              # What's changed?
git diff               # Show exact changes
git log --oneline -10  # Recent commits
```

### Undo Mistakes
```bash
git checkout -- file.txt     # Undo changes to a file
git reset --soft HEAD~1      # Undo last commit (keep changes)
git reset --hard origin/main # Nuclear: reset to GitHub version
```

### Pull Latest Changes
```bash
git pull                                    # Get updates
git submodule update --init --recursive     # Update private submodule
```

---

## Tagging Milestones

When we reach important points:

```bash
# Tag a demo completion
git tag demo-complete-track01
git push origin demo-complete-track01

# Tag the final master
git tag -a v1.0-streaming -m "Final streaming master"
git push origin v1.0-streaming
```

---

## Privacy Reminder

### Public (Anyone can see):
- Lyrics
- Demo metadata and links
- Production notes
- Artwork (compressed)
- Website

### Private (Collaborators only):
- Session files
- Raw stems
- High-resolution artwork
- Business documents

**When in doubt, ask before making something public!**

---

## Questions?

- **Git/GitHub issues**: Check the Git Cheat Sheet (`docs/GIT-CHEAT-SHEET.md`)
- **Privacy questions**: See Privacy Guide (`docs/PRIVACY-GUIDE.md`)
- **Setup help**: See Setup Guide (`docs/SETUP-GUIDE.md`)
- **Still stuck**: Message the project owner!

---

## Attribution

When you contribute:
- Your name goes in the credits
- Your commits show your contributions
- You're part of the creative history!

Thank you for being part of this project! 🎵
