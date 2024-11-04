import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';


function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Typography variant='h4'>Mobile Menu</Typography>
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
      </List>
      
    </Box>
  );

  return (
    <div>
      <MenuIcon fontSize='large' onClick={toggleDrawer(true)}/>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default MobileMenu