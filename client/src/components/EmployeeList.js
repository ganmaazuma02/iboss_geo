import React, { Component } from 'react'
import { Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core'
import { connect } from 'react-redux'
import { getEmployees, getEmployee } from '../actions/employeeActions'
import PropTypes from 'prop-types'

class EmployeeList extends Component {

    componentDidMount() {
        this.props.getEmployees();
    }

    static propTypes = {
        styles: PropTypes.object,
        getEmployees: PropTypes.func.isRequired,
        getEmployee: PropTypes.func.isRequired,
        employee: PropTypes.object.isRequired
    }

    onEmployeeSelected = (national_id) => {
        this.props.getEmployee(national_id);
    }

    render() {
        const { employeeList } = this.props.employee;
        return (
            <Paper style={this.props.styles.Paper}>
                <Typography variant="h5">Employees</Typography>
                <List>
                    {employeeList.map(({ national_id, name }) => (
                        <ListItem button key={national_id} onClick={this.onEmployeeSelected.bind(this, national_id)}>
                            <ListItemText primary={name}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    employee: state.employee
})

export default connect(mapStateToProps, { getEmployees, getEmployee })(EmployeeList);