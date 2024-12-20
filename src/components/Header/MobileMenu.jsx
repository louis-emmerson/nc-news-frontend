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
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { tickle122 } from "../../context/loggedInUser"
import Error from "../Alerts/Error"


import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material"
import { AuthContext } from "../../context/auth"
import { supabase } from "../../utils/client"

function MobileMenu() {
  const [open, setOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState(false)
  const { token, setToken } = React.useContext(AuthContext)
  const [isLogoutError, setIsLogoutError] = React.useState(false)
  const user = React.useContext(tickle122)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const handleClick = () => {
    setOpenMenu(!openMenu)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              {token ? (
                <>
                  <Typography>
                    Hello, {token.user.user_metadata.full_name}
                  </Typography>
                  <Button
                    component={Link}
                    to={"/create-article"}
                    onClick={toggleDrawer(false)}
                    variant="contained"
                    size="small"
                  >
                    Create Article
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to={"/login"}
                    onClick={toggleDrawer(false)}
                    variant="contained"
                  >
                    Log In
                  </Button>
                  <Button
                    component={Link}
                    to={"/sign-up"}
                    onClick={toggleDrawer(false)}
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Navigation
          </ListSubheader>
        }
      >
        <ListItemButton component={Link} to="/" onClick={toggleDrawer(false)}>
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
        <ListItemButton
          component={Link}
          to="/articles"
          onClick={toggleDrawer(false)}
        >
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
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/articles?topic=coding"
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon>
                <CodingIcon />
              </ListItemIcon>
              <ListItemText primary="Coding" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/articles?topic=cooking"
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary="Cooking" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/articles?topic=football"
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon>
                <FootballIcon />
              </ListItemIcon>
              <ListItemText primary="Football" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      {token ? (
        <Button
          onClick={() => {
            supabase.auth
              .signOut({ scope: "global" })
              .then(() => {
                setToken("")
              })
              .catch(() => {
                setIsLogoutError(true)
              })
          }}
          variant="contained"
          size="small"
        >
          Log Out
        </Button>
      ) : null}
      {isLogoutError?<Error errorMsg="Failed to Log Out"></Error>:null}
    </Box>
  )

  return (
    <div>
      <MenuIcon
        sx={{ color: "white", paddingRight: 2 }}
        fontSize="large"
        onClick={toggleDrawer(true)}
      />
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}

export default MobileMenu
