import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../app/components/Button";

// Tests du bouton générique
describe("Button Component", () => {
  test("renders with correct text and background color", () => {
    render(<Button onClick={() => {}} bgColor="bg-blue-500" text="Click Me" />);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("bg-blue-500");
  });

  test("calls onClick function when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} bgColor="bg-blue-500" text="Click Me" />
    );
    const buttonElement = screen.getByText("Click Me");

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
