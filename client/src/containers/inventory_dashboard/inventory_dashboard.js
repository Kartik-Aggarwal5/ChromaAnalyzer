import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  RAW_MATERIAL_ALERT,
  PRODUCT_ALERT,
  LIST_RAW_MATERIALS,
  VENDOR_LIST,
  INVENTORY_PURCHASE_ORDER_LIST,
  SCARE_RAW_MATERIALS,
  ABUNDANT_RAW_MATERIALS,
  PRODUCTION_LIST,
  SALES_LIST_CUSTOMER,
  SALES_ORDER_LIST,
  SALES_PRODUCT_LIST,
  SALES_WORST_PRODUCTS,
  SALES_TOP_PRODUCTS,
  SALES_TOP_CUSTOMERS,
  SALES_WORST_CUSTOMERS,
} from "../../api";
import "react-data-table-component-extensions/dist/index.css";
import InventoryHeader from "../inventory_header";

import {
  rm_list_columns,
  vendor_list_columns,
  purchase_order_list_columns,
  customer_list_columns,
  sales_order_list_columns,
  product_list_columns,
  top_products_columns,
  worst_products_columns,
  top_customers_columns,
  worst_customers_columns,
  production_columns,
} from "./inventory_data";

const Dashboard = () => {
  const [isLoading_rm_list, setLoading_rm_list] = useState(true);
  const [table_rm_list, setTable_rm_list] = useState({
    columns: rm_list_columns,
    data: {},
  });

  const [isLoading_vendor_list, setLoading_vendor_list] = useState(true);
  const [table_vendor_list, setTable_vendor_list] = useState({
    columns: vendor_list_columns,
    data: {},
  });

  const [isLoading_purch_order_list, setLoading_purch_order_list] =
    useState(true);
  const [table_purch_order_list, setTable_purch_order_list] = useState({
    columns: purchase_order_list_columns,
    data: {},
  });

  const [isLoading_scarce_rm, setLoading_scarce_rm] = useState(true);
  const [table_scarce_rm, setTable_scarce_rm] = useState({
    columns: rm_list_columns,
    data: {},
  });

  const [isLoading_abundant_rm, setLoading_abundant_rm] = useState(true);
  const [table_abundant_rm, setTable_abundant_rm] = useState({
    columns: rm_list_columns,
    data: {},
  });

  const [isLoading_customer_list, setLoading_customer_list] = useState(true);
  const [table_customer_list, setTable_customer_list] = useState({
    columns: customer_list_columns,
    data: {},
  });

  const [isLoading_sales_order_list, setLoading_sales_order_list] =
    useState(true);
  const [table_sales_order_list, setTable_sales_order_list] = useState({
    columns: sales_order_list_columns,
    data: {},
  });

  const [isLoading_product_order_list, setLoading_product_order_list] =
    useState(true);
  const [table_product_order_list, setTable_product_order_list] = useState({
    columns: product_list_columns,
    data: {},
  });

  const [isLoading_top_products_list, setLoading_top_products_list] =
    useState(true);
  const [table_top_products_list, setTable_top_products_list] = useState({
    columns: top_products_columns,
    data: {},
  });

  const [isLoading_worst_products_list, setLoading_worst_products_list] =
    useState(true);
  const [table_worst_products_list, setTable_worst_products_list] = useState({
    columns: worst_products_columns,
    data: {},
  });

  const [isLoading_top_customers_list, setLoading_top_customers_list] =
    useState(true);
  const [table_top_customers_list, setTable_top_customers_list] = useState({
    columns: top_customers_columns,
    data: {},
  });

  const [isLoading_worst_customers_list, setLoading_worst_customers_list] =
    useState(true);
  const [table_worst_customers_list, setTable_worst_customers_list] = useState({
    columns: worst_customers_columns,
    data: {},
  });

  const [isLoading_production_list, setLoading_production_list] =
    useState(true);
  const [table_production_list, setTable_production_list] = useState({
    columns: production_columns,
    data: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchData = await axios.get(RAW_MATERIAL_ALERT);
        console.log(fetchData);
        if (fetchData && fetchData.data) {
          fetchData.data.map((data) => {
            return toast.info(`Alert!! ${data.rm_name} stock is low!!!`, {
              position: "top-right",
              autoClose: 5000004,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchData = await axios.get(PRODUCT_ALERT);
        console.log(fetchData);
        if (fetchData && fetchData.data) {
          fetchData.data.map((data) => {
            return toast.info(
              `Alert!! ${data.prod_name} of ${data.prod_vol} litre is low!!!`,
              {
                position: "top-right",
                autoClose: 5000004,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // List Raw materials
    axios.get(LIST_RAW_MATERIALS).then((response) => {
      setTable_rm_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_rm_list(false);
    });

    // List vendors
    axios.get(VENDOR_LIST).then((response) => {
      setTable_vendor_list((prevState) => ({
        ...prevState,
        data: response.data,
      }));
      setLoading_vendor_list(false);
    });

    // List purchase orders in descending order by date
    axios.get(INVENTORY_PURCHASE_ORDER_LIST).then((response) => {
      response.data.forEach((element) => {
        if (element.pur_ord_status == 1) {
          element.status = "Delivered";
        } else {
          element.status = "Not Delivered";
        }
      });

      setTable_purch_order_list((prevState) => ({
        ...prevState,
        data: response.data,
      }));
      setLoading_purch_order_list(false);
    });

    // Scarce Raw Materials
    axios.get(SCARE_RAW_MATERIALS).then((response) => {
      var mydata = response.data;
      if (mydata.length > 5) {
        mydata = mydata.slice(0, 1);
      }
      setTable_scarce_rm((prevState) => ({
        ...prevState,

        data: mydata,
      }));
      setLoading_scarce_rm(false);
    });

    // Abundant Raw Materials
    axios.get(ABUNDANT_RAW_MATERIALS).then((response) => {
      var mydata = response.data;
      if (mydata.length > 5) {
        mydata = mydata.slice(0, 1);
      }
      setTable_abundant_rm((prevState) => ({
        ...prevState,

        data: mydata,
      }));
      setLoading_abundant_rm(false);
    });

    // List Raw materials
    axios.get(SALES_LIST_CUSTOMER).then((response) => {
      response.data.forEach((element) => {
        element.name = element.c_fname + " " + element.c_lname;
      });

      setTable_customer_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_customer_list(false);
    });

    // List Sales Orders
    axios.get(SALES_ORDER_LIST).then((response) => {
      response.data.forEach((element) => {
        element.c_name = element.c_fname + " " + element.c_lname;
        element.cost = element.qty * element.prod_ppu;

        if (element.sales_ord_status == 1) {
          element.status = "Delivered";
        } else {
          element.status = "Not Delivered";
        }
      });

      setTable_sales_order_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_sales_order_list(false);
    });

    // List Products
    axios.get(SALES_PRODUCT_LIST).then((response) => {
      setTable_product_order_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_product_order_list(false);
    });

    // List Top Products
    axios.get(SALES_TOP_PRODUCTS).then((response) => {
      setTable_top_products_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_top_products_list(false);
    });

    // List Worst Products
    axios.get(SALES_WORST_PRODUCTS).then((response) => {
      setTable_worst_products_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_worst_products_list(false);
    });

    // List Top Customers
    axios.get(SALES_TOP_CUSTOMERS).then((response) => {
      response.data.forEach((element) => {
        element.name = element.c_fname + " " + element.c_lname;
      });
      setTable_top_customers_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_top_customers_list(false);
    });

    // List Worst Customers
    axios.get(SALES_WORST_CUSTOMERS).then((response) => {
      response.data.forEach((element) => {
        element.name = element.c_fname + " " + element.c_lname;
      });
      setTable_worst_customers_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_worst_customers_list(false);
    });

    // List Production
    axios.get(PRODUCTION_LIST).then((response) => {
      setTable_production_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_production_list(false);
    });
  }, []);

  if (
    isLoading_rm_list ||
    isLoading_vendor_list ||
    isLoading_purch_order_list ||
    isLoading_scarce_rm ||
    isLoading_abundant_rm ||
    isLoading_customer_list ||
    isLoading_sales_order_list ||
    isLoading_product_order_list ||
    isLoading_top_products_list ||
    isLoading_worst_products_list ||
    isLoading_top_customers_list ||
    isLoading_worst_customers_list ||
    isLoading_production_list
  ) {
    return <div className="main">Loading...</div>;
  }

  return (
    <>
      <InventoryHeader />

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="production" title="Production">
                  <DataTableExtensions {...table_production_list}>
                    <DataTable
                      columns1={table_production_list.columns}
                      data1={table_production_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="purchase_orders" title="Purchase Orders">
                  <DataTableExtensions {...table_purch_order_list}>
                    <DataTable
                      columns1={table_purch_order_list.columns}
                      data1={table_purch_order_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="scarce_rm" title="Scarce Raw Materials">
                  <DataTableExtensions {...table_scarce_rm}>
                    <DataTable
                      columns1={table_scarce_rm.columns}
                      data1={table_scarce_rm.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="abundant_rm" title="Abundant Raw Materials">
                  <DataTableExtensions {...table_abundant_rm}>
                    <DataTable
                      columns1={table_abundant_rm.columns}
                      data1={table_abundant_rm.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="top_products" title="Top Products">
                  <DataTableExtensions {...table_top_products_list}>
                    <DataTable
                      columns1={table_top_products_list.columns}
                      data1={table_top_products_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="worst_products" title="Low Selling Products">
                  <DataTableExtensions {...table_worst_products_list}>
                    <DataTable
                      columns1={table_worst_products_list.columns}
                      data1={table_worst_products_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="top_customers" title="Top Customers">
                  <DataTableExtensions {...table_top_customers_list}>
                    <DataTable
                      columns1={table_top_customers_list.columns}
                      data1={table_top_customers_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab
                  eventKey="worst_customers"
                  title="Low Purchasing Customers"
                >
                  <DataTableExtensions {...table_worst_customers_list}>
                    <DataTable
                      columns1={table_worst_customers_list.columns}
                      data1={table_worst_customers_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
