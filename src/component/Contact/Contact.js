import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import {
  FormControlLabel,
  Switch,
} from "@mui/material";
import contactPostAPI from "../../api/Contact/contactPostAPI";
import "./Contact.scss";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";

export default function Contact() {
  const { theme, toggle, dark } = useContext(ThemeContext);
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agree: false,
    },
    onSubmit: (values) => {
      // Send form data to the API
      contactPostAPI
        .add(values)
        .then((response) => {
          // Handle success (e.g., show a success message)
          alert("Form submitted successfully");
        })
        .catch((error) => {
          // Handle error (e.g., show an error message)
          alert("Error submitting the form");
        });
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Must be 2 characters or more.")
        .min(2, "Must be 2 characters or more"),
      email: Yup.string().required("Invalid email.").email("Invalid email"),
      phone: Yup.number()
        .integer()
        .required("Please enter a valid number.")
        .typeError("Please enter a valid number"),
      message: Yup.string()
        .required("Must be 10 characters or more.")
        .min(10, "Must be 10 characters or more"),
      agree: Yup.boolean().oneOf(
        [true],
        "The terms and conditions must be accepted."
      ),
    }),
  });

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-title">Give Us Your Feedback</div>
        <div className="contact-form">
          <form onSubmit={formik.handleSubmit}>
            <div className="contact-form-item">
              <TextField
                placeholder="Name"
                name="name"
                value={formik.values.name}
                onChange={(e) => {
                  formik.handleChange(e);
                  setFieldErrors({ ...fieldErrors, name: !formik.isValid });
                }}
              />
              {fieldErrors.name && formik.errors.name && (
                <Typography
                  className="error-input-message"
                  variant="caption"
                  color="error"
                >
                  {formik.errors.name}
                </Typography>
              )}
            </div>

            <div className="contact-form-item">
              <TextField
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  setFieldErrors({ ...fieldErrors, email: !formik.isValid });
                }}
              />
              {fieldErrors.email && formik.errors.email && (
                <Typography
                  className="error-input-message"
                  variant="caption"
                  color="error"
                >
                  {formik.errors.email}
                </Typography>
              )}
            </div>

            <div className="contact-form-item">
              <TextField
                placeholder="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={(e) => {
                  formik.handleChange(e);
                  setFieldErrors({ ...fieldErrors, phone: !formik.isValid });
                }}
              />
              {fieldErrors.phone && formik.errors.phone && (
                <Typography
                  className="error-input-message"
                  variant="caption"
                  color="error"
                >
                  {formik.errors.phone}
                </Typography>
              )}
            </div>

            <div className="contact-form-item">
              <TextField
                id="outlined-multiline-static"
                placeholder="Message"
                multiline
                name="message"
                rows={4}
                value={formik.values.message}
                onChange={(e) => {
                  formik.handleChange(e);
                  setFieldErrors({ ...fieldErrors, message: !formik.isValid });
                }}
              />
              {fieldErrors.message && formik.errors.message && (
                <Typography
                  className="error-input-message"
                  variant="caption"
                  color="error"
                >
                  {formik.errors.message}
                </Typography>
              )}
            </div>

            <div className="contact-form-item">
              <FormControlLabel
                control={<Switch />}
                label="Agree to terms and conditions."
                name="agree"
                value={formik.values.agree}
                onClick={formik.handleChange}
              />
              {formik.touched.agree && formik.errors.agree && (
  <Typography
    className="error-input-message"
    variant="caption"
    color="error"
  >
    {formik.errors.agree}
  </Typography>
              )}
            </div>
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
