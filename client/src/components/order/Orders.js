import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../card/ShowPaymentInfo";
import { Select, Tag } from "antd";

const Orders = ({ orders, handleStatusChange }) => {
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
  return (
    <div className="row">
      {orders.map((order) => (
        <div className="col-md-12 pb-3" key={order._id}>
          <ShowPaymentInfo order={order} showStatus={false} />

          <div className="row">
            <div className="col-md-4">Delivery Status</div>
            <div className="col-md-4">
              <Select
                defaultValue={order.orderStatus}
                name="status"
                onChange={(value) => handleStatusChange(order._id, value)}
              >
                <Select.Option value="Not Processed">
                  Not Processed
                </Select.Option>
                <Select.Option value="Processing">Processing</Select.Option>
                <Select.Option value="Dispatched">Dispatched</Select.Option>
                <Select.Option value="Cancelled">Cancelled</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
              </Select>
            </div>
          </div>

          <hr />
          {showOrderTable(order)}
        </div>
      ))}
    </div>
  );
};

export default Orders;
