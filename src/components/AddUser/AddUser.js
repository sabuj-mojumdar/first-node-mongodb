import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const handleAdduser = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const newUser = { name, email };
        fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    e.target.reset();
                }
            })
        e.preventDefault();
    }
    return (
        <div>
            <h2>Please add an user is Add User</h2>
            <form onSubmit={handleAdduser}>
                <input type="text" ref={nameRef} placeholder="your name" /><br />
                <input type="email" ref={emailRef} placeholder="your email" /><br /><br />
                <input type="submit" value="Add user" />
            </form>
        </div>
    );
};

export default AddUser;