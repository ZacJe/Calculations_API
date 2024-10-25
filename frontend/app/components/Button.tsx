import React from "react";

interface ButtonProps {
  onClick: () => void;
  bgColor: string;
  text: string;
}

// Mise en place d'un bouton générique
const Button: React.FC<ButtonProps> = ({ onClick, bgColor, text }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 mt-2 font-semibold text-white ${bgColor} rounded-md hover:brightness-110`}
    >
      {text}
    </button>
  );
};

export default Button;
