// const mongoose = require('mongoose');
import mongoose from "mongoose";
const tripSchema = new mongoose.Schema({
  userSelections: {
    location: { type: String, required: true },
    noOfDays: { type: Number, required: true },
    budget: { type: String, required: true },
    traveler: { type: String, required: true },
    activities: { type: [String], required: true },
  },
  tripData: {
    locationOverview: {
      briefHistory: String,
      culturalSignificance: String,
      historicalEvents: [String],
      landmarks: [String],
      localCustoms: String,
      culturalHighlights: [String],
      geographicFeatures: String,
      climate: String,
    },
    hotelOptions: [Object],
    dailyItinerary: [Object],
    estimatedCosts: {
      transportation: Object,
      dining: Object,
      activities: Object,
    },
    additionalInformation: {
      currency: String,
      exchangeRate: String,
      timezone: String,
      weather: String,
      transportation: String,
    },
  },
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
});

export const Trip  = mongoose.model('TripPlan', tripSchema);
