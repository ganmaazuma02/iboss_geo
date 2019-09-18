import React, { Component } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class LoginDialog extends Component {
    state = {
        dialog: false,
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(previousProps) {
        const { error, isAuthenticated } = this.props;
        if (error != previousProps.error) {

            //Check for login error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal
        if (this.state.dialog) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        //Clear errors
        this.props.clearErrors();
        this.setState({
            dialog: !this.state.dialog
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email,
            password
        }

        //Attempt to login
        this.props.login(user);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <Button color="inherit" onClick={this.toggle}>Login</Button>
                <Dialog open={this.state.dialog} onClose={this.toggle}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        {this.state.msg ? <DialogContentText style={{ color: 'red' }}>{this.state.msg}</DialogContentText> : null}
                        <form>
                            <TextField
                                autoFocus
                                name="email"
                                margin="dense"
                                label="Email Address"
                                type="email"
                                onChange={this.onChange}
                                fullWidth
                            />
                            <TextField
                                name="password"
                                margin="dense"
                                label="Password"
                                type="password"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggle} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.onSubmit} color="primary">
                            Login
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginDialog);