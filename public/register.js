document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const formData = { username, email, password };

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // Xử lý đăng ký thành công, ví dụ chuyển hướng đến trang đăng nhập
            window.location.href = '/login.html';
        } else {
            // Xử lý đăng ký không thành công, hiển thị thông báo lỗi
            const data = await response.json();
            alert(data.error);
        }
    } catch (error) {
        console.error(error);
    }
});