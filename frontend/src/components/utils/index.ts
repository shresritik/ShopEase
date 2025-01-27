import { getAllOrders } from "../../api/ordersApi";
import { Order, OrderDetail, OrderProduct } from "../../interface/order";
import { createElement } from "../../utils/createElement";
import { toast } from "../../utils/toast";

export const mapOrdersToDetail = (orders: Order[]): OrderDetail[][] => {
  return orders.map((order: Order) => [
    {
      id: order.id,
      totalAmount: +(order.totalAmount ?? 0),
      user: order.user ? order.user.name : "",
      profit: order.profit,
      vat: order.vat,
      status: order.status,
      discountValue: order.discount ? `${order.discount.percentage}%` : "0%",
      discountCode: order.discount?.code,
      createdAt: order.createdAt,
      products: order.OrderProduct.map((e: OrderProduct) => [
        {
          category: e.category.categoryName,
          netAmount: +e.netAmount,
          productName: e.product.productName,
          sellingPrice: +e.product.sellingPrice,
          costPrice: +e.product.costPrice,
          pic: e.product.pic,
          quantity: e.quantity,
        },
      ]),
    },
  ]);
};
//download or generate report in excel
export const downloadAllOrders = async () => {
  const orders = await getAllOrders();

  if (!orders || orders.length === 0) {
    toast("No orders to download", "danger");
    return;
  }
  let amount = 0;
  let csv =
    "Order ID,User,Products,Payment,Discount,Coupon,Created At,Total Amount,Profit,,\n";
  // converting the orders to csv format
  orders.forEach((order: Order) => {
    const products = order.OrderProduct.map(
      (p: { product: { productName: string }; quantity: number }) =>
        `${p.product.productName}(${p.quantity})`
    ).join("; ");
    amount += +order.profit;
    csv += `${order.id},${order.user?.name || ""},${products},${order.status},${
      order?.discount?.percentage! + "%"
    },${order?.discount?.code || ""},${order.createdAt},${order.totalAmount},${
      order.profit
    }\n`;
  });
  csv += `,,,,,,,Total Profit,` + amount;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = createElement("a") as HTMLAnchorElement;
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "all_orders.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
