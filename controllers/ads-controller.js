const Ad = require('../models/ad')
const InternetAd = require('../models/internetAd')
const OutdoorAd = require('../models/outdoorAd')
const User = require('../models/user')
const TypesOfInternetId = require('../models/typesOfInternetId')
const TypesOfOutdoorId = require('../models/typesOfOutdoorId')
const Cookies = require('cookies')
const createPath = require('../helpers/create-path')

const handleError = (res, error) => {
    res.status(500).json({ error })
}



//getAds
const getAds = async (req, res) => {
    const adUrl = {};
    Ad
        .find()
        .sort({ createdAt: -1 })
        .then( async (ads) => {
            for(const ad of ads){
                if(ad.internet_ad_id){
                    await InternetAd.findById(ad.internet_ad_id)
                        .then((one_ad) => {
                            adUrl.ad = ad
                            adUrl.ad.url = one_ad.url
                        } )
                }
            }
            res.render(createPath('Ads'), {ads, adUrl})
        } )
        .catch((error) => handleError(res, error))
}

const getAd = async (req, res) => {
    try {
        const adAllInfo = {};
        const ad = await Ad.findById(req.params.id);

        adAllInfo.ad = ad;

        if (ad.internet_ad_id) {
            const internet_ad = await InternetAd.findById(ad.internet_ad_id);
            adAllInfo.internet_ad = internet_ad;

            const typesOfInternetAd = await TypesOfInternetId.findById(internet_ad.type_of_internet_ad);
            adAllInfo.type_of_internet_ad = typesOfInternetAd;
        } else {
            const outdoor_ad = await OutdoorAd.findById(ad.outdoor_ad_id);
            adAllInfo.outdoor_ad = outdoor_ad;

            const typesOfOutdoorAd = await TypesOfOutdoorId.findById(outdoor_ad.type_of_outdoor_ad);
            adAllInfo.type_of_outdoor_ad = typesOfOutdoorAd;
        }

        const user = await User.findById(ad.owner);
        adAllInfo.user = user;

        res.render(createPath('Ad'), { adAllInfo });
        console.log(adAllInfo);

    } catch (error) {
        handleError(res, error);
    }
};

//Get add 

const getAdd = (req, res) => {
    res.render(createPath('add'))
}

const getAdTypeInfo = (req, res) => {
    const type = req.query.type;
    if (type === 'internet') {
        res.render('adTypeInfoInternet');
    } else if (type === 'outdoor') {
        res.render('adTypeInfoOutdoor');
    } else {
        res.send('<div>Неверный тип</div>');
    }
}

const postAdd = async (req, res) => {
    try {
        const cookies = Cookies(req, res);
        const createdBy = cookies.get("username");
        const { width, height, max_time, url, video_ad, image_ad, video_duration, platform } = req.body;
        const internetAd = new InternetAd({ width, height, max_time, url, video_ad, image_ad, video_duration, platform, createdBy });

        const savedInternetAd = await internetAd.save();

        const { title, description, price } = req.body;
        const ad = new Ad({ title, description, price, internetId: savedInternetAd._id });

        await ad.save();
        res.redirect('/ads');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
   getAds,
   getAd,
   getAdd,
   getAdTypeInfo,
   postAdd
}
