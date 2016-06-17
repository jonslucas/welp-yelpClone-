import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Rating from './Rating'
import styles from './styles.modules.css'

describe('<Ratings />', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<Rating />)
    });
});