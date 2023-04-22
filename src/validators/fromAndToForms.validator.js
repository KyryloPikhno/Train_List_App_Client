import Joi from 'joi';


const FromAndToFormsValidator = Joi.object({
    from_city: Joi.string().required().min(2).max(20).messages({
        'string.empty': 'Please enter the from city',
        'string.min': 'From city must be at least 2 characters long',
        'string.max': 'From city must be at most 20 characters long',
    }),
    to_city: Joi.string().required().min(2).max(20).messages({
        'string.empty': 'Please enter the to city',
        'string.min': 'To city must be at least 2 characters long',
        'string.max': 'To city must be at most 20 characters long',
    }),
    date: Joi.date().min('now').max(new Date().setMonth(new Date().getMonth() + 1)).messages({
        'date.base': 'Please enter a valid date',
        'date.min': 'Date must be after today',
        'date.max': 'Date cannot be more than one month in the future',
    }),
});

export {FromAndToFormsValidator};
