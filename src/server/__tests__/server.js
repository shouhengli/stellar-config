describe('server', () => {
  let mockExpress,
    mockApp,
    mockConfig,
    mockConfigRouter,
    mockIngestionRouter,
    mockStaticRouter;

  beforeEach(() => {
    mockStaticRouter = jest.fn();
    mockConfigRouter = jest.fn();
    mockConfigRouter = jest.fn();
    mockIngestionRouter = jest.fn();
    mockConfig = { port: 1111 };
    mockApp = {
      use: jest.fn(),
      listen: jest.fn((port, callback) => callback())
    };
    mockExpress = jest.fn().mockReturnValue(mockApp);
    mockExpress.static = jest.fn().mockReturnValue(mockStaticRouter);
    jest.mock('express', () => mockExpress);
    jest.mock('../server.json', () => mockConfig);
    jest.mock('../lib/config-router', () => mockConfigRouter);
    jest.mock('../lib/ingestion-router', () => mockIngestionRouter);

    jest.spyOn(console, 'log');

    require('../server');
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('serves static files from "public" dir', () => {
    expect(mockExpress.static).toHaveBeenCalledWith('public');
    expect(mockApp.use).toHaveBeenCalledWith(mockStaticRouter);
  });

  it('uses config router from "/config"', () => {
    expect(mockApp.use).toHaveBeenCalledWith('/config', mockConfigRouter);
  });

  it('uses ingestion router from "/ingestion"', () => {
    expect(mockApp.use).toHaveBeenCalledWith('/ingestion', mockIngestionRouter);
  });

  it('server listens to the port from config json', () => {
    expect(mockApp.listen.mock.calls[0][0]).toEqual(mockConfig.port);
  });

  it('logs message when server starts', () => {
    expect(console.log).toHaveBeenCalledWith(
      `Seaweed started on port ${mockConfig.port}.`
    );
  });
});
