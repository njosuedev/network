import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Adjust based on your backend

interface User {
  id: number;
  name: string;
  email: string;
}

export default function useSocket() {
  const [users, setUsers] = useState<User[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // Listen for real-time updates of the users list
    newSocket.on("usersList", (data: User[]) => {
      console.log("Updated users received:", data);
      setUsers(data); // Update users dynamically
    });

    return () => {
      newSocket.disconnect(); // Cleanup when component unmounts
    };
  }, []);

  return { users, socket };
}
