import { Box, Typography } from "@mui/material"
import MobileMenu from "./MobileMenu"
import  "./Header.css"
import { Link } from "react-router-dom"
import logo from "../../Images/logo.jpeg"

function Header(){
    return(
    <Box sx={{backgroundColor:"black"}}id="mobileHeader">
        <img src={logo}/> 
        <MobileMenu/>
    </Box>
)
}

export default Header