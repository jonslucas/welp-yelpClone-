import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Rating from './Rating'
import styles from './styles.modules.css'

describe('<Ratings />', ()=>{
    let wrapper;
    const styleTop = `.${styles.top}`;
    const styleBottom = `.${styles.bottom}`;

    it('fills the percentage as style', ()=>{
        wrapper = shallow(<Rating percentage={0.10} />);
        expect(wrapper.find(styleTop))
            .to.have.style('width', '10%');

        wrapper = shallow(<Rating percentage={0.99}/>)
        expect(wrapper.find(styleTop))
            .to.have.style('width', '99%');

    });
    it('renders bottom and top star meters', ()=>{
        wrapper = shallow(<Rating percentage={0.99} />);
        expect(wrapper.find(styleTop)).to.be.present;
        expect(wrapper.find(styleBottom)).to.be.present;

    });
});