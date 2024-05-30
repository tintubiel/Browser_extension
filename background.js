chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getTasks') {
      fetch('http://127.0.0.1:5000/tasks', {
        mode: 'no-cors'
      })
        .then(response => response.json())
        .then(data => {
          sendResponse({ tasks: data });
        })
        .catch(error => {
          console.error('Error getting tasks:', error);
          sendResponse({ tasks: [] });
        });
      return true; // Indicate that the response will be sent asynchronously
    }
  
    else if (request.action === 'postData') {
      return fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request.data)
      })
        .then(response => response.json())
        .then(data => {
          sendResponse({ success: true, data: data });
          return true; // Indicate that the response will be sent asynchronously
        })
        .catch(error => {
          console.error('Error posting data:', error);
          sendResponse({ success: false, error: error.message });
          return true; // Indicate that the response will be sent asynchronously
        });
    }
  
    if (request.action === 'executeScriptInTab') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
      
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            args: [request.word],
            function: (word) => {
              const res = []
              const elems = document.querySelectorAll('button.aui-button.aui-button-primary.submit');
              for (let elem of elems) {
                if (elem.outerHTML.includes(word)) {
                  elem.addEventListener("click", function () {
                    let intervalId;
  
                    function checkForElement(){
                      const taskTextElement = document.querySelector('.user-content-block');
                      const taskLinkElement = document.querySelector('.issue-link');
  
                      if (taskTextElement && taskLinkElement) {
                        const taskText = taskTextElement.textContent;
                        const taskNumber = taskLinkElement.getAttribute('data-issue-key');
                        alert(taskText, taskNumber)
                        chrome.runtime.sendMessage({ action: 'postData', data: { name: taskNumber, task: taskText, } });
                        clearInterval(intervalId); 
                      }
                    }
  
                    intervalId = setInterval(checkForElement, 200);
                  })
                  break;
                }
              }
            }
          }
        )
      });
      sendResponse({ success: true });
    }
  });
  
  