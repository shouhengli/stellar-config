const R = require('ramda');
const {List} = require('immutable');

const defaultToEmptyList = R.defaultTo(List());
const defaultToEmptyString = R.defaultTo('');

module.exports = {
  defaultToEmptyList,
  defaultToEmptyString,
};
