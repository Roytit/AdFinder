const User = require('../models/user')

const handleError = (res, error) => {
    res.status(500).json({ error })
}

/**
 * Authorization
 * @param {*} req 
 * @param {*} res 
 * 
 * Пример запроса:
 *  {
*       "username": "Roфывфыytit",
        "password": "12345"
    }
 * 
 */
const authRouter = async (req, res) => {
    const { username, password } = req.body;

    const usernameIsExist = await User.findOne({username})
    if(!usernameIsExist){
        handleError(res, "Данный пользователь не найден")
    }
 
    if (password === usernameIsExist.password) {
        res.status(200).json("Успешно");
    }else{
        handleError(res, "Неверный пароль")
    }
}

module.exports = {
    authRouter,
}