// components/AdminCard.js
import React from "react";
import { Link } from "react-router-dom";

const AdminCard = ({ title, link, value, icon, isRevenue }) => (
  <Link
    to={link}
    className="relative mx-6 z-0 bg-n-8 rounded-xl shadow-lg hover:shadow-xl border-2 border-color-7 transition duration-300 ease-in-out px-6 py-4"
  >
    <div className="flex flex-col justify-between gap-4">
      <div className="text-2xl text-color-1">
        <span>{icon}</span>
      </div>
      <div className="flex flex-col justify-between w-full">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <span
          className={`text-sm font-semibold mb-4 ${
            isRevenue ? "text-color-4/85" : "text-color-2"
          }`}
        >
          {isRevenue ? `KES ${value}` : value}
        </span>
      </div>
    </div>
    <div className="absolute top-0 right-0 p-3 text-white rounded-full">
      <span>
        <i className="fa fa-arrow-right"></i>
      </span>
    </div>
  </Link>
);

export default AdminCard;
