// middlewares/validate.js
const { ZodError } = require("zod");

const validate =
  (schema, type = "body") =>
  (req, res, next) => {
    try {
      const data = req[type];
      const parsed = schema.parse(data);
      req[type] = parsed; // reemplaza con la versión "sanitizada"
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Input validation failed",
          errors: error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };

module.exports = validate;
