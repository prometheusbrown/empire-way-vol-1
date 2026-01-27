# Git Workflow Guide for Music Producers (No Tech Experience Needed!)

## What is Git and Why Are We Using It?

Git is like "track changes" in Microsoft Word, but for entire projects. It lets us:
- See every version of every file we've ever saved
- Work on the same project without overwriting each other's work
- Go back to old versions if we don't like new changes
- Keep a public record of how the album evolved

**Think of it like:** A time machine for your creative work.

## The Three Methods (Pick What's Easiest for You!)

### Method 1: GitHub Web Interface (Easiest - No Software!)
Best for: Uploading occasional files, editing text

1. Go to github.com/[repo-name]
2. Click "Add file" → "Upload files"
3. Drag and drop your files
4. Add a commit message (what you changed)
5. Click "Commit changes"

**Perfect for:** Demo metadata files, production notes, lyric updates

### Method 2: GitHub Desktop (Recommended for Producers)
Best for: Regular updates, seeing what changed

1. Download GitHub Desktop (free)
2. Clone the repository (one-time setup)
3. Work on files normally on your computer
4. Open GitHub Desktop when ready to save
5. It shows what changed
6. Write a message, click "Commit" then "Push"

**Perfect for:** Daily work, uploading multiple files at once

### Method 3: Command Line (For the Brave)
Best for: Full control, automation

We'll skip this unless you're curious! The other methods do everything you need.

---

## Your Daily Workflow (GitHub Desktop)

### Morning: Get the Latest Version
```
1. Open GitHub Desktop
2. Click "Fetch origin" (downloads new changes)
3. If there are changes, click "Pull origin"
4. Now you have the latest version!
```

### Working: Make Your Changes
```
1. Work on files normally (add demos, edit notes, etc.)
2. Save files like you normally would
3. GitHub Desktop automatically sees what you changed
```

### Evening: Upload Your Changes
```
1. Open GitHub Desktop
2. See all your changes listed on the left
3. Write a summary: "Added demo 3 with new bridge"
4. Click "Commit to main"
5. Click "Push origin" (uploads to GitHub)
6. Done!
```

---

## Common Tasks

### Uploading a New Demo

**Option A: Just the Metadata (Recommended)**
1. Upload the actual audio to untitled.com
2. Copy the untitled.com link
3. Create a new file: `tracks/01-song-title/demos/demo-v3-2026-01-20.md`
4. Use the template (see below)
5. Commit with message: "Added demo v3 - revised bridge"

**Option B: Upload Audio to Git (Using Git LFS)**
1. Place the .wav file in `tracks/01-song-title/demos/`
2. Git LFS automatically handles it (already set up)
3. Commit with message: "Added demo v3 audio file"
4. Note: This uses storage space, costs money beyond free tier

### Updating Lyrics
1. Open the lyrics file: `tracks/01-song-title/lyrics/v2-revised.txt`
2. Make your changes and save
3. GitHub Desktop shows the exact lines that changed
4. Commit with message: "Revised chorus lyrics - stronger imagery"

### Adding Production Notes
1. Open: `tracks/01-song-title/notes/production-notes.md`
2. Add your notes under the appropriate section
3. Commit with message: "Added notes about drum recording"

---

## Demo Metadata Template

Copy this when creating a new demo file:

```markdown
# Demo Version [Number]

**Date**: [Today's Date]  
**Duration**: [Length]  
**Recording Location**: [Studio/Home/etc]  

## Listen
🎧 [Play on untitled.com](https://untitled.com/your-link-here)

## Changes from Previous Version
- [What did you change?]
- [What did you add?]
- [What did you remove?]

## Technical Details
- **Format**: [WAV/MP3/etc]
- **Sample Rate**: [48kHz/96kHz]
- **DAW Session**: [filename.logicx or .als or whatever]

## What's Working
- [Things you're happy with]

## What Needs Work
- [Things to improve]

## Next Steps
- [ ] [Task 1]
- [ ] [Task 2]
```

---

## Good Commit Messages

**Good Examples:**
- ✅ "Added demo 3 - experimented with half-time bridge"
- ✅ "Updated verse 2 lyrics - removed cliché"
- ✅ "Production notes on vocal chain"
- ✅ "Stems for mixing - Track 1 complete"

**Bad Examples:**
- ❌ "stuff"
- ❌ "idk"
- ❌ "changes"
- ❌ "asdfasdf"

**Why it matters:** 6 months from now, you want to understand what you did!

---

## Troubleshooting

### "Conflict" Error
This means you and someone else changed the same line in a file.

**Fix:**
1. Open the file - you'll see both versions marked
2. Decide which version to keep (or combine them)
3. Remove the conflict markers (`<<<<`, `====`, `>>>>`)
4. Save and commit

### "Can't Push" Error
Usually means someone else uploaded changes first.

**Fix:**
1. Click "Pull" to get their changes first
2. Then "Push" your changes

### "Where Did My File Go?"
Check the commit history - it's still there!

**Fix:**
1. Look at old commits to find the file
2. Copy what you need from that old version
3. Or "revert" the commit that deleted it

### Lost or Confused?
**Don't panic!** Git keeps everything. Worst case:
1. Save your current work somewhere safe
2. Re-clone the repository (fresh copy)
3. Copy your work back in
4. Commit and push

---

## GitHub Desktop Tips

### Ignore Certain Files
Create a `.gitignore` file that lists files to ignore:
```
# Ignore Mac system files
.DS_Store

# Ignore DAW project backup files
*.backup
*~

# Ignore large cache files
*.cache
```

### See What Changed
- Green = Added lines
- Red = Deleted lines
- Click any file to see detailed changes

### Undo Last Commit (Before Pushing)
1. Right-click the commit
2. "Revert this commit"
3. It creates a new commit that undoes it

---

## Best Practices for Music Projects

### File Naming
```
Good:
- demo-v1-2026-01-12.md
- lyrics-final.txt
- production-notes.md

Bad:
- demo.md (which demo?)
- final-FINAL-final-v2.txt (confusing!)
- notes1.txt (what kind of notes?)
```

### Folder Organization
Keep things organized:
```
✅ tracks/01-song-title/demos/demo-v3.md
❌ tracks/demos-song-title-v3.md
```

### Commit Often
- After each work session
- When you complete a task
- Before trying something experimental

### Write for Future You
Your commit messages are notes to your future self. Be kind to that person!

---

## Questions?

Ask [Artist Name]! They can help with:
- Setting up GitHub Desktop
- Understanding what Git is doing
- Fixing any errors
- Finding old versions of files

Remember: **You can't break anything!** Git saves everything, so experiment freely.

---

**Last Updated**: January 2026
