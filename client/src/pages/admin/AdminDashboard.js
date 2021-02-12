import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, updateOrders } from "../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = () => {
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    updateOrders(orderId, orderStatus, user.token)
      .then((res) => {
        toast.success("status updated");
        loadAllOrders();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-8">
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
