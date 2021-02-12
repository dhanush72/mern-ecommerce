import React from "react";
import { Tag } from "antd";

const ShowPaymentInfo = ({ order }) => {
  return (
    <div>
      <h6>Payment Info</h6>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">
              <b>Order Id</b>
            </th>
            <th scope="col">
              <b>Amount</b>
            </th>
            <th scope="col">
              <b>Currency</b>
            </th>
            <th scope="col">
              <b>Method</b>
            </th>
            <th scope="col">
              <b>Payment</b>
            </th>
            <th scope="col">
              <b>Ordered</b>
            </th>
            <th scope="col">
              <b>Status</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.payment.id}</td>
            <td>
              {(order.payment.amount /= 100).toLocaleString("en-US", {
                style: "currency",
                currency: "inr",
              })}
            </td>
            <td>{order.payment.currency.toUpperCase()}</td>
            <td>
              <Tag color="success">{order.payment.status.toUpperCase()}</Tag>
            </td>
            <td>{order.payment.payment_method_types[0]}</td>
            <td>{new Date(order.payment.created * 1000).toLocaleString()}</td>
            <td>
              <Tag color="processing">{order.orderStatus.toUpperCase()}</Tag>{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowPaymentInfo;
