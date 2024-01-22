const TypesOfOutdoorId = require('../models/typesOfOutdoorId')

const handleError = (res, error) => {
    res.status(500).json({ error })
}

const getTypesOfOutdoorId = (req, res) => {
    TypesOfOutdoorId
        .find({ isDeleted: { $ne: true } })
        .sort({ updatedAt: -1 })
        .then((ad) => {
            res.status(200).json(ad);
        })
        .catch((err) => handleError(res, err))
}

// Get Type Of Outdoor Id by ID
const getTypeOfOutdoorId = (req, res) => {
    TypesOfOutdoorId
        .findById(req.params.id)
        .then((result) => {
            if(!result.isDeleted){
                res.status(200).json(result);
            }else{
                handleError(res, "Данного типа наружной рекламы не существует")
            }
        })
        .catch((err) => handleError(res, err))
}


/**
 * Add New Type Of Outdoor Id
 * @param {*} req 
 * @param {*} res 
 * 
 * Пример запроса:
 *  {
*       "name: "transit"
    }
 * 
 */
const addTypeOfOutdoorId = async (req, res) => {
    const typesOfOutdoorId = new TypesOfOutdoorId(req.body);

    typesOfOutdoorId
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err));
};

// Delete Type Of Outdoor Id by ID
const deleteTypeOfOutdoorId = async (req, res) => {
    const currentDate = new Date()
    let username = "username"

    await TypesOfOutdoorId
        .findById(req.params.id)
        .then((type) => {
            if(type.isDeleted == true){
                handleError(res, "Данный тип наружной рекламы уже удаленн")
            }else{
                TypesOfOutdoorId
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

// Update Type Of Outdoor Id by ID
const updateTypeOfOutdoorId = async (req, res) => {

    await TypesOfOutdoorId
        .findById(req.params.id).exec()
        .then(async (ad) => {
            if(ad.isDeleted == true){
                handleError(res, "Данный тип рекламы удалён")
            }else{
                TypesOfOutdoorId
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
    getTypesOfOutdoorId,
    getTypeOfOutdoorId,
    addTypeOfOutdoorId,
    deleteTypeOfOutdoorId,
    updateTypeOfOutdoorId
}