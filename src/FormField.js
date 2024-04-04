import React, { useState } from "react";
import "./styles.css";

/**
 * FormField component to render a single form field.
 * @param {Object} props - Component props.
 * @param {Object} props.field - Form field object.
 * @param {number} props.index - Index of the form field in the form.
 * @param {Function} props.removeFormField - Function to remove the form field.
 * @param {Object} props.error - Error object for the form field.
 * @param {Function} props.updateFormField - Function to update the form field value.
 * @returns {JSX.Element} FormField component.
 */
const FormField = ({
  field,
  index,
  removeFormField,
  error,
  updateFormField,
}) => {
  const [options, setOptions] = useState(field.options);
  const [value, setValue] = useState("");

  //Handles input change for text-based form fields.
  const handleInputChange = (event) => {
    setValue(event.target.value);
    updateFormField(index, event.target.value);
  };

  //Handles checkbox change for checkbox form fields.
  const handleCheckboxChange = (optionIndex) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex].checked = !updatedOptions[optionIndex].checked;
    setOptions(updatedOptions);
    updateFormField(index, updatedOptions);
  };

  //Handles option change for dropdown form fields.
  const handleOptionChange = (optionIndex, event) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex] = event.target.value;
    setOptions(updatedOptions);
    updateFormField(index, updatedOptions);
  };

  // Adds a new option to the dropdown field.
  const handleAddOption = () => {
    setOptions([...options, ""]);
  };
  let fieldComponent;

  // Switch statement for rendering different form field types
  switch (field.type) {
    case "text":
      fieldComponent = (
        <input type="text" value={value} onChange={handleInputChange} />
      );
      break;
    case "textarea":
      fieldComponent = (
        <textarea value={field.value} onChange={handleInputChange} />
      );
      break;
    case "checkbox":
      fieldComponent = (
        <div>
          {options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => handleCheckboxChange(optionIndex)}
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      );
      break;
    case "dropdown":
      fieldComponent = (
        <div className="dropdown">
          <select
            className="form-field"
            value={value}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options?.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button className="btn" type="button" onClick={handleAddOption}>
            Add Option
          </button>
          {options?.map((option, optionIndex) => (
            <div key={optionIndex} className="option-input-container">
              <input
                type="text"
                value={option}
                onChange={(event) => handleOptionChange(optionIndex, event)}
                className="option-input"
              />
            </div>
          ))}
        </div>
      );
      break;
    case "radio":
      fieldComponent = (
        <div>
          {field?.options?.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                name={`radio-${index}`}
                value={option}
                onChange={handleInputChange}
              />{" "}
              {option}
            </label>
          ))}
        </div>
      );
      break;
    default:
      fieldComponent = null;
  }

  return (
    <div className="form-field-container">
      <label>{field.label}</label>
      {fieldComponent}
      {error && <div className="error">{error}</div>}
      {fieldComponent && (
        <button
          className="btn"
          type="button"
          onClick={removeFormField.bind(null, index)}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default FormField;
