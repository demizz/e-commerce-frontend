import React from 'react';

const ShowImage = (props) => {
  return (
    <div className="product-img" style={{ height: '200px', width: '200px' }}>
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/product/photo/${props.item._id}`}
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
