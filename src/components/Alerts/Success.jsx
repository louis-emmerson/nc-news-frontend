import { Alert } from "@mui/material"

function Success(props) {
  const { successMsg } = props
  return (
    <Alert variant="filled" severity="success">
      {successMsg ? successMsg : "There has been an error"}
    </Alert>
  )
}

export default Success
