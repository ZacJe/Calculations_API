import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Calculator from "../app/components/Calculator";
import axios from "axios";

// Tests de la calculatrice

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Calculator Component", () => {
  test("renders calculator input and buttons", () => {
    render(<Calculator />);
    const inputElement = screen.getByPlaceholderText(
      /Enter a number or operator/i
    );
    expect(inputElement).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Calculate")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  test("adds number to expression", () => {
    render(<Calculator />);
    const inputElement = screen.getByPlaceholderText(
      /Enter a number or operator/i
    );
    const addButton = screen.getByText("Add");

    fireEvent.change(inputElement, { target: { value: "2" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Expression: 2/)).toBeInTheDocument();
  });

  test("clears the expression", () => {
    render(<Calculator />);
    const inputElement = screen.getByPlaceholderText(
      /Enter a number or operator/i
    );
    const addButton = screen.getByText("Add");
    const clearButton = screen.getByText("Clear");

    fireEvent.change(inputElement, { target: { value: "2" } });
    fireEvent.click(addButton);
    fireEvent.click(clearButton);

    expect(screen.queryByText(/Expression: 2/)).not.toBeInTheDocument();
  });

  test("calculates expression and displays result", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { result: 5 } });

    render(<Calculator />);
    const inputElement = screen.getByPlaceholderText(
      /Enter a number or operator/i
    );
    const addButton = screen.getByText("Add");
    const calculateButton = screen.getByText("Calculate");

    fireEvent.change(inputElement, { target: { value: "2" } });
    fireEvent.click(addButton);
    fireEvent.change(inputElement, { target: { value: "3" } });
    fireEvent.click(addButton);
    fireEvent.change(inputElement, { target: { value: "+" } });
    fireEvent.click(addButton);

    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText(/Result: 5/)).toBeInTheDocument();
    });
  });

  test("displays error on invalid expression", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Invalid expression"));

    render(<Calculator />);
    const inputElement = screen.getByPlaceholderText(
      /Enter a number or operator/i
    );
    const addButton = screen.getByText("Add");
    const calculateButton = screen.getByText("Calculate");

    fireEvent.change(inputElement, { target: { value: "2" } });
    fireEvent.click(addButton);
    fireEvent.change(inputElement, { target: { value: "+" } });
    fireEvent.click(addButton);
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid expression/)).toBeInTheDocument();
    });
  });
});
