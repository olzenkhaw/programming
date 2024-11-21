function updateTime() {
    // Create a new Date object for the current time
    var currentTime = new Date();
    let options = {timeZone: 'Asia/Kuala_Lumpur'};
    let mtime = currentTime.toLocaleString('en-US', options);

    // Set the time zone to Malaysia (UTC+8)
    currentTime.setHours(currentTime.getHours());

    // Format the time to HH:MM:SS format
    var hours = currentTime.getHours();
    var ampm = hours < 12 ? "am" : "pm";
    hours = hours < 13 ? hours : hours -= 12;
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    // Add leading zeros if necessary
    // hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // Display the time on the webpage
    document.getElementById("malaysia-time").innerHTML = hours + ":" + minutes + '<span style="color:white; font-size:5vw; position: absolute;">&nbsp;' + seconds + '</span><span style="color:#908686; font-size:5vw">&nbsp;' +ampm+'</span>';
}

// Call updateTime function every second to update the time
setInterval(updateTime, 1000);
/* Get the element you want displayed in fullscreen mode (a video in this example): */
var elem = document.getElementById("mtime");

/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
function openFullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);
    if (isInFullScreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        return 0;
    }
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function calculateDuration(startTime, endTime) {
    // Parse the start and end times
    let [startHours, startMinutes] = startTime.split(':').map(Number);
    let [endHours, endMinutes] = endTime.split(':').map(Number);

    // Create date objects
    let startDate = new Date(0, 0, 0, startHours, startMinutes, 0);
    let endDate = new Date(0, 0, 0, endHours, endMinutes, 0);

    // Calculate the difference in milliseconds
    let diff = endDate - startDate;
    if (diff < 0) 
    {
        endDate = new Date(0, 0, 0, endHours+12, endMinutes, 0);
        diff = endDate - startDate;
    }

    // Convert the difference to hours and minutes
    let hours = Math.floor(diff / 1000 / 60 / 60);
    let minutes = Math.floor((diff / 1000 / 60) % 60);

    // Format the result as xx hours yy minutes
    if (hours < 2)
        if (minutes == 0)
            return `${hours} hour`;
        else
        {
            if (hours == 0)
                return `${minutes} minutes`;
            else
                return `${hours} hour ${minutes} minutes`;
        }
    else
        if (minutes == 0)
            return `${hours} hours`;
        else
            return `${hours} hours ${minutes} minutes`;
}

function calculateDurationBM(startTime, endTime) {
    // Parse the start and end times
    let [startHours, startMinutes] = startTime.split(':').map(Number);
    let [endHours, endMinutes] = endTime.split(':').map(Number);

    // Create date objects
    let startDate = new Date(0, 0, 0, startHours, startMinutes, 0);
    let endDate = new Date(0, 0, 0, endHours, endMinutes, 0);

    // Calculate the difference in milliseconds
    let diff = endDate - startDate;
    if (diff < 0) 
    {
        endDate = new Date(0, 0, 0, endHours+12, endMinutes, 0);
        diff = endDate - startDate;
    }

    // Convert the difference to hours and minutes
    let hours = Math.floor(diff / 1000 / 60 / 60);
    let minutes = Math.floor((diff / 1000 / 60) % 60);

    // Format the result as xx hours yy minutes
    if (minutes == 0)
        return `${hours} jam`;
    else
        if (hours == 0)
            return `${minutes} minit`;
        else
            return `${hours} jam ${minutes} minit`;
}

function convertTo12HourFormat(time) {
    // Split the input time into hours and minutes
    let [hours, minutes] = time.split(':');

    // Convert hours from string to number
    hours = parseInt(hours);

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Return formatted time
    return `${hours}:${minutes}`;
}

function todayDate()
{
    const today = new Date();
    
    // Extract the day, month, and year
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const year = today.getFullYear();
    
    // Format the date as DD/MM/YYYY
    const formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
}

function loadgooglescript()
{
    const fetchData = async (range) => {
        try {
            // Call the PHP backend to fetch data
            const response = await fetch(`getdata.php?range=${encodeURIComponent(range)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.values.map(row => ({
                form: row[0],
                date: row[1],
                timeStart: row[2],
                timeEnd: row[3],
                subject: row[4]
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    fetchData('A2:E').then(data => {
        // Sort data by form, date, timeStart, and timeEnd
        let xform, xdate, xts, xte;
        console.log('data1:', JSON.parse(JSON.stringify(data)));
        for (let i=0; i<data.length; i++) {
            if (data[i].subject) {
                if (data[i].form) xform = data[i].form; else data[i].form = xform;
                if (data[i].date) xdate = data[i].date; else data[i].date = xdate;
                if (data[i].timeStart) xts = data[i].timeStart; else data[i].timeStart = xts;
                if (data[i].timeEnd) xte = data[i].timeEnd; else data[i].timeEnd = xte;
            }
        }
        console.log('data2 :', JSON.parse(JSON.stringify(data)));
        data.sort((a, b) => {
            if (a.form !== b.form) return a.form.localeCompare(b.form);
            if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
            if (a.timeStart !== b.timeStart) return a.timeStart.localeCompare(b.timeStart);
            return a.timeEnd.localeCompare(b.timeEnd);
        });
        console.log('data3 :', JSON.parse(JSON.stringify(data)));
        const forms = [...new Set(data.map(item => item.form))];
        const formSelect = document.getElementById('form');
        forms.forEach(form => {
            const option = document.createElement('option');
            option.value = form;
            option.textContent = form;
            formSelect.appendChild(option);
        });
        
        window.updateDates = () => {
            const selectedForm = document.getElementById('form').value;
            const dates = [...new Set(data.filter(item => item.form == selectedForm).map(item => item.date))];
            const dateSelect = document.getElementById('date');
            dateSelect.innerHTML = '<option value="">Tarikh</option>';
            let tdate = "";
            dates.forEach(date => {
                const option = document.createElement('option');
                option.value = date;
                if (date == todayDate()) tdate = date;
                option.textContent = date;
                dateSelect.appendChild(option);
            });
            document.getElementById('timeStart').innerHTML = '<option value="">Masa Mula</option>';
            document.getElementById('timeEnd').innerHTML = '<option value="">Masa Akhir</option>';
            document.getElementById('subject').innerHTML = '<option value="">Subjek</option>';
            if (tdate != "") {
                dateSelect.value = tdate;
                updateTimes();
            }
        };

        window.updateTimes = () => {
            const selectedForm = document.getElementById('form').value;
            const selectedDate = document.getElementById('date').value;
            const times = data.filter(item => item.form == selectedForm && item.date == selectedDate);
            const timeStartSelect = document.getElementById('timeStart');
            const uniqueTimeStarts = [...new Set(times.map(item => item.timeStart))];
            timeStartSelect.innerHTML = '<option value="">Masa Mula</option>';
            uniqueTimeStarts.forEach(timeStart => {
                const option = document.createElement('option');
                option.value = timeStart;
                option.textContent = timeStart;
                timeStartSelect.appendChild(option);
            });
            document.getElementById('timeEnd').innerHTML = '<option value="">Masa Akhir</option>';
            document.getElementById('subject').innerHTML = '<option value="">Subjek</option>';
            if (uniqueTimeStarts.length == 1){
                timeStartSelect.value = timeStartSelect.options[1].value;
                updateEndTimes();
            }
        };

        window.updateEndTimes = () => {
            const selectedForm = document.getElementById('form').value;
            const selectedDate = document.getElementById('date').value;
            const selectedTimeStart = document.getElementById('timeStart').value;
            const endTimes = data.filter(item => item.form == selectedForm && item.date == selectedDate && item.timeStart == selectedTimeStart);
            const timeEndSelect = document.getElementById('timeEnd');
            const uniqueTimeEnds = [...new Set(endTimes.map(item => item.timeEnd))];
            timeEndSelect.innerHTML = '<option value="">Masa Akhir</option>';
            uniqueTimeEnds.forEach(timeEnd => {
                const option = document.createElement('option');
                option.value = timeEnd;
                option.textContent = timeEnd;
                timeEndSelect.appendChild(option);
            });
            document.getElementById('subject').innerHTML = '<option value="">Subjek</option>';
            if (uniqueTimeEnds.length == 1){
                timeEndSelect.value = timeEndSelect.options[1].value;
                updateSubjects();
            }
        };

        window.updateSubjects = () => {
            const selectedForm = document.getElementById('form').value;
            const selectedDate = document.getElementById('date').value;
            const selectedTimeStart = document.getElementById('timeStart').value;
            const selectedTimeEnd = document.getElementById('timeEnd').value;
            const subjects = data.filter(item => item.form == selectedForm && item.date == selectedDate && item.timeStart == selectedTimeStart && item.timeEnd == selectedTimeEnd);
            const subjectSelect = document.getElementById('subject');
            subjectSelect.innerHTML = '<option value="">Subjek</option>';
            subjects.forEach(subject => {
                if (subject.subject.includes("/"))
                {
                    const option = document.createElement('option');
                    option.value = subject.subject;
                    option.textContent = subject.subject;
                    subjectSelect.appendChild(option);
                }
                subject.subject.split("/").forEach(subj => {
                    const option = document.createElement('option');
                    option.value = subj;
                    option.textContent = subj;
                    subjectSelect.appendChild(option);
                });
            });
            if (subjectSelect.options.length == 2){
                subjectSelect.value = subjectSelect.options[1].value;
                showSubject();
            }
        };

        window.showSubject = () => {
            const selectedSubject = document.getElementById('subject').value;
            const selectedTimeStart = document.getElementById('timeStart').value;
            const selectedTimeEnd = document.getElementById('timeEnd').value;
            document.getElementById('subjek').value = selectedSubject;
            document.getElementById('masa').value = `${selectedTimeStart}-${selectedTimeEnd}`;
            const pattern = /Math|Phy|Che|Bio|Scien|English/i;
            if (pattern.test(selectedSubject))
                document.getElementById('tempoh').value = calculateDuration(selectedTimeStart,selectedTimeEnd);
            else
                document.getElementById('tempoh').value = calculateDurationBM(selectedTimeStart,selectedTimeEnd);
        };

        if (forms.length == 1){
            formSelect.value = formSelect.options[1].value;
            updateDates();
        }
    });
}

loadgooglescript();
