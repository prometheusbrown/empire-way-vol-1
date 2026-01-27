# Privacy Configuration Guide

This guide explains how to structure your album repository to keep certain content private while maintaining a public creative process.

---

## Understanding GitHub Privacy

GitHub offers two main repository types:
1. **Public**: Anyone can view, clone, and download
2. **Private**: Only invited collaborators can access

**Your situation:** You want a mostly-public repository with some private sections.

---

## Strategy Comparison

### Option 1: Git Submodules ⭐ RECOMMENDED

**How it works:**
- Main repository: PUBLIC
- Submodule (separate repository): PRIVATE
- The public repo references the private repo but doesn't contain it
- Only authorized collaborators can access the private submodule

**Pros:**
- ✅ Clean separation
- ✅ Both repos version-controlled
- ✅ Single workspace for collaborators
- ✅ Can update independently
- ✅ Best of both worlds

**Cons:**
- ❌ Slightly more complex setup
- ❌ Requires understanding submodules
- ❌ Extra steps when cloning

**Best for:** Your use case - public lyrics/demos, private stems/sessions

**Setup:**
```bash
# Create private repo on GitHub first
# Then in your public repo:
git submodule add https://github.com/username/album-private.git production

# Clone with submodules:
git clone --recursive https://github.com/username/album-name.git

# Update submodules:
git submodule update --init --recursive
```

---

### Option 2: .gitignore Exclusion

**How it works:**
- Entire repository is public
- Specific folders are ignored by Git
- Those folders exist locally but aren't tracked

**Pros:**
- ✅ Very simple
- ✅ No extra repos to manage
- ✅ Automatic exclusion

**Cons:**
- ❌ No version control for private files
- ❌ Must backup separately
- ❌ Easy to forget what's excluded

**Best for:** Files that don't need version control (large exports, temp files)

**Setup in `.gitignore`:**
```
# Private folders
production/stems/
production/sessions/
private-notes/
```

---

### Option 3: Branch-Based Privacy

**How it works:**
- Public content on `main` branch
- Private content on separate branch
- Private branch never pushed publicly

**Pros:**
- ✅ Single repository
- ✅ Can switch between public/private easily
- ✅ Full version control

**Cons:**
- ❌ Risk of accidental exposure
- ❌ Confusing for non-Git users
- ❌ Private branch loses sync over time

**Best for:** Solo work, advanced Git users

**Setup:**
```bash
# Create private branch
git checkout -b private-content

# Switch back to public
git checkout main

# Merge selected changes
git checkout main
git checkout private-content -- specific-file.txt
git commit -m "Pulled in specific file from private branch"
```

---

### Option 4: Separate Repositories

**How it works:**
- Two completely separate repos
- Public repo: Creative process, demos, lyrics
- Private repo: Production files, stems, sessions

**Pros:**
- ✅ Complete isolation
- ✅ Zero risk of exposure
- ✅ Simple to understand

**Cons:**
- ❌ Context split between repos
- ❌ Duplicate structure
- ❌ Harder to maintain consistency

**Best for:** Maximum paranoia, or very different workflows

**Setup:**
```bash
# Public repo
album-name/
├── tracks/
│   └── 01-song/
│       ├── lyrics/
│       └── demos/

# Private repo  
album-name-production/
├── tracks/
│   └── 01-song/
│       ├── stems/
│       └── sessions/
```

---

## Recommended Structure (Using Submodules)

### Public Repository
```
album-name/ (PUBLIC)
├── README.md
├── LICENSE.md
├── .gitignore
├── .gitattributes
├── tracks/
│   └── 01-song-title/
│       ├── README.md ✅ (track info)
│       ├── lyrics/ ✅ (all versions)
│       ├── demos/ ✅ (metadata + untitled.com links)
│       └── notes/ ✅ (production notes)
├── artwork/
│   ├── album/ ✅ (compressed versions)
│   └── singles/ ✅ (compressed versions)
├── liner-notes/ ✅
├── docs/ ✅
├── web/ ✅
├── releases/
│   ├── streaming/ ✅ (final masters)
│   └── physical/ ✅ (final masters)
└── production/ 🔗 (link to private submodule)
```

### Private Submodule
```
album-name-private/ (PRIVATE)
├── README.md
├── tracks/
│   └── 01-song-title/
│       ├── stems/
│       │   ├── vocals-lead.wav
│       │   ├── vocals-harmony.wav
│       │   ├── guitar-dry.wav
│       │   └── drums-full.wav
│       ├── sessions/
│       │   └── track01-mix-v5.logicx
│       └── raw/
│           └── recording-2026-01-15.wav
├── artwork/
│   └── originals/ (high-res PSDs)
├── contracts/
├── business/
└── backups/
```

---

## What Should Be Public vs Private?

### ✅ PUBLIC (Creative Process)
- **Lyrics**: All versions showing evolution
- **Demo metadata**: Notes, dates, what changed
- **Production notes**: Technical decisions, gear used, creative choices
- **Artwork**: Compressed versions (1200px max)
- **Website**: The interface itself
- **Final masters**: The actual released files (if you want)
- **Documentation**: How-to guides, workflows

**Why public?**
- Shows your creative journey
- Teaches others your process
- Marketing for your music
- Proves authenticity
- Builds community

### 🔒 PRIVATE (Production Assets)
- **Session files**: .logicx, .als, .ptx files
- **Raw stems**: Individual track recordings
- **High-res artwork**: Full PSDs, TIFFs
- **Contracts**: Business documents
- **Personal notes**: Things not meant for public
- **Alternative versions**: Outtakes you might want to revisit
- **Master chain**: Your mastering settings/presets

**Why private?**
- Protects your intellectual property
- Prevents unauthorized remixes
- Keeps business info confidential
- Maintains competitive advantage
- Privacy for collaborators

---

## Setting Up Privacy on untitled.com

Since you'll host actual audio on untitled.com, configure privacy there:

### Public Demos
- Embeddable player
- Shareable link
- Listed on your profile (optional)
- Can be indexed by search engines

### Private Demos
- Password-protected
- Unlisted (direct link only)
- No embedding
- Not searchable

**Workflow:**
1. Upload demo to untitled.com
2. Configure privacy settings
3. Copy embed code or link
4. Add to Git repository in demo metadata file
5. Commit with description

---

## Access Control

### Who Sees What?

**Public Repository:**
- ✅ Anyone on the internet
- ✅ Search engines
- ✅ Fans and followers
- ✅ Potential collaborators
- ✅ Music press

**Private Submodule:**
- ✅ You
- ✅ Invited collaborators only
- ✅ Must have GitHub account
- ❌ Not viewable by public

### Inviting Collaborators

**For public repo (optional):**
- Not required - anyone can clone
- But you can invite for commit access

**For private submodule (required):**
1. Go to private repo on GitHub
2. Settings → Collaborators
3. Add people
4. They can now access private content

**Permissions to grant:**
- **Read**: View only
- **Write**: Can commit and push
- **Admin**: Full control (usually not needed)

---

## Security Best Practices

### Do's
- ✅ Use submodules for sensitive content
- ✅ Review changes before committing
- ✅ Double-check which repo you're in
- ✅ Keep master files offline too
- ✅ Use strong passwords on accounts
- ✅ Enable two-factor authentication
- ✅ Regularly backup both repos

### Don'ts
- ❌ Don't commit passwords or API keys
- ❌ Don't push wrong branch to public
- ❌ Don't ignore .gitignore warnings
- ❌ Don't commit contract PDFs publicly
- ❌ Don't assume "deleted" = "gone forever" (Git history!)
- ❌ Don't share your GitHub access token

---

## Accidental Exposure: What To Do

### If You Commit Private Info to Public Repo

**Immediately:**
1. Don't panic - history can be rewritten
2. Remove the file: `git rm sensitive-file.pdf`
3. Commit: `git commit -m "Remove sensitive file"`
4. Contact GitHub support to purge caches

**To remove from history:**
```bash
# WARNING: This rewrites history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/sensitive.pdf" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin --force --all
git push origin --force --tags
```

**Note:** Anyone who cloned before this still has the file.

### If You Accidentally Make Private Repo Public

1. Go to GitHub repo settings
2. Scroll to "Danger Zone"
3. "Change visibility" → Private
4. Assume someone may have cloned it
5. Rotate any exposed credentials

---

## Verifying Your Setup

### Check What's Public
```bash
# In your public repo
git ls-files

# Should NOT see:
# - Session files
# - Raw stems
# - High-res originals
```

### Check What's Private
```bash
cd production  # Your private submodule
git ls-files

# Should see:
# - stems/
# - sessions/
# - raw/
```

### Test as Anonymous User
1. Open incognito browser
2. Go to your GitHub repo
3. Can you see private content? → Fix it!
4. Can you see public content? → Good!

---

## Workflow Checklist

### Starting Work
- [ ] `git pull` in public repo
- [ ] `cd production && git pull` in private submodule
- [ ] Confirm you're in the right repo before working

### Saving Work
- [ ] Check which repo you're in
- [ ] Review changes: `git status`, `git diff`
- [ ] Commit to correct repo
- [ ] Push to correct remote
- [ ] Verify on GitHub web interface

### Ending Session
- [ ] Both repos committed
- [ ] Both repos pushed
- [ ] Local backup made (optional)
- [ ] No uncommitted changes

---

## Maintenance

### Weekly
- Verify privacy settings haven't changed
- Check that .gitignore is working
- Backup both repos locally

### Monthly
- Review collaborator access
- Check repository size (LFS usage)
- Test that submodule links work

### Before Release
- Audit public repo for anything that shouldn't be public
- Verify all demo links work
- Check that website deploys correctly
- Ensure final masters are in correct location

---

## Getting Help

- **GitHub Docs**: https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories
- **Git Submodules**: https://git-scm.com/book/en/v2/Git-Tools-Submodules
- **GitHub Support**: https://support.github.com

---

**Remember:** When in doubt, keep it private! You can always make things public later, but you can't un-publish leaked content.
