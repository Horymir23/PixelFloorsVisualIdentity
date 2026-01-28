import { versionData } from './versionData.js';

document.addEventListener('DOMContentLoaded', () => {
    const versionElement = document.getElementById('app-version');
    const timeElement = document.getElementById('app-time');

    if (!versionElement || !timeElement) return;

    // Set Version
    versionElement.textContent = versionData.version;

    // Time Ago Logic
    function updateTimeAgo() {
        const now = new Date();
        const updated = new Date(versionData.lastUpdated);
        const diffInSeconds = Math.floor((now - updated) / 1000);

        let text = '';

        if (diffInSeconds < 60) {
            text = 'just now';
        } else if (diffInSeconds < 3600) {
            const mins = Math.floor(diffInSeconds / 60);
            text = `${mins} min${mins > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            text = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            text = `${days} day${days > 1 ? 's' : ''} ago`;
        }

        timeElement.textContent = text;
    }

    updateTimeAgo();
    setInterval(updateTimeAgo, 60000); // Update every minute
});
