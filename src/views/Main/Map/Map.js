import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Map from 'google-maps-react'

import styles from './styles.modules.css'

export class MapComp extends React.Component {
    render() {
        return (
            <Map google={ this.props.google }
                 className={ styles.map }
                 >
            </Map>
        );
    }
}

export default MapComp 