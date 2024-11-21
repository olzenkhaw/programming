document.addEventListener('DOMContentLoaded', async () => {
  const getcurrentwindow = () => {
    return new Promise(resolve =>{
      chrome.windows.getCurrent(resolve);
    });
  };
  
  const getdisplayinfo = () => {
    return new Promise(resolve => {
      chrome.system.display.getInfo((info) => {resolve(info)});
    });
  };
  
  const getTabs = () => {
    return new Promise(resolve => {
      chrome.tabs.query({ currentWindow: true }, tabs => {
        resolve(tabs);
      });
    });
  };

  const createWindow = (options) => {
    return new Promise(resolve => {
      chrome.windows.create(options, newWindow => {
        resolve(newWindow);
      });
    });
  };

  const moveTab = (tabId, windowId) => {
    return new Promise(resolve => {
      chrome.tabs.move(tabId, { windowId, index: -1 }, () => {
        resolve();
      });
    });
  };

  const removeTab = (tabId) => {
    return new Promise(resolve => {
      chrome.tabs.remove(tabId, () => {
        resolve();
      });
    });
  };

  const updateWindow = (windowId, options) => {
    return new Promise(resolve => {
      chrome.windows.update(windowId, options, () => {
        resolve();
      });
    });
  };

  // Fetch the total number of tabs in the current window when the popup is opened
  const tabs = await getTabs();
  const totalTabsInWindow = tabs.length;

  // Update the popup content with the total number of tabs
  document.getElementById('totalTabs').textContent = totalTabsInWindow;
  const displayinfo = await getdisplayinfo();
  const currentwindow = await getcurrentwindow();
   
  document.getElementById('moveTabsButton').addEventListener('click', async () => {
    const tabsToMoveInput = document.getElementById('tabsToMove');
    let numberOfTabsToMove = parseInt(tabsToMoveInput.value, 10);
    const tablocationInput = document.getElementById('tablocation');
    const tablocation = parseInt(tablocationInput.value, 10);

    if (isNaN(numberOfTabsToMove) || numberOfTabsToMove <= 0) {
      console.error('Invalid input. Please enter a valid number of tabs to move.');
      return;
    }

    const tabs = await getTabs();
    const totalTabs = tabs.length;

    if (totalTabs < numberOfTabsToMove) {
      console.error('Not enough tabs to move.');
      return;
    }

    // Extract the rightmost tabs based on user input
    const tabsToMove = tabs.slice(totalTabs - numberOfTabsToMove);
    document.getElementById('totalTabs').textContent = totalTabs - numberOfTabsToMove;
    const totaldisplay = displayinfo.length;
    let wpos = {}
    let w = displayinfo[0].bounds.width;
    let h = displayinfo[0].bounds.height;
    let xl = displayinfo[0].bounds.left;
    let w2 = Math.round((w-22)/3,0);
    let h2 = Math.round((h-52)/2,0);
    let gap = 10;
    wpos[1] = [xl+0,0,w2,h2];
    wpos[2] = [xl+w2+gap,0,w2,h2];
    wpos[3] = [xl+(w2+gap)*2,0,w2,h2];
    wpos[4] = [xl+0,h2+10,w2,h2];
    wpos[5] = [xl+w2+gap,h2+10,w2,h2];
    wpos[6] = [xl+(w2+gap)*2,h2+10,w2,h2];
    if(totaldisplay == 2)
    {
      // display 2
      let w = displayinfo[1].bounds.width;
      let h = displayinfo[1].bounds.height;
      let xl = displayinfo[1].bounds.left;
      let w2 = Math.round((w-22)/3,0);
      let h2 = Math.round((h-52)/2,0);
      let gap = 10;
      wpos[7] = [xl,0,w2,h2];
      wpos[8] = [xl+w2+gap,0,w2,h2];
      wpos[9] = [xl+(w2+gap)*2,0,w2,h2];
      wpos[10] = [xl,h2+10,w2,h2];
      wpos[11] = [xl+w2+gap,h2+10,w2,h2];
      wpos[12] = [xl+(w2+gap)*2,h2+10,w2,h2];  
    }
    else
      if (numberOfTabsToMove > 6) numberOfTabsToMove = 6;
    // const wpos = {
    //   1:[-1920,0,630,500],
    //   2:[-1280,0,630,500],
    //   3:[-640,0,630,500],
    //   4:[-1920,510,630,500],
    //   5:[-1280,510,630,500],
    //   6:[-640,510,630,500],
    //   7:[0,0,530,400],
    //   8:[535,0,530,400],
    //   9:[1070,0,530,400],
    //   10:[0,410,530,400],
    //   11:[535,410,530,400],
    //   12:[1070,410,530,400],
    // }

    // Create new windows
    for (let i = 0; i < numberOfTabsToMove; i++) {
      const newWindow = await createWindow({ width: 530, height: 400 });

      // Move the corresponding tab to the new window
      const tabIdToMove = tabsToMove[i].id;
      await moveTab(tabIdToMove, newWindow.id);

      // Remove the new tab that was automatically created
      const newTabId = newWindow.tabs[0].id;
      await removeTab(newTabId);

      // Resize and arrange windows
      const left = wpos[tablocation + i][0];
      const top = wpos[tablocation + i][1];
      const width = wpos[tablocation + i][2];
      const height = wpos[tablocation + i][3];
      await updateWindow(newWindow.id, { left, top, width, height });

      console.log(`Moved tab ${tabIdToMove} to window ${newWindow.id}`);
      console.log(`Removed the new tab with ID ${newTabId}`);
    }
  });
});
