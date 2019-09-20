import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { Beenhere } from '@material-ui/icons'
import { Paper, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { addLocation } from '../actions/locationActions'

class EmployeeLocation extends Component {

    static propTypes = {
        styles: PropTypes.object,
        addLocation: PropTypes.func.isRequired
    }

    state = {
        latitude: '',
        longitude: '',
        current_task: '',
        geo: false
    }

    // Return map bounds based on list of places
    getMapBounds = (map, maps, lat, lng) => {
        const bounds = new maps.LatLngBounds();
        bounds.extend(new maps.LatLng(lat, lng));

        return bounds;
    };

    // Re-center map when resizing the window
    bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, 'idle', () => {
            maps.event.addDomListener(window, 'resize', () => {
                map.fitBounds(bounds);
            });
        });
    };

    // Fit map to its bounds after the api is loaded
    apiIsLoaded = (map, maps, lat, lng) => {
        // Get bounds by our places
        const bounds = this.getMapBounds(map, maps, lat, lng);
        // Fit map to bounds
        map.fitBounds(bounds);
        // Bind the resize listener
        this.bindResizeListener(map, maps, bounds);
    };

    componentDidMount() {
        this.getPosition();
    }

    // Gets user location using built in HTML geolocation API
    getPosition = () => {
        const geo = navigator.geolocation;

        // if user rejected geolocation
        if (!geo) {
            this.setState({
                geo: false
            });
            return;
        }

        this.setState({
            geo: true
        });

        geo.watchPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

            this.props.addLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                current_task: 'Test Task'
            });
        }, () => this.setState({
            geo: false
        }), {
            maximumAge: 30000,
            timeout: 300000,
            enableHighAccuracy: true
        });

    }

    render() {
        return (
            <Paper style={this.props.styles.Paper}>
                <Typography variant="h5">Your current location</Typography>
                <div style={{ width: 600, height: 400 }}>
                    {this.state.geo ?

                        <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                            defaultCenter={[this.state.latitude, this.state.longitude]}
                            defaultZoom={15}

                        >
                            <Beenhere
                                color="secondary"
                                lat={this.state.latitude}
                                lng={this.state.longitude}
                                text="My Location"
                            ></Beenhere>

                        </GoogleMapReact>
                        :
                        <Typography variant="h6">You must enable location service</Typography>
                    }
                </div>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    employee: state.employee,
    location: state.location
})

export default connect(mapStateToProps, { addLocation })(EmployeeLocation);