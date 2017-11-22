import P from 'bluebird';

function MockError() {}
MockError.prototype = Object.create(Error.prototype);

describe('config router module', () => {
  let mockRouter, mockBodyParser, mockStore, mockUtil;
  const mockConfigTypes = ['typeA', 'typeB'],
    mockConfigContent = '{"a":1}',
    mockConfigNames = ['c1', 'c2'];

  beforeEach(() => {
    mockRouter = {
      use: jest.fn(),
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn()
    };
    mockBodyParser = { json: jest.fn() };
    mockStore = {
      listConfigTypes: jest.fn().mockReturnValue(P.resolve(mockConfigTypes)),
      getConfig: jest.fn().mockReturnValue(P.resolve(mockConfigContent)),
      defineConfig: jest.fn().mockReturnValue(P.resolve('ok')),
      deleteConfig: jest.fn().mockReturnValue(P.resolve('ok')),
      listConfigs: jest.fn().mockReturnValue(P.resolve(mockConfigNames)),
      NonexistentKeyError: MockError
    };
    mockUtil = {
      sendServerError: jest.fn(),
      sendNotFound: jest.fn(),
      sendOk: jest.fn()
    };

    jest.mock('express', () => ({
      Router: jest.fn().mockReturnValue(mockRouter)
    }));
    jest.mock('body-parser', () => mockBodyParser);
    jest.mock('../config-store', () => mockStore);
    jest.mock('../util', () => mockUtil);

    require('../config-router');
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('/ GET endpoint', () => {
    let mockRes, routeHanlder;

    beforeEach(() => {
      routeHanlder = mockRouter.get.mock.calls.find(args => args[0] === '/')[1];
      mockRes = { json: jest.fn() };
    });

    it('exists', () => {
      expect(routeHanlder).toBeTruthy();
    });

    it('returns a list of config types', async () => {
      await routeHanlder(null, mockRes);
      expect(mockStore.listConfigTypes).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockConfigTypes);
    });

    it('sends 500 response when request failed', async () => {
      mockStore.listConfigTypes.mockReturnValue(P.reject('mockError'));
      await routeHanlder(null, mockRes);
      expect(mockUtil.sendServerError).toHaveBeenCalledWith(mockRes);
    });
  });

  describe('/:type/:name GET endpoint', () => {
    let mockRes, mockReq, routeHanlder;

    beforeEach(() => {
      routeHanlder = mockRouter.get.mock.calls.find(
        args => args[0] === '/:type/:name'
      )[1];
      mockRes = { json: jest.fn() };
      mockReq = { params: { type: 'type', name: 'name' } };
    });

    it('exists', () => {
      expect(routeHanlder).toBeTruthy();
    });

    it('returns the config content if found', async () => {
      await routeHanlder(mockReq, mockRes);
      expect(mockStore.getConfig).toHaveBeenCalledWith('type', 'name');
      expect(mockRes.json).toHaveBeenCalledWith(JSON.parse(mockConfigContent));
    });

    it('sends 500 response when request failed', async () => {
      mockStore.getConfig.mockReturnValue(P.reject('mockError'));
      await routeHanlder(mockReq, mockRes);
      expect(mockUtil.sendServerError).toHaveBeenCalledWith(mockRes);
    });

    it('sends 404 response when config does not exist', async () => {
      mockStore.getConfig.mockReturnValue(P.reject(new MockError()));
      await routeHanlder(mockReq, mockRes);
      expect(mockUtil.sendNotFound).toHaveBeenCalledWith(mockRes);
    });
  });

  describe('/:type/:name POST endpoint', () => {
    let mockRes, mockReq, routeHanlder;

    beforeEach(() => {
      routeHanlder = mockRouter.post.mock.calls.find(
        args => args[0] === '/:type/:name'
      )[1];
      mockRes = jest.fn();
      mockReq = {
        params: { type: 'type', name: 'name' },
        body: { content: 'something' }
      };
    });

    it('returns OK if successful', async () => {
      await routeHanlder(mockReq, mockRes);
      expect(mockStore.defineConfig).toHaveBeenCalledWith(
        'type',
        'name',
        JSON.stringify(mockReq.body)
      );
      expect(mockUtil.sendOk).toHaveBeenCalled();
    });

    it('sends 500 response when request failed', async () => {
      mockStore.defineConfig.mockReturnValue(P.reject('mockError'));
      await routeHanlder(mockReq, mockRes);
      expect(mockUtil.sendServerError).toHaveBeenCalledWith(mockRes);
    });
  });

  describe('/:type/:name DELETE endpoint', () => {
    let mockRes, mockReq, routeHanlder;

    beforeEach(() => {
      routeHanlder = mockRouter.delete.mock.calls.find(
        args => args[0] === '/:type/:name'
      )[1];
      mockRes = { json: jest.fn() };
      mockReq = { params: { type: 'type', name: 'name' } };
    });

    it('exists', () => {
      expect(routeHanlder).toBeTruthy();
    });

    it('returns OK when successful', async () => {
      await routeHanlder(mockReq, mockRes);
      expect(mockStore.deleteConfig).toHaveBeenCalledWith('type', 'name');
      expect(mockUtil.sendOk).toHaveBeenCalled();
    });

    it('sends 500 response when request failed', async () => {
      mockStore.deleteConfig.mockReturnValue(P.reject('mockError'));
      await routeHanlder(mockReq, mockRes);
      expect(mockUtil.sendServerError).toHaveBeenCalledWith(mockRes);
    });

    it('sends 404 response when config does not exist', async () => {
      mockStore.deleteConfig.mockReturnValue(P.reject(new MockError()));
      await routeHanlder(mockReq, mockRes);
      expect(mockUtil.sendNotFound).toHaveBeenCalledWith(mockRes);
    });
  });

  describe('/:type GET endpoint', () => {
    let mockRes, mockReq, routeHanlder;

    beforeEach(() => {
      routeHanlder = mockRouter.get.mock.calls.find(
        args => args[0] === '/:type'
      )[1];
      mockRes = { json: jest.fn() };
      mockReq = { params: { type: 'type' } };
    });

    it('exists', () => {
      expect(routeHanlder).toBeTruthy();
    });

    it('returns a list of config types', async () => {
      await routeHanlder(mockReq, mockRes);
      expect(mockStore.listConfigs).toHaveBeenCalledWith('type');
      expect(mockRes.json).toHaveBeenCalledWith(mockConfigNames);
    });

    it('sends 500 response when request failed', async () => {
      mockStore.listConfigs.mockReturnValue(P.reject('mockError'));
      await routeHanlder(mockReq, mockRes);
      expect(mockUtil.sendServerError).toHaveBeenCalledWith(mockRes);
    });
  });
});
