import React from 'react';
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';

function CircularLoading() {

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress/>
    </Grid>
  )
}

export default CircularLoading;