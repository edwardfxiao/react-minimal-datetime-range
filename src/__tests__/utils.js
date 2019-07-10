import { expect } from 'chai';
import { getCased, getNumeric, getAlpha, getAlphanumeric, cx, getRandomId } from '../js/Input/utils.js';

describe('message', () => {
  it('[getCased]: Should return FOOBAR', () => {
    expect(getCased('foobar', 0)).equal('FOOBAR');
  });
  it('[getCased]: Should return FOOBAR', () => {
    expect(getCased('foobar', 'upper')).equal('FOOBAR');
  });
  it('[getCased]: Should return foobar', () => {
    expect(getCased('foobar', 'lower')).equal('foobar');
  });
  it('[getNumeric]: Should return 123456', () => {
    expect(getNumeric('1foobar2345.6')).equal('123456');
  });
  it('[getAlpha]: Should return foobar', () => {
    expect(getAlpha('1foobar2345.6')).equal('foobar');
  });
  it('[getAlphanumeric]: Should return 1foobar23456', () => {
    expect(getAlphanumeric('1foobar2345.6')).equal('1foobar23456');
  });
  it('[cx]: Should return "a b"', () => {
    expect(cx('a', 'b')).equal('a b');
  });
  it('[cx]: Should return "a a"', () => {
    expect(cx('a', { a: 'b' })).equal('a a');
  });
  it('[cx]: Should return "a a"', () => {
    expect(cx('a', ['a', 'b'])).equal('a a b');
  });
  it('[cx]: Should return ""', () => {
    expect(cx(null)).equal('');
  });
  it('[cx]: Should return ""', () => {
    expect(cx([null])).equal('');
  });
  it('[cx]: Should return ""', () => {
    expect(cx({ a: null })).equal('');
  });
  it('[cx]: Should return "a"', () => {
    expect(cx({ a: 'b' })).equal('a');
  });
  it('[cx]: Should return ""', () => {
    expect(cx({ a: false })).equal('');
  });
  it('[cx]: Should return ""', () => {
    expect(cx([])).equal('');
  });
  it('[cx]: Should return ""', () => {
    expect(cx({})).equal('');
  });
  it('[getRandomId]: Should return a text with length of 8', () => {
    expect(getRandomId().length).equal(8);
  });
});
