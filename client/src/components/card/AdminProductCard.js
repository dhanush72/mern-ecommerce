import React from "react";
import { Card, Skeleton } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Placeholder from "../../assets/images/placeholder.png";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, loading, handleRemove }) => {
  const { title, description, images, slug } = product;

  return (
    <Skeleton loading={loading} active>
      <Card
        cover={
          <img
            className="product-img p-3"
            alt={title}
            src={images && images.length ? images[0].url : Placeholder}
          />
        }
        actions={[
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined key="edit" /> Edit
          </Link>,
          <DeleteOutlined
            onClick={() => handleRemove(slug)}
            className="text-danger"
            key="delete"
          />,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </Skeleton>
  );
};

export default AdminProductCard;
