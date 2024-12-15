
import { Trip } from './../models/trip.model.js';

export const createTrip = async (req, res) => {
  try {
    const tripData = req.body;
    console.log("Trip data received:", tripData);
    const newTrip = new Trip(tripData);
    await newTrip.save();
    res.status(201).json({ id: newTrip._id });
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
   // res.status(500).json({ message: "Failed to save trip", error: error.message });
  }

};

export const getTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

     const { id } = req.params; // Access 'id' directly
  

    const trip = await Trip.findById(id);

   

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (err) {
    console.error("Error fetching trip data:", err);
    res.status(500).json({ message: "Failed to fetch trip data", error: err.message });
  }
}; 

export const getUserTrips = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const trips = await Trip.find({ 
      userEmail, 
      status: 'active' 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      trips
    });
  } catch (error) {
    console.error('Error fetching user trips:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user trips',
      error: error.message
    });
  }
};