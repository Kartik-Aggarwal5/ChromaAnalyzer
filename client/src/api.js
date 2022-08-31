const BASE_URL = "http://localhost:5000";
export const LOGIN = `${BASE_URL}/login`;
export const SIGNUP = `${BASE_URL}/signUp`;
export const EMPLOYEE = `${BASE_URL}/employee`;
export const GET_ROLE = `${BASE_URL}/getRole`;

//ALERTS
export const CREATE_NOTIFICATION = `${BASE_URL}/createNotification`;
export const UPDATE_NOTIFICATION_STATUS = `${BASE_URL}/updateNotification`;
export const GET_NOTIFICATION = `${BASE_URL}/get-notification`;
export const RAW_MATERIAL_ALERT = `${BASE_URL}/raw-material-alert`;
export const PRODUCT_ALERT = `${BASE_URL}/product-alert`;
export const ORDER_HISTORY = `${BASE_URL}/order-history`;

//CUSTOMER
export const TOP_PRODUCTS = `${BASE_URL}/customer_dashboard/top_products`;
export const PRODUCT_LIST = `${BASE_URL}/customer_dashboard/product_list`;
export const CUSTOMER = `${BASE_URL}/customer`;
export const PLACEORDER = `${BASE_URL}/place-order`;

//INVENTORY
export const LIST_RAW_MATERIALS = `${BASE_URL}/inventory_dashboard/list_raw_materials`;
export const VENDOR_LIST = `${BASE_URL}/inventory_dashboard/vendor_list`;
export const INVENTORY_PURCHASE_ORDER_LIST = `${BASE_URL}/inventory_dashboard/purchase_order_list`;
export const SCARE_RAW_MATERIALS = `${BASE_URL}/inventory_dashboard/scarce_raw_materials`;
export const ABUNDANT_RAW_MATERIALS = `${BASE_URL}/inventory_dashboard/abundant_raw_materials`;
export const PRODUCTION_LIST = `${BASE_URL}/inventory_dashboard/production_list`;
export const INVENTORY_MANAGER = `${BASE_URL}/inventory_m`;

//SALES
export const SALES_LIST_CUSTOMER = `${BASE_URL}/sales_dashboard/list_customer`;
export const SALES_ORDER_LIST = `${BASE_URL}/sales_dashboard/sales_order_list`;
export const SALES_PRODUCT_LIST = `${BASE_URL}/sales_dashboard/product_list`;
export const SALES_WORST_PRODUCTS = `${BASE_URL}/sales_dashboard/worst_products`;
export const SALES_TOP_PRODUCTS = `${BASE_URL}/sales_dashboard/top_products`;
export const SALES_TOP_CUSTOMERS = `${BASE_URL}/sales_dashboard/top_customers`;
export const SALES_WORST_CUSTOMERS = `${BASE_URL}/sales_dashboard/worst_customers`;
export const ORDERSTATUS = `${BASE_URL}/sales_order/update_sales_order_status`;
export const UNDELIVERED_ORDER_STATUS = `${BASE_URL}/sales_order/
get_undelivered_sales_orders`;
export const CUSTOMER_ID = `${BASE_URL}/customer/
get_customer_id`;
export const UNDELIVERED_CUSTOMER_ORDER = `${BASE_URL}/customer/
get_undelivered_sales_ids`;
export const CANCELSALESORDER = `${BASE_URL}/sales_order/cancel_sales_order`;
export const SALES_MANAGER = `${BASE_URL}/sales_m`;

//PURCHASE

export const UNDELIVERED_PURCHASE_ORDER = `${BASE_URL}/purchase_order/get_undelivered_purchase_orders`;
export const PURCHASE_VENDOR_LIST = `${BASE_URL}/purchase_dashboard/vendor_list`;
export const PURCHASE_LIST_RAW_MATERIALS = `${BASE_URL}/purchase_dashboard/list_raw_materials`;
export const PURCHASE_ORDER_LIST = `${BASE_URL}/purchase_dashboard/purchase_order_list`;
export const PURCHASE_SCARCE_RAW_MATERIALS = `${BASE_URL}/purchase_dashboard/scarce_raw_materials`;
export const PURCHASE_ABUNDANT_RAW_MATERIALS = `${BASE_URL}/purchase_dashboard/abundant_raw_materials`;
export const PURCHASEORDER = `${BASE_URL}/purchase/create_purchase_order`;
export const RAWMATERIAL = `${BASE_URL}/purchase/create_rm`;
export const CANCELPURCHASEORDER = `${BASE_URL}/purchase_order/cancel_purchase_order`;
export const PURCHASING_MANAGER = `${BASE_URL}/purchasing_m`;
export const PURORDERSTATUS = `${BASE_URL}/purchase_order/update_purchase_order_status`;

//PRODUCTS
export const PRODUCTIONORDER = `${BASE_URL}/production/create_production_order`;
export const PRODUCT = `${BASE_URL}/products/create_product`;
export const PRODUCTS = `${BASE_URL}/products`;
