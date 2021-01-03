// from data.js
var tableData = data;

// YOUR CODE HERE!
function displayData(data){ 
    const tbody = d3.select("tbody");
    tbody.text("");

    data.forEach(function(row) {
        let tr = tbody.append("tr");
        Object.entries(row).forEach(function([key, value]) {
            tr.append("td").text(value);	
        })
    })
}

function filteringOption() {
    d3.event.preventDefault();
    let table = JSON.parse(JSON.stringify(tableData));

    const dateInputText = d3.select("#datetime");
    const citySelect = d3.select("#city");
    const stateSelect = d3.select("#state");
    const countrySelect = d3.select("#country");
    const shapeSelect = d3.select("#shape");

    if(dateInputText.property("value").length > 0) {
        table = table.filter(row => row.datetime === dateInputText.property("value"));
    }

    if(citySelect.property("value").length > 0) {
        table = table.filter(row => row.city === citySelect.property("value"));
    }

    if(stateSelect.property("value").length > 0) {
        table = table.filter(row => row.state === stateSelect.property("value"));
    }

    if(countrySelect.property("value").length > 0) {
        table = table.filter(row => row.country === countrySelect.property("value"));
    }

    if(shapeSelect.property("value").length > 0) {
        table = table.filter(row => row.shape === shapeSelect.property("value"));
    }

    displayData(table);
}

function clearData() {
    d3.event.preventDefault();

    const dateInputText = d3.select("#datetime");
    const citySelect = d3.select("#city");
    const stateSelect = d3.select("#state");
    const countrySelect = d3.select("#country");
    const shapeSelect = d3.select("#shape");

    dateInputText.property("value", "");
    citySelect.property("value", "");
    stateSelect.property("value", "");
    countrySelect.property("value", "");
    shapeSelect.property("value", "");

    displayData(tableData);
}

function setupValues() {
    let cityData = [""];
    let stateData = [""];
    let countryData = [""];
    let shapeData = [""];

    tableData.forEach(function(row) {
        Object.entries(row).forEach(function([key, value]) {
            if(key === 'city') {
                if (cityData.indexOf(value) === -1 ) {
                    cityData.push(value)
                }
            }
            else if(key === 'state') {
                if (stateData.indexOf(value) === -1 ) {
                    stateData.push(value)
                }
            }
            else if(key === 'country') {
                if (countryData.indexOf(value) === -1 ) {
                    countryData.push(value)
                }
            }
            else if(key === 'shape') {
                if (shapeData.indexOf(value) === -1 ) {
                    shapeData.push(value)
                }
            }	
        })
    })

    cityData.sort();
    stateData.sort();
    countryData.sort();
    shapeData.sort();

    const dateInputText = d3.select("#datetime");
    const citySelect = d3.select("#city");
    const stateSelect = d3.select("#state");
    const countrySelect = d3.select("#country");
    const shapeSelect = d3.select("#shape");

    citySelect.selectAll('option').data(cityData).enter().append('option').text(function (d) { return d.length === 0 ? "Please select an option": d }).attr("value", function(d) { return d.length === 0 ? "": d });
    stateSelect.selectAll('option').data(stateData).enter().append('option').text(function (d) { return d.length === 0 ? "Please select an option": d }).attr("value", function(d) { return d.length === 0 ? "": d });
    countrySelect.selectAll('option').data(countryData).enter().append('option').text(function (d) { return d.length === 0 ? "Please select an option": d }).attr("value", function(d) { return d.length === 0 ? "": d });
    shapeSelect.selectAll('option').data(shapeData).enter().append('option').text(function (d) { return d.length === 0 ? "Please select an option": d }).attr("value", function(d) { return d.length === 0 ? "": d });

    dateInputText.property("value", "");
    citySelect.property("value", "");
    stateSelect.property("value", "");
    countrySelect.property("value", "");
    shapeSelect.property("value", "");

    displayData(tableData);
}

function main() {
    setupValues();

    const filterButton = d3.select("#filter-btn");
    const clearButton = d3.select("#clear-btn");
    
    filterButton.on("click", filteringOption);
    clearButton.on("click", clearData);
}

main();