import fetchMock from "jest-fetch-mock";
const Shows = require("./Shows"); 

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
      // Ensure fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1/episodes'); 
      // Ensure the result is the correct count of items
      expect(count).toEqual(3); 
  
      // Restore the original fetch implementation
      global.fetch.mockRestore();
    });
});
  


describe("Shows", () => {
  // Reset fetch mocks before each test
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should count comments for items correctly", async () => {
    const mockResponse = [
      {
        comment: "This is nice!",
        creation_date: "2021-01-10",
        username: "John",
      },
      {
        comment: "Great content!",
        creation_date: "2021-02-10",
        username: "Jane",
      },
    ];
    // Mock the fetch function with custom implementation
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tV364kOhzeIf5RoUn6sV/comments")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        });
      }
    });
    // expect for two comments for total number of shows(39) will result double (78)
    const commentsCount = await Shows.countCommentsForItems();
    expect(commentsCount).toBe(78);
  });
});






