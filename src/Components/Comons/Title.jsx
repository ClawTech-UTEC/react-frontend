import { Grid, Typography } from '@material-ui/core';
import React from 'react';

export default function Title({ gridColumns, title }) {
    return (
        <Grid item xs={gridColumns}>
            <Typography variant='h5' className='titulo1' >
                {title}
            </Typography>
        </Grid>
    );
}

Title.defaultProps = {
    gridColumns: 12,
    title: ''
}