// --- Service Worker Registration ---
// This checks if the browser supports Service Workers and registers the sw.js file.
if ('serviceWorker' in navigator) {
  // Wait until the window loads to prevent blocking the page rendering
  window.addEventListener('load', () => {
    // Register the service worker, assuming it's in the root folder
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('Service Worker registered successfully. Scope:', reg.scope);
      })
      .catch(err => {
        console.error('Service Worker registration failed:', err);
      });
  });
}

// --- Main App Logic (Placeholder) ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('Olympus Pathfinder App is ready!');
    
    // You would put your custom student-focused app logic here.
    // Example: A button click handler
    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', () => {
            alert('Great job! You clicked a button to help a student!');
        });
    }
});