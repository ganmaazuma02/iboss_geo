import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'


export default class Header extends Component {

    render() {



        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" color="inherit">
                        iBoss Geo
                        </Typography>

                </Toolbar>
            </AppBar>
        )
    }
}
