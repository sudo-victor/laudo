const laudoFormElement = document.querySelector('#laudo-form');;
const cabecalhoElement = document.querySelector('#cabecalho');
const inputsHiddenElement = document.querySelector('.inputs-hidden');
const configPlusElement = document.querySelector('.config-adicionais');
const equipmentsElement = document.querySelector('#equipments');

let configOpenned = false;

function toggleInputsHidden(e) {
    if(Number(e.target.value) !== 0) {
        inputsHiddenElement.style.display = 'none';
    } else {
        inputsHiddenElement.style.display = 'block';
    }
}

function toggleConfigPlus(e) {
    if(configOpenned) {
        configPlusElement.style.display = 'none';
        configOpenned = false;
        e.innerHTML = "Mais Configurações";
    } else {
        configPlusElement.style.display = 'block';
        configOpenned = true;
        e.innerHTML = "Menos Configurações";
    }
}

// Inicio Select

function toggleSelectDropdown(e) {
    const dropdown = e.nextSibling.nextSibling;
    const input = dropdown.childNodes[1];

    dropdown.classList.toggle('open-drop');
    input.focus();
}

function handleChooseSelectItem(e) {
    const newText = e.innerText;
    const equipmentBox = e.parentElement.parentElement.parentElement.childNodes[3];
    equipmentBox.innerText = newText;
    e.parentElement.parentElement.classList.remove('open-drop')
}

function handleSearchItems(e, endpoint) {
    const listEl = e.parentElement.childNodes[3]
    fetch(endpoint + '?' + new URLSearchParams({
        q: e.value,
    }))
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        const options = responseJson.map(op => {
            return `<a class="dropdown-item" onclick="handleChooseSelectItem(this)">${op}</a>`
        })

        listEl.innerHTML = options.join(' ')
    })
    .catch(function(err) {
        console.log(err)
    });
}

// Fim Select

function generateEquipmentTemplate(idx) {

    return `
        <div class="form-group col">
        <label for="equipamento_${idx}">Nome do Equipamento:</label>
        <button onclick="toggleSelectDropdown(this)" type="button" name="equipamento" class="form-control equipamento dropdown-toggle d-flex align-items-center justify-content-between"  id="equipment__${idx}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Selecione um equipamento</button>
        <div class="dropdown-menu" aria-labelledby="elemento" id="dropdown_elemento_${idx}">
            <input class="form-control input_autocomplete my-2" id="input_autocomplete" name="input_autocomplete"  onkeypress="handleSearchItems(this, 'http://localhost:3000/laudo?')">   
            <div class="w-100"></div>
        </div>
        </div>

        <div class="form-group col">
            <label for="numero_rastreio_${idx}">N° de Rastreio:</label>
            <input class="form-control form-control-sm numero_rastreio" id="numero_rastreio_${idx}" aria-describedby="numeroRastreioField">
        </div>

        <div class="form-group col">
            <label for="numero_serie_ca_${idx}">N° de Séria/CA:</label>
            <input class="form-control form-control-sm numero_serie_ca" id="numero_serie_ca_${idx}" aria-describedby="numeroSerieCAField">
        </div>
         
        <div class="form-group col">
        <label for="resultado_${idx}">Resultado:</label>
        <select class="form-control form-control resultado" id="resultado_${idx}" name="resultado_${idx}" aria-describedby="resultadoField">
            <option value="">Selecione</option>
            <option value="1">Aprovado</option>
            <option value="2">Reprovado</option>
        </select>
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
}

function removeEquipmentGroup() {
    const equipmentGroupList = document.querySelectorAll('.grupo-equipamentos');
    const equipmentGroupElement = equipmentGroupList[equipmentGroupList.length - 1];

    if(equipmentGroupList.length <= 1) return;

    equipmentsElement.removeChild(equipmentGroupElement);
}

function getDataFormatted() {
    let data = {}
    let assinaturas = [ document.querySelector('#assinatura_1').value, document.querySelector('#assinatura_2').value ].filter(e => e)
    assinaturas = assinaturas.map((a) => {
        if(a) {
            return { id: a }
        }
    })

    data['numero_laudo'] = document.querySelector('#laudo_id').value;
    data['data_ensaio'] = document.querySelector('#data_ensaio').value;
    data['testador'] = Number(document.querySelector('#testador').value);
    data['placa_matricula'] = document.querySelector('#placa_matricula').value;
    data['cabecalho'] = { id: document.querySelector('#cabecalho').value };
    data['assinaturas'] = assinaturas;
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
    
    data['nome_cliente'] = {
        id: document.querySelector('button.nome_cliente').innerHTML === 'Selecione um equipamento' ? '' : document.querySelector('button.nome_cliente').innerHTML
    };

    let equipments = []

    // Form Array
    const equipamentoArrayGroup = document.querySelectorAll('button.equipamento');
    const numeroRastreioArrayGroup = document.querySelectorAll('.numero_rastreio');
    const numeroSerieArrayGroup = document.querySelectorAll('.numero_serie_ca');
    const resultadoArrayGroup = document.querySelectorAll('.resultado');

    equipamentoArrayGroup.forEach((_, idx) => {
        const equipmentData = {
            equipamento: { id: equipamentoArrayGroup[idx].innerHTML },
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

    data['items'] = [...equipments];

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
