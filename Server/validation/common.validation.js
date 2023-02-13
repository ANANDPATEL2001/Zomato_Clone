import joi from "joi";

export const validateId = (id) => {
    const Schema = joi.object({
        _id: joi.string().required(),
    });
    // Below 'validateAsync' alwayse returns a 'Promise' function rather than an 'Object'
    // Also if we work with Synchronous method it will take much time
    return Schema.validateAsync(id);
}

export const validateCategory = (category) => {
    const Schema = joi.object({
        category: joi.string().required(),
    });
    return Schema.validateAsync(category);
}

export const validateSearchString = (SearchString) => {
    const Schema = joi.object({
        SearchString: joi.string().required(),
    });
    return Schema.validateAsync(SearchString);
}