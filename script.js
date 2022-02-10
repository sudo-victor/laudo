const cabecalhoElement = document.querySelector('#cabecalho');
const inputsHiddenElement = document.querySelector('.inputs-hidden');

function toggleInputsHidden(e) {
    if(Number(e.target.value) !== 0) {
        inputsHiddenElement.style.height = '0px';
    } else {
        inputsHiddenElement.style.height = 'auto';
    }
}

cabecalhoElement.addEventListener('change', toggleInputsHidden);
