import React from "react";
import { Card, Skeleton } from "antd";

const { Meta } = Card;

const AdminProductCard = ({ product, loading }) => {
  const { title, description, images } = product;

  return (
    <Skeleton loading={loading} active>
      <Card
        style={{ width: 240 }}
        cover={
          <img
            className="product-img p-3"
            alt={title}
            src={images && images.length ? images[0].url : ""}
          />
        }
      >
        <Meta title={title} description={description} />
      </Card>
    </Skeleton>
  );
};

export default AdminProductCard;
