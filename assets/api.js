function getData(url) {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
            throw new Error('Request failed')
        }
      })
      .then((data) => {
        displayData(data);
      })
      .catch((err) => {
        displayError(err.message);
      });
  }

  function displayData(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = JSON.stringify(data, null, 2); // Formats the JSON nicely
  }
  
  function displayError(errorMessage) {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = 'Error: ' + errorMessage;
  }
   
  getData('https://onlineprojectsgit.github.io/API/WDEndpoint.json');



  function displayLocalDateTime() {
    const dateTimeDiv = document.getElementById('localDateTime');
    const now = new Date();
    
    // Format date and time as per local settings
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
    };
    const formattedDateTime = now.toLocaleDateString('en-US', options) + ' ' + now.toLocaleTimeString('en-US', options);
    
    dateTimeDiv.textContent = formattedDateTime;
}

// Initial call to display the date and time
displayLocalDateTime();

// Update the date and time every second
setInterval(displayLocalDateTime, 1000);