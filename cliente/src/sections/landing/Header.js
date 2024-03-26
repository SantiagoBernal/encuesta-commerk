import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button,
  //  CardMedia, 
   Container, Grid, 
  //  Link, 
  // Rating,
  //  Tooltip, 
  //  Typography
   } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// assets
import AnimateButton from 'components/@extended/AnimateButton';
// import techBootstrap from 'assets/images/landing/tech-bootstrap.svg';
// import techReact from 'assets/images/landing/tech-react.svg';
// import techMui from 'assets/images/landing/tech-mui.svg';
// import techCodeigniter from 'assets/images/landing/tech-codeigniter.svg';
// import techNet from 'assets/images/landing/tech-net.svg';
// import techFigma from 'assets/images/landing/tech-figma.svg';

// ==============================|| LANDING - HeaderPage ||============================== //

const HeaderPage = () => {
  const theme = useTheme();

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ pt: { md: 0, xs: 8 }, pb: { md: 0, xs: 5 } }}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3} sx={{ textAlign: 'center' }}>

        
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <AnimateButton>
                      <Button component={RouterLink} to="/login" size="large" color="secondary" variant="outlined">
                        Encuestas de satisfacción.
                      </Button>
                    </AnimateButton>
                  </Grid>
                  {/* <Grid item>
                    <AnimateButton>
                      <Button component={RouterLink} to="/login" target="_blank" size="large" color="primary" variant="contained">
                        Live Preview
                      </Button>
                    </AnimateButton>
                  </Grid> */}
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          bottom: { xs: -30, sm: 0 },
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{
            '& > .MuiGrid-item': {
              borderRight: `1px solid ${theme.palette.divider}`,
              '&:first-of-type': {
                borderLeft: `1px solid ${theme.palette.divider}`
              },
              '& img': {
                padding: 1.3
              }
            }
          }}
        >
        
        </Grid>
      </Box>
    </Container>
  );
};
export default HeaderPage;
