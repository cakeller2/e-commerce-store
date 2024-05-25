module.exports = function (app) {
    app.use("/api/cart", require("./cartRoutes"))
};