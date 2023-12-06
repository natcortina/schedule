function scheduleMeeting() {
    //get the value of the input
    const dateTimeInput = document.getElementById('dateTime');
    const dateTimeValue = dateTimeInput.value;

    fetch('https://meeting-scheduler-h9eo.onrender.com/schedule-meeting', {
       //using POST method to get information and put it into json
    method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        //turn it into a string the datetimevalue so it can be put in the html 
        body: JSON.stringify({
            dateTime: dateTimeValue,
        }),
    })

    //start it and wait
    .then(response => response.json())

    //it got it, now put it into html 
    .then(data => {
        const timezoneResult = document.getElementById('timezoneResult');

        // Clear previous results
        timezoneResult.innerHTML = '';

        // Display scheduled times with random styles, going through all of them in a loop
        data.scheduledTimes.forEach((time, index) => {
            const city = data.timeZones[index];

            // Create a div for each time zone
            const timezoneItem = document.createElement('div');

            // Apply random styles for each time zone
            applyRandomStyles(timezoneItem);

            // Display in timezoneResult and "append" add the timezoneitem which include city and time
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
