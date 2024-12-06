// ==UserScript==
// @name         Add WSP in APDM
// @namespace    http://tampermonkey.net/
// @version      2024-06-25
// @description  Add WSP in Laporan Kehadiran Bulanan APDM
// @author       You
// @match        https://apdm.moe.gov.my/index.php?o=*&kelas=*&tahun=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.my
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    // Find the <input> element with the specified onclick attribute
    const inputElement = document.querySelector('input[type="button"][value="Papar"][onclick="Dapatkanurl();"]');
    if (inputElement) {
        // Create a new <button> element
        const newButton = document.createElement('button');
        newButton.textContent = 'AddWSP';
        newButton.onclick = AddWSP;

        // Insert the new button after the found <input> element
        inputElement.parentNode.insertBefore(newButton, inputElement.nextSibling);
    }

    // Define the AddWS function for demonstration purposes
    function AddWSP() {
        // Select all <div> elements with the specified tooltip attribute
        document.querySelectorAll('div[tooltip="Sebab Tidak Hadir : AKTIVITI SEKOLAH"]').forEach(div => {
            // Find the <a> element within each <div>
            const aElement = div.querySelector('a[href="#"]');

            // If the <a> element exists, replace it with the new <span> element
            if (aElement) {
                const spanElement = document.createElement('span');
                spanElement.style.display = 'inline-flex';
                spanElement.style.alignItems = 'center';
                spanElement.style.justifyContent = 'center';
                spanElement.style.width = '12px';
                spanElement.style.height = '12px';
                spanElement.style.border = '1px solid #000';
                spanElement.style.borderRadius = '50%';
                spanElement.style.fontSize = '9px';
                spanElement.style.fontWeight = 'bold';
                spanElement.style.textAlign = 'center';
                spanElement.textContent = 'W';

                // Replace the <a> element with the <span> element
                aElement.replaceWith(spanElement);
            }
        });

        // Select all <div> elements with the specified tooltip attribute
        document.querySelectorAll('div[tooltip="Sebab Tidak Hadir : CUTI SAKIT"]').forEach(div => {
            // Find the <a> element within each <div>
            const aElement = div.querySelector('a[href="#"]');

            // If the <a> element exists, replace it with the new <span> element
            if (aElement) {
                const spanElement = document.createElement('span');
                spanElement.style.display = 'inline-flex';
                spanElement.style.alignItems = 'center';
                spanElement.style.justifyContent = 'center';
                spanElement.style.width = '12px';
                spanElement.style.height = '12px';
                spanElement.style.border = '1px solid #000';
                spanElement.style.borderRadius = '50%';
                spanElement.style.fontSize = '10px';
                spanElement.style.fontWeight = 'bold';
                spanElement.style.textAlign = 'center';
                spanElement.textContent = 'S';

                // Replace the <a> element with the <span> element
                aElement.replaceWith(spanElement);
            }
        });
        
        // Select all <div> elements with the specified tooltip attribute
        document.querySelectorAll('div[tooltip="Sebab Tidak Hadir : PONTENG"]').forEach(div => {
            // Find the <a> element within each <div>
            const aElement = div.querySelector('a[href="#"]');

            // If the <a> element exists, replace it with the new <span> element
            if (aElement) {
                const spanElement = document.createElement('span');
                spanElement.style.display = 'inline-flex';
                spanElement.style.alignItems = 'center';
                spanElement.style.justifyContent = 'center';
                spanElement.style.width = '12px';
                spanElement.style.height = '12px';
                spanElement.style.border = '1px solid #000';
                spanElement.style.borderRadius = '50%';
                spanElement.style.fontSize = '9px';
                spanElement.style.fontWeight = 'bold';
                spanElement.style.textAlign = 'center';
                spanElement.textContent = 'P';

                // Replace the <a> element with the <span> element
                aElement.replaceWith(spanElement);
            }
        });

    }
})();
