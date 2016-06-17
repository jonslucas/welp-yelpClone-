import React, { PropTypes } from 'react'
import classnames from 'classnames'

import Item from './Item'
import styles from './styles.modules.css'

export class Listing extends React.Component {
    static propTypes = {
        places: PropTypes.object.isRequired,
        onClick: PropTypes.object.isRequired
    };
    render() {
        return (
            <div className={classnames(styles.container)}>
                {this.props.places.map((place)=> {
                    return (
                        <Item place={place}
                              onClick={this.props.onClick}
                              key={place.id}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Listing