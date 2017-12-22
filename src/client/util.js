export const R = require('ramda');
export const { List, Map } = require('immutable');
export const defaultToEmptyList = R.defaultTo(List());
export const defaultToEmptyString = R.defaultTo('');
export const defaultToEmptyMap = R.defaultTo(Map());
export const defaultToEmptyArray = R.defaultTo([]);
export const defaultToEmptyObject = R.defaultTo({});
export const isNotEmpty = value => !R.isNil(value) && !R.isEmpty(value);
export const noop = () => {};
