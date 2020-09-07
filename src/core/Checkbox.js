import React, { useState, useEffect } from 'react';
const Checkbox = (props) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (item) => () => {
    const currentCategoryId = checked.indexOf(item);

    const newCheckedCategoryId = [...checked];

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(item);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    setChecked(newCheckedCategoryId);
    props.handleFilters(newCheckedCategoryId);
  };
  return props.categories.map((item, key) => {
    return (
      <li key={item._id} className="list-unstyled">
        <input
          onChange={handleToggle(item._id)}
          value={checked.indexOf(item._id === -1)}
          type="checkbox"
          className="form-check-input"
        />
        <label className="form-check-label"> {item.name}</label>
      </li>
    );
  });
};

export default Checkbox;
