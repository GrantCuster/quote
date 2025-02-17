import express, { Application, Request, Response, NextFunction } from "express";
import pool from "./db";
import dotenv from "dotenv";
import { backendPort } from "../../app-config";
import path from "path";

dotenv.config();

const app: Application = express();

app.use(express.json());

const ADMIN_SECRET = process.env.ADMIN_SECRET;

app.use(express.static(path.join(__dirname, "../../../../frontend/dist"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".html")) {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    } else {
      res.setHeader("Cache-Control", "max-age=31536000, immutable");
    }
  }
}));

// Middleware for authentication
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== `Bearer ${ADMIN_SECRET}`) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  next(); // Continue to the route if authorized
};

app.get("/api/quotes", async (_: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM quotes");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post(
  "/api/login",
  (req: Request, res: Response) => {
    const { admin_secret } = req.body;
    if (admin_secret === ADMIN_SECRET) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  },
  [],
);

app.post(
  "/api/quote/add",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { quote, author, source } = req.body;

      if (!quote || !author || !source) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      const result = await pool.query(
        "INSERT INTO quotes (quote, author, source) VALUES ($1, $2, $3) RETURNING *",
        [quote, author, source],
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },
);

app.get("*", (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../../../frontend/dist/index.html"));
});

const isDev = process.env.NODE_ENV === "development";
const PORT = isDev ? backendPort : 5060;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
