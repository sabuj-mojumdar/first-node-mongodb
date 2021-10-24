import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        const url = `http://localhost:4000/users/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])
    return (
        <div>
            <h2>This is Update User: {id}</h2>
            <h3>Hello {user.name}</h3>
            <h3>email {user.email}</h3>
        </div>
    );
};

export default UpdateUser;