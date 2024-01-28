const User = require('../models/user')
const Role = require('../models/role')
const createPath = require('../helpers/create-path')
const Cookies = require('cookies')

const handleError = (res, error) => {
    res.status(500).json({ error })
}

//getAuth
const getLogin = (req, res) => {
    const cookies = Cookies(req, res);
    cookies.set("username", null)
    res.render(createPath('auth'))
}

//getAuth
const getReg = (req, res) => {
    res.render(createPath('reg'))
}

const regUser = (req, res) => {
    const cookies = Cookies(req, res);
    const { username, password, second_pass } = req.body;
    if (password === second_pass) {
      User.findOne({ username }).then((result) => {
        if (result) {
          return res.render(createPath('profile'))
        }
        const user = new User({ username, password });
        user
          .save()
          .then(() => {
            return res.render(createPath('profile'))
          })
          .catch((error) => {
            return res.json({ message: error });
          });
          cookies.set("username", username);
      });
    } else {
      return res.status(400).json({ message: "Пароли не совпадают!" });
    }
  };
  
const postLogin = (req, res) => {
    const cookies = Cookies(req, res);
    if (cookies.get("username")) {
      return res.status(400).json({ message: "Вы уже залогинены!" });
    }
    const { username, password } = req.body;
    User.findOne({ username })
      .then((result) => {
        if (result.username === username && result.password === password) {
          cookies.set("username", username);
          res.render(createPath('index'));
        }else{
            return res.status(400).json({ message: "Неверный логин или пароль!" });
        }
      })
      .catch(() => {
        return res.status(400).json({ message: "Неверный логин или пароль!" });
      });
  };


module.exports = {
    getLogin,
    postLogin,
    regUser,
    getReg,
}
