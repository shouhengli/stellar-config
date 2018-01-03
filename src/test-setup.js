/* simple polyfill for requestAnimationFrame, 
 * so we don't see the annoying warning from Jest
 * https://github.com/facebook/jest/issues/4545
 */
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });

class Worker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = () => {};
  }

  postMessage(msg) {
    this.onmessage(msg);
  }
}

global.Worker = Worker;
