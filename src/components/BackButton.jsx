// src/components/BackButton.js
import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ to }) => {
  return (
    <Link
      to={to}
      className="text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-400 hover:bg-yellow-500 hover:text-white"
    >
      Back
    </Link>
  );
};

export default BackButton;
