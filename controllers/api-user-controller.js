const User = require('../models/user')
const Role = require('../models/role')
const createPath = require('../helpers/create-path')

const handleError = (res, error) => {
    res.status(500).json({ error })
}

// Get All Users 
const getUsers = (req, res) => {
    User
        .find({ isDeleted: { $ne: true } })
        .sort({ updatedAt: -1 })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => handleError(res, err))
}

// Get User by ID
const getUser = (req, res) => {
    User
        .findById(req.params.id)
        .then((result) => {
            if(!result.isDeleted){
                res.status(200).json(result);
            }else{
                handleError(res, "Данного пользователя не существует")
            }
        })
        .catch((err) => handleError(res, err))
}

/**
 * Add new user
 * @param {*} req 
 * @param {*} res 
 * 
 * Пример запроса:
 *  {
*       "username": "Roytit",
        "email": "roytitfix2234@gmail.com",
        "password": "12345",
        "role": "advertiser",
        "first_name": "Roman",
        "last_name": "Kovalev",
        "phone_number": "+79165187290",
        "date_of_birth": "2006-01-30"
    }
 * 
 */
const addUser = async (req, res) => {
    const user = new User(req.body)

    const roleFind = await Role.findById(user.role)
    if(!roleFind){
        return handleError(res, "Данная роль не найдена")
    }

    user
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err))
}

// Delete User by ID
const deleteUser = async (req, res) => {
    const currentDate = new Date()
    let username;  

    await User
        .findById(req.params.id)
        .then((user) => {
            username = user.username
            if(user.isDeleted == true){
                handleError(res, "Данный пользователь уже удалён")
            }else{
                User
                    .findByIdAndUpdate(req.params.id, {
                        isDeleted: true,
                        deletedAt: currentDate,
                        deletedBy: username
                    }, { new: true })
                    .then(() => {
                        res.status(200).json("Пользоватьель удалён")
                    })
                    .catch((err) => handleError(res, err))
            }
        })
    .catch((err) => handleError(res, err))    
}

// Update User by ID
const updateUser = async (req, res) => {

    const user = new User(req.body)

    const roleFind = await Role.findById(user.role)
    if(!roleFind){
        return handleError(res, "Данная роль не найдена")
    }

    await User
        .findById(req.params.id).exec()
        .then((user) => {
            if(user.isDeleted == true){
                handleError(res, "Данный пользователь удалён")
            }else{
                User
                    .findByIdAndUpdate(req.params.id, req.body, { new: true })
                    .then((result) => {
                            res.status(200).json(result);
                    })
                    .catch((err) => handleError(res, err))
            }
        })
        .catch((err) => handleError(res, err))       
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser
}
