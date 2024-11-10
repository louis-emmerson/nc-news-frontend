import { Box, Button, FormControl, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { supabase } from "../../utils/client"
import Error from "../Alerts/Error"
import { AuthContext } from "../../context/auth"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const { token, setToken } = useContext(AuthContext)
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const [isLogInError, setIsLogInError] = useState(false)

  const updateInput = (field, value) => {
    setFormInput((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
    console.log(formInput)
  }

  const handleSubmit = (event) => {
    setIsLogInError(false)
    event.preventDefault()
    console.log(formInput)
    supabase.auth
      .signInWithPassword({
        email: formInput.email,
        password: formInput.password,
      })
      .then((response) => {
        console.log(response, "<<<<<RESO")
        if (response.error) throw new Error(response.error)
        console.log(response.data)
        setToken(response.data)
        navigate("/")
      })
      .catch((error) => {
        setIsLogInError(true)
      })
  }

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
          Log In
        </Typography>

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
            >
              Log In
            </Button>
          </Box>
        </Box>
        {isLogInError ? <Error /> : null}
      </FormControl>
    </Box>
  )
}
