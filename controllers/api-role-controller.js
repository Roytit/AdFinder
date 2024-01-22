const Role = require('../models/role')

const handleError = (res, error) => {
    res.status(500).json({ error })
}

// Get All Roles Id
const getRoles = (req, res) => {
    Role
        .find({ isDeleted: { $ne: true } })
        .sort({ updatedAt: -1 })
        .then((ad) => {
            res.status(200).json(ad);
        })
        .catch((err) => handleError(res, err))
}

// Get Role by ID
const getRole = (req, res) => {
    Role
        .findById(req.params.id)
        .then((result) => {
            if(!result.isDeleted){
                res.status(200).json(result);
            }else{
                handleError(res, "Данного типа интернет-рекламы не существует")
            }
        })
        .catch((err) => handleError(res, err))
}

/**
 * Add New Role
 * @param {*} req 
 * @param {*} res 
 * 
 * Пример запроса:
 *  {
*       "name: "advertiser"
    }
 * 
 */
const addRole = async (req, res) => {
    const role = new Role(req.body);

    role
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err));
};

// Delete Role by ID
const deleteRole = async (req, res) => {
    const currentDate = new Date()
    let username = "username"

    await Role
        .findById(req.params.id)
        .then((type) => {
            if(type.isDeleted == true){
                handleError(res, "Данный тип интренет-рекламы уже удаленн")
            }else{
                Role
                    .findByIdAndUpdate(req.params.id, {
                        isDeleted: true,
                        deletedAt: currentDate,
                        deletedBy: username
                    }, { new: true })
                    .then(() => {
                        res.status(200).json("Тип удалён")
                    })
                    .catch((err) => handleError(res, err))
            }
        })
    .catch((err) => handleError(res, err))    
}

// Update Role by ID
const updateRole = async (req, res) => {

    await Role
        .findById(req.params.id).exec()
        .then(async (ad) => {
            if(ad.isDeleted == true){
                handleError(res, "Данный тип рекламы удалён")
            }else{
                Role
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
    getRoles,
    getRole,
    addRole,
    deleteRole,
    updateRole
}