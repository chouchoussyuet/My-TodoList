const {Sequelize, DataTypes } = require('sequelize'); 

// tạo 1 phiên bản sequelize kết nối mysql
const sequelize = new Sequelize('girrafe', 'chouchoussy', 'baongoc', {
    host : 'localhost',
    dialect : 'mysql',
})

try { // kiểm tra kết nối 
    sequelize.authenticate();
    console.log('Kết nối tới database thành công');
} catch(error) {
    console.log('Error, Lỗi kết nối tới database : ', error);
}

module.exports = {
    sequelize,
    DataTypes,
};