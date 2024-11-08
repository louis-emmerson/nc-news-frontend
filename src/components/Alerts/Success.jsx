import { Alert } from "@mui/material"
import { Children } from "react"

function Success(props) {
  const { successMsg, children } = props
  return (
    <Alert variant="filled" severity="success">
      {successMsg ? successMsg : "Success!"}
      {children}
    </Alert>
  )
}

export default Success
