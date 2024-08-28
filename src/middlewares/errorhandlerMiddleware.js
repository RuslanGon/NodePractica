export const errorhandlerMiddleware = (error, req, res, next) => {
    res.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error
    });
};
