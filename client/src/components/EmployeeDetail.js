import React, { Component, Fragment } from 'react'
import { Paper, Typography, Avatar, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class EmployeeDetail extends Component {

    state = {
        location: {
            latitude: '',
            longitude: ''
        },
        map: ''
    }

    componentDidMount() {
        //this.getPosition();
    }

    // Gets user location using built in HTML geolocation API
    getPosition = () => {
        const geo = navigator.geolocation;

        // if user rejected geolocation
        if (!geo) return;

        geo.getCurrentPosition((position) => {
            this.setState({
                location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                map: `https://maps.googleapis.com/maps/api/staticmap?center=${position.coords.latitude},${position.coords.longitude}&zoom=13&size=800x400&sensor=false&markers=color:red%7Clabel:C%7C${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
            })
        });

    }


    static propTypes = {
        employee: PropTypes.object.isRequired
    }

    render() {
        const { isEmployeeSelected, selectedEmployee, employeeMap } = this.props.employee;
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
                        <Typography variant="subtitle2">Latest Position: <Typography variant="body1">({selectedEmployee.position.latitude},{selectedEmployee.position.longitude})</Typography></Typography>
                        <Typography variant="subtitle2">National ID: <Typography variant="body1">{selectedEmployee.national_id}</Typography></Typography>
                        <Typography variant="subtitle2">Name: <Typography variant="body1">{selectedEmployee.name}</Typography></Typography>
                        <Typography variant="subtitle2">Phone Number: <Typography variant="body1">{selectedEmployee.phone_number}</Typography></Typography>
                        <Typography variant="subtitle2">Email: <Typography variant="body1">{selectedEmployee.email}</Typography></Typography>
                        <Typography variant="subtitle2">Curent Task: <Typography variant="body1">{selectedEmployee.current_task}</Typography></Typography>

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