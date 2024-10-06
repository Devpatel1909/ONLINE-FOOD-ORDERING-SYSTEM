let selectedOptions = [];

function toggleSelection(element, option) {
    // Toggle the selected state
    if (selectedOptions.includes(option)) {
        selectedOptions = selectedOptions.filter(item => item !== option);
        element.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
        element.style.color = "black";
    } else {
        selectedOptions.push(option);
        element.style.backgroundColor = "#ff6347";
        element.style.color = "white";
    }
}

function search() {
    const resultsDiv = document.getElementById("results");

    if (selectedOptions.length === 0) {
        resultsDiv.innerHTML = "Please select at least one filter option!";
        return;
    }

    let resultText = `You selected: ${selectedOptions.join(', ')}`;
    resultsDiv.innerHTML = resultText;
}