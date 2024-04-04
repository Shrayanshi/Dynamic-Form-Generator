import React, { useState } from "react";
import "./styles.css";
import Form from "./Form";

/**
 * Main App component.
 * @returns {JSX.Element} App component.
 */
export default function App(props) {
  const [formFields, setFormFields] = useState([]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    alert("Submitted Successfully!");
    console.log("Form submitted:", formFields);
  };

  // Function to save form configuration
  const saveConfiguration = () => {
    localStorage.setItem("formConfiguration", JSON.stringify(formFields));
    alert("Configuration saved successfully!");
  };

  // Function to load form configuration
  const loadConfiguration = () => {
    const savedConfiguration = localStorage.getItem("formConfiguration");
    if (savedConfiguration) {
      setFormFields(JSON.parse(savedConfiguration));
      alert("Configuration loaded successfully!");
    }
  };

  return (
    <div className="App">
      <Form
        formFields={formFields}
        handleSubmit={handleSubmit}
        saveConfiguration={saveConfiguration}
        loadConfiguration={loadConfiguration}
        setFormFields={setFormFields}
      />
    </div>
  );
}
