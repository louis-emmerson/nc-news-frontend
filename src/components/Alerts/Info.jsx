import { Alert } from "@mui/material"

function InfoAlert(props) {
  const { infoMsg } = props
  return (
    <Alert variant="filled" severity="info">
      {infoMsg ? infoMsg : "Info"}
    </Alert>
  )
}

export default InfoAlert
