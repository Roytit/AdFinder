const TypesOfInternetId = require('../models/typesOfInternetId')

const handleError = (res, error) => {
    res.status(500).json({ error })
}

const getTypesOfInternetId = (req, res) => {
    TypesOfInternetId
        .find({ isDeleted: { $ne: true } })
        .sort({ updatedAt: -1 })
        .then((ad) => {
            res.status(200).json(ad);
        })
        .catch((err) => handleError(res, err))
}

const getTypeOfInternetId = (req, res) => {
    TypesOfInternetId
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

const addTypeOfInternetId = async (req, res) => {


    const typesOfInternetId = new TypesOfInternetId(req.body);

    typesOfInternetId
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err));
};


const deleteTypeOfInternetId = async (req, res) => {
    const currentDate = new Date()
    let username = "username"

    await TypesOfInternetId
        .findById(req.params.id)
        .then((type) => {
            if(type.isDeleted == true){
                handleError(res, "Данный тип интренет-рекламы уже удаленн")
            }else{
                TypesOfInternetId
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

const updateTypeOfInternetId = async (req, res) => {

    await TypesOfInternetId
        .findById(req.params.id).exec()
        .then(async (ad) => {
            if(ad.isDeleted == true){
                handleError(res, "Данный тип рекламы удалён")
            }else{
                TypesOfInternetId
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
    getTypesOfInternetId,
    getTypeOfInternetId,
    addTypeOfInternetId,
    deleteTypeOfInternetId,
    updateTypeOfInternetId
}