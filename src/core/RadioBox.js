import React, { useState } from 'react';

const RadioBox = (props) => {
  const [values, setValues] = useState(0);
  const handleChange = (event) => {
    props.handleFilters(event.target.value);
    setValues(event.target.value);
  };
  return props.prices.map((item, key) => {
    return (
      <li key={item._id} className="list-unstyled ml-0">
        <input
          onChange={handleChange}
          value={`${item._id}`}
          name={item.name}
          type="radio"
          className="ml-0 mr-0"
        />
        <label className="form-check-label"> {item.name}</label>
      </li>
    );
  });
};

export default RadioBox;
