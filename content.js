document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ action: 'getTasks' }, (response) => {
      if (response.tasks.length > 0) {
        const tableContainer = document.getElementById('task-table-container');
  
        // Create the table
        const table = document.createElement('table');
        table.id = 'task-table';
        const tableHead = document.createElement('thead');
        const tableHeadRow = document.createElement('tr');
        const idHeader = document.createElement('th');
        idHeader.textContent = 'ID';
        const nameHeader = document.createElement('th');
        nameHeader.textContent = 'Name';
        const taskHeader = document.createElement('th');
        taskHeader.textContent = 'Task';
        tableHeadRow.appendChild(idHeader);
        tableHeadRow.appendChild(nameHeader);
        tableHeadRow.appendChild(taskHeader);
        tableHead.appendChild(tableHeadRow);
  
        const tableBody = document.createElement('tbody');
  
        // Fill the table with data
        response.tasks.forEach(task => {
          const row = document.createElement('tr');
          const idCell = document.createElement('td');
          idCell.textContent = task.id;
          const nameCell = document.createElement('td');
          nameCell.textContent = task.name;
          const taskCell = document.createElement('td');
          taskCell.textContent = task.task;
          row.appendChild(idCell);
          row.appendChild(nameCell);
          row.appendChild(taskCell);
          tableBody.appendChild(row);
        });
  
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tableContainer.appendChild(table);
      } else {
        // Handle the case when there are no tasks
        const noTasksMessage = document.createElement('p');
        noTasksMessage.textContent = 'No tasks available.';
        tableContainer.appendChild(noTasksMessage);
      }
    });
  });
  

  // SEARCH BUTTON FUNCTION
  window.addEventListener('hashchange', () => {
    chrome.runtime.sendMessage({ action: 'executeScriptInTab', word: 'Сохранить' }, (response) => {
      if (response.success) {
        console.log('Script executed successfully');
      } else {
        console.error('Error executing script:', response.error);
      }
    });
  });
  

function newFunction() {
  document.addEventListener('click', (event) => {
    // Click if elem is not button
    if (event.target.tagName.toLowerCase() !== 'button') {
      chrome.runtime.sendMessage({ action: 'executeScriptInTab', word: 'Сохранить' }, (response) => {
        if (response.success) {
          console.log('Script executed successfully');
        } else {
          console.error('Error executing script:', response.error);
        }
      });
    } else {
      console.log('Клик произошел на кнопке, обработка не требуется.');
    }
  });
}

newFunction();
  
