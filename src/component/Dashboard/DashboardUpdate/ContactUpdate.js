import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import {FormControlLabel, Switch } from "@mui/material";
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import contactUpdateAPI from "../../../api/Contact/contactUpdateAPI";
import contactGetAPI from "../../../api/Contact/contactGetAPI";
import "./ContactUpdate.scss";


export default function ContactUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize the contact state with the contactData
  const [contact, setContact] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Create a formik instance with initial values
  const formik = useFormik({
    initialValues: {
      id: id,
      name: '' ,
      email: '',
      phone: '',
      message: '',
      agree: false,
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
    onSubmit: (values) => {
      // Send form data to the API for updating
      contactUpdateAPI
        .update({ ...values, id })
        .then((response) => {
          // Handle success (e.g., show a success message)
          alert('Contact updated successfully');
          navigate('/'); // Redirect back to the dashboard
        })
        .catch((error) => {
          // Handle error (e.g., show an error message)
          alert('Error updating the contact');
        });
    },
  });

  useEffect(() => {
    // Fetch the contact data by ID using contactGetAPI or a similar method
    contactGetAPI
      .getContactById(id)
      .then((data) => {
        setContact(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setMessage(data.message);
        // Cập nhật giá trị trong formik sau khi có dữ liệu
        formik.setValues({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          agree: data.agree,
        });
      })
      .catch((error) => {
        console.error('Error fetching contact:', error);
      });
  }, [id]);

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-title">View All Feedback</div>
        <div className="contact-form">
          <form onSubmit={formik.handleSubmit}>
            <div className="contact-form-item">
              <TextField
                placeholder="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && (
                <Typography
                  className="error-input-message"
                  variant="caption"
                  color="red"
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
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <Typography
                  className="error-input-message"
                  variant="caption"
                  color="red"
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
                onChange={formik.handleChange}
              />
              {formik.errors.phone && (
                <Typography
                  className="error-input-message"
                  variant="caption"
                  color="red"
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
                onChange={formik.handleChange}
              />
              {formik.errors.message && (
                <Typography
                  className="error-input-message"
                  variant="caption"
                  color="red"
                >
                  {formik.errors.message}
                </Typography>
              )}
            </div>

            <div className="contact-form-item">
              <FormControlLabel
                control={<Switch />}
                placeholder="Agree to terms and conditions."
                name="agree"
                value={formik.values.agree}
                onClick={formik.handleChange}
              />
              {formik.errors.agree && (
                <Typography
                  className="error-input-message"
                  variant="caption"
                  color="red"
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
