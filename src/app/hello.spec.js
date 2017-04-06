/* eslint-env jasmine */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Hello} from './hello';

describe('hello component', () => {
  it('should render hello world', () => {
    const hello = TestUtils.renderIntoDocument(<Hello/>);
    const h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
    expect(h1.textContent).toEqual('Hello world!');
  });
});
