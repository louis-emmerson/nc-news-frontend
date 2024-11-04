import { Typography } from "@mui/material"
import MobileMenu from "../MobileMenu"
import  "./Header.css"

function Header(){
    return(
    <section id="mobileHeader">
        <Typography variant="h2">NC News</Typography>
        <MobileMenu/>
    </section>
)
}

export default Header