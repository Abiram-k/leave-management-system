import app from "./app";
import { config } from "dotenv";
import http from "http";
config();

const PORT = process.env.BACKEND_PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
 