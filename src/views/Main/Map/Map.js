import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Map, { Marker } from 'google-maps-react'

import styles from './styles.modules.css'

export class MapComp extends React.Component {
    renderChildren() {
        const { children } = this.props;

        if (React.Children.count(children)>0) {
            return React.Children.map(children, c=>{
                return React.cloneElement(c, this.props, {
                    map: this.props.map,
                    google: this.props.google
                });
            });
        } else {
            return this.renderMarkers();
        }
    }
    renderMarkers() {
        if (!this.props.places) return null;
        return this.props.places.map(place=>{
           return <Marker key={ place.id }
                          name={ place.id }
                          place={ place }
                          label={place.name}
                          map={this.props.map}
                          position={ place.geometry.location }
                          onClick={this.props.onMarkerClick.bind(this)}
                          />
        });
    }

    render() {
        const { children } = this.props;
        return (
            <Map map={ this.props.map }
                 google={ this.props.google }
                 className={ styles.map }
                 visible={ !children || React.Children.count(children) == 0 }
                 >
                { this.renderChildren() }
            </Map>
        );
    }
}

export default MapComp 