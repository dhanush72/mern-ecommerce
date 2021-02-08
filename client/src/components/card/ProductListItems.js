import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";

const ProductListItems = ({ product }) => {
  const { price, subcategory, color, brand, quantity, sold } = product;

  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          Price
          <span className="label label-default label-pill pull-xs-right">
            $ {price}
          </span>
        </li>

        {subcategory && (
          <li className="list-group-item">
            Sub Categories
            {subcategory.map((sub) => (
              <Link
                to={`/subcategory/${sub.slug}`}
                className="label label-default label-pill pull-xs-right"
                key={sub._id}
              >
                <Tag color="blue">{sub.name}</Tag>
              </Link>
            ))}
          </li>
        )}

        <li className="list-group-item">
          Color
          <span className="label label-default label-pill pull-xs-right">
            {color}
          </span>
        </li>

        <li className="list-group-item">
          Brand
          <span className="label label-default label-pill pull-xs-right">
            {brand}
          </span>
        </li>

        <li className="list-group-item">
          Available
          <span className="label label-default label-pill pull-xs-right">
            {quantity}
          </span>
        </li>

        <li className="list-group-item">
          Sold
          <span className="label label-default label-pill pull-xs-right">
            {sold}
          </span>
        </li>
      </ul>
    </>
  );
};

export default ProductListItems;
