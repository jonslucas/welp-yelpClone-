import React from 'react'
import ReactDOM from 'react-dom'


import App from 'containers/App/App'
import './styles/app.css'

import { browserHistory } from 'react-router'
import makeRoutes from './routes'
const myRoutes = makeRoutes();

const mountNode = document.querySelector('#root');
ReactDOM.render(<App
    routes={ myRoutes }
    history={ browserHistory } />, mountNode);
