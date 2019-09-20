import React, { Component, Fragment } from 'react'
import Header from '../Header'
import ManagerLayout from './ManagerLayout'
import EmployeeLayout from './EmployeeLayout'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AppLayout extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        return (
            <Fragment>
                <Header></Header>
                {isAuthenticated ?
                    (user.role === 'employee' ? <EmployeeLayout></EmployeeLayout> : <ManagerLayout></ManagerLayout>)
                    : null
                }


            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppLayout);