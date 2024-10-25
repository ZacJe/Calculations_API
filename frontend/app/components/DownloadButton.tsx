"use client";
import React from "react";
import Button from "./Button";

// Mise en place du bouton faisant appel à l'API pour télécharger le csv
const DownloadButton: React.FC = () => {
  const downloadCSV = async () => {
    try {
      const response = await fetch("http://localhost:8000/calculations/", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to download CSV");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Créer un lien temporaire pour télécharger le fichier
      const link = document.createElement("a");
      link.href = url;
      link.download = "calculations.csv";
      document.body.appendChild(link);
      link.click();

      // Supprimer le lien temporaire après téléchargement
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <Button
      onClick={downloadCSV}
      bgColor="bg-blue-500"
      text="Download Calculations"
    />
  );
};

export default DownloadButton;
