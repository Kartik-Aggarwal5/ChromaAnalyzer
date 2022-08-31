import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { toast } from "react-toastify";
import "react-data-table-component-extensions/dist/index.css";
import SalesHeader from "../sales_header";

import {
  customer_list_columns,
  sales_order_list_columns,
  product_list_columns,
  top_products_columns,
  worst_products_columns,
  top_customers_columns,
  worst_customers_columns,
} from "./sales_data";
import {
  PRODUCT_ALERT,
  SALES_LIST_CUSTOMER,
  SALES_ORDER_LIST,
  SALES_PRODUCT_LIST,
  SALES_WORST_PRODUCTS,
  SALES_TOP_PRODUCTS,
  SALES_TOP_CUSTOMERS,
  SALES_WORST_CUSTOMERS,
} from "../../api";

const Dashboard = () => {
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
        } else if (element.sales_ord_status == 0) {
          element.status = "Not Delivered";
        } else {
          element.status = "Cancelled";
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
  }, []);

  if (
    isLoading_customer_list ||
    isLoading_sales_order_list ||
    isLoading_product_order_list ||
    isLoading_top_products_list ||
    isLoading_worst_products_list ||
    isLoading_top_customers_list ||
    isLoading_worst_customers_list
  ) {
    return <div className="main">Loading...</div>;
  }

  return (
    <>
      <SalesHeader />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="customers" title="Customers">
                  <DataTableExtensions {...table_customer_list}>
                    <DataTable
                      columns1={table_customer_list.columns}
                      data1={table_customer_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="sales_orders" title="Sales Orders">
                  <DataTableExtensions {...table_sales_order_list}>
                    <DataTable
                      columns1={table_sales_order_list.columns}
                      data1={table_sales_order_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="products" title="Products">
                  <DataTableExtensions {...table_product_order_list}>
                    <DataTable
                      columns1={table_product_order_list.columns}
                      data1={table_product_order_list.data}
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
