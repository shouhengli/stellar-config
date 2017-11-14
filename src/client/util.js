const R = require('ramda');
const {List, Map} = require('immutable');

const defaultToEmptyList = R.defaultTo(List());
const defaultToEmptyString = R.defaultTo('');
const defaultToEmptyMap = R.defaultTo(Map());
const defaultToEmptyArray = R.defaultTo([]);
const defaultToEmptyObject = R.defaultTo({});

const isNotEmpty = (value) => !R.isNil(value) && !R.isEmpty(value);

const noop = () => {};

module.exports = {
  defaultToEmptyList,
  defaultToEmptyString,
  defaultToEmptyMap,
  defaultToEmptyArray,
  defaultToEmptyObject,
  isNotEmpty,
  noop,
};
