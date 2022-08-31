import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Customer from "../customer/customer";
import { product_list_columns, top_products_columns } from "./customer_data";
import { PRODUCT_LIST, TOP_PRODUCTS } from "../../api";

const Dashboard = () => {
  const [isLoading_product_list, setLoading_product_list] = useState(true);
  const [table_product_list, setTable_product_list] = useState({
    columns: product_list_columns,
    data: {},
  });

  const [isLoading_top_products_list, setLoading_top_products_list] =
    useState(true);
  const [table_top_products_list, setTable_top_products_list] = useState({
    columns: top_products_columns,
    data: {},
  });

  useEffect(() => {
    // List Raw materials
    axios.get(PRODUCT_LIST).then((response) => {
      setTable_product_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_product_list(false);
    });

    // List Top Products
    axios.get(TOP_PRODUCTS).then((response) => {
      setTable_top_products_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_top_products_list(false);
    });
  }, []);

  if (isLoading_product_list || isLoading_top_products_list) {
    return <div className="main">Loading...</div>;
  }

  return (
    <>
      <Customer />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="product" title="Products">
                  <DataTableExtensions {...table_product_list}>
                    <DataTable
                      columns1={table_product_list.columns}
                      data1={table_product_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="top_product" title="Top Products">
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
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
