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