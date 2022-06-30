import { Container, Grid } from '@material-ui/core'
import React from 'react'

export default function BackgroundGrid({ children }) {
    return (
        <div className='background'>
            <Container fixed>


                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                >
                    {children}


                </Grid>
            </Container>

        </div>

    )
}
