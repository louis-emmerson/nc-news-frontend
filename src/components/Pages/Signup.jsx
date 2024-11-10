import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { supabase } from "../../utils/client"
import Error from "../Alerts/Error"
import { Link } from "react-router-dom"
import Success from "../Alerts/Success"

export const SignUp = () => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    fullname: "",
  })

  const [isSignUpError, setIsSignUpError] = useState(false)
  const [isSuccess,setSuccess] = useState(false)

  const updateInput = (field, value) => {
    setFormInput((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  const handleSubmit = (event) => {
    setIsSignUpError(false)
    event.preventDefault()
    console.log(formInput)
    supabase.auth.signUp(
        {
          email: formInput.email,
          password: formInput.password,
          options: {
            data: {
              full_name: formInput.fullname,
              username:formInput.username
            },
            emailRedirectTo:`http://localhost:5173/login`
          }
        }).then((response)=>{
            // console.log(response,"<<<<<RESO")
            setSuccess(true)
            if(response.error) throw new Error(response.error)
        }).catch(()=>{
            setIsSignUpError(true)
        })}

        
  return (
    <Box
      width={"100%"}
      height={"80vh"}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "70%", padding: 10, gap: 1 }}
      >
        <Typography textAlign={"center"} variant="h3">
          Sign Up
        </Typography>

        <TextField
          id="fullname"
          label="Full Name"
          variant="filled"
          value={formInput.fullname}
          onChange={(event) => updateInput("fullname", event.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          variant="filled"
          value={formInput.email}
          onChange={(event) => updateInput("email", event.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="filled"
          value={formInput.password}
          onChange={(event) => updateInput("password", event.target.value)}
        />
        

        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Box sx={{ position: "relative", width: "100%" }}>
            <Button
              type="submit"
              style={{ height: 40, width: "100%" }}
              variant="contained"
              disabled={isSignUpError||isSuccess}
            >
              Sign Up
            </Button>
            <Typography>Already signed up? <Link to={"/login"}>Click Here</Link> to login!</Typography>
          </Box>
        </Box>
        {isSignUpError?<Error/>:null}
        {isSuccess?<Success successMsg={"Please click on the link sent to your email to verify"}/>:null}
      </FormControl>
    </Box>
  )
}
