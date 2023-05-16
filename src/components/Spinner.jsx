import React from "react";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

const Spinner = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div className="spinner">
      <div className="bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
        <PacmanLoader
          color="hsla(200, 67%, 53%, 1)"
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Spinner;
