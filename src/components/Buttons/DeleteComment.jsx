import { Box, Button, CircularProgress } from "@mui/material"
import DeleteIcon from '@mui/icons-material/DeleteForever';

function DeleteCommentButton(props) {
  const { isLoading, deleteComment, isDeleteDisabled } = props

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Button
          style={{ height: 40, width: 150, backgroundColor:"red" }}
          onClick={() => {
            deleteComment()
          }}
          disabled={isLoading||isDeleteDisabled}
          variant="contained"
          startIcon={<DeleteIcon/>}
        >
          {isLoading ? null : "Delete"}
        </Button>
        {isLoading ? (
          <CircularProgress
            size={24}
            sx={{
              color: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        ) : null}
      </Box>
    </Box>
  )
}

export default DeleteCommentButton
