const express = require('express');
const app = express();

const mysql = require('mysql');
const {Sequelize, DataTypes } = require('sequelize'); 
const path = require('path');
const fs = require('fs');
const http = require('http');

// tạo 1 phiên bản sequelize kết nối mysql
const sequelize = new Sequelize('girrafe', 'chouchoussy', 'baongoc', {
    host : 'localhost',
    dialect : 'mysql'
})

// kiểm tra kết nối 
try {
    sequelize.authenticate();
    console.log('Connection to database succesfully');
} catch(error) {
    console.log('Error : Unable to connect to database because : ', error);
}

// import modules từ thư mục models
const taskModel = require('./models/todo');
// import router 
const taskRouter = require('./routes/tasksapi');

app.use('/tasks', taskRouter);

//Connect static files in 'public' directory
app.use( express.static( path.join(__dirname + 'public')) );

//Connect html file
app.get('/', (req, res) => {
	res.sendFile('views/index.html', { root:__dirname });
})

app.listen(2508, () => {
    console.log("ứng dụng đã chạy trên cổng 3000");
});
