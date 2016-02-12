chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    getData();
    sendResponse();
  }
);

function getData() {
  var date, description, amount, charges_array, charges, csvContent, link, encodedUri;
  charges_array = [["date", "description", "amount"]];
  current_charges = document.querySelector(".md-tab-content:not(.ng-hide)");
  charges = current_charges.querySelectorAll(".charge");

  for (var i = 0; i < charges.length; i++) {
    date = dateFormat(charges[i].querySelector(".date").textContent);
    description = charges[i].querySelector(".description").textContent;
    amount = amountFormat(charges[i].querySelector(".amount").textContent);
    charges_array.push([date, description, amount]);
  }

  csvContent = "data:text/csv;charset=utf-8,";
  charges_array.forEach(function(current, index){
    csvContent += current.join(",");
    if(index !== charges_array.length - 1){
      csvContent += "\n";
    }
  });
  encodedUri = encodeURI(csvContent);

  link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "fatura.csv");
  link.click();
}

function amountFormat(amount) {
  var value = amount.replace(/[^0-9-,]/g, '').replace(",",".");
  return value * -1;
}

function dateFormat(date) {
  var months = { "Jan": "January", "Fev": "February", "mar": "March", "Abr": "April",
    "Mai": "May", "Jun": "June", "Jul": "July", "Ago": "August",
    "Set": "September", "Out": "October", "Nov": "November", "Dez": "December"};

  return date.replace(/Jan|Fev|Mar|Abr|Mai|Jun|Jul|Ago|Set|Out|Nov|Dez/, function(match){
    return months[match];
  });
}
