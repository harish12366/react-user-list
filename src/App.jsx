
import { useState, useEffect } from "react";
import "./App.css";
import Usercard from "./components/user card/Usercard";
const url = "https://jsonplaceholder.typicode.com/users";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.log(error);
                setError("Failed to load users.");
            } finally {
                setLoading(false);
            }
        }

        getUsers();
    }, []);

    if (loading) {
        return <h2 className="status">Loading users...</h2>;
    }

    if (error) {
        return <h2 className="status error">{error}</h2>;
    }

    return (
        <div className="app">
            <h1>User Directory</h1>
            <p className="subtitle">Explore our list of users.</p>

            <div className="card-list">
                {users.map((user) => (
                    <Usercard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}

export default App;
