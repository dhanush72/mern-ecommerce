import React from "react";
import { Input } from "antd";

const CategorySearch = ({ query, setQuery }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };
  return (
    <div className="form-group">
      <Input
        type="search"
        size="large"
        placeholder="Search...."
        value={query}
        onChange={handleSearch}
        autoFocus
        required
      />
    </div>
  );
};

export default CategorySearch;
