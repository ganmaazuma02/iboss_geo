import React, { Component } from 'react'
import { Paper, Typography } from '@material-ui/core'

export default class EmployeeDetail extends Component {

    render() {
        return (
            <Paper style={this.props.styles.Paper}>
                <Typography variant="h5">Welcome!</Typography>
                <Typography style={{ marginTop: 15 }} variant="subtitle2">Please select an employee from the list to view the details</Typography>
            </Paper>
        )
    }
}
