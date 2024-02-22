import { useNavigate } from 'react-router-dom'; 
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function RegisterComponent() {
  const [failMessage, setFailMessage] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    emailConfirmation: "",
    password: "",
    passwordConfirmation: "",
  };

  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props)
    setTimeout(()=>{

      props.resetForm()
      props.setSubmitting(false)
    },2000)

    const registerUrl = "http://localhost:8080/user/register";
    const {emailConfirmation, passwordConfirmation, ...user} = initialValues // decunstraction of the intialValues object the 

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const headersObj = {
    "Content-Type": "application/json"
    }
    
    axios.post(registerUrl, values, { headers: headersObj })
  .then((response) => {
    console.log("response from backend => ", response);

        //redirects to login page
        // navigate('/login');;
        setVerificationStatus('success');
        console.log('Email sent successfully!', response.data);
  })
  .catch((error) => {
    console.error("error while backend calling ", error);
   

    if (error.response) {
    // The request was made, server responded with a status code outside of 2xx
      console.log("Error data:", error.response.data);
      console.log("Error status:", error.response.status);
      console.log("Error headers:", error.response.headers);

      // Display the error message to the user
      setFailMessage(error.response.data);
  } else if (error.request) {
      // The request was made but no response was received
      console.log("Error request:", error.request);
      setFailMessage("Registration Failed: Something went wrong, please try again");
  } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error message:", error.message);
      setFailMessage("Registration Failed: Something went wrong, please try again");
  }
  setVerificationStatus('error');
  console.error('Failed to send email:', error);
});
};

let statusMessage = null;
    if (verificationStatus === 'success') {
      statusMessage = <div>You have successfully registered. Please check your email and click the link to verify your email address.</div>;
    } else if (verificationStatus === 'error') {
      statusMessage = <div>Failed to send verification email. Please try again.</div>;
    }
  

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    emailConfirmation: Yup.string()
      .oneOf([Yup.ref("email")], "Emails must match")
      .required("Email Confirmation is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one number and one special character. Special characters allowed are: !, @, #, $, %, ^, &, *."
      ),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Password Confirmation is required"),
  });

  return (
   <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(props) => (
        <Form>
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={400}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={5}
            padding={3}
            borderRadius={5}
            boxShadow={"5px 5px 10px #d993ab"}
            sx={{
               hover: {
                  boxShadow: "10px 10px 20px #d993ab",
               },
            }}
          >
            <Typography
              variant="h4"
              color="primary"
              padding={2}
              textAlign={"center"}
            >
              Create a CouchCat account
            </Typography>
              {/* Displays fail message if/when it exists to let the user know why registration didn't work */}
              {failMessage && 
                (<Typography 
                variant="standard" 
                color="attention.main"
                sx={{ marginTop: "1.5rem" }}
                > 
                  {failMessage}
                </Typography>
              )}
              {statusMessage && (
              <Typography variant="standard" 
              color="secondary" 
              sx={{ marginTop: "1rem" }}>
              {statusMessage}
            </Typography>
            )}
            <Field
              as={TextField}
              margin="normal"
              type={"text"}
              variant="standard"
              placeholder="First Name"
              color="secondary"
              fullWidth
              name="firstName"  
              helperText={<ErrorMessage name="firstName" component="span"/>}
              sx={{ 
                padding: "1rem",
                backgroundColor: "#d3d3d3",
                borderRadius: 2, // Set border radius
                borderColor: "accent.main", // Set border color
                hover: {
                borderColor: "primary.dark", // Set border color on hover
                },
            }} 
              />
            <Field
              as={TextField}
              margin="normal"
              type={"text"}
              variant="standard"
              placeholder="Last Name"
              color="secondary"
              fullWidth
              name="lastName"
              helperText={<ErrorMessage name="lastName" component="span"/>}
              sx={{ 
                padding: "1rem",
                backgroundColor: "#d3d3d3",
                borderRadius: 2, // Set border radius
                borderColor: "accent.main", // Set border color
                hover: {
                borderColor: "primary.dark", // Set border color on hover
                },
            }} 
            />
            <Field
              as={TextField}
              margin="normal"
              type="email"
              variant="standard"
              placeholder="Email"
              color="secondary"
              fullWidth
              name="email" 
              helperText={<ErrorMessage name="email" component="span"/>}
              sx={{ 
                padding: "1rem",
                backgroundColor: "#d3d3d3",
                borderRadius: 2, // Set border radius
                borderColor: "accent.main", // Set border color
                hover: {
                borderColor: "primary.dark", // Set border color on hover
                },
            }} 

            />
            <Field
              as={TextField}
              margin="normal"
              type="email"
              variant="standard"
              placeholder="Email Confirmation"
              color="secondary"
              fullWidth
              name="emailConfirmation"
              helperText={<ErrorMessage name="emailConfirmation" component="span"/>}
              sx={{ 
                padding: "1rem",
                backgroundColor: "#d3d3d3",
                borderRadius: 2, // Set border radius
                borderColor: "accent.main", // Set border color
                hover: {
                borderColor: "primary.dark", // Set border color on hover
                },
            }} 

            />
            <Field
              as={TextField}
              margin="normal"
              type="password"
              variant="standard"
              placeholder="Password"
              color="secondary"
              fullWidth
              name="password"
              helperText={<ErrorMessage name="password" component="span"/>}
              sx={{ 
                padding: "1rem",
                backgroundColor: "#d3d3d3",
                borderRadius: 2, // Set border radius
                borderColor: "accent.main", // Set border color
                hover: {
                borderColor: "primary.dark", // Set border color on hover
                },
            }} 
            />
            <Field
              as={TextField}
              margin="normal"
              type="password"
              variant="standard"
              placeholder="Password Confirmation"
              color="secondary"
              fullWidth
              name="passwordConfirmation"
              helperText={<ErrorMessage name="passwordConfirmation" component="span"/>}
              sx={{ 
                padding: "1rem",
                backgroundColor: "#d3d3d3",
                borderRadius: 2, // Set border radius
                borderColor: "accent.main", // Set border color
                hover: {
                borderColor: "primary.dark", // Set border color on hover
                },
            }} 
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "1.5rem" }}
              disabled={props.isSubmitting}
            >{props.isSubmitting? "Loading" : "Register"}
            </Button>
            <Typography
                variant="standard"
                color="primary"
                sx={{ marginTop: "0.5rem" }}
                padding={2}
                textAlign={"center"}
             >
              Already have an account?  <a href='/login'>Login</a>
             </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterComponent;