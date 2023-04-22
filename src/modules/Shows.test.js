import fetchMock from "jest-fetch-mock";
const Shows = require("./Shows"); 
// require('jest-fetch-mock');


describe('Shows', () => {
    test('should return the correct count of items', async () => {
      // Mock the fetch response
      const mockResponse = [{ id: 1, title: 'Episode 1' }, { id: 2, title: 'Episode 2' }, { id: 3, title: 'Episode 3' }];
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      });
  
      // Call countAllItems() function
      const count = await Shows.countAllItems();
  
      // Assert the result
      expect(global.fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1/episodes'); // Ensure fetch was called with the correct URL
      expect(count).toEqual(3); // Ensure the result is the correct count of items
  
      // Restore the original fetch implementation
      global.fetch.mockRestore();
    });
});