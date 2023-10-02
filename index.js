const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


const { sequelize } = require('./sequelize');
const app = express();
const router = require('./routes/tasksapi');
const router1 = require('./routes/authapi');

// Sử dụng body-parser để xử lý dữ liệu từ yêu cầu POST
app.use(bodyParser.json()); // Xử lý JSON
app.use(bodyParser.urlencoded({ extended: true })); // Xử lý dữ liệu form-urlencoded
app.use(router);
app.use(router1);
app.use(cors());
app.use( '/public', express.static( path.join(__dirname, 'public')) );   //Connect static files in 'public' directory
app.use(express.json())    // for parsing application/json



//const taskModel = require('./models/todo')(sequelize, DataTypes);
sequelize.sync()
.then(() => {
    console.log('Cơ sở dữ liệu đã được đồng bộ hóa.');
    // Bắt đầu ứng dụng của bạn sau khi đồng bộ hóa cơ sở dữ liệu
  })
  .catch((error) => {
    console.error('Lỗi khi đồng bộ hóa cơ sở dữ liệu:', error);
  });



//Connect html file
app.get('/', (req, res) => {
	res.sendFile('views/welcome.html', { root:__dirname });
})

// Route cho trang todolist (index.html) sau khi đăng nhập thành công
app.get('/index.html', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

// Route cho trang đăng nhập (login.html)
app.get('/login.html', (req, res) => {
  res.sendFile('views/login.html', { root: __dirname });
});

// Route cho trang đăng ký (register.html)
app.get('/register.html', (req, res) => {
  res.sendFile('views/register.html', { root: __dirname });
});


app.listen(2501, () => {
    console.log("ứng dụng đã chạy trên cổng ");
});



