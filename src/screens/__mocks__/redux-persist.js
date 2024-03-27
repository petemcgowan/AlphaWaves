const reduxPersist = {
  persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
  persistStore: jest.fn().mockImplementation(() => ({
    getState: jest.fn(),
    dispatch: jest.fn(),
  })),
};

module.exports = reduxPersist;
