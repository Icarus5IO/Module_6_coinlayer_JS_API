document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('price-analysis-form');
	const resultsContainer = document.getElementById('price-analysis-results');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const cryptocurrency = document.getElementById('cryptocurrency').value;
		const startDate = document.getElementById('start-date').value;
		const endDate = document.getElementById('end-date').value;
		const fiatCurrency = document.getElementById('fiat-currency').value;

		try {
			// Directly insert your API key here
			const apiKey = 'Api_key';

			const historicalData = await fetchHistoricalData(cryptocurrency, startDate, endDate, apiKey, fiatCurrency);
			displayPriceAnalysisResults(historicalData);
		} catch (error) {
			console.error('Error fetching historical data:', error);

			// Display specific error message to user
			let errorMessage = 'Error fetching historical data. Please try again later.';
			if (error.message === 'Network response was not ok') {
				errorMessage = 'Network error. Please check your internet connection.';
			}
			resultsContainer.innerHTML = `<p>${errorMessage}</p>`;
		}
	});

	async function fetchHistoricalData(cryptocurrency, startDate, Date, apiKey, fiatCurrency) {
		const baseUrl = 'http://api.coinlayer.com/api/';
		const url = `${baseUrl}${startDate}?access_key=${apiKey}&target=${fiatCurrency}&symbols=${cryptocurrency}`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	}

	function displayPriceAnalysisResults(historicalData) {
		const tableHeader = `
			<thead>
				<tr>
					<th>Date</th>
					<th>${historicalData.target}</th>
				</tr>
			</thead>
		`;

		let tableBody = '<tbody>';
		for (const date in historicalData.rates) {
			const rate = historicalData.rates[date];
			tableBody += `
				<tr>
					<td>${date}</td>
					<td>${rate}</td>
				</tr>
			`;
		}
		tableBody += '</tbody>';

		const table = `
			<table>
				${tableHeader}
				${tableBody}
			</table>
		`;

		resultsContainer.innerHTML = table;
	}
});