import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../assets/app-logo.png';

function FooterComp() {
  return (
    <Box
      sx={{
        background: '#034f84',
        position: 'sticky',
        padding: 1,
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: 2,
        marginTop: 2,
        boxShadow: 2,
        flexWrap: 'wrap', 
      }}
      component='footer'
    >
      <Box
        component='img'
        sx={{
          height: 40,
          width: 40,
          cursor: 'pointer',
          mx: 2,
        }}
        alt='Logo'
        src={logo}
      />
      <Typography
        fontSize={{ xs: 16, md: 18 }} // Adjust font size for different screen sizes
        color={'white'}
        component='div'
        fontWeight={'medium'}
        sx={{ flexGrow: 1, my: 1 }}
      >
        RESOLVIA
      </Typography>
      <Box></Box>
      <Typography variant='body1' color='white' sx={{ mx: 1, my: 1 }}>
        Copyright © {new Date().getFullYear()} Resolvia
        {'.'}
      </Typography>
      <Typography
        variant='body2'
        color='white'
        sx={{ mx: 1, my: 1, cursor: 'pointer' }}
      >
        Privacy policy
      </Typography>
      <Typography
        variant='body2'
        color='white'
        sx={{ mx: 1, my: 1, cursor: 'pointer' }}
      >
        Terms of service
      </Typography>
    </Box>
  );
}

export default FooterComp;


// import React from 'react';
// import { Box, Typography } from '@mui/material';

// import logo from '../assets/app-logo.png';

// function FooterComp() {
//   return (
//     <>
//       <Box
//         sx={{
//           background: '#034f84',
//           position: 'sticky',
//           padding: 1,
//           bottom: 0,
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'space-around',
//           paddingTop: 2,
//           marginTop: 2,
//           boxShadow: 2,
//         }}
//         component='footer'
//       >
//         <Box
//           component='img'
//           sx={{
//             height: 40,
//             width: 40,
//             cursor: 'pointer',
//             mx: 2,
//           }}
//           alt='Logo'
//           src={logo}
//         />
//         <Typography
//           fontSize={18}
//           color={'white'}
//           component='div'
//           fontWeight={'medium'}
//           sx={{ flexGrow: 1, my: 1 }}
//         >
//           RESOLVIA
//         </Typography>
//         <Box></Box>
//         <Typography variant='body1' color='white' sx={{ mx: 25, my: 1 }}>
//           Copyright © {new Date().getFullYear()} Resolvia
//           {'.'}
//         </Typography>
//         <Typography
//           variant='body2'
//           color='white'
//           sx={{ mx: 1, my: 1, cursor: 'pointer' }}
//         >
//           Privacy policy
//         </Typography>
//         <Typography
//           variant='body2'
//           color='white'
//           sx={{ mx: 6, my: 1, cursor: 'pointer' }}
//         >
//           Terms of service
//         </Typography>
//       </Box>
//     </>
//   );
// }

// export default FooterComp;
