import React, { Component, Fragment } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import LoginDialog from './auth/LoginDialog'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Logout from './auth/Logout'


class Header extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;

        return (
            <div style={{ flex: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" color="inherit" style={{ flex: 1 }}>
                            iBoss Geo
                        </Typography>
                        {isAuthenticated ?
                            <Fragment>
                                <Typography variant="body1" color="inherit" style={{ marginRight: 10 }}>
                                    {user ? `Welcome ${user.name}` : ''}
                                </Typography>
                                <Logout></Logout>
                            </Fragment>

                            :
                            <LoginDialog></LoginDialog>}

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Header);