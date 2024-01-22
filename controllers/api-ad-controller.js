const Ad = require('../models/ad')
const InternetAd = require('../models/internetAd')

const handleError = (res, error) => {
    res.status(500).json({ error })
}

const getAds = (req, res) => {
    Ad
        .find({ isDeleted: { $ne: true } })
        .sort({ updatedAt: -1 })
        .then((ad) => {
            res.status(200).json(ad);
        })
        .catch((err) => handleError(res, err))
}

const getAd = (req, res) => {
    Ad
        .findById(req.params.id)
        .then((result) => {
            if(!result.isDeleted){
                res.status(200).json(result);
            }else{
                handleError(res, "Данной рекламы не существует")
            }
        })
        .catch((err) => handleError(res, err))
}

const addAd = async (req, res) => {
    const { outdoor_ad_id, internet_ad_id } = req.body;

    if (internet_ad_id !== undefined) {
        const existInternetAdId = await InternetAd.findById(internet_ad_id);
        if (!existInternetAdId) {
            return handleError(res, "Интернет рекламы с таким id не существует");
        }

        const checkInternetId = await Ad.findOne({ internet_ad_id });
        if (checkInternetId) {
            return handleError(res, "Реклама с таким internet_ad_id уже существует");
        }
    }

    if (outdoor_ad_id !== undefined) {
        const checkOutdoorId = await Ad.findOne({ outdoor_ad_id });
        if (checkOutdoorId) {
            return handleError(res, "Реклама с таким outdoor_ad_id уже существует");
        }
    }

    if (internet_ad_id !== undefined && outdoor_ad_id !== undefined) {
        return handleError(res, "У рекламы может быть либо internet_ad_id, либо outdoor_ad_id");
    }
    if (internet_ad_id === undefined && outdoor_ad_id === undefined) {
        return handleError(res, "У рекламы должен быть либо internet_ad_id, либо outdoor_ad_id");
    }

    const ad = new Ad(req.body);

    ad.save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err));
};


const deleteAd = async (req, res) => {
    const currentDate = new Date()
    let username = "username"

    await Ad
        .findById(req.params.id)
        .then((ad) => {
            if(ad.isDeleted == true){
                handleError(res, "Данная реклама уже удаленна")
            }else{
                Ad
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

const updateAd = async (req, res) => {

    await Ad
        .findById(req.params.id).exec()
        .then(async (ad) => {
            if(ad.isDeleted == true){
                handleError(res, "Данная реклама удаленна")
            }else{

                const { outdoor_ad_id, internet_ad_id } = req.body;

                if (internet_ad_id !== undefined && internet_ad_id !== ad.internet_ad_id) {
                    const checkInternetId = await Ad.findOne({ internet_ad_id });
                    if (checkInternetId) {
                        handleError(res, "реклама с таким internet_ad_id уже существует");
                        return;
                    }
                }

                if (outdoor_ad_id !== undefined) {
                    const checkOutdoorId = await Ad.findOne({ outdoor_ad_id });
                    if (checkOutdoorId) {
                        handleError(res, "реклама с таким outdoor_ad_id уже существует");
                        return;
                    }
                }

                if (internet_ad_id !== undefined && outdoor_ad_id !== undefined) {
                    handleError(res, "у рекламы может быть либо internet_ad_id либо outdoor_ad_id");
                    return;
                }
                if (internet_ad_id === undefined && outdoor_ad_id === undefined) {
                    handleError(res, "у рекламы должен быть либо internet_ad_id либо outdoor_ad_id");
                    return;
                }

                if (outdoor_ad_id !== undefined && ad.internet_ad_id !== undefined) {
                    handleError(res, "У рекламы уже установлено значение internet_ad_id");
                    return;
                }

                if (internet_ad_id !== undefined && ad.outdoor_ad_id !== undefined) {
                    handleError(res, "У рекламы уже установлено значение outdoor_ad_id");
                    return;
                }

                Ad
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
    getAds,
    getAd,
    addAd,
    deleteAd,
    updateAd
}