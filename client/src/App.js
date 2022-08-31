import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./containers/login";
import SignIn from "./containers/signin";
import Purchase_Dashboard from "./containers/purchase_dashboard/purchase_dashboard";
import Customer from "./containers/customer/customer";
import PlaceOrder from "./containers/customer/order";
import OrderHistory from "./containers/customer/orderhistory";
import Production from "./containers/production/production";
import ProductionOrder from "./containers/production/productionorder";
import PurchaseOrder from "./containers/purchase/purchaseorder";
import SalesOrderStatus from "./containers/customer/order_status";
import PurchaseOrderStatus from "./containers/purchase/pur_order_status";
import CancelPurchaseOrder from "./containers/purchase/cancel_pur_order";
import CancelSalesOrder from "./containers/customer/cancel_sales_order";
import CreateRawMaterial from "./containers/purchase/create_raw_material";
import CreateProduct from "./containers/product/create_product";
import ProductionHistory from "./containers/production/productionhistory";
import Admin from "./containers/admin/admin";
import Sales_Dashboard from "./containers/sales_dashboard/sales_dashboard";
import Inventory_Dashboard from "./containers/inventory_dashboard/inventory_dashboard";
import Customer_Dashboard from "./containers/customer_dashboard/customer_dashboard";
import AllNotification from "./containers/allNotification";
import Employee from "./containers/Employee/employee";
import AddEmployee from "./containers/Employee/addEmployee";

import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>

          <Route exact path="/purchase-dashboard">
            <Purchase_Dashboard />
          </Route>
          <Route exact path="/inventory-dashboard">
            <Inventory_Dashboard />
          </Route>
          <Route exact path="/sales-dashboard">
            <Sales_Dashboard />
          </Route>
          <Route exact path="/all_notification">
            <AllNotification />
          </Route>
          <Route exact path="/place-order">
            <PlaceOrder />
          </Route>
          <Route exact path="/production-order">
            <ProductionOrder />
          </Route>
          <Route exact path="/purchase-order">
            <PurchaseOrder />
          </Route>
          <Route exact path="/order-history">
            <OrderHistory />
          </Route>
          <Route exact path="/customer-dashboard">
            <Customer_Dashboard />
          </Route>
          <Route exact path="/order-history">
            <OrderHistory />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/get-employee">
            <Employee />
          </Route>
          <Route exact path="/add-employee">
            <AddEmployee />
          </Route>
          <Route exact path="/sales_order_status">
            <SalesOrderStatus />
          </Route>
          <Route exact path="/pur_order_status">
            <PurchaseOrderStatus />
          </Route>
          <Route exact path="/create_raw_material">
            <CreateRawMaterial />
          </Route>
          <Route exact path="/create_product">
            <CreateProduct />
          </Route>
          <Route exact path="/cancel-sales-order">
            <CancelSalesOrder />
          </Route>
          <Route exact path="/cancel-purchase-order">
            <CancelPurchaseOrder />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
