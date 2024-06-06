// Function to update clock 
function updateClock() {
     // Get the current date & time, & date components
    const now = new Date();       
    const dname = now.getDay();
    const mo = now.getMonth();
    const dnum = now.getDate();
    const yr = now.getFullYear();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    

    let hou = now.getHours();
    let pe = "AM";


   
    if (hou == 0) {   
        hou = 12;
    }
    if (hou > 12) {
        hou = hou - 12;
        pe = "PM";
    }

    Number.prototype.pad = function (digits) {
        let n = this.toString();
        while (n.length < digits) {
            n = '0' + n;
        }
        return n;
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
    const values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];

    // Update DOM elements with new values
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    }
}

// Initalise the clock and update it every second
function initClock() {
    updateClock(); // Update immediately
    window.setInterval(updateClock, 1000); // Update every second
}

// Call initClock when DOM content is loaded
document.addEventListener('DOMContentLoaded', initClock);
