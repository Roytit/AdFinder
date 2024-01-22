const InternetAd = require('../models/internetAd')
const TypesOfInternetId = require('../models/typesOfInternetId');

const handleError = (res, error) => {
    res.status(500).json({ error })
}

const getInternetAds = (req, res) => {
    InternetAd
        .find({ isDeleted: { $ne: true } })
        .sort({ updatedAt: -1 })
        .then((ad) => {
            res.status(200).json(ad);
        })
        .catch((err) => handleError(res, err))
}

const getInternetAd = (req, res) => {
    InternetAd
        .findById(req.params.id)
        .then((result) => {
            if(!result.isDeleted){
                res.status(200).json(result);
            }else{
                handleError(res, "Данной интернет рекламы не существует")
            }
        })
        .catch((err) => handleError(res, err))
}

const addInternetAd = async (req, res) => {
    const internetAd = new InternetAd(req.body);

    const {type_of_internet_ad} = req.body

    TypesOfInternetId.findById(type_of_internet_ad)
        .then((result) => {
            if(!result){
                handleError(res, "Нет такого типа рекламы")
            }else{
                internetAd
                    .save()
                    .then((result) => {
                        res.status(200).json(result);
                    })
                    .catch((err) => handleError(res, err));
            }
        })
        .catch((err) => handleError(res, err));
}

const deleteInternetAd = async (req, res) => {
    const currentDate = new Date()
    let username = "username"

    await InternetAd
        .findById(req.params.id)
        .then((ad) => {
            if(ad.isDeleted == true){
                handleError(res, "Данная реклама уже удаленна")
            }else{
                InternetAd
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

const updateInternetAd = async (req, res) => {

    const {type_of_internet_ad} = req.body

    const adIdIsExist =  await TypesOfInternetId.findById(type_of_internet_ad)
    if(!adIdIsExist){
        return handleError(res, "Нет такого типа рекламы")
    }
    
    await InternetAd
        .findById(req.params.id).exec()
        .then((ad) => {
            if(ad.isDeleted == true){
                handleError(res, "Данная интернет реклама удаленна")
            }else{
                InternetAd
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
    getInternetAds,
    getInternetAd,
    addInternetAd,
    deleteInternetAd,
    updateInternetAd
}