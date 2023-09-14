const express = require('express');
const router = express.Router();

const app = express();

const cors = require('cors');
const mysql = require('mysql');
const {Sequelize, DataTypes } = require('sequelize'); 
const path = require('path');

// tạo 1 phiên bản sequelize kết nối mysql
const sequelize = new Sequelize('girrafe', 'chouchoussy', 'baongoc', {
    host : 'localhost',
    dialect : 'mysql'
})

// kiểm tra kết nối 
try {
    sequelize.authenticate();
    console.log('Kết nối tới database thành công');
} catch(error) {
    console.log('Error, Lỗi kết nối tới database : ', error);
}

// import modules từ thư mục models
const taskModel = require('./models/todo') (sequelize, Sequelize);

// import router 
// const taskRouter = require('./routes/tasksapi');
app.use(router());
app.use(cors());

//Connect static files in 'public' directory
app.use( '/public', express.static( path.join(__dirname, 'public')) );

app.use(express.json()) // for parsing application/json

//Connect html file
app.get('/', (req, res) => {
	res.sendFile('views/index.html', { root:__dirname });
})

app.listen(2508, () => {
    console.log("ứng dụng đã chạy trên cổng 3000");
});


module.exports = router;
