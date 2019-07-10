import React, { useRef } from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactCodesInput from '../js/Input/index.js';
configure({ adapter: new Adapter() });

const ID = 'code';

describe('ReactCodesInput component', () => {
  it('[Toggling "validate"]: Should show msgHtml(err) when toggling "validate"', () => {
    const $ref = useRef(null);
    const wrapper = mount(<ReactCodesInput wrapperRef={$ref} id={ID} codeLength={4} value="" />);
    // console.log(wrapper.ref)
    // const $input = wrapper.find(`#${ID}0`);
    // console.log($input.instance())
    // $input.simulate('click');
    // expect(value).toEqual('clicked');
  });
});
