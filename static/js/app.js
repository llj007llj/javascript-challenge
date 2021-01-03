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
    
    const dateInputText = d3.select("#datetime");
    const table = tableData.filter(row => row.datetime === dateInputText.property("value"))
    displayData(table);
}

function clearData() {
    d3.event.preventDefault();
    displayData(tableData);
}

function main() {
    const filterButton = d3.select("#filter-btn");
    const clearButton = d3.select("#clear-btn");
    
    filterButton.on("click", filteringOption);
    clearButton.on("click", clearData);

    displayData(tableData);
}

main();