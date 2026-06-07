import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5173;

async function start() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

start();