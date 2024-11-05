import { Alert } from "@mui/material"

function Error(props) {
  const { errorMsg } = props
  return (
    <Alert variant="filled" severity="error">
      {errorMsg ? errorMsg : "There has been an error"}
    </Alert>
  )
}

export default Error
