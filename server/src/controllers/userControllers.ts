import pool from "../config/db";
import { Server } from "socket.io";

export async function emitUsers(io: Server) {
    try {
      const [rows] = await pool.query("SELECT * FROM users");
    //   console.log("Users fetched:", rows);
  
      // Emit users to all connected clients
      io.emit("users", rows);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }
  
