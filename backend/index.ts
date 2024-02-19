import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { defaultError, notFound } from "./middleware/errorMiddleware";
import usersRoute from "./routes/usersRoute"
import { connect } from "./db/connect";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Index");
});

app.use("/api/v1/users", usersRoute)

// Error Handlers
app.use(notFound);
app.use(defaultError);

const startServer = async () => {
  try {
    await connect()
    app.listen(process.env.SERVER_PORT, () =>
      console.log(`Server listening to port ${process.env.SERVER_PORT}`)
    );
  } catch (error) {
    throw new Error("Something went wrong when starting server");
  }
};

startServer();
