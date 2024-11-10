import { Box } from "@mui/material"
import MobileMenu from "./MobileMenu"
import  "./Header.css"
import logo from "../../Images/logo.jpeg"

function Header({token}){
    return(
    <Box sx={{backgroundColor:"black"}}id="mobileHeader">
        <img src={logo}/> 
        <MobileMenu />
    </Box>
)
}

export default Header