const Joi=require('joi')

module.exports.login= Joi.object().keys({
    email:Joi.string().email().required(),
    password:Joi.string().required()
});

module.exports.delete= Joi.object().keys({
    email:Joi.string().email().required(),
});