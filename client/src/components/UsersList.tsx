import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './UsersList.css';  // Import the CSS file

const socket = io("http://localhost:5000");

function UsersList() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    socket.on("users", (data) => {
      console.log("Received users:", data); // Log to check data structure
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
              <th>Name</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user['user-id'] || index}>
                <td>{user['user-name']}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-users">No users found</div>
      )}
    </div>
  );
}

export default UsersList;
