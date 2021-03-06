import { Container, Grid } from '@material-ui/core'
import React from 'react'

export default function BackgroundGrid({ children, spacing }) {
    return (
        <div className='background'>
            <Container maxWidth="md">


                <Grid
                    container
                    spacing={spacing}
                    align="center"
                    
                >
                    {children}


                </Grid>
            </Container>

        </div>

    )
}
