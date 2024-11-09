import { Box, Button, CircularProgress } from "@mui/material"
import DeleteIcon from "@mui/icons-material/DeleteForever"

function DeleteArticleButton(props) {
  const {
    isLoading,
    isDeleteDisabled,
    buttonTxt = "Delete",deleteFunction
  } = props

  

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Button
          style={{ height: 40, backgroundColor: "red" }}
          onClick={deleteFunction}
          disabled={isLoading || isDeleteDisabled}
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          {isLoading ? null : buttonTxt}
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

export default DeleteArticleButton
