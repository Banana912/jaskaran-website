// Theme Toggle Functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
}

let titleElement = document.getElementById('title');

// Add event listeners for mouse enter and leave on the header
document.querySelector('header').addEventListener('mouseenter', addHoverEffect);
document.querySelector('header').addEventListener('mouseleave', removeHoverEffect);

// Function to add hover effect
function addHoverEffect() {
    document.addEventListener('mousemove', adjustTitleStyle);
    titleElement.classList.remove('ease-back'); // Disable transition during hover
}

// Function to remove hover effect
function removeHoverEffect() {
    document.removeEventListener('mousemove', adjustTitleStyle);
    titleElement.classList.add('ease-back'); // Enable transition for smooth return
    // Reset title style when mouse leaves header
    titleElement.style.fontWeight = '400';
    titleElement.style.fontSize = '2.5em';
}

// Function to adjust title style based on mouse position
function adjustTitleStyle(event) {
    // Map the mouseX position to a font-weight range
    let fontWeight = Math.min(900, Math.max(100, (event.clientX / window.innerWidth) * 900));
    let fontSize = Math.min(40, window.innerWidth / 10.5) + 'px'; // Adjust font-size responsively

    titleElement.style.fontWeight = fontWeight;
    titleElement.style.fontSize = fontSize;
}
