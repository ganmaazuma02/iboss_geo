import React, { Component, Fragment } from 'react'
import { Paper, Typography, Avatar, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class EmployeeDetail extends Component {

    static propTypes = {
        employee: PropTypes.object.isRequired
    }

    render() {
        const { isEmployeeSelected, selectedEmployee, employeeMap, current_task, current_location } = this.props.employee;
        return (
            <Paper style={this.props.styles.Paper}>
                <Typography variant="h5">Welcome!</Typography>
                <Typography style={{ marginTop: 15, marginBottom: 15 }} variant="subtitle2">Please select an employee from the list to view the details</Typography>
                {isEmployeeSelected ?
                    <Fragment>
                        {employeeMap !== '' ?
                            <img src={employeeMap} />
                            : null
                        }
                        {current_location ? <Typography variant="subtitle2">Latest Position: <Typography variant="body1">({current_location.latitude},{current_location.longitude})</Typography></Typography>
                            : <Typography variant="subtitle2">Latest Position: Not Updated</Typography>}
                        <Typography variant="subtitle2">National ID: <Typography variant="body1">{selectedEmployee.national_id}</Typography></Typography>
                        <Typography variant="subtitle2">Name: <Typography variant="body1">{selectedEmployee.name}</Typography></Typography>
                        <Typography variant="subtitle2">Phone Number: <Typography variant="body1">{selectedEmployee.phone_number}</Typography></Typography>
                        <Typography variant="subtitle2">Email: <Typography variant="body1">{selectedEmployee.email}</Typography></Typography>
                        <Typography variant="subtitle2">Curent Task: <Typography variant="body1">{current_task}</Typography></Typography>

                    </Fragment>
                    : null
                }


            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    employee: state.employee
})


export default connect(mapStateToProps, null)(EmployeeDetail);