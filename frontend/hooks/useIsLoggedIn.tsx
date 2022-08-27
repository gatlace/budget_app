import React, { useState, useEffect } from "react";

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const response = await fetch("/api/is_logged_in");
      return response.json();
    };

    checkIfLoggedIn().then((data) => {
      setIsLoggedIn(data.isLoggedIn);
    });
  }, []);

  return isLoggedIn;
};

export default useIsLoggedIn;
