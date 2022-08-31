import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import {
  rm_list_columns,
  vendor_list_columns,
  purchase_order_list_columns,
} from "./purchase_data";
import {
  RAW_MATERIAL_ALERT,
  PURCHASE_VENDOR_LIST,
  PURCHASE_LIST_RAW_MATERIALS,
  PURCHASE_ORDER_LIST,
  PURCHASE_SCARCE_RAW_MATERIALS,
  PURCHASE_ABUNDANT_RAW_MATERIALS,
} from "../../api";

import PurchaseHeader from "../purchase_header";

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
    // List Raw materials
    axios.get(PURCHASE_LIST_RAW_MATERIALS).then((response) => {
      setTable_rm_list((prevState) => ({
        ...prevState,

        data: response.data,
      }));
      setLoading_rm_list(false);
    });

    // List vendors
    axios.get(PURCHASE_VENDOR_LIST).then((response) => {
      setTable_vendor_list((prevState) => ({
        ...prevState,
        data: response.data,
      }));
      setLoading_vendor_list(false);
    });

    // List purchase orders in descending order by date
    axios.get(PURCHASE_ORDER_LIST).then((response) => {
      response.data.forEach((element) => {
        if (element.pur_ord_status == 1) {
          element.status = "Delivered";
        } else if (element.pur_ord_status == 0) {
          element.status = "Not Delivered";
        } else {
          element.status = "Cancelled";
        }
      });

      setTable_purch_order_list((prevState) => ({
        ...prevState,
        data: response.data,
      }));
      setLoading_purch_order_list(false);
    });

    // Scarce Raw Materials
    axios.get(PURCHASE_SCARCE_RAW_MATERIALS).then((response) => {
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
    axios.get(PURCHASE_ABUNDANT_RAW_MATERIALS).then((response) => {
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
  }, []);

  if (
    isLoading_rm_list ||
    isLoading_vendor_list ||
    isLoading_purch_order_list ||
    isLoading_scarce_rm ||
    isLoading_abundant_rm
  ) {
    return <div className="main">Loading...</div>;
  }

  return (
    <>
      <PurchaseHeader />

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="raw_material" title="Raw Material">
                  <DataTableExtensions {...table_rm_list}>
                    <DataTable
                      columns1={table_rm_list.columns}
                      data1={table_rm_list.data}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </DataTableExtensions>
                </Tab>

                <Tab eventKey="vendors" title="Vendors">
                  <DataTableExtensions {...table_vendor_list}>
                    <DataTable
                      columns1={table_vendor_list.columns}
                      data1={table_vendor_list.data}
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
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
