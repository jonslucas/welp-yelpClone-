import React from 'react'
import { Route } from 'react-router'

import Container from './Container'
import MapComp from './Map/Map'

export const makeMainRoutes = () => {

    return (
        <Route path="" component={ Container } >
            <Route path="map" component={MapComp} />
        </Route>
    );
};


export default makeMainRoutes;