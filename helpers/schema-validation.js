const Joi = require('joi');

const employeeSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    position: Joi.string().required(),
    department: Joi.string(),
    salary: Joi.number(),    
});

module.exports = {employeeSchema }