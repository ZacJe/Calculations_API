import React from "react";
import { render, screen } from "@testing-library/react";
import DownloadButton from "../app/components/DownloadButton";

// Test de rendu du bouton download
describe("DownloadButton Component", () => {
  test("renders the download button", () => {
    render(<DownloadButton />);
    const buttonElement = screen.getByText("Download Calculations");
    expect(buttonElement).toBeInTheDocument();
  });
});
