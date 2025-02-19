import React from "react";
import { Route, Routes } from "react-router";
import Help from "../pages/help/Help";
import LanguageProcessor from "../pages/home/LanguageProcessor";

const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<LanguageProcessor />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  );
};

export default AppRoute;
