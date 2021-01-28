import React from "react";
import { Input, Button } from "antd";

const CategoryForm = ({ place, name, setName, handleSubmit }) => {
  return (
    <form>
      <div className="form-group">
        <Input
          type="text"
          size="large"
          placeholder={`Enter ${place} name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
      </div>
      <div className="form-group">
        <Button type="primary" size="large" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
