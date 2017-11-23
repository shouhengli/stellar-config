describe('ingestion api module', () => {
  let mockSuperagent, mockConfig;

  beforeEach(() => {
    mockConfig = {
      ingestion: {
        server: 'ingestion-server',
        port: '1111'
      }
    };
    mockSuperagent = {
      get: jest.fn().mockReturnThis(),
      accept: jest.fn().mockReturnThis(),
      query: jest.fn().mockReturnThis(),
      end: jest.fn(function(callback) {
        return callback(null, { body: 'content' });
      })
    };
    jest.mock('superagent', () => mockSuperagent);
    jest.mock('../../server.json', () => mockConfig);
  });
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('#getSample', () => {
    it('sends a request to ingestion server to get sample json data', async () => {
      let sample = await require('../../lib/ingestion-api').getSample(
        'abc.csv'
      );
      expect(mockSuperagent.get).toHaveBeenCalledWith(
        'http://ingestion-server:1111/sampler/do-sample'
      );
      expect(mockSuperagent.accept).toHaveBeenCalledWith('json');
      expect(mockSuperagent.query).toHaveBeenCalledWith({
        file: 'abc.csv',
        samples: 25
      });
      expect(sample).toEqual('content');
    });
  });
});
