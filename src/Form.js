import React, { useState } from "react";
import "./styles.css";
import FormField from "./FormField";

const fieldTypes = [
  { label: "Text Input", value: "text" },
  { label: "Textarea", value: "textarea" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Dropdown", value: "dropdown" },
  { label: "Radio Button", value: "radio" },
];

/**
 * Form component to dynamically generate form fields.
 * @param {object} props Component props.
 * @param {array} props.formFields Array of form field objects.
 * @param {function} props.handleSubmit Function to handle form submission.
 * @param {function} props.saveConfiguration Function to save form configuration.
 * @param {function} props.loadConfiguration Function to load form configuration.
 * @param {function} props.setFormFields Function to set form fields.
 * @returns {JSX.Element}
 */
const Form = ({
  formFields,
  handleSubmit,
  saveConfiguration,
  loadConfiguration,
  setFormFields,
}) => {
  const [errors, setErrors] = useState({});

  //Adds a new form field to the formFields state.
  const addFormField = (type) => {
    const newField = {
      type,
      label: "",
      value: "",
      options: [], // For dropdown, radio button and checkbox fields
      id: Date.now(), // Assign a unique identifier to the new field
    };

    if (type === "radio") {
      newField.options = ["I Agree", "I Disagree"];
    } else if (type === "checkbox") {
      newField.options = [
        { label: "Option 1", checked: false },
        { label: "Option 2", checked: false },
      ];
    } else if (type === "dropdown") {
      newField.options = ["Option 1", "Option 2"];
    }
    setFormFields([...formFields, newField]);
  };

  // Removes a form field from the formFields state.
  const removeFormField = (id) => {
    const updatedFormFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFormFields);
  };

  // Function to update form field value.
  const updateFormField = (id, value) => {
    setFormFields((prevFormFields) =>
      prevFormFields.map((field) =>
        field.id === id ? { ...field, value: value } : field
      )
    );
  };

  // Function to validate form fields and sets errors state.
  const validateForm = () => {
    const errors = {};
    formFields.forEach((field) => {
      if (field.type === "checkbox") {
        const checkedOptions = field.options.filter((option) => option.checked);
        if (checkedOptions.length === 0) {
          errors[field.id] = "Atleast one option should be selected";
        }
      } else {
        if (!field.value) {
          errors[field.id] = "Field is required";
        }
      }
    });
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  //Handles form submission.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      handleSubmit();
    }
  };

  //Element to render submit button
  const submitButton = (
    <div>
      <button className="btn submit-btn" type="submit">
        Submit
      </button>
    </div>
  );

  //Element to render configurations button
  const configurationsButton = (
    <div className="configurationsButton">
      <button onClick={saveConfiguration} className="btn">
        Save Configuration
      </button>
      <button onClick={loadConfiguration} className="btn">
        Load Configuration
      </button>
    </div>
  );

  return (
    <>
      <div className="container">
        <div className="form-generator">
          <form onSubmit={handleFormSubmit}>
            {formFields.map((field, index) => (
              <div>
                <FormField
                  key={field.id}
                  index={field.id}
                  field={field}
                  removeFormField={removeFormField}
                  updateFormField={updateFormField}
                  error={errors[field.id]}
                />
              </div>
            ))}
            <div className="field-type-selector">
              <label>Select Field Type:</label>
              <select
                value="Select"
                onChange={(e) => addFormField(e.target.value)}
              >
                <option value="">Select</option>
                {fieldTypes.map((fieldType, index) => (
                  <option key={index} value={fieldType.value}>
                    {fieldType.label}
                  </option>
                ))}
              </select>
            </div>
            {formFields.length > 0 && submitButton}
          </form>
        </div>
        {configurationsButton}
      </div>
    </>
  );
};

export default Form;
