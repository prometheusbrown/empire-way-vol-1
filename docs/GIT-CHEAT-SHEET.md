# Git Cheat Sheet for Music Production

## Daily Workflow

### Start Your Day
```bash
# Get the latest changes
git pull

# Update private submodule (if using)
git submodule update --remote
```

### Save Your Work
```bash
# See what you changed
git status

# Add specific files
git add tracks/01-song-title/demos/demo-v3.md

# Or add everything
git add .

# Commit with a message
git commit -m "Added demo v3 with revised bridge"

# Upload to GitHub
git push
```

### Quick Save Everything
```bash
# One-liner for quick saves
git add . && git commit -m "End of session - saved progress" && git push
```

---

## Working with Demos

### Add a New Demo (Metadata Only)
```bash
# Create the demo metadata file
touch tracks/01-song-title/demos/demo-v4-2026-01-26.md

# Edit the file, add your notes and untitled.com link

# Save to Git
git add tracks/01-song-title/demos/demo-v4-2026-01-26.md
git commit -m "Demo v4 - Track 1 - added brass section"
git push
```

### Add a Demo Audio File (Using Git LFS)
```bash
# Just add the file normally, LFS handles it automatically
git add tracks/01-song-title/demos/demo-v4.wav
git commit -m "Demo v4 audio file - Track 1"
git push
```

---

## Lyrics Management

### Update Lyrics
```bash
# Edit your lyrics file
# Then save:
git add tracks/01-song-title/lyrics/v2-revised.txt
git commit -m "Revised verse 2 - stronger imagery"
git push
```

### See Lyrics Changes
```bash
# View the exact changes you made
git diff tracks/01-song-title/lyrics/v2-revised.txt
```

### Compare Two Versions
```bash
# See differences between two specific versions
git diff v1-initial-draft.txt v2-revised.txt
```

---

## Production Notes

### Add Production Notes
```bash
# Edit your notes file, then:
git add tracks/01-song-title/notes/production-notes.md
git commit -m "Added notes on vocal recording chain"
git push
```

---

## Tagging Releases

### Tag a Demo Milestone
```bash
git tag demo-complete-track01
git push origin demo-complete-track01
```

### Tag the Streaming Master
```bash
git tag -a v1.0-streaming -m "Final master for streaming platforms"
git push origin v1.0-streaming
```

### Tag the Physical Master
```bash
git tag -a v1.0-physical -m "Final master for vinyl and CD"
git push origin v1.0-physical
```

### View All Tags
```bash
git tag
```

### Go Back to a Tagged Version
```bash
git checkout v1.0-streaming
```

---

## Branching (For Experimental Work)

### Create a Branch for Experiments
```bash
# Create and switch to new branch
git checkout -b experimental-mix

# Make your changes...

# Commit on this branch
git add .
git commit -m "Trying extreme compression on drums"
git push -u origin experimental-mix
```

### Switch Back to Main
```bash
git checkout main
```

### Merge Experiment if You Like It
```bash
git checkout main
git merge experimental-mix
git push
```

### Delete Branch if You Don't Like It
```bash
git branch -d experimental-mix
git push origin --delete experimental-mix
```

---

## Working with Private Content (Submodule)

### Update Private Assets
```bash
# Go into the private submodule
cd production

# Add your stems or session files
git add stems/track01-vocals.wav
git commit -m "Added vocal stems for Track 1"
git push

# Back to main repo
cd ..

# Update the reference to private assets
git add production
git commit -m "Updated private production assets"
git push
```

### Pull Private Updates
```bash
git submodule update --remote --merge
```

---

## Viewing History

### See Recent Changes
```bash
# Last 10 commits
git log --oneline -10

# With visual graph
git log --oneline --graph --all -10
```

### See What Changed in a Specific Commit
```bash
git show abc123
```

### See All Changes to a File
```bash
git log -p -- tracks/01-song-title/lyrics/final.txt
```

### Find When Something Was Changed
```bash
git log --all --full-history -- tracks/01-song-title/demos/demo-v1.md
```

---

## Undoing Mistakes

### Undo Changes Before Committing
```bash
# Discard changes to a single file
git checkout -- filename.txt

# Discard all changes
git reset --hard
```

### Undo Last Commit (Before Pushing)
```bash
# Keep your changes, just undo the commit
git reset --soft HEAD~1

# Undo the commit and discard changes
git reset --hard HEAD~1
```

### Undo After Pushing (Creates New Commit)
```bash
# Revert the last commit
git revert HEAD
git push
```

### Restore a Deleted File
```bash
# Find the commit where it was deleted
git log --all --full-history -- path/to/file.txt

# Restore from the commit before deletion
git checkout abc123~1 -- path/to/file.txt
git commit -m "Restored accidentally deleted file"
```

---

## Collaboration

### Get Someone Else's Changes
```bash
git pull
```

### See What Others Changed
```bash
# Before pulling
git fetch
git log HEAD..origin/main
```

### Resolve Conflicts
```bash
# Pull and get a conflict
git pull

# Open the conflicted file, you'll see:
# <<<<<<< HEAD
# Your version
# =======
# Their version
# >>>>>>> branch-name

# Edit the file to keep what you want
# Remove the markers

# Mark as resolved
git add conflicted-file.txt
git commit -m "Resolved conflict in lyrics"
git push
```

---

## Useful Aliases

Add these to your `~/.gitconfig` for shortcuts:

```ini
[alias]
    # Short status
    st = status -s
    
    # Pretty log
    lg = log --oneline --graph --all --decorate
    
    # Last commit
    last = log -1 HEAD --stat
    
    # Undo last commit but keep changes
    undo = reset --soft HEAD~1
    
    # Show changes
    changes = diff --name-status
    
    # Quick add and commit
    ac = !git add . && git commit -m
    
    # Push current branch
    pushup = push -u origin HEAD
```

Then use:
```bash
git st        # instead of git status -s
git lg        # instead of long log command
git ac "message"  # add and commit in one step
```

---

## Checking Repository Health

### Verify LFS Files
```bash
git lfs ls-files
```

### Check Repository Size
```bash
du -sh .git
```

### Verify All Links Are Good
```bash
git fsck
```

### Clean Up Old Stuff
```bash
git gc --aggressive
```

---

## Quick Patterns

### Session End
```bash
git add . && git commit -m "Session end: $(date +%Y-%m-%d)" && git push
```

### New Track
```bash
# Create structure
mkdir -p tracks/05-new-song/{lyrics,demos,notes}
git add tracks/05-new-song/
git commit -m "Added structure for new track: Song Name"
git push
```

### Release Checklist
```bash
# 1. Finalize all files
git add releases/streaming/track01-final.wav
git commit -m "Final streaming master - Track 1"

# 2. Tag the release
git tag -a v1.0 -m "Album Release v1.0"

# 3. Push everything
git push && git push --tags
```

---

## Troubleshooting

### "Cannot push" Error
```bash
# Someone else pushed first, get their changes
git pull --rebase
git push
```

### "Detached HEAD" Warning
```bash
# You checked out a tag or old commit
# Get back to main branch:
git checkout main
```

### Large File Warning
```bash
# If you forgot to use LFS
git rm --cached large-file.wav
git lfs track "*.wav"
git add .gitattributes large-file.wav
git commit --amend
```

### "Modified Submodule" Warning
```bash
# Go into submodule and commit changes
cd production
git add .
git commit -m "Updated stems"
git push

# Back to main repo
cd ..
git add production
git commit -m "Updated submodule reference"
git push
```

---

## Emergency Commands

### "I Messed Everything Up"
```bash
# Save your current work to a safe place first!
cp -r . ../album-backup

# Reset to GitHub version
git fetch origin
git reset --hard origin/main

# If that doesn't work, re-clone:
cd ..
git clone https://github.com/username/album-name.git album-name-fresh
```

### "I Accidentally Committed Sensitive Info"
```bash
# Remove from history (advanced)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/sensitive-file" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: Rewrites history)
git push origin --force --all
```

---

## Tips

- **Commit often**: Better to have many small commits than one huge one
- **Write clear messages**: Your future self will thank you
- **Pull before you push**: Reduces conflicts
- **Use branches for experiments**: Keep main stable
- **Tag important milestones**: Easy to find later
- **Don't commit large files without LFS**: Slows down repository

---

## Getting Help

```bash
# Help for any command
git help <command>
git commit --help

# Quick reference
git <command> -h
git commit -h
```

**Remember**: Git keeps everything, so experiment freely! You can always go back.
