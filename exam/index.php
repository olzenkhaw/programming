<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EXAMINATION</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="settings">
    <center>
        <select id="form" onchange="updateDates()">
            <option value="">Tingkatan</option>
        </select>
        <select id="date" onchange="updateTimes()">
            <option value="">Tarikh</option>
        </select>
        <select id="timeStart" onchange="updateEndTimes()">
            <option value="">Masa Mula</option>
        </select>
        <select id="timeEnd" onchange="updateSubjects()">
            <option value="">Masa Akhir</option>
        </select>
        <select id="subject" onchange="showSubject()">
            <option value="">Subjek</option>
        </select>
        <button type="button" class="button" onclick="openFullscreen()">FULL SCREEN</button>
    </center>
    </div>
    <div id="mtime" class="time-container">
        <input type="text" id="subjek" class="color1" value=""><br>
        <input type="text" id="masa" class="color2" value=""><br>
        <input type="text" id="tempoh" class="color1" value="">
        <h1 id="malaysia-time" style="color:yellow;" onclick="openFullscreen()"></h1>
    </div>
    <script src="script.js"></script>
</div>
</body>
</html>
