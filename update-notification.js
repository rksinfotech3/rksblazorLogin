if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
        registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        // New update available
                        console.log('New update available');
                        showUpdateNotification();
                    } else {
                        // Content is cached for offline use
                        console.log('Content is now available offline!');
                    }
                }
            };
        };
    }).catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}

function showUpdateNotification() {
    const updateNotification = document.createElement('div');
    updateNotification.innerHTML = `
        <div style="position: fixed; bottom: 0; width: 100%; background: #444; color: #fff; text-align: center; padding: 10px;">
            A new version is available. <button onclick="window.location.reload()">Reload</button>
        </div>
    `;
    document.body.appendChild(updateNotification);
}
