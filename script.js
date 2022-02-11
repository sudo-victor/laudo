const laudoFormElement = document.querySelector('#laudo-form');;
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
    const newElement = document.createElement('div');
    newElement.classList.add('row'); 
    newElement.classList.add('grupo-equipamentos');
    
    const newEquipment = `
        <div class="form-group col">
            <label for="equipamento">Nome do Equipamento:</label>
            <select class="form-control form-control-sm equipamento" id="equipamento">
                <option value="1">Selecione um equipamento</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="1">5</option>
            </select>
        </div>

        <div class="form-group col">
            <label for="numero_rastreio">N° de Rastreio:</label>
            <input class="form-control form-control-sm numero_rastreio" id="numero_rastreio" aria-describedby="numeroRastreioField">
        </div>

        <div class="form-group col">
            <label for="numero_serie_ca">N° de Séria/CA:</label>
            <input class="form-control form-control-sm numero_serie_ca" id="numero_serie_ca" aria-describedby="numeroSerieCAField">
        </div>

        <div class="form-group col">
            <label for="resultado">Resultado:</label>
            <input class="form-control form-control-sm resultado" id="resultado" aria-describedby="resultadoField">
        </div>

    `

    newElement.innerHTML = newEquipment;

    equipmentsElement.appendChild(newElement);
}

function removeEquipmentGroup() {
    const equipmentGroupList = document.querySelectorAll('.grupo-equipamentos');
    const equipmentGroupElement = equipmentGroupList[equipmentGroupList.length - 1];

    if(equipmentGroupList.length <= 1) return;

    equipmentsElement.removeChild(equipmentGroupElement);
}

function handleSubmit(e) {
    e.preventDefault();

    let data = {}

    data['laudo'] = document.querySelector('#laudo_id').value;
    data['data_ensaio'] = document.querySelector('#data_ensaio').value;
    data['testador'] = document.querySelector('#testador').value;
    data['placa_matricula'] = document.querySelector('#placa_matricula').value;
    data['cabecalho'] = document.querySelector('#cabecalho').value;
    data['assinatura_1'] = document.querySelector('#assinatura_1').value;
    data['assinatura_2'] = document.querySelector('#assinatura_2').value;
    data['ensaios_realizados'] = document.querySelector('#ensaios_realizados').value;

    if(Number(data.cabecalho) === 0) {
        data['categoria'] = document.querySelector('#categoria').value;
        data['estado'] = document.querySelector('#estado').value;
        data['numero_serie'] = document.querySelector('#numero_serie').value;
        data['modelo'] = document.querySelector('#modelo').value;
        data['chassi'] = document.querySelector('#chassi').value;
        data['cesto'] = document.querySelector('#cesto').value;
        data['estabilizador'] = document.querySelector('#estabilizador').value;
    }
    
    data['nome_cliente'] = document.querySelector('#nome_cliente').value;

    let equipments = []

    // Form Array
    const equipamentoArrayGroup = document.querySelectorAll('.equipamento');
    const numeroRastreioArrayGroup = document.querySelectorAll('.numero_rastreio');
    const numeroSerieArrayGroup = document.querySelectorAll('.numero_serie_ca');
    const resultadoArrayGroup = document.querySelectorAll('.resultado');

    equipamentoArrayGroup.forEach((_, idx) => {
        const equipmentData = {
            equipamento: equipamentoArrayGroup[idx].value,
            numero_rastreio: numeroRastreioArrayGroup[idx].value,
            numero_serie: numeroSerieArrayGroup[idx].value,
            resultado: resultadoArrayGroup[idx].value
        }

        equipments.push(equipmentData);
    })

    data['equipamentos'] = [...equipments];

    console.log(data);
    
}

laudoFormElement.addEventListener('submit', handleSubmit)
cabecalhoElement.addEventListener('change', toggleInputsHidden);
