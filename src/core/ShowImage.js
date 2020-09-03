import React, { useEffect, useState } from 'react';
import axios from 'axios';
const ShowImage = (props) => {
  //   const [data, setData] = useState();
  //   const findSrc = async () => {
  //     try {
  //       const res = await axios({
  //         url: `http://127.0.0.1:8000/api/v1/product/photo/${props.item._id}`,
  //       });
  //       console.log(res.data.photo);
  //       if (res.data.status === 'success') {
  //         setData(res.data.photo);
  //       }
  //     } catch (err) {
  //       console.log(err.response.data.message);
  //     }
  //   };
  //   useEffect(() => {
  //     findSrc();
  //   }, []);
  console.log(`http://127.0.0.1:8000/api/v1/product/photo/${props.item._id}`);
  return (
    <div className="product-img">
      <img
        src={`http://127.0.0.1:8000/api/v1/product/photo/${props.item._id}`}
        alt={props.item.name}
        className="mb-3"
        style={{ maxHeight: '100%', maxHeight: '100%' }}
      />
    </div>
  );
};

export default ShowImage;
