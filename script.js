import encode from './app/code128Encoder/encoder.mjs';


const barcodeInput = document.getElementById('barcodeInput');
const generateButton = document.getElementById('generate-button');
const clearButton = document.getElementById('clear-button');
const pasteButton = document.getElementById('paste-button');
const barcodeContainer = document.getElementById('barcode-container');

function generateBarcodes() {
    const inputText = barcodeInput.value;
    const filterPattern = document.getElementById('filterPattern').value;
    const barcodeTexts = inputText.split('\n').filter(text => {
        // split the filter pattern by "+"
        const patterns = filterPattern.trim().split('+');
        // check if the text matches any of the patterns
        return patterns.some(pattern => text.includes(pattern.trim())); 
      });
    barcodeContainer.innerHTML = ''; // Clear previous barcodes
 
    barcodeTexts.forEach(text => {
        const encodedText = encode(text.trim());
        console.log(encodedText);


        const barcodeDiv = document.createElement('div');
        barcodeDiv.classList.add('barcode');
        barcodeDiv.textContent = encodedText;
        barcodeContainer.appendChild(barcodeDiv);
    });
}


function clearBarcodes() {
    barcodeInput.value = '';
    barcodeContainer.innerHTML = '';
    console.log('Barcodes cleared.');
}

clearButton.addEventListener('click', clearBarcodes);
generateButton.addEventListener('click', generateBarcodes);
// paste button not working
// pasteButton.addEventListener('click', async () => {
//     try {
//         barcodeInput.focus();
//         const clipboardContents = await navigator.clipboard.readText();
//         barcodeInput.value = '';
//         barcodeInput.value += clipboardContents;
//         console.log('text', clipboardContents);
//     } catch (error) {    
//         console.error('failed to read clipboard');
//     }
// });