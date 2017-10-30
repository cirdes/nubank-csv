chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (~tab.url.indexOf('https://app.nubank.com.br/#/bills')) {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "export");
  });
});
