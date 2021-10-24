import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [])
    //delete an user
    const handleDeleteuUser = id => {
        const proced = window.confirm("Are you sure you want to delete?");
        if (proced) {
            const url = `http://localhost:4000/users/${id}`;

            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                })

        }
    }
    return (
        <div>
            <h2>This is Users {users.length}</h2>
            <ul className="ul">
                {
                    users.map(user => <div key={user._id} className='li'>
                        <li>{user.name}</li>
                        <li>{user.email}</li>
                        <Link to={`/users/update/${user._id}`}>
                            <button>update</button>
                        </Link>
                        <button onClick={() => handleDeleteuUser(user._id)}>delete</button>
                    </div>)
                }
            </ul>
        </div>
    );
};

export default Users;