import joi from "joi";

export const validateSignup = (userData) => {
    const Schema = joi.object({
        fullName: joi.string().required().max(50).min(5),
        email: joi.string().required().email(),

        // Below [3,30] refers to the min and max significant values of the password 
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9][3,30]$')),
        address: joi.array().items(joi.object({ detail: joi.string(), for: joi.string() })),
        phoneNumber: joi.array().items(joi.Number()).max(10).min(10),
    });
    // Below 'validateAsync' alwayse returns a 'Promise' function rather than an 'Object'
    // Also if we work with Synchronous method it will take much time
    return Schema.validateAsync(userData);
}

export const validateSignin = (userData) => {
    const Schema = joi.object({
        email: joi.string().required().email(),

        // Below [3,30] refers to the min and max significant values of the password 
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9][3,30]$')),
    });
    return Schema.validateAsync(userData);
}