const R = require('ramda');
const {List, Map} = require('immutable');

const defaultToEmptyList = R.defaultTo(List());
const defaultToEmptyString = R.defaultTo('');
const defaultToEmptyMap = R.defaultTo(Map());

const isNotEmpty = (value) => !R.isNil(value) && !R.isEmpty(value);

module.exports = {
  defaultToEmptyList,
  defaultToEmptyString,
  defaultToEmptyMap,
  isNotEmpty,
};
