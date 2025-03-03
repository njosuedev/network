import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

interface User {
  id: number;
  name: string;
  gender: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on("users", (data: User[]) => {
      console.log("Received users:", data);
      setUsers(data);
    });

    return () => {
      socket.off("users");
    };
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

export default App;
