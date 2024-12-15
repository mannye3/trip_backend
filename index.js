import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import tripRoutes from "./routes/trip.route.js";
import adminRoutes from "./routes/adminRoutes.js";



dotenv.config();


const app = express();

app.use(cors({
  origin: 'https://trip-client-zeta.vercel.app', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  credentials: true // Allow cookies and auth headers
}));


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server running on port ${process.env.PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
