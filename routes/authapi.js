const express = require('express');
const router1 = express.Router();
const { sequelize, DataTypes } = require('./../sequelize'); // Import cấu hình từ tệp sequelize.js
const User = require('../models/user')(sequelize, DataTypes);
const bodyParser = require('body-parser');

// Sử dụng body-parser để xử lý dữ liệu từ yêu cầu POST trong tệp router.js
router1.use(bodyParser.json()); // Xử lý JSON
router1.use(bodyParser.urlencoded({ extended: true })); // Xử lý dữ liệu form-urlencoded

// Route đăng ký
router1.post('/register', async (req, res) => {
    try {
      // Thực hiện xử lý đăng ký sử dụng model User ở đây
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
    const { username, password } = req.body;

    // Tìm người dùng dựa trên tên người dùng từ cơ sở dữ liệu
    const user = await User.findOne({ where: { username: username } });

    // Kiểm tra xem người dùng có tồn tại và mật khẩu có đúng không
    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
      return;
    }

    // Nếu tên người dùng và mật khẩu hợp lệ, trả về phản hồi thành công
    res.json({ message: 'Đăng nhập thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi đăng nhập' });
  }
});

  
  module.exports = router1;