// ==UserScript==
// @name        Automate Maping
// @namespace   Maping Script
// @match       https://*google*/maps/*
// @grant       none
// @version     1.0
// @author      github.com/muliana-me
// @description 12/15/2023, 9:46:02 PM
// ==/UserScript==

(function() {
    for (let i = 0; i < 3; i++) {
        let textBox = document.createElement('input');
        textBox.type = 'text';
        textBox.style.position = 'fixed';
        textBox.style.top = `${20 + i * 30}px`;
        textBox.style.right = '20px';
        textBox.style.background = '#fff';

        let button = document.createElement('button');
        button.style.position = 'fixed';
        button.style.top = `${20 + i * 30}px`;
        button.style.right = '20px'
        button.style.background = '#fff';
        button.style.cursor = 'pointer';

        let icon = document.createElement('img');
        icon.src = '//www.gstatic.com/images/icons/material/system_gm/1x/content_copy_gm_grey_18dp.png';
        icon.alt = 'Copy';
        icon.style.height = '14px';

        document.body.appendChild(textBox);
        document.body.appendChild(button);
        button.appendChild(icon);

        if (i === 0) {
            textBox.classList.add('name'); button.classList.add('nameButton');
            button.addEventListener('click', copyToClipboard.bind(null, textBox));
        } else if (i === 1) {
            textBox.classList.add('address'); button.classList.add('addressButton');
            button.addEventListener('click', copyToClipboard.bind(null, textBox));
        } else if (i === 2) {
            textBox.classList.add('number'); button.classList.add('numberButton');
            button.addEventListener('click', copyToClipboard.bind(null, textBox));
        }
    }

    function copyToClipboard(textBox) { textBox.select(); document.execCommand('copy'); }

    function copyAddress(event) {
        const urlRegex = /^https:\/\/.*google.*\/maps\/.*/;
        const currentURL = window.location.href;

        if (urlRegex.test(currentURL) && event.key === '`') {
            clearTextBox();
            const addressElement = document.querySelector('h1.DUwDvf.lfPIob');
            if (addressElement) {
                const nameTextbox = document.querySelector('.name');
                const addressTextbox = document.querySelector('.address');
                const numberTextbox = document.querySelector('.number');

                if (nameTextbox) { nameTextbox.value = addressElement.textContent.trim().toLowerCase().replace(/\s+/g, '_'); }

                const addressText = document.querySelectorAll('.Io6YTe.fontBodyMedium.kR99db');
                const placeIconImg = document.querySelector('img[src="//www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png"]');
                if (addressTextbox && placeIconImg) { addressTextbox.value = addressText[0].textContent.trim(); }
                else { addressTextbox.value = ''; }

                const phoneIconImg = document.querySelector('img[src="//www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png"]');
                if (numberTextbox && placeIconImg && phoneIconImg) { numberTextbox.value = formatNumber(addressText[1].textContent.trim()); }
                else if (numberTextbox && !placeIconImg && phoneIconImg) { numberTextbox.value = formatNumber(addressText[0].textContent.trim()); }
                // numberTextbox.value = numberText.length.toString();
            }
        }
    }

    function clearTextBox() { document.querySelectorAll('input[type="text"]').forEach(textbox => { textbox.value = ''; }); }

    function formatNumber(number) {
        const trimmedNumber = number.replace(/-/g, '').replace(/^0+/, '');
        if (!/^\d+$/.test(trimmedNumber)) { return 'Invalid number'; }
        else { return '62' + trimmedNumber; }
    }

    document.addEventListener('keydown', copyAddress);
})();