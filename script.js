function scheduleMeeting() {
    const dateTimeInput = document.getElementById('dateTime');
    const dateTimeValue = dateTimeInput.value;

    fetch('https://meeting-scheduler-h9eo.onrender.com/schedule-meeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dateTime: dateTimeValue,
        }),
    })
    .then(response => response.json())
    .then(data => {
        const timezoneResult = document.getElementById('timezoneResult');

        // Clear previous results
        timezoneResult.innerHTML = '';

        // Display scheduled times with random styles
        data.scheduledTimes.forEach((time, index) => {
            const city = data.timeZones[index];

            // Create a div for each time zone
            const timezoneItem = document.createElement('div');

            // Apply random styles for each time zone
            applyRandomStyles(timezoneItem);

            // Display in timezoneResult
            timezoneItem.innerHTML = `Scheduled meeting in ${city}: ${time}`;
            timezoneResult.appendChild(timezoneItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

function applyRandomStyles(element) {

    // Generate random color and font size
    const randomColor = getRandomColor();
    const randomFontSize = getRandomFontSize();

    // Apply random styles
    element.style.color = randomColor;
    element.style.fontSize = randomFontSize;
}

function getRandomColor() {
    const randomShadeValue = Math.floor(Math.random() * 256);
    const randomShade = `rgb(${randomShadeValue},${randomShadeValue},${randomShadeValue})`;
    return randomShade;
}

function getRandomFontSize() {
    // Generate a random font size 
    return Math.floor(Math.random() * 120) + 12 + 'px';
}
