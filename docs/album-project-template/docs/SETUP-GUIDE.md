# Setup Guide

## Initial Repository Setup

### 1. Create the Repository on GitHub

1. Go to github.com and click "New Repository"
2. Name: `your-album-name`
3. Description: "Album production tracked with Git - transparent creative process"
4. **Important**: Choose "Public" for now (we'll configure privacy next)
5. Do NOT initialize with README (we already have one)
6. Click "Create Repository"

### 2. Install Git and Git LFS

**On macOS:**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Git
brew install git

# Install Git LFS
brew install git-lfs
git lfs install
```

**On Windows:**
- Download Git from: https://git-scm.com/download/win
- Download Git LFS from: https://git-lfs.github.com
- Install both, then run: `git lfs install`

**On Linux:**
```bash
sudo apt-get install git git-lfs
git lfs install
```

### 3. Configure Git

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name to 'main'
git config --global init.defaultBranch main
```

### 4. Initialize Your Local Repository

```bash
# Navigate to the template folder
cd /path/to/album-project-template

# Initialize Git
git init

# Add all files
git add .

# First commit
git commit -m "Initial album repository setup"

# Connect to GitHub
git remote add origin https://github.com/YOUR-USERNAME/your-album-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 5. Enable Git LFS

```bash
# Track audio files with Git LFS
git lfs track "*.wav"
git lfs track "*.aif"
git lfs track "*.aiff"
git lfs track "*.mp3"
git lfs track "*.flac"

# Commit the LFS configuration
git add .gitattributes
git commit -m "Configure Git LFS for audio files"
git push
```

---

## Privacy Configuration

You have several options for keeping certain content private while maintaining a public repository:

### Option 1: GitHub Submodules (Recommended)

This approach keeps a separate private repository for sensitive content, linked to your public repo.

**Setup:**

1. **Create a private repository on GitHub:**
   - Name: `your-album-name-private`
   - Visibility: **Private**

2. **Add it as a submodule:**
```bash
cd /path/to/your-album-name

# Add the private repo as a submodule in the 'production' folder
git submodule add https://github.com/YOUR-USERNAME/your-album-name-private.git production

# Commit the submodule
git add .gitmodules production
git commit -m "Add private production submodule"
git push
```

3. **Working with the submodule:**
```bash
# To update private content
cd production
# Make your changes (add stems, session files, etc.)
git add .
git commit -m "Added stems for Track 1"
git push

# Back in the main repo
cd ..
git add production
git commit -m "Updated private production assets"
git push
```

**What goes in the private submodule:**
- Session files (.logicx, .als, etc.)
- Raw/unprocessed stems
- Full-resolution audio files
- Contract documents
- Personal notes you don't want public

**What stays in the public repo:**
- Lyrics
- Demo metadata (links to untitled.com)
- Production notes (technical decisions)
- Artwork (compressed versions)
- Website code

### Option 2: Branch-Based Privacy

Keep sensitive material on a private branch that you never push publicly.

**Setup:**

1. **Create a private branch locally:**
```bash
git checkout -b private-assets
```

2. **Add private content:**
```bash
# Add your private files
cp -r /path/to/stems production/stems/
git add production/
git commit -m "Added private stems"
```

3. **Switch back to public branch:**
```bash
git checkout main
```

4. **Never push the private branch:**
```bash
# This branch stays local only
# Or push to a private remote if you need backup
```

**Pros:** Simple, one repository  
**Cons:** Easy to accidentally push the wrong branch

### Option 3: .gitignore for Specific Folders

Use .gitignore to exclude certain folders from the public repository entirely.

**Setup:**

Add to your `.gitignore`:
```
# Private content
production/stems/
production/sessions/
production/contracts/
```

**Pros:** Simple, automatic exclusion  
**Cons:** No version control for private files, must backup separately

### Option 4: Separate Repositories (Simple but Divided)

Maintain two completely separate repositories.

**Setup:**

1. Public repo: `your-album-name` (lyrics, demos, notes)
2. Private repo: `your-album-name-production` (everything else)

**Pros:** Complete separation, no risk of accidental exposure  
**Cons:** Less integrated, harder to see the full picture

---

## Recommended Structure

Based on your needs, I recommend **Option 1 (Submodules)**:

```
your-album-name/ (PUBLIC)
├── tracks/
│   ├── 01-song-title/
│   │   ├── lyrics/ ✅ PUBLIC
│   │   ├── demos/ ✅ PUBLIC (metadata + links only)
│   │   └── notes/ ✅ PUBLIC
├── artwork/ ✅ PUBLIC (compressed versions)
├── liner-notes/ ✅ PUBLIC
├── docs/ ✅ PUBLIC
├── web/ ✅ PUBLIC
├── releases/ ✅ PUBLIC (final masters only)
└── production/ 🔒 PRIVATE (submodule)
    ├── stems/
    ├── sessions/
    ├── raw-audio/
    └── contracts/
```

---

## Setting Up GitHub Pages (Website Hosting)

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Source: "Deploy from a branch"
   - Branch: `main`, Folder: `/web`
   - Click "Save"

2. **Your site will be live at:**
   - `https://YOUR-USERNAME.github.io/your-album-name/`

3. **Custom domain (optional):**
   - In GitHub Pages settings, add your custom domain
   - Configure DNS with your domain provider:
     - Add CNAME record pointing to `YOUR-USERNAME.github.io`
     - Or add A records to GitHub's IP addresses

---

## Inviting Your Producer

### Using GitHub Web Interface (Easiest)

1. Go to your repository on GitHub
2. Click "Settings" → "Collaborators"
3. Click "Add people"
4. Enter your producer's GitHub username or email
5. They'll receive an invitation email

**Permissions to grant:**
- **Write access**: They can add/edit files, commit, push
- **Maintain**: Also manage some settings (not recommended at first)

### GitHub Desktop Setup for Producer

Send them this:

1. Download GitHub Desktop: https://desktop.github.com
2. Sign in with GitHub account
3. File → Clone Repository
4. Choose: `YOUR-USERNAME/your-album-name`
5. Select a local folder
6. Click "Clone"

---

## Backup Strategy

Even with Git, backups are important:

1. **GitHub itself** is your primary backup (in the cloud)

2. **Clone to multiple machines:**
```bash
# On your other computer
git clone https://github.com/YOUR-USERNAME/your-album-name.git
```

3. **Periodic local archives:**
```bash
# Create a complete archive
git archive --format=zip --output=album-backup-2026-01-26.zip HEAD
```

4. **Private submodule backup:**
```bash
cd production
git clone --mirror https://github.com/YOUR-USERNAME/your-album-name-private.git
```

5. **External drive backup:**
   - Regularly copy the entire project folder to an external drive
   - Git history is preserved in the `.git` folder

---

## Maintenance Commands

### Update from GitHub (get latest changes)
```bash
git pull
git submodule update --init --recursive
```

### See what changed
```bash
git status
git diff
```

### Undo local changes (before committing)
```bash
git checkout -- filename.txt
```

### Undo last commit (after committing, before pushing)
```bash
git reset --soft HEAD~1
```

### View commit history
```bash
git log --oneline --graph --all
```

### Create a release tag
```bash
git tag -a v1.0-streaming -m "Streaming master release"
git push origin v1.0-streaming
```

---

## Troubleshooting

### Large files rejected
If you forget to use Git LFS:
```bash
git rm --cached large-file.wav
git lfs track "*.wav"
git add .gitattributes large-file.wav
git commit -m "Move large file to LFS"
```

### Submodule not updating
```bash
git submodule update --remote --merge
```

### Reset to GitHub version (nuclear option)
```bash
# WARNING: This deletes local changes!
git fetch origin
git reset --hard origin/main
```

---

## Next Steps

1. ✅ Complete initial setup
2. ✅ Configure privacy (choose option)
3. ✅ Invite collaborators
4. ✅ Enable GitHub Pages
5. ✅ Customize web interface
6. 🎵 Start creating!

---

**Questions?** Check out:
- Git documentation: https://git-scm.com/doc
- GitHub guides: https://guides.github.com
- Git LFS: https://git-lfs.github.com
