const express = require('express');
const router1 = express.Router();
const { sequelize, DataTypes } = require('./../sequelize'); // Import cấu hình từ tệp sequelize.js
const User = require('../models/user')(sequelize, DataTypes);
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


// Sử dụng body-parser để xử lý dữ liệu từ yêu cầu POST trong tệp router.js
router1.use(bodyParser.json()); // Xử lý JSON
router1.use(bodyParser.urlencoded({ extended: true })); // Xử lý dữ liệu form-urlencoded

// Route đăng ký
router1.post('/register', async (req, res) => {
    try {
      // Thực hiện xử lý đăng ký sử dụng model User ở đây
      // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;

      const newUser = await User.create(req.body);
      res.json({ message: 'Đăng ký thành công', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi khi đăng ký' });
    }
  });
  
 // Route đăng nhập
router1.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.body.username } });
      if (!user) {
        return res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
      }
      
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
      }
      
      // Thực hiện xử lý đăng nhập thành công ở đây
      res.json({ message: 'Đăng nhập thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi khi đăng nhập' });
    }
});


  
  module.exports = router1;