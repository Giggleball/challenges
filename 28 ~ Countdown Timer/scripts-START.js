// Store inteval in own variable so you can stop it later with return 
let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

// Select all the buttons
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
    // Clear any existing timers when timer is clicked
    clearInterval(countdown);

    // When did the timer start?
    const now = Date.now();
    // How long do you want the timer to run?
    const then = now + seconds * 1000;
    // Run immediately when function is evoked
    displayTimeLeft(seconds);
    displayEndTime(then);

    // Display seconds left
     countdown = setInterval(() => {
         const secondsLeft = Math.round((then - Date.now()) / 1000);
         // Check if you need to stop timer
         if (secondsLeft < 0) {
             clearInterval(countdown);
             return;
         }
         // Display time left
         displayTimeLeft(secondsLeft);

     }, 1000 );
    console.log({now, then});
}

// SetInterval runs after 1 second, so create a new function to fix that

function displayTimeLeft(seconds ) {
    // Use Math.Floor to get whole minutes
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    // Make sure to show two digits always even when it's < 10
    const display = `${minutes}: ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    // Update the title in the browser tab to match the display
    document.title = display;
    timerDisplay.textContent = display;
}

// Display when you'll be back
function displayEndTime(timestamp) {
    // Turn timestamp into date
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    // To have the time displayed in AM to PM use the following line
    //endTime.textContent = `Giggleball will be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0': ''}${minutes}!`
    // European time
    endTime.textContent = `Giggleball will be back at ${hour}:${minutes < 10 ? '0': ''}${minutes}!`;
}


function startTimer() {
    // Will give a string of minutes + parseInt to get a number
    const seconds = parseInt(this.dataset.time);
    // After clicked on a time this will display it
    timer(seconds);
}


// Linking the buttons to the timer
buttons.forEach(button => button.addEventListener('click', startTimer));

// Get form working
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Text form
    const mins= this.minutes.value;
    // Pass the content to the timer and x 60 because the timer accepts only seconds
    timer(mins * 60);
    // To clear out the value after ENTER has been pressed
    this.reset();

})