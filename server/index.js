const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const router = express.Router();
const signup = require("./routes/signup");
const login = require("./routes/login");
const purchase_dashboard = require("./routes/purchase_dashboard");
const sales_dashboard = require("./routes/sales_dashboard");
const inventory_dashboard = require("./routes/inventory_dashboard");
const customer_dashboard = require("./routes/customer_dashboard");
const employee = require("./routes/employee");
const customer = require("./routes/customer");
const salesManager = require("./routes/salesManager");
const inventoryManager = require("./routes/inventoryManager");
const purchasingManager = require("./routes/purchasingManager");
const placeOrder = require("./routes/placeorder");
const orderHistory = require("./routes/orderhistory");
const production = require("./routes/production");
const sales_order = require("./routes/sales_order");
const purchase_order = require("./routes/purchase_order");
const purchase = require("./routes/purchase");
const products = require("./routes/products");
const createNotification = require("./routes/createNotification");
const getNotification = require("./routes/getNotification");
const RawMaterialAlert = require("./routes/rawMaterialAlert");
const ProductAlert = require("./routes/productAlert");
const getRole = require("./routes/getRole");
const updateNotification = require("./routes/updateNotification");

require("dotenv").config();

const app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/signup", signup);
app.use("/login", login);
app.use("/customer", customer);
app.use("/purchase_dashboard", purchase_dashboard);
app.use("/sales_dashboard", sales_dashboard);
app.use("/inventory_dashboard", inventory_dashboard);
app.use("/customer_dashboard", customer_dashboard);
app.use("/employee", employee);
app.use("/customer", customer);
app.use("/sales_m", salesManager);
app.use("/inventory_m", inventoryManager);
app.use("/purchasing_m", purchasingManager);
app.use("/place-order", placeOrder);
app.use("/order-history", orderHistory);
app.use("/production", production);
app.use("/sales_order", sales_order);
app.use("/purchase_order", purchase_order);
app.use("/purchase", purchase);
app.use("/products", products);
app.use("/createNotification", createNotification);
app.use("/get-notification", getNotification);
app.use("/raw-material-alert", RawMaterialAlert);
app.use("/product-alert", ProductAlert);
app.use("/getRole", getRole);
app.use("/updateNotification", updateNotification);

module.exports = app;

app.listen(5000, function () {
  console.log("App listen on port: 5000");
});
