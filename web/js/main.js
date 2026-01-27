// Album Website JavaScript
// This file handles dynamic loading of Git data and interactive features

// Configuration
const GITHUB_USERNAME = 'your-username'; // Replace with your GitHub username
const REPO_NAME = 'album-name'; // Replace with your repository name
const GITHUB_API = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}`;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadRepoStats();
    loadCommitTimeline();
    setupLyricsViewer();
});

// Load repository statistics
async function loadRepoStats() {
    try {
        // Get commit count
        const commitsResponse = await fetch(`${GITHUB_API}/commits?per_page=1`);
        const linkHeader = commitsResponse.headers.get('Link');
        const commitCount = linkHeader ? 
            parseInt(linkHeader.match(/page=(\d+)>; rel="last"/)?.[1] || '0') : 
            1;
        
        document.getElementById('commit-count').textContent = commitCount;

        // Get repository data
        const repoResponse = await fetch(GITHUB_API);
        const repoData = await repoResponse.json();
        
        // Calculate days in production
        const createdDate = new Date(repoData.created_at);
        const today = new Date();
        const daysInProduction = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
        document.getElementById('days-in-production').textContent = daysInProduction;

        // Count tracks (you'll need to customize this based on your structure)
        const contentsResponse = await fetch(`${GITHUB_API}/contents/tracks`);
        const tracksData = await contentsResponse.json();
        const trackCount = tracksData.filter(item => item.type === 'dir').length;
        document.getElementById('track-count').textContent = trackCount;

        // Count demos (customize based on your structure)
        let demoCount = 0;
        for (const track of tracksData) {
            if (track.type === 'dir') {
                const demosResponse = await fetch(`${GITHUB_API}/contents/tracks/${track.name}/demos`);
                const demosData = await demosResponse.json();
                if (Array.isArray(demosData)) {
                    demoCount += demosData.length;
                }
            }
        }
        document.getElementById('demo-count').textContent = demoCount;

    } catch (error) {
        console.error('Error loading repo stats:', error);
        // Set fallback values
        document.getElementById('commit-count').textContent = '--';
        document.getElementById('track-count').textContent = '--';
        document.getElementById('demo-count').textContent = '--';
        document.getElementById('days-in-production').textContent = '--';
    }
}

// Load commit timeline from GitHub
async function loadCommitTimeline() {
    try {
        const response = await fetch(`${GITHUB_API}/commits?per_page=20`);
        const commits = await response.json();
        
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = ''; // Clear existing content
        
        commits.forEach((commit, index) => {
            const date = new Date(commit.commit.author.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
            
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-date">${formattedDate}</div>
                <div class="timeline-content">
                    <h4>${commit.commit.message.split('\n')[0]}</h4>
                    <p>${commit.commit.message.split('\n').slice(1).join(' ').substring(0, 150)}</p>
                    <span class="commit-hash">
                        <a href="${commit.html_url}" target="_blank">#${commit.sha.substring(0, 7)}</a>
                    </span>
                </div>
            `;
            timeline.appendChild(timelineItem);
        });
    } catch (error) {
        console.error('Error loading commit timeline:', error);
    }
}

// Setup lyrics viewer with version switching
function setupLyricsViewer() {
    const versionButtons = document.querySelectorAll('.version-selector button');
    const lyricsContent = document.getElementById('lyrics-content');
    
    versionButtons.forEach(button => {
        button.addEventListener('click', async () => {
            // Update active button
            versionButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Load lyrics for selected version
            const version = button.dataset.version;
            await loadLyrics(version);
        });
    });
}

// Load lyrics from GitHub for a specific version
async function loadLyrics(version) {
    const lyricsContent = document.getElementById('lyrics-content');
    
    try {
        // Construct the path to the lyrics file
        // Adjust this path based on your actual structure
        const lyricsPath = `tracks/01-song-title-example/lyrics/${version === 'final' ? 'final.txt' : version + '-revised.txt'}`;
        
        const response = await fetch(`${GITHUB_API}/contents/${lyricsPath}`);
        const data = await response.json();
        
        // Decode base64 content
        const lyrics = atob(data.content);
        
        // Display lyrics
        lyricsContent.innerHTML = `
            <div class="lyrics-section">
                <pre>${lyrics}</pre>
            </div>
        `;
    } catch (error) {
        console.error('Error loading lyrics:', error);
        lyricsContent.innerHTML = `
            <div class="lyrics-section">
                <p style="color: var(--text-muted);">Lyrics for this version are not yet available.</p>
            </div>
        `;
    }
}

// Load track data dynamically
async function loadTracks() {
    try {
        const response = await fetch(`${GITHUB_API}/contents/tracks`);
        const tracks = await response.json();
        
        const trackGrid = document.getElementById('track-grid');
        trackGrid.innerHTML = ''; // Clear existing content
        
        for (const track of tracks) {
            if (track.type === 'dir') {
                // Load track README
                const readmeResponse = await fetch(`${GITHUB_API}/contents/tracks/${track.name}/README.md`);
                const readmeData = await readmeResponse.json();
                const readmeContent = atob(readmeData.content);
                
                // Parse README for track info (basic parsing)
                const titleMatch = readmeContent.match(/^#\s+(.+)$/m);
                const title = titleMatch ? titleMatch[1] : track.name;
                
                // Create track card
                const trackCard = document.createElement('div');
                trackCard.className = 'track-card';
                trackCard.innerHTML = `
                    <h3>${title}</h3>
                    <p class="track-status">Status: <span class="badge in-production">In Production</span></p>
                    <p class="track-description">Loading description...</p>
                    <div class="track-actions">
                        <a href="tracks/${track.name}/lyrics/" class="btn btn-small">View Lyrics</a>
                        <a href="tracks/${track.name}/demos/" class="btn btn-small">Listen to Demos</a>
                    </div>
                `;
                trackGrid.appendChild(trackCard);
            }
        }
    } catch (error) {
        console.error('Error loading tracks:', error);
    }
}

// Utility: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Utility: Fetch file content from GitHub
async function fetchFileContent(path) {
    try {
        const response = await fetch(`${GITHUB_API}/contents/${path}`);
        const data = await response.json();
        return atob(data.content);
    } catch (error) {
        console.error(`Error fetching ${path}:`, error);
        return null;
    }
}

// Load demo players
async function loadDemos() {
    const demoGrid = document.getElementById('demo-grid');
    
    // This would need to be customized based on your actual demo structure
    // For now, this is a placeholder showing how you might structure it
    
    try {
        const response = await fetch(`${GITHUB_API}/contents/tracks`);
        const tracks = await response.json();
        
        for (const track of tracks) {
            if (track.type === 'dir') {
                // Load demos for this track
                const demosResponse = await fetch(`${GITHUB_API}/contents/tracks/${track.name}/demos`);
                const demos = await demosResponse.json();
                
                for (const demo of demos) {
                    if (demo.name.endsWith('.md')) {
                        // Load demo metadata
                        const demoContent = await fetchFileContent(demo.path);
                        
                        // Parse for untitled.com link
                        const linkMatch = demoContent.match(/https:\/\/untitled\.com\/[^\s)]+/);
                        if (linkMatch) {
                            // Create demo card with embedded player
                            // Implementation depends on untitled.com's embed format
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error loading demos:', error);
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Export functions for use in other scripts if needed
window.albumSite = {
    loadTracks,
    loadDemos,
    loadLyrics,
    fetchFileContent
};
