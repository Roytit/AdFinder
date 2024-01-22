const OutdoorAd = require('../models/outdoorAd')
const TypesOfOutdoorId = require('../models/typesOfOutdoorId');

const handleError = (res, error) => {
    res.status(500).json({ error })
}

const getOutdoorAds = (req, res) => {
    OutdoorAd
        .find({ isDeleted: { $ne: true } })
        .sort({ updatedAt: -1 })
        .then((ad) => {
            res.status(200).json(ad);
        })
        .catch((err) => handleError(res, err))
}

const getOutdoorAd = (req, res) => {
    OutdoorAd
        .findById(req.params.id)
        .then((result) => {
            if(!result.isDeleted){
                res.status(200).json(result);
            }else{
                handleError(res, "Данной внешней рекламы не существует")
            }
        })
        .catch((err) => handleError(res, err))
}

const addOutdoorAd = async (req, res) => {
    const outdoorAd = new OutdoorAd(req.body);

    const {type_of_outdoor_ad} = req.body

    TypesOfOutdoorId.findById(type_of_outdoor_ad)
        .then((result) => {
            if(!result){
                handleError(res, "Нет такого типа рекламы")
            }else{
                outdoorAd
                    .save()
                    .then((result) => {
                        res.status(200).json(result);
                    })
                    .catch((err) => handleError(res, err));
            }
        })
        .catch((err) => handleError(res, err));
}

const deleteOutdoorAd= async (req, res) => {
    const currentDate = new Date()
    let username = "username"

    await OutdoorAd
        .findById(req.params.id)
        .then((ad) => {
            if(ad.isDeleted == true){
                handleError(res, "Данная реклама уже удаленна")
            }else{
                OutdoorAd
                    .findByIdAndUpdate(req.params.id, {
                        isDeleted: true,
                        deletedAt: currentDate,
                        deletedBy: username
                    }, { new: true })
                    .then(() => {
                        res.status(200).json("Реклама удаленна")
                    })
                    .catch((err) => handleError(res, err))
            }
        })
    .catch((err) => handleError(res, err))    
}

const updateOutdoorAd= async (req, res) => {

    const {type_of_outdoor_ad} = req.body

    const adIdIsExist =  await TypesOfOutdoorId.findById(type_of_outdoor_ad)
    if(!adIdIsExist){
        return handleError(res, "Нет такого типа рекламы")
    }
    
    await OutdoorAd
        .findById(req.params.id).exec()
        .then((ad) => {
            if(ad.isDeleted == true){
                handleError(res, "Данная интернет реклама удаленна")
            }else{
                OutdoorAd
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
    getOutdoorAds,
    getOutdoorAd,
    addOutdoorAd,
    deleteOutdoorAd,
    updateOutdoorAd
}