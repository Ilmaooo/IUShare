import React from "react";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import { Alert, Space, Spin } from 'antd';

const Spinner = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div className="spinner">
      <div className="bg-opacity-25 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <Spin tip="Loading..." size="large">
     
    </Spin>
  
      </div>
    </div>
  );
};

export default Spinner;

