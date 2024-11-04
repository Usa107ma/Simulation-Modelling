
let customerNumbers = [], interarrivalTimes = [], serviceTimes = [], queueWaitTimes = [], serviceStartTimes = [], serviceEndTimes = [], clockTimes = [];
let currentCustomer = 0, arrivalTime = 0.0, serviceEndTime = 0.0;

function simulateCustomer(currentCustomer, lambdaArrival, muService) {
    let interarrivalTime = currentCustomer === 1 ? 0.0 : exponential(lambdaArrival);
    arrivalTime += interarrivalTime;
    let serviceTime = exponential(muService);
    let serviceStartTime = Math.max(arrivalTime, serviceEndTime);
    let serviceEndTimeNew = serviceStartTime + serviceTime;
    let queueWaitTime = serviceStartTime - arrivalTime;
    let clockTime = arrivalTime;

    customerNumbers.push(currentCustomer);
    interarrivalTimes.push(interarrivalTime);
    serviceTimes.push(serviceTime);
    queueWaitTimes.push(queueWaitTime);
    serviceStartTimes.push(serviceStartTime);
    serviceEndTimes.push(serviceEndTimeNew);
    clockTimes.push(clockTime);
    serviceEndTime = serviceEndTimeNew;

    updateTable();
    updateAverages();
}

function exponential(rate) {
    return -Math.log(1.0 - Math.random()) / rate;
}

function nextCustomer() {
    let lambdaArrival = parseFloat(document.getElementById('arrivalRate').value);
    let muService = parseFloat(document.getElementById('serviceRate').value);
    let customers = parseInt(document.getElementById('customers').value);
    if (currentCustomer < customers) {
        currentCustomer++;
        simulateCustomer(currentCustomer, lambdaArrival, muService);
    }
}

function completeSimulation() {
    let customers = parseInt(document.getElementById('customers').value);
    while (currentCustomer < customers) {
        nextCustomer();
    }
}

function resetSimulation() {
    customerNumbers = []; interarrivalTimes = []; serviceTimes = []; queueWaitTimes = []; serviceStartTimes = []; serviceEndTimes = []; clockTimes = [];
    currentCustomer = 0; arrivalTime = 0.0; serviceEndTime = 0.0;
    document.getElementById('resultsBody').innerHTML = "";
    document.getElementById('averages').innerHTML = "";
}

function updateTable() {
    let tableBody = document.getElementById('resultsBody');
    let row = `<tr>
                <td>${currentCustomer}</td>
                <td>${interarrivalTimes[currentCustomer - 1].toFixed(4)}</td>
                <td>${clockTimes[currentCustomer - 1].toFixed(4)}</td>
                <td>${serviceTimes[currentCustomer - 1].toFixed(4)}</td>
                <td>${serviceStartTimes[currentCustomer - 1].toFixed(4)}</td>
                <td>${serviceEndTimes[currentCustomer - 1].toFixed(4)}</td>
                <td>${queueWaitTimes[currentCustomer - 1].toFixed(4)}</td>
               </tr>`;
    tableBody.innerHTML += row;
}

function updateAverages() {
    let meanInterarrivalTime = interarrivalTimes.reduce((a, b) => a + b, 0) / interarrivalTimes.length;
    let meanServiceTime = serviceTimes.reduce((a, b) => a + b, 0) / serviceTimes.length;
    let meanQueueWaitTime = queueWaitTimes.reduce((a, b) => a + b, 0) / queueWaitTimes.length;

    document.getElementById('averages').innerHTML = `
        <strong>Mean Interarrival Time:</strong> ${meanInterarrivalTime.toFixed(4)} <br>
        <strong>Mean Service Time:</strong> ${meanServiceTime.toFixed(4)} <br>
        <strong>Mean Queue Wait Time:</strong> ${meanQueueWaitTime.toFixed(4)}
    `;
}
