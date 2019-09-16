import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'

export default class LoginForm extends Component {
    render() {
        return (
            <form>
                <TextField
                    label="Email"
                    placeholder="Email"
                    margin="normal"
                    variant="outlined"
                    type="email"
                    fullWidth
                />
                <TextField
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                    variant="outlined"
                    type="password"
                    fullWidth
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 15 }}
                >
                    Sign In
          </Button>
            </form >
        )
    }
}
