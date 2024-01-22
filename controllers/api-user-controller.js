const User = require('../models/user')

const handleError = (res, error) => {
    res.status(500).json({ error })
}

const getUsers = (req, res) => {
    User
        .find({ isDeleted: { $ne: true } })
        .sort({ updatedAt: -1 })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => handleError(res, err))
}

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

const addUser = (req, res) => {
    const user = new User(req.body)
    user
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err))
}

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

const updateUser = async (req, res) => {

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