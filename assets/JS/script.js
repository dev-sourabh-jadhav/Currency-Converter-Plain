$(document).ready(function () {
    const apiKey = '1b2a93048b58e0519566a53b'; // Replace with your actual API key
    const exchangeRateUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    const countryDataUrl = 'https://restcountries.com/v3.1/all';

    let currencyFlags = {}; // Store currency => flag mapping

    // Fetch country data first
    $.get(countryDataUrl, function (countries) {
        countries.forEach(country => {
            if (country.currencies) {
                $.each(country.currencies, function (code) {
                    if (!currencyFlags[code]) {
                        currencyFlags[code] = country.flags?.png || ''; // Store flag URL
                    }
                });
            }
        });

        // Fetch exchange rate data after country data is loaded
        $.get(exchangeRateUrl, function (data) {
            if (data.result === 'success') {
                let options = '<option value="" selected disabled>Select a Currency</option>';
                $.each(data.conversion_rates, function (code) {
                    let flag = currencyFlags[code] || ''; // Get flag if available
                    options += `<option value="${code}" data-flag="${flag}">${code}</option>`;
                });

                $('#fromCurrency, #toCurrency').html(options).select2({
                    templateResult: formatCurrency,
                    templateSelection: formatCurrency,
                    escapeMarkup: function (m) { return m; } // Allows rendering HTML inside Select2
                });
            } else {
                alert('Error fetching exchange rate data. Check API Key.');
            }
        });
    });

    // Function to format dropdown options with flags
    function formatCurrency(state) {
        if (!state.id) return state.text;
        let flagUrl = $(state.element).attr('data-flag');
        return flagUrl
            ? $(`<span> ${state.text}</span>`)
            : state.text;
    }

    // Currency conversion logic
    $('#currencyForm').on('submit', function (e) {
        e.preventDefault();
        let amount = parseFloat($('#amount').val());
        let fromCurrency = $('#fromCurrency').val();
        let toCurrency = $('#toCurrency').val();

        $.get(exchangeRateUrl, function (data) {
            if (data.result === 'success') {
                let fromRate = data.conversion_rates[fromCurrency];
                let toRate = data.conversion_rates[toCurrency];
                let convertedAmount = ((amount / fromRate) * toRate).toFixed(2);
                $('#result').html(`<p>${amount} ${fromCurrency} = <strong>${convertedAmount}</strong> ${toCurrency}</p>`);
            } else {
                $('#result').html('<p>Error converting currency.</p>');
            }
        });
    });
});
