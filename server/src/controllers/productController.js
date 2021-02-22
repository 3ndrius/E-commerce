
/* Get all Products */
exports.getProducts = ((req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Display all products from database"
    })
});
