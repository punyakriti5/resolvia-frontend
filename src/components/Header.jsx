import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: 'Goldman',
    color: 'black',
    fontstyle: 'bold',
  },
});
function Header() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar sx={{ background: '#83B9F8' }} position='relative'>
          <Toolbar>
            <Typography>Resolvia</Typography>
            <Button variant='contained' sx={{ marginLeft: 'auto' }}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default Header;
