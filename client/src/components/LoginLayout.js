import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import LoginForm from './LoginForm'

export default class LoginLayout extends Component {
    render() {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Typography variant="h5">
                    Sign in
        </Typography>

                <LoginForm />

            </Grid>
        )
    }
}
