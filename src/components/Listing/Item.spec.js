import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Item from './Item'
import styles from './styles.modules.css'

describe('<Item />', ()=>{
    let wrapper;
    const place = {
        name: 'SanFran'
    };

    beforeEach(()=>{
        wrapper = shallow(<Item place={place} />);
    });

    it('contains a title component with yelp', ()=>{
        expect(wrapper.find('h1').first().text())
            .to.equal(place.name);
    });
    it('wraps the component with a .item css class', ()=>{
        expect(wrapper.find(`.${styles.item}`))
            .to.have.length(1);
    });
    it('contains a rating', ()=>{
        expect(wrapper.find('Rating'))
            .to.be.defined;
    });

});