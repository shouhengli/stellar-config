const React = require('react');

const {defaultToEmptyList} = require('../util');

module.exports = ({sample}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {
            defaultToEmptyList(sample.get('headers')).map((header, i) =>
              <th key={i}>
                {header}
              </th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          defaultToEmptyList(sample.get('rows')).map((row, i) =>
            <tr key={i}>
              {
                row.map((cell, i) =>
                  <td key={i}>
                    {cell}
                  </td>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  );
};
