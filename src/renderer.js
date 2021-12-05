/*
  Code for initalizing window buttons on Windows.
  
  Copyright (c) 2021 Concrete Team
  Licensed under the MIT License (MIT).
  Happy Coding! :^)
*/

// Loads remote window, to manage.
const remote = require('@electron/remote');
const win = remote.getCurrentWindow();

// Calls the window handler.
handleWindowControls();

// Before the window gets unloaded, remove all event listeners.
window.onbeforeunload = (event) => {
    win.removeAllListeners();
}

// Main function, only called on Windows.
// When called on macOS or Linux, error out.
function handleWindowControls() {
    // When the minimized button is pressed, minimize the window. 
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    // When the maximized button is pressed, maximize the window.
    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    // When the un-maximized button is pressed, un-maximize the window.
    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    // When the close button is pressed, close the window.
    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggles the maximize and restore buttons.
    toggleMaxRestoreButtons();
    // When the window is maximized or unmaximized, toggle the maximize and restore buttons.
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    // Function to toggle the maximize and restore buttons.
    function toggleMaxRestoreButtons() {
        // If it's maximized, we add the maximize class to the body.
        // Else, we remove it.
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}
