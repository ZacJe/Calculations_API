import React from "react";
import Calculator from "./components/Calculator";
import DownloadButton from "./components/DownloadButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          RPN Calculator
        </h1>
        <Calculator />
        <DownloadButton />
      </div>
    </div>
  );
}
