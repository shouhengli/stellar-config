describe('util module', () => {
  let util, fs, yaml, res;

  beforeEach(() => {
    jest.mock('fs', () => ({
      readFileSync: jest.fn().mockReturnValue('mock file')
    }));
    jest.mock('js-yaml', () => ({
      safeLoad: jest.fn().mockReturnValue('mock yaml')
    }));
    util = require('../../lib/util');
    fs = require('fs');
    yaml = require('js-yaml');
    res = { sendStatus: jest.fn() };
  });
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('#loadYamlSync', () => {
    it('loads YAML file from the given path', () => {
      const res = util.loadYamlSync('parent', 'child', 'file.yml');
      expect(fs.readFileSync).toHaveBeenCalledWith('parent/child/file.yml', {
        encoding: 'utf8'
      });
      expect(yaml.safeLoad).toHaveBeenCalledWith('mock file');
      expect(res).toEqual('mock yaml');
    });
  });

  describe('#sendServerError', () => {
    it('sends 500 server error response', () => {
      util.sendServerError(res);
      expect(res.sendStatus).toHaveBeenCalledWith(500);
    });
  });

  describe('#sendOk', () => {
    it('sends 200 ok server response', () => {
      util.sendOk(res);
      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });
  });

  describe('#sendNotFound', () => {
    it('sends 404 not found server response', () => {
      util.sendNotFound(res);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });
});
