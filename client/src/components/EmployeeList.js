import React, { Component } from 'react'
import { Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core'
import { connect } from 'react-redux'
import { getEmployees } from '../actions/employeeActions'
import PropTypes from 'prop-types'

class EmployeeList extends Component {

    componentDidMount() {
        this.props.getEmployees();
    }

    static propTypes = {
        styles: PropTypes.object,
        getEmployees: PropTypes.func.isRequired,
        employee: PropTypes.object.isRequired
    }

    render() {
        const { employeeList } = this.props.employee;
        return (
            <Paper style={this.props.styles.Paper}>
                <List>
                    {employeeList.map(({ national_id, name }) => (
                        <ListItem button>
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

export default connect(mapStateToProps, { getEmployees })(EmployeeList);