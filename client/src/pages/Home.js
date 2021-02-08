import React from "react";
import Jumbotron from "../components/card/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubCategoryList from "../components/subcategory/SubCategoryList";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-center h1 font-weight-bold">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <NewArrivals />
      <BestSellers />
      <CategoryList />
      <SubCategoryList />
    </>
  );
};

export default Home;
