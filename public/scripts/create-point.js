
// Dados da Entidade

function populateStates() {
    const stateSelect = document.querySelector("select[name=state]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateStates();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    stateInput.value = event.target.options[event.target.selectedIndex].text;
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false;
        })
}

document.querySelector("select[name=state]").addEventListener("change", getCities);



// Ítens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems = [];
const collectedItems = document.querySelector("input[name=items]");

function handleSelectedItem(event) {
    //Adicionar ou remover class com JS
    const itemLi = event.target;
    itemLi.classList.toggle("selected");

    /* Editado: Outra forma de realizar a função
    // Adicionar ou remover itens selecionados dentro de vetor
    if(itemLi.classList.value === "selected"){
        selectedItems.push(itemLi.dataset.id);
    }
    else{
        selectedItems.splice(selectedItems.indexOf(itemLi.dataset.id), 1);
    }
    */

    const itemID = itemLi.dataset.id;

    //Verificar se existe items selecionados e Pegar items selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemID // isso será true ou false
        return itemFound;
    });

    //Se já esta selecionado
    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemID;
            return itemIsDifferent;
        })
        selectedItems = filteredItems;
    } else {
        //Se não estiver selecionado, adiciona na seleção
        selectedItems.push(itemID);
    }
    
    //Adicionar ao Input items selecionados
    collectedItems.value = selectedItems;
}

