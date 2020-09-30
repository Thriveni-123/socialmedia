const Joi=require('joi')

module.exports.login= Joi.object().keys({
    email:Joi.string().email().required(),
    password:Joi.string().required()
});