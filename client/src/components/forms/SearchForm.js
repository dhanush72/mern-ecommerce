import React from "react";
import { Input } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const { Search } = Input;

const SearchForm = () => {
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop/${text}`);
  };

  const handleSearch = () => {
    history.push(`/shop/${text}`);
  };

  return (
    <form className="mb-0  pb-0" onSubmit={handleSubmit}>
      {/* <input
        type="search"
        className="form-control mr-sm-2"
        placeholder="Search...."
        value={text}
        onChange={handleChange}
      /> */}
      <Search
        placeholder="Search..."
        value={text}
        onChange={handleChange}
        enterButton
        onSearch={handleSearch}
      />
    </form>
  );
};

export default SearchForm;
