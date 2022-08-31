export const rm_list_columns = [
  {
    name: "Raw Material ID",
    selector: "rm_id",
  },
  {
    name: "Name",
    selector: "rm_name",
  },
  {
    name: "Price Per Unit",
    selector: "rm_price",
  },
  {
    name: "Current Stock",
    selector: "cur_rm_stock",
  },
];

export const vendor_list_columns = [
  {
    name: "Vendor ID",
    selector: "v_id",
  },
  {
    name: "Name",
    selector: "v_name",
  },
  {
    name: "Address",
    selector: "v_address",
  },
  {
    name: "Priority",
    selector: "v_priority",
  },
  {
    name: "Raw Material ID",
    selector: "rm_id",
  },
  {
    name: "Raw Material Name",
    selector: "rm_name",
  },
  {
    name: "Phone",
    selector: "v_phone",
  },
  {
    name: "Prioritized By",
    selector: "prioritized_by",
  },
];

export const purchase_order_list_columns = [
  {
    name: "Bill ID",
    selector: "bill_id",
  },
  {
    name: "Vendor",
    selector: "v_name",
  },
  {
    name: "Address",
    selector: "v_address",
  },
  {
    name: "Raw Material ID",
    selector: "rm_id",
  },
  {
    name: "Raw Material Name",
    selector: "rm_name",
  },
  {
    name: "Order Date",
    selector: "pur_date",
  },
  {
    name: "Delivery Date",
    selector: "pur_deliv_date",
  },
  {
    name: "Manufacturing Date",
    selector: "rm_mfg",
  },
  {
    name: "Expiry Date",
    selector: "rm_exp",
  },
  {
    name: "Status",
    selector: "status",
  },
];

export const customer_list_columns = [
  {
    name: "Customer ID",
    selector: "c_id",
  },
  {
    name: "Name",
    selector: "name",
  },
  {
    name: "Phone",
    selector: "c_phone",
  },
  {
    name: "Address",
    selector: "c_address",
  },
  {
    name: "SSN",
    selector: "c_ssn",
  },
  {
    name: "Email",
    selector: "c_email",
  },
  {
    name: "Ranking",
    selector: "c_ranking",
  },
  {
    name: "Ranked By",
    selector: "ranked_by",
  },
];

export const sales_order_list_columns = [
  {
    name: "Sales ID",
    selector: "sales_id",
  },
  {
    name: "Customer ID",
    selector: "c_id",
  },
  {
    name: "Name",
    selector: "c_name",
  },
  {
    name: "Product ID",
    selector: "prod_id",
  },
  {
    name: "Product Name",
    selector: "prod_name",
  },
  {
    name: "Quantity",
    selector: "qty",
  },
  {
    name: "Order Date",
    selector: "sales_date",
  },
  {
    name: "Delivery Date",
    selector: "sales_deliv_date",
  },
  {
    name: "Overseen By",
    selector: "overseen_by",
  },
  {
    name: "Phone",
    selector: "c_phone",
  },
  {
    name: "Addresss",
    selector: "c_address",
  },
  {
    name: "Cost",
    selector: "cost",
  },
  {
    name: "Status",
    selector: "status",
  },
];

export const product_list_columns = [
  {
    name: "Product ID",
    selector: "prod_id",
  },
  {
    name: "Name",
    selector: "prod_name",
  },
  {
    name: "Price Per Unit",
    selector: "prod_ppu",
  },

  {
    name: "Volume",
    selector: "prod_vol",
  },
  {
    name: "Current Stock",
    selector: "cur_prod_stock",
  },
];

export const top_products_columns = [
  {
    name: "Product ID",
    selector: "prod_id",
  },
  {
    name: "Name",
    selector: "prod_name",
  },
  {
    name: "Total Quantities Sold",
    selector: "quantity",
  },
];

export const worst_products_columns = [
  {
    name: "Product ID",
    selector: "prod_id",
  },
  {
    name: "Name",
    selector: "prod_name",
  },
  {
    name: "Total Quantities Sold",
    selector: "quantity",
  },
];

export const top_customers_columns = [
  {
    name: "Customer ID",
    selector: "c_id",
  },
  {
    name: "Name",
    selector: "name",
  },
  {
    name: "Total Quantities Purchased",
    selector: "quantity",
  },
];

export const worst_customers_columns = [
  {
    name: "Customer ID",
    selector: "c_id",
  },
  {
    name: "Name",
    selector: "name",
  },
  {
    name: "Total Quantities Purchased",
    selector: "quantity",
  },
];

export const production_columns = [
  {
    name: "Production ID",
    selector: "production_id",
  },
  {
    name: "Product ID",
    selector: "prod_id",
  },
  {
    name: "Product Name",
    selector: "prod_name",
  },
  {
    name: "Manufacturing Date",
    selector: "mfg_date",
  },
  {
    name: "Expiry Date",
    selector: "exp_date",
  },
  {
    name: "Quantity",
    selector: "prod_qty",
  },
  {
    name: "Current Stock",
    selector: "cur_prod_stock",
  },
  {
    name: "Signalled By",
    selector: "signalled_by",
  },
];
