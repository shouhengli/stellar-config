const React = require('react');
const {List} = require('immutable');

module.exports = ({sample}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {
            sample.get('headers', List()).map((header, i) =>
              <th key={i}>
                {header}
              </th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          sample.get('rows', List()).map((row, i) =>
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
