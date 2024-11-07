import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import MenuIcon from "@mui/icons-material/MenuOutlined"
import TopicIcon from "@mui/icons-material/TopicOutlined"
import HomeIcon from "@mui/icons-material/HomeOutlined"
import NewspaperIcon from "@mui/icons-material/NewspaperOutlined"
import CodingIcon from "@mui/icons-material/DeveloperModeOutlined"
import RestaurantIcon from "@mui/icons-material/RestaurantOutlined"
import FootballIcon from "@mui/icons-material/SportsSoccerOutlined"
import { Link as RouterLink } from 'react-router-dom';
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Link } from "react-router-dom"
import {
  Button,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material"

function MobileMenu() {
  const [open, setOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const handleClick = () => {
    setOpenMenu(!openMenu)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Navigation
          </ListSubheader>
        }
      >
        <ListItemButton component={RouterLink} to="/" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <Link
          to="/"
          onClick={() => {
            setOpen(false)
          }}
        ></Link>
        <ListItemButton component={RouterLink} to="/articles" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <NewspaperIcon />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <TopicIcon />
          </ListItemIcon>
          <ListItemText primary="Topics" />
          {openMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/articles?topic=coding" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <CodingIcon />
              </ListItemIcon>
              <ListItemText primary="Coding" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/articles?topic=cooking" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary="Cooking" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/articles?topic=football" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <FootballIcon />
              </ListItemIcon>
              <ListItemText primary="Football" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  )

  return (
    <div>
      <MenuIcon fontSize="large" onClick={toggleDrawer(true)} />
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}

export default MobileMenu
