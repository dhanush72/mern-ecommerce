import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { useSelector } from "react-redux";
import { getUserOrders } from "../../functions/user";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import ShowPaymentInfo from "../../components/card/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = (e) => {
    getUserOrders(user.token)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const showOrderTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">
            <b>Title</b>
          </th>
          <th scope="col">
            <b>Price</b>
          </th>
          <th scope="col">
            <b>Brand</b>
          </th>
          <th scope="col">
            <b>Color</b>
          </th>
          <th scope="col">
            <b>Count</b>
          </th>
          <th scope="col">
            <b>Status</b>
          </th>
          <th scope="col">
            <b>Shipping</b>
          </th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, index) => (
          <tr key={index}>
            <td> {p.product.title} </td>
            <td> {p.product.price} </td>
            <td> {p.product.brand} </td>
            <td> {p.product.color} </td>
            <td> {p.count} </td>
            <td>
              <Tag color="processing">{order.orderStatus}</Tag>
            </td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined className="text-success" />
              ) : (
                <CloseCircleOutlined className="text-danger" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showPDFDownload = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn ant-btn-primary text-white"
    >
      Download PDF
    </PDFDownloadLink>
  );

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col  py-2">
            <h4>{orders.length ? "Purchase Orders" : "No Purchase yet"}</h4>
            {orders.map((order, index) => (
              <div key={index} className="card mb-3 p-3 ">
                <ShowPaymentInfo order={order} />
                <h6> Order Info</h6>
                {showOrderTable(order)}
                <div className="row">
                  <div className="col">{showPDFDownload(order)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
