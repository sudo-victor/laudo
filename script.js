const cabecalhoElement = document.querySelector('#cabecalho');
const inputsHiddenElement = document.querySelector('.inputs-hidden');
const equipmentsElement = document.querySelector('#equipments');

function toggleInputsHidden(e) {
    if(Number(e.target.value) !== 0) {
        inputsHiddenElement.style.height = '0px';
    } else {
        inputsHiddenElement.style.height = 'auto';
    }
}

function addEquipmentGroup() {
    const newEquipment = `
    <div class="row grupo-equipamentos">
        <div class="form-group col">
            <label for="equipamento">Nome do Equipamento:</label>
            <select class="form-control form-control-sm" id="equipamento[]">
                <option value="1">Selecione um equipamento</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="1">5</option>
            </select>
        </div>

        <div class="form-group col">
            <label for="numero_rastreio">N° de Rastreio:</label>
            <input class="form-control form-control-sm" id="numero_rastreio[]" aria-describedby="numeroRastreioField">
        </div>

        <div class="form-group col">
            <label for="numero_serie_ca">N° de Séria/CA:</label>
            <input class="form-control form-control-sm" id="numero_serie_ca[]" aria-describedby="numeroSerieCAField">
        </div>

        <div class="form-group col">
            <label for="resultado">Resultado:</label>
            <input class="form-control form-control-sm" id="resultado[]" aria-describedby="resultadoField">
        </div>
    </div>

    `

    equipmentsElement.innerHTML += newEquipment;
}

function removeEquipmentGroup() {
    const equipmentGroupList = document.querySelectorAll('.grupo-equipamentos');
    const equipmentGroupElement = equipmentGroupList[equipmentGroupList.length - 1];

    if(equipmentGroupList.length <= 1) return;

    equipmentsElement.removeChild(equipmentGroupElement);
}

cabecalhoElement.addEventListener('change', toggleInputsHidden);
