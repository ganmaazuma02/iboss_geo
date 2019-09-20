import React, { Component } from 'react'
import EmployeeLocation from '../EmployeeLocation'
import { Grid } from '@material-ui/core'

export default class EmployeeLayout extends Component {
    styles = {
        Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <EmployeeLocation styles={this.styles}></EmployeeLocation>
                </Grid>
            </Grid>
        )
    }
}
