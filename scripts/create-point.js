
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

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
            citySelect.disabled = false;
        })
}


document
    .querySelector("select[name=state]")
    .addEventListener("change", getCities);

//https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios

