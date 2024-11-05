import DeleteIcon from '@mui/icons-material/DeleteForever';
import { Button } from "@mui/material"

function DeleteButton(props) {
  const {deleteFunction} = props
  return (
      <Button onClick={()=>{deleteFunction()}}
      style={{backgroundColor:"red"}}
        startIcon={<DeleteIcon />}
        variant="contained"
      >
        Delete
      </Button>
  )
}

export default DeleteButton
