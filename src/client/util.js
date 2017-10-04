const R = require('ramda');
const {List, Map} = require('immutable');

const defaultToEmptyList = R.defaultTo(List());
const defaultToEmptyString = R.defaultTo('');
const defaultToEmptyMap = R.defaultTo(Map());

module.exports = {
  defaultToEmptyList,
  defaultToEmptyString,
  defaultToEmptyMap,
};
