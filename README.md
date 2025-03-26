# Currency Converter

A simple currency converter built using **HTML, Bootstrap, and JavaScript**. This application allows users to convert currencies using real-time exchange rates fetched from an API.

## Features
- Convert currencies using **real-time exchange rates**.
- Select currencies from a dropdown with **country flags**.
- Uses **Bootstrap** for a clean and responsive design.
- Implements **Select2** for enhanced dropdown functionality.

## Technologies Used
- **HTML, CSS, Bootstrap** for UI design
- **JavaScript & jQuery** for logic
- **ExchangeRate API** for currency conversion rates
- **REST Countries API** for country flag integration

## Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/Currency-Converter-Plain.git
   ```
2. Open the `index.html` file in a browser.

## How to Use
1. Enter the amount you want to convert.
2. Select the **From Currency**.
3. Select the **To Currency**.
4. Click on the **Convert** button.
5. The converted amount will be displayed below.

## API Requirements
This project uses the **ExchangeRate API** and **REST Countries API**.
- **ExchangeRate API**: Requires an API key. Replace `apiKey` in `script.js` with your key.
- **REST Countries API**: Provides country flags.