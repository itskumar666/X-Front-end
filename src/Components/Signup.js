import React, { useState } from "react";
import "./signup.css";

function Signup() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('black');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:9000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
        });
        const data = await response.json();
        console.log(data);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
    };

    const toggleForm = () => {
        setIsOpen(!isOpen);
        setBackgroundColor(isOpen ? 'black' : '#2f2f2f');
    };

    return (
        <div style={{ backgroundColor }} className="flex relative bg-black h-screen">
            <div className="w-1/2">
                <div className="flex justify-center items-center h-screen">
                    <img src="x.png" alt="logo img" />
                </div>
            </div>
            <div className="w-1/2 text-white flex justify-center items-center relative">
                <div className="absolute top-16 left-10">
                    <h1 className="text-7xl mb-10">Happening Now</h1>
                    <h3 className="text-5xl">Join Today</h3>
                </div>
                <div className="absolute w-96 top-80 left-10 flex flex-col">
                    <button onClick={toggleForm}>Create Account</button>
                    <p className="custom-text mt-2 ml-2">
                        By signing up, you agree to the <span className="span-blue">Terms of Service</span> and <span className="span-blue">Privacy Policy</span>, including <span className="span-blue">Cookie Use.</span>
                    </p>
                    <h1 className="mt-10 mb-3 ml-1 w-80 text-1xl">Already have an account?</h1>
                    <button>Sign in</button>
                </div>
            </div>
            {isOpen && (
                <div className="form-div">
                    <button className="cut-btn" onClick={toggleForm}>x</button>
                    <img className="absolute w-10 h-10 left-1/2 top-2" src="x.png" alt="logo" />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 mt-12">
                        <h1 className="text-4xl text-white">Create your account</h1>
                        <input
                            className="p-2 rounded-md mt-14"
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <input
                            className="p-2 rounded-md mt-4"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <h1>Date of Birth</h1>
                        <p className="text-white text-sm">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                        <input
                            className="p-2 rounded-md"
                            type="date"
                            id="birthday"
                            name="birthday"
                        />
                        <button type="submit">Register</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Signup;
