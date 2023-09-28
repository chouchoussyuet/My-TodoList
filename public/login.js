document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Tạo một đối tượng chứa thông tin đăng nhập
    const loginData = {
      username: username,
      password: password
    };

    // Sử dụng Fetch API để gửi yêu cầu POST đến route đăng nhập
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      // Xử lý phản hồi từ máy chủ sau khi đăng nhập
      if (data.message === 'Đăng nhập thành công') {
        // Đăng nhập thành công, có thể thực hiện các hành động sau đây
        alert('Đăng nhập thành công');
        window.location.href = '/index.html';
      } else {
        // Đăng nhập thất bại, xử lý theo cách tương ứng
        alert('Đăng nhập thất bại');
      }
    })
    .catch(error => {
      console.error('Lỗi khi gửi yêu cầu đăng nhập:', error);
      alert('Lỗi khi đăng nhập');
    });
  });