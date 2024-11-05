import { Alert } from "@mui/material"

function Warning(props) {
  const { warningMsg } = props
  return (
    <Alert variant="filled" severity="warning">
      {warningMsg ? warningMsg : "Warning"}
    </Alert>
  )
}

export default Warning
