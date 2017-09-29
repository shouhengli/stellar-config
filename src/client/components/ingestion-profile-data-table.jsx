const React = require('react');
const R = require('ramda');

module.exports = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          {
            R.range(0, 30).map((i) => {
              switch (i % 3) {
                case 0:
                  return (
                    <th key={i}>
                      ID
                    </th>
                  );
                case 1:
                  return (
                    <th key={i}>
                      Name
                    </th>
                  );
                case 2:
                  return (
                    <th key={i}>
                      Age
                    </th>
                  );
              }
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          R.range(0, 25).map((r) => {
            return (
              <tr key={r}>
                {
                  R.range(0, 30).map((i) => {
                    switch (i % 3) {
                      case 0:
                        return (
                          <th key={i}>
                            1
                          </th>
                        );
                      case 1:
                        return (
                          <th key={i}>
                            John Snow
                          </th>
                        );
                      case 2:
                        return (
                          <th key={i}>
                            32
                          </th>
                        );
                    }
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
