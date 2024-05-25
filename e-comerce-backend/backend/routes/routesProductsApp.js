module.exports = function (app) {
    app.use("/api/products", require("./productRoutes"))
  };