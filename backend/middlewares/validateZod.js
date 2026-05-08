// import { Schema } from "zod";

export const validate = (schema) => (req, res, next) => {
    // check this schema gerenal
    const result = schema.safeParse(req.body);

    console.log("Result", result)

    if(!result.success){
        // waxaa latirtirayaa validation kiihore ee oo soo saray serverku
        const formatted = result.error.format();
        console.log("formatted", formatted)
        console.log("formatted",  Object.keys(formatted))
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            // message laga la baxayaa error-kii inagu isticmalayna object.key
            error: Object.keys(formatted)
            .filter(key => key !== "_errors")
            .map(field => ({
                field,
                message: formatted[field]._errors?.[0] || "Invalid input"
            }))
        })
    }
    next();
}