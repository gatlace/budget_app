import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useIsLoggedIn = () => {
  const path = useRouter().pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const response = await fetch("/api/is_logged_in");
      return response.json();
    };

    checkIfLoggedIn().then((data) => {
      setIsLoggedIn(data.isLoggedIn);
    });
  }, [path]);

  return isLoggedIn;
};

export default useIsLoggedIn;
