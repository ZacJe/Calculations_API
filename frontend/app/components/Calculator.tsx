"use client";
import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";

// Composant correspondant à la calculatrice
const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Fonction de validation de la saisie de l'opérateur ou du nombre
  const isValidInput = (value: string): boolean => {
    const operators = ["+", "-", "*", "/"];
    return !isNaN(Number(value)) || operators.includes(value);
  };

  // Fonction d'ajout du nombre ou de l'opérateur à l'expression
  const addToExpression = () => {
    if (isValidInput(input)) {
      setExpression([...expression, input]);
      setInput("");
      setError("");
    } else {
      setError("Veuillez entrer un nombre ou un opérateur valide (+, -, *, /)");
    }
  };

  // Fonction de réinitialisation de la calculatrice
  const clearExpression = () => {
    setExpression([]);
    setResult(null);
    setError("");
  };

  // Appel à l'API
  const calculate = async () => {
    try {
      const response = await axios.post("http://localhost:8000/calculate/", {
        expression: expression,
      });
      setResult(response.data.result);
      setError("");
    } catch (err) {
      setError(`error: ${err}`);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Enter a number or operator"
          className="flex-1 p-2 mr-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addToExpression}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">Expression: {expression.join(" ")}</p>
        <Button text="Calculate" bgColor="bg-green-500" onClick={calculate} />
        <Button text="Clear" bgColor="bg-red-500" onClick={clearExpression} />
      </div>
      {result !== null && (
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Result: {result}
        </h2>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default Calculator;
