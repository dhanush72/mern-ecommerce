import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // ?  redirect when count = 0
    count === 0 && history.push("/");

    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container text-center center-div">
      <h2 className="text-danger">Redirecting you in {count}</h2>
    </div>
  );
};

export default LoadingToRedirect;
