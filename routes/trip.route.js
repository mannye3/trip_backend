import express from 'express';
import { createTrip, getTrip, getUserTrips } from '../controllers/trip.controller.js';

const router = express.Router();

router.post('/create-trips', createTrip);
router.get('/trips/:id', getTrip);
router.get('/user-trips/:email', getUserTrips);

export default router;