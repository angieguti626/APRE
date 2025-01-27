/**
 * Author: Angelica Gutierrez
 * Date: 26 January 2025
 * File: agent-performance-by-region.spec.js
 * Description: Test agent performance by region API
 */

// Require the modules
const request = require('supertest');
const app = require('../../../../src/app');
const { mongo } = require('../../../../src/utils/mongo');


jest.mock('../../../../src/utils/mongo');

// Test the agent performance API for agent performance report by region.
describe('APRE Agent Performance API - Performance By Region', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  // Test the agent-performance-by-region endpoint
  it('should fetch performance data for agents with a specified region', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              agents: ['Avery Doe', 'Ben Lewis', 'John O'],
              region: [North, East, South, West]
            }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/reports/agent-performance/agent-performance-by-region/650c1f1e1c9d440000a1b1c4'); // Send a GET request to the agent-performance-by-region endpoint

    // asserts
    expect(response.status).toBe(200); 
    expect(response.body).toEqual([
      {
        agents: ['Avery Doe', 'Ben Lewis', 'John O'],
        region: [North, East, South, West]
      }
    ]);
  });

  // Test the agent-performance-by-region endpoint if no region is found
  it('should return 200 with an empty array if no region is found', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        distinct: jest.fn().mockResolvedValue([])
      };
      await callback(db);
    });

    const response = await request(app).get('/api/reports/agent-performance/agent-performance-by-region/');

    // asserts
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // Test the agent-performance-by-region endpoint with an invalid region
  it('should return 400 for an invalid endpoint', async () => {
    const response = await request(app).get('/api/reports/agent-performance/agent-performance-by-region/invalid-region'); // Send a GET request to an invalid endpoint
    
    // asserts
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Region is required',
      status: 400,
      type: 'error'
    });
  });
});