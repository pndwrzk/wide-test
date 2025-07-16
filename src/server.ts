import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import router from "@routes/routes";
import { PORT } from "./config";
import { errorHandler } from "./utils/error-handler";
import { DB } from "./database";

const appServer = express();
const port = PORT;

const corsOptions: cors.CorsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

appServer.use(cors(corsOptions));
appServer.use(limiter); // Apply rate limiter to all requests
appServer.use(express.json({ limit: "10mb" }));
appServer.use(express.urlencoded({ limit: "10mb", extended: true }));
appServer.use("/api/v1", router);



appServer.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.originalUrl} not found`,
    daata: null,
  });
});

appServer.use(errorHandler);

DB.sequelize
  .authenticate()
  .then(() => {
    appServer.listen(port, () => {
      console.info(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
