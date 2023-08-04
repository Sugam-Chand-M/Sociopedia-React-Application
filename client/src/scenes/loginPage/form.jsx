// we do the register functionality in the form
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/flexBetween";

const registerSchema=yup.object().shape({ // yup validation schema for determining the shape of how the form library is gonna be saving
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
    location:yup.string().required("required"),
    occupation:yup.string().required("required"),
    picture:yup.string().required("required"),
});

const loginSchema=yup.object().shape({
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
});

const initialValuesRegister={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    location:"",
    occupation:"",
    picture:"",
};

const initialValuesLogin={
    email:"",
    password:"",
};

const Form=()=>{
    const [pageType,setPageType]=useState("login");
    const {palette}=useTheme();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const isNonMobile=useMediaQuery("(min-width:600px)");
    const isLogin=pageType==="login";
    const isRegister=pageType==="register";

    const register=async (values,onSubmitProps)=>{
        const formData=new FormData(); // this allows to send info with image
        for(let value in values)
            formData.append(value,values[value]);
        formData.append('picturePath',values.picture.name); // picturePath is gonna be the name of the image and we are doing it manually
        const savedUserResponse=await fetch( // to save all that is received from the backend by doing an api call
            "http://localhost:3001/auth/register",
            {
                method:"POST",
                body:formData,
            }
        );
        const savedUser=await savedUserResponse.json(); // the data will be saved in json format
        onSubmitProps.resetForm(); // to reset the form
        if(savedUser) // if the user data is successfully fetched
            setPageType("login");
    };
    
    const login=async (values,onSubmitProps)=>{
        const loggedInResponse=await fetch( // to save all that is received from the backend by doing an api call
            "http://localhost:3001/auth/login",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values),
            }
        );
        const loggedIn=await loggedInResponse.json();
        onSubmitProps.resetForm(); // to reset the form
        if(loggedIn){
            dispatch(
                setLogin({ // all the data is coming from state/index.js where we have set a number of actions
                    user:loggedIn.user,
                    token:loggedIn.token,
                })
            );
            navigate("/home"); // once we have successfully performed the login task we need to automatically navigate to the home as we are successfully authenticated
            
        }
    };

    const handleFormSubmit=async(values,onSubmitProps)=>{
        if(isLogin)
            await login(values,onSubmitProps);
        if(isRegister)
            await register(values,onSubmitProps);
    };

    return (
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin?initialValuesLogin:initialValuesRegister}
        validationSchema={isLogin?loginSchema:registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            })=>(
                <form onSubmit={handleSubmit}>
                    <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4,minmax(0,1fr))"
                    sx={{
                        "& > div":{gridColumn:isNonMobile?undefined:"span 4"},
                    }}
                    >
                        {isRegister && ( // if we are on the register page we will have a number of components
                            <>
                                <TextField // input component from MUI
                                label="First Name" 
                                onBlur={handleBlur} // gonna handle the situations when we click out of the input
                                onChange={handleChange} // gonna handle the situation when we are typing
                                value={values.firstName} 
                                name="firstName"
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)} // gonna check whether the first name field has been touched or whether any error is present
                                helperText={touched.firstName && errors.firstName} // if it has beem touched and if it is having an error its gonna show the error or its gonna show whether it has been touched or not touched
                                sx={{gridColumn:"span 2"}}
                                />
                                <TextField // input component from MUI
                                label="Last Name" 
                                onBlur={handleBlur} // gonna handle the situations when we click out of the input
                                onChange={handleChange} // gonna handle the situation when we are typing
                                value={values.lastName} 
                                name="lastName"
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)} // gonna check whether the first name field has been touched or whether any error is present
                                helperText={touched.lastName && errors.lastName} // if it has beem touched and if it is having an error its gonna show the error or its gonna show whether it has been touched or not touched
                                sx={{gridColumn:"span 2"}}
                                />
                                <TextField // input component from MUI
                                label="Location" 
                                onBlur={handleBlur} // gonna handle the situations when we click out of the input
                                onChange={handleChange} // gonna handle the situation when we are typing
                                value={values.location} 
                                name="location"
                                error={Boolean(touched.location) && Boolean(errors.location)} // gonna check whether the first name field has been touched or whether any error is present
                                helperText={touched.location && errors.location} // if it has beem touched and if it is having an error its gonna show the error or its gonna show whether it has been touched or not touched
                                sx={{gridColumn:"span 4"}}
                                />
                                <TextField // input component from MUI
                                label="Occupation" 
                                onBlur={handleBlur} // gonna handle the situations when we click out of the input
                                onChange={handleChange} // gonna handle the situation when we are typing
                                value={values.occupation} 
                                name="occupation"
                                error={Boolean(touched.occupation) && Boolean(errors.occupation)} // gonna check whether the first name field has been touched or whether any error is present
                                helperText={touched.occupation && errors.occupation} // if it has beem touched and if it is having an error its gonna show the error or its gonna show whether it has been touched or not touched
                                sx={{gridColumn:"span 4"}}
                                />
                                <Box // a box for providing the profile image
                                gridColumn="span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem"
                                >
                                    <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles)=>
                                        setFieldValue("picture",acceptedFiles[0])
                                    }
                                    >
                                        {({getRootProps,getInputProps})=>(
                                            <Box
                                            {...getRootProps()} // basically passing the values of the dropzone
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{"&:hover":{cursor:"pointer"}}}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture?(
                                                    <p>Add Picture Here ....</p>
                                                ):( // when we select an image it basically shows along with the image/picture name
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        <TextField // input component from MUI
                        label="Email" 
                        onBlur={handleBlur} // gonna handle the situations when we click out of the input
                        onChange={handleChange} // gonna handle the situation when we are typing
                        value={values.email} 
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)} // gonna check whether the first name field has been touched or whether any error is present
                        helperText={touched.email && errors.email} // if it has beem touched and if it is having an error its gonna show the error or its gonna show whether it has been touched or not touched
                        sx={{gridColumn:"span 4"}}
                        />
                        <TextField // input component from MUI
                        label="Password" 
                        type="password"
                        onBlur={handleBlur} // gonna handle the situations when we click out of the input
                        onChange={handleChange} // gonna handle the situation when we are typing
                        value={values.password} 
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)} // gonna check whether the first name field has been touched or whether any error is present
                        helperText={touched.password && errors.password} // if it has beem touched and if it is having an error its gonna show the error or its gonna show whether it has been touched or not touched
                        sx={{gridColumn:"span 4"}}
                        />
                    </Box>

                    {/* Buttons */}
                    <Box>
                        <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m:"2rem 0",
                            p:"1rem",
                            backgroundColor:palette.primary.main,
                            color:palette.background.alt,
                            "&:hover":{color:palette.primary.main}
                        }}
                        >
                            {isLogin?"LOGIN":"REGISTER"}
                        </Button>
                        <Typography
                        onClick={()=>{
                            setPageType(isLogin?"register":"login");
                            resetForm(); // for cleaning the earlier information which was taken as input
                        }}
                        sx={{
                            textDecoration:"underline",
                            color:palette.primary.main,
                            "&:hover":{
                                cursor:"pointer",
                                color:palette.primary.light,
                            },
                        }}
                        >
                            {isLogin?"Don't have an account? Sign Up here.":"Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;