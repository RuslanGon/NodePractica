export const errorhandlerMiddleware = (error, req, res, next) => {
    res.status(500).send(error.message);
};
