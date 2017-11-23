import P from 'bluebird';

describe('ingestion router module', () => {
  let mockRouter, mockBodyParser, mockIngestionApi;

  beforeEach(() => {
    mockRouter = {
      use: jest.fn(),
      get: jest.fn()
    };
    mockBodyParser = { json: jest.fn() };
    mockIngestionApi = {
      getSample: jest.fn().mockReturnValue(P.resolve('sample'))
    };

    jest.mock('express', () => ({
      Router: jest.fn().mockReturnValue(mockRouter)
    }));
    jest.mock('body-parser', () => mockBodyParser);
    jest.mock('../../lib/ingestion-api', () => mockIngestionApi);

    require('../../lib/ingestion-router');
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('/sample GET endpoint', () => {
    let mockRes, mockReq, routeHanlder;

    beforeEach(() => {
      routeHanlder = mockRouter.get.mock.calls.find(
        args => args[0] === '/sample'
      )[1];
      mockRes = { json: jest.fn() };
      mockReq = { query: { source: 'abc.csv' } };
    });

    it('exists', () => {
      expect(routeHanlder).toBeTruthy();
    });

    it('returns sample data', async () => {
      await routeHanlder(mockReq, mockRes);
      expect(mockIngestionApi.getSample).toHaveBeenCalledWith('abc.csv');
      expect(mockRes.json).toHaveBeenCalledWith('sample');
    });
  });
});
