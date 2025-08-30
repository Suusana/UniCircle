import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./Router.jsx";

function App() {
  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((res) => res.text())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
