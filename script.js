const laudoFormElement = document.querySelector('#laudo-form');;
const cabecalhoElement = document.querySelector('#cabecalho');
const inputsHiddenElement = document.querySelector('.inputs-hidden');
const configPlusElement = document.querySelector('.config-adicionais');
const equipmentsElement = document.querySelector('#equipments');

let configOpenned = false;
const selectClassWithSearch = ['solicitanteSelect', 'selectpicker']; // Nome de todas as classes CSS que deseja utilizar o select com pesquisa

function loadSelectWithSearch() {
    selectClassWithSearch.forEach((className) => {
        $(() => {
            $(`.${className}`).selectpicker();
        });
    });    
}

function toggleInputsHidden(e) {
    if(Number(e.target.value) !== 0) {
        inputsHiddenElement.style.display = 'none';
    } else {
        inputsHiddenElement.style.display = 'block';
    }
}

function toggleConfigPlus() {
    if(configOpenned) {
        configPlusElement.style.display = 'none';
        configOpenned = false;
    } else {
        configPlusElement.style.display = 'block';
        configOpenned = true;
    }
}

function generateEquipmentTemplate(idx) {
    return `
        <div class="form-group col">
        <label for="equipamento_${idx}">Nome do Equipamento:</label>
        <select class="form-control form-control equipamento equipamento_${idx}" id="equipamento_${idx}"  data-live-search="true" required>
            <option data-tokes="">Selecione um equipamento</option>
            <option data-tokes="equipamento_234">equipamento 1</option>
            <option data-tokes="equipamento_2342">equipamento 2</option>
            <option data-tokes="equipamento_3876">equipamento 3</option>
            <option data-tokes="equipamento_4567">equipamento 4</option>
            <option data-tokes="equipamento_5646">equipamento 5</option>
            <option data-tokes="equipamento_6567">equipamento 6</option>
            <option data-tokes="equipamento_7765">equipamento 7</option>
        </select>
        </div>

        <div class="form-group col">
            <label for="numero_rastreio_${idx}">N° de Rastreio:</label>
            <input class="form-control form-control-sm numero_rastreio_${idx}" id="numero_rastreio_${idx}" aria-describedby="numeroRastreioField">
        </div>

        <div class="form-group col">
            <label for="numero_serie_ca_${idx}">N° de Séria/CA:</label>
            <input class="form-control form-control-sm numero_serie_ca_${idx}" id="numero_serie_ca_${idx}" aria-describedby="numeroSerieCAField">
        </div>

        <div class="form-group col">
            <label for="resultado_${idx}">Resultado:</label>
            <input class="form-control form-control-sm resultado_${idx}" id="resultado_${idx}" aria-describedby="resultadoField">
        </div>

    `
}

function addEquipmentGroup() {
    const newElement = document.createElement('div');
    const idx = document.querySelectorAll('.grupo-equipamentos').length + 1;

    newElement.classList.add('row'); 
    newElement.classList.add('grupo-equipamentos');
    newElement.innerHTML = generateEquipmentTemplate(idx);

    equipmentsElement.appendChild(newElement);
    $(function() {
        $(`.equipamento_${idx}`).selectpicker();
    });
}

function removeEquipmentGroup() {
    const equipmentGroupList = document.querySelectorAll('.grupo-equipamentos');
    const equipmentGroupElement = equipmentGroupList[equipmentGroupList.length - 1];

    if(equipmentGroupList.length <= 1) return;

    equipmentsElement.removeChild(equipmentGroupElement);
}

function getDataFormatted() {
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
    const equipamentoArrayGroup = document.querySelectorAll('select.equipamento');
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

    // Adiciona as configurações adicionais no objeto data se estiver ativado
    if(configOpenned) {
        data['validade_teste'] = document.querySelector('#validade_teste').value;
        data['cidade'] = document.querySelector('#cidade').value;
        data['temperatura_ambiente'] = document.querySelector('#temperatura_ambiente').value;
        data['umidade_relativa'] = document.querySelector('#umidade_relativa').value;
        data['ensaio_visual'] = document.querySelector('#ensaio_visual').value;
        data['ensaio_dimensional'] = document.querySelector('#ensaio_dimensional').value;
        data['ensaio_realizado'] = document.querySelector('#ensaio_realizado').value;
        data['resultado_ensaio'] = document.querySelector('#resultado_ensaio').value;
        data['isencao_responsabilidade'] = document.querySelector('#isencao_responsabilidade').value;
        data['recomendacao'] = document.querySelector('#recomendacao').value;
    }

    data['equipamentos'] = [...equipments];

    return data;
}

function handleSubmit(e) {
    e.preventDefault();

    const data = getDataFormatted();

    var fetchConfig = { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:3000/laudo', fetchConfig)
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        console.log(responseJson)
    })
    .catch(function(err) {
        console.log(err)
    });


    console.log(data);
    
}

laudoFormElement.addEventListener('submit', handleSubmit)
cabecalhoElement.addEventListener('change', toggleInputsHidden);
window.addEventListener('load', loadSelectWithSearch);
