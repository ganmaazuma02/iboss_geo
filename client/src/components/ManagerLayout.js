import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import EmployeeList from './EmployeeList'
import EmployeeDetail from './EmployeeDetail'

export default class ManagerLayout extends Component {
    styles = {
        Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
    }

    render() {
        return (
            <Grid container>
                <Grid item sm>
                    <EmployeeList styles={this.styles}></EmployeeList>
                </Grid>
                <Grid item sm>
                    <EmployeeDetail styles={this.styles}></EmployeeDetail>
                </Grid>
            </Grid>
        )
    }
}
