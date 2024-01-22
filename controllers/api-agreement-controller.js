const Agreement = require('../models/agreement')
const User = require('../models/user')
const Ad = require('../models/ad')

const handleError = (res, error) => {
    res.status(500).json({ error })
}

const getAgreements = (req, res) => {
    Agreement
        .find({ isDeleted: { $ne: true } })
        .sort({ updatedAt: -1 })
        .then((agreement) => {
            res.status(200).json(agreement);
        })
        .catch((err) => handleError(res, err))
}

const getAgreement = (req, res) => {
    Agreement
        .findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err))
}

const addAgreement = async (req, res) => {
    try {
        const { ad_id, advertiser_id, advertising_distributor_id } = req.body;

        if (ad_id !== undefined) {
            const existInternetAdId = await Ad.findById(ad_id);
            if (!existInternetAdId) {
                return handleError(res, "Рекламы с таким id не существует");
            }
        }

        const advertiser = await User.findById(advertiser_id);
        if (!advertiser) {
            return handleError(res, "Такого рекламодателя нет");
        }

        const advertisingDistributor = await User.findById(advertising_distributor_id);
        if (!advertisingDistributor) {
            return handleError(res, "Такого рекламного распостранителя нет");
        }

        if (advertisingDistributor.id === advertiser.id) {
            return handleError(res, "Рекламодатель и рекламный распространитель должны быть разными людьми");
        }

        const newAgreement = new Agreement(req.body);
        const savedAgreement = await newAgreement.save();

        res.status(200).json(savedAgreement);
    } catch (err) {
        handleError(res, err);
    }
};

const deleteAgreement = async (req, res) => {
    const currentDate = new Date()
    let username = "username"

    await Agreement
        .findById(req.params.id).exec()
        .then((agreement) => {
            if(agreement.isDeleted == true){
                handleError(res, "Данное соглашение уже удаленно")
            }else{
                Agreement
                    .findByIdAndUpdate(req.params.id, {
                        isDeleted: true,
                        deletedAt: currentDate,
                        deletedBy: username
                    }, { new: true })
                    .then(() => {
                        res.status(200).json("Соглашение удаленно")
                    })
                    .catch((err) => handleError(res, err))
            }
        })
    .catch((err) => handleError(res, err))    
}

const updateAgreement = async (req, res) => {
    try {
        const agreement = await Agreement.findById(req.params.id);

        const { ad_id, advertiser_id, advertising_distributor_id } = req.body;

        if (ad_id !== undefined) {
            const existInternetAdId = await Ad.findById(ad_id);
            if (!existInternetAdId) {
                return handleError(res, "Рекламы с таким id не существует");
            }
        }

        if (agreement.isDeleted == true) {
            return handleError(res, "Данное соглашение удалено");
        }

        const advertiser = await User.findById(advertiser_id);
        if (!advertiser) {
            return handleError(res, "Такого рекламодателя нет");
        }

        const advertisingDistributor = await User.findById(advertising_distributor_id);
        if (!advertisingDistributor) {
            return handleError(res, "Такого рекламного распостранителя нет");
        }

        if (advertisingDistributor.id === advertiser.id) {
            return handleError(res, "Рекламодатель и рекламный распространитель должны быть разными людьми");
        }

        const updatedAgreement = await Agreement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAgreement);
    } catch (err) {
        handleError(res, err);
    }
};


module.exports = {
    getAgreements,
    getAgreement,
    addAgreement,
    deleteAgreement,
    updateAgreement
}