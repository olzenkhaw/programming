chrome.runtime.onInstalled.addListener(() => {
  console.log('Tab Mover Extension Installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "moveTabs") {
    moveTabs(request.tabs, request.targetWindowId);
  }
});

function moveTabs(tabs, targetWindowId) {
  chrome.tabs.move(tabs, { windowId: targetWindowId, index: -1 }, (movedTabs) => {
    console.log(`Moved ${movedTabs.length} tabs to window ${targetWindowId}`);
  });
}
