import React, { useState, useEffect } from 'react';
const Checkbox = (props) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (item) => () => {};
  return props.categories.map((item, key) => {
    return (
      <li key={item._id} className="list-unstyled">
        <input
          onChange={handleToggle(item._id)}
          type="checkbox"
          className="form-check-input"
        />
        <label className="form-check-label"> {item.name}</label>
      </li>
    );
  });
};

export default Checkbox;
