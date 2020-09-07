import React from 'react';

const ShowImage = (props) => {
  return (
    <div className="product-img" style={{ height: '200px', width: '200px' }}>
      <img
        src={`http://127.0.0.1:8000/api/v1/product/photo/${props.item._id}`}
        alt={props.item.name}
        className="mb-3 text-center"
        style={{
          objectFit: 'cover',
          maxWidth: '2OOpx',
          maxHeight: '200px',
        }}
      />
    </div>
  );
};

export default ShowImage;
