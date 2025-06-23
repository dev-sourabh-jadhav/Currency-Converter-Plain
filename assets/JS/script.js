$(document).ready(function () {
    const apiKey = '1b2a93048b58e0519566a53b';
    const exchangeRateUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    // Fetch exchange rate data using $.ajax
    $.ajax({
        url: exchangeRateUrl,
        method: 'GET',
        success: function (data) {
            if (data.result === 'success') {
                let options = '<option value="" selected disabled>Select a Currency</option>';
                $.each(data.conversion_rates, function (code) {
                    options += `<option value="${code}">${code}</option>`;
                });

                $('#fromCurrency, #toCurrency').html(options).select2();
            } else {
                alert('Error fetching exchange rate data. Check API Key.');
            }
        },
        error: function () {
            alert('Failed to fetch exchange rate data. Please check your internet connection or API status.');
        }
    });

    // Currency conversion logic using $.ajax
    $('#currencyForm').on('submit', function (e) {
        e.preventDefault();
        let amount = parseFloat($('#amount').val());
        let fromCurrency = $('#fromCurrency').val();
        let toCurrency = $('#toCurrency').val();

        $.ajax({
            url: exchangeRateUrl,
            method: 'GET',
            success: function (data) {
                if (data.result === 'success') {
                    let fromRate = data.conversion_rates[fromCurrency];
                    let toRate = data.conversion_rates[toCurrency];
                    let convertedAmount = ((amount / fromRate) * toRate).toFixed(2);
                    $('#result').html(`<p>${amount} ${fromCurrency} = <strong>${convertedAmount}</strong> ${toCurrency}</p>`);
                } else {
                    $('#result').html('<p>Error converting currency.</p>');
                }
            },
            error: function () {
                $('#result').html('<p>Failed to fetch conversion rates. Try again later.</p>');
            }
        });
    });
});
