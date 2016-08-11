import React from 'react'
import { Route } from 'react-router'

import Container from './Container'
import MapComp from './Map/Map'
import Detail from './Detail/Detail'

export const makeMainRoutes = () => {

    return (
        <Route path="" component={ Container } >
            <Route path="map" component={MapComp} />
            <Route path="detail/:placeId" component={Detail} />
        </Route>
    );
};


export default makeMainRoutes;