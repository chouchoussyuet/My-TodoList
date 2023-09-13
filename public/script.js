document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.getElementById('addTaskForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const taskList = document.getElementById('taskList');
  
    // Hàm để hiển thị danh sách công việc
    const displayTasks = () => {
      fetch('/tasks') // Gửi yêu cầu GET đến API để lấy danh sách công việc
        .then(response => response.json())
        .then(data => {
          taskList.innerHTML = ''; // Xóa danh sách hiện tại
  
          data.forEach(task => {
            const listItem = document.createElement('li');
            /*listItem.innerHTML = `
            <strong>${task.title}</strong>
            <p>${task.description || 'Không có mô tả'}</p>
            <button data-id="${task.id}" class="delete-btn">Xóa</button>
            <button data-id="${task.id}" class="complete-btn" data-completed="${task.completed}">
              ${task.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
            </button>
          `;
            taskList.appendChild(listItem);*/

            const titleElement = document.createElement('strong');
            titleElement.textContent = task.title;
            listItem.appendChild(titleElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = task.description || 'Không có mô tả';
            listItem.appendChild(descriptionElement);

            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('data-id', task.id);
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'Xóa';
            listItem.appendChild(deleteButton);

            const completeButton = document.createElement('button');
            completeButton.setAttribute('data-id', task.id);
            completeButton.classList.add('complete-btn');
            completeButton.setAttribute('data-completed', task.completed);
            completeButton.textContent = task.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành';
            listItem.appendChild(completeButton);

            taskList.appendChild(listItem); 

          });
        })
        .catch(error => {
          console.error('Lỗi khi lấy danh sách công việc:', error);
        });
    };
  
    // Xử lý sự kiện khi form thêm công việc được gửi
    addTaskForm.addEventListener('submit', event => {
      event.preventDefault();
  
      const newTask = {
        title: titleInput.value,
        description: descriptionInput.value,
        completed: false,
      };
  
      fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask), // Chuyển đổi thành JSON trước khi gửi
      })
        .then(response => response.json())
        .then(data => {
          console.log('Công việc đã được thêm:', data);
          // Sau khi thêm công việc, hiển thị lại danh sách
          displayTasks();
          // Xóa nội dung trong input
          titleInput.value = '';
          descriptionInput.value = '';
        })
        .catch(error => {
          console.error('Lỗi khi thêm công việc:', error);
        });
    });
  
    // Xử lý sự kiện khi nút xóa công việc được nhấn
    taskList.addEventListener('click', event => {
      if (event.target.classList.contains('delete-btn')) {
        const taskId = event.target.getAttribute('data-id');
        fetch(`/tasks/${taskId}`, {
          method: 'DELETE',
        })
          .then(() => {
            console.log('Công việc đã được xóa');
            // Sau khi xóa công việc, hiển thị lại danh sách
            displayTasks();
          })
          .catch(error => {
            console.error('Lỗi khi xóa công việc:', error);
          });
      } else if (event.target.classList.contains('complete-btn')) {
        const taskId = event.target.getAttribute('data-id');
        const isCompleted = event.target.getAttribute('data-completed') === 'true';
    
        fetch(`/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: !isCompleted }), // Đảo ngược trạng thái hoàn thành
        })
          .then(() => {
            console.log('Trạng thái công việc đã được cập nhật');
            // Sau khi cập nhật trạng thái, hiển thị lại danh sách
            displayTasks();
          })
          .catch(error => {
            console.error('Lỗi khi cập nhật trạng thái công việc:', error);
          });
      }
    });
  
    // Ban đầu, hiển thị danh sách công việc
    displayTasks();
  });
  