import React, { useState } from "react";
import Pagination from "rc-pagination";
const Paginate = () => {
  const [current, setCurrent] = useState(4);
  const onChange = (page) => {
    setCurrent(page);
  };
  return (
    <Pagination
      className="flex bg-yellow-200 justify-around mt-10"
      onChange={onChange}
      current={current}
      total={30}
    />
  );
};

export default Paginate;
