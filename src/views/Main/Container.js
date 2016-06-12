import React from 'react'
import Map, { GoogleApiWrapper } from 'google-maps-react'

import { searchNearby } from 'utils/googleApiHelpers'

export class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            places: [],
            pagination: null
        }
    }

    onReady(mapProps, map) {
        //Map ready to mount
        const {google}  = this.props;
        const opts = {
            location: map.center,
            radius: '500',
            types: ['cafe']
        };
        searchNearby(google, map, opts)
            .then((res, pagination)=> {
                this.setState({
                    places: res,
                    pagination
                })
            }).catch((status, result)=> {
            // there's an error in ma boot
            })
    }

    render() {
        return (
            <div>
                Hello from Main Container!
                <Map
                    onReady={ this.onReady.bind(this) }
                    google={ this.props.google }
                    visible={ false } >
                    { this.state.places.map(place=> {
                        return (<div key={ place.id }>{ place.name }</div>)
                    })}
                </Map>
            </div>
        );
    };
};

export default GoogleApiWrapper({
    apiKey:__GAPI_KEY__
})(Container);