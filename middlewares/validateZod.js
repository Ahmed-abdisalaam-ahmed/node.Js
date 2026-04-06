// import { Schema } from "zod";

export const validate = (schema) => (req, res, next) => {
    // check this schema gerenal
    const result = schema.safeParse(req.body);

    console.log("Result", result)

    if(!result.success){
        const formatted = result.error.format();
        console.log("formatted", formatted)
        console.log("formatted",  Object.keys(formatted))
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            error: Object.keys(formatted).map(field => ({
                field,
                message: formatted[field]._error?.[0] || "Invalid input"
            }))
        })
    }
    next();
}