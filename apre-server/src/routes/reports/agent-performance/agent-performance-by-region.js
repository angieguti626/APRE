/**
 * Author: Angelica Gutierrez
 * Date: 26 January 2025
 * File: agent-performance-by-region.js
 * Description: Agent Performance by Region
 */
'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');
const createError = require('http-errors');

const ObjectId = require('mongodb').ObjectId; 

const router = express.Router();

router.get('/agent-performance-by-region', (req, res, next) => {
  try {
    mongo (async db => {
      const regions = await db.collection('agentPerformance').distinct('regionId');
      res.send(regions);
    }, next);
  } catch (err) {
    console.error('Error getting regions: ', err);
    next(err);
  }
});

router.get('/agent-performance-by-region/:regionId', (req, res, next) => {
  try {
    const regionId = req.params.regionId;

    if (!regionId.match(/^[0-9a-fA-F]{24}$/)) {
      return next(createError(400, 'Region is required'));
    }

    console.log('Fetching agent performance report for region:', regionId);

    mongo (async db => {
      const agentPerformanceReportByRegion = await db.collection('agentPerformance').aggregate([
        { $match: { regionId: new ObjectId(regionId) }},
        {
          $lookup: {
            from: 'agents',
            localField: 'agentId',
            foreignField: 'agentId',
            as: 'agentDetails'
          }
        },
        {
          $unwind: '$agentDetails'
        },
        {
          $group: {
            _id: '$agentDetails.name',
            region: { $sum: '$region'}
          }
        },
        {
          $project: {
            _id: 0,
            agent: '$_id',
            region: '$region'
          }
        },
        {
          $group: {
            _id: null,
            agents: { $push: '$agent' },
            region: { $push: '$region' }
          }
        },
        {
          $project: {
            _id: 0,
            agents: 1,
            region: 1
          }
        }
      ]).toArray();
      res.send(agentPerformanceReportByRegion);
    }, next);
  } catch (err) {
    console.error('Error getting agent performance data for region: ', err);
    next(err);
  }
});

module.exports = router;