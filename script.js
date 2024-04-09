document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function () {
        const cryptoInput = document.getElementById('crypto-input').value.toUpperCase();
        const dateInput = document.getElementById('date-input').value;
        fetchData(cryptoInput, dateInput);
    });
});

async function fetchData(crypto, date) {
    const accessKey = '3f79b8eee22d33dfc9e764108cb0312d'; // Replace with your actual access key
    const url = `https://api.coinlayer.com/${date}?access_key=${accessKey}&symbols=${crypto}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
            displayData(data, crypto, date);
            hideNotification();
        } else {
            showNotification();
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('hidden');
}


function displayData(data, crypto, date) {
    const cryptoCards = document.getElementById('crypto-cards');
    const cryptoInfo = data.rates;

    const card = document.createElement('div');
    card.classList.add('crypto-card');
    card.innerHTML = `
        <h3>${crypto}</h3>
        <p>Date: ${date}</p>
        <p>Rate: ${cryptoInfo[crypto]}</p>
    `;
    cryptoCards.insertBefore(card, cryptoCards.firstChild);
}
