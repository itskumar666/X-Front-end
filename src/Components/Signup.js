import React, { useState } from "react";
import "./signup.css";

function Signup() {
    const [isOpen, setIsOpen] = useState({
        Signup: false,
        Login: false,
    });
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('black');
    const [formType, setFormType] = useState(''); // New state to track the form type

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = formType === 'Signup' ? 'register' : 'login';
        const bodyData = formType === 'Signup' ? { name, email, password } : { username, password };

        const response = await fetch(`http://localhost:9000/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData),
            credentials: 'include'
        })
        ;
        const data = await response.json();
        console.log(data);
    };

    const handleChange = (event) => {
        const { name: fieldName, value } = event.target;
        if (fieldName === 'name') setName(value);
        if (fieldName === 'email') setEmail(value);
        if(fieldName === 'username') setUsername(value);
        if (fieldName === 'password') setPassword(value);
    };
    
    const toggleForm = (formType) => {
        setIsOpen(prevState => ({
            Signup: formType === 'Signup' ? !prevState.Signup : false,
            Login: formType === 'Login' ? !prevState.Login : false,
        }));
        setFormType(formType);
        setBackgroundColor(isOpen.Login || isOpen.Signup ? 'black' : '#2f2f2f');
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
                    <button name="Signup" onClick={() => toggleForm('Signup')}>Create Account</button>
                    <p className="custom-text mt-2 ml-2">
                        By signing up, you agree to the <span className="span-blue">Terms of Service</span> and <span className="span-blue">Privacy Policy</span>, including <span className="span-blue">Cookie Use.</span>
                    </p>
                    <h1 className="mt-10 mb-3 ml-1 w-80 text-1xl">Already have an account?</h1>
                    <button name="Login" onClick={() => toggleForm('Login')}>Sign in</button>
                </div>
            </div>
            {isOpen.Signup && (
                <div className="form-div w-1/2 h-4/5 flex flex-col justify-center items-center bg-black overflow-y-auto">
                    <button className="cut-btn1" onClick={() => toggleForm('Signup')}>x</button>
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
                        <input
                            className="p-2 rounded-md mt-4"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
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

            {isOpen.Login && (
                <div className="form-div w-1/2 h-4/5 flex flex-col justify-center items-center bg-black overflow-y-auto ">
                    <button className="cut-btn" onClick={() => toggleForm('Login')}>x</button>
                    <img className="absolute w-10 h-10 left-1/2 top-2" src="x.png" alt="logo" />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 mt-12">
                        <h1 className="text-4xl text-white">Login</h1>
                        <input
                            className="p-2 rounded-md mt-4"
                            type="useranme"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                         <input
                            className="p-2 rounded-md mt-4"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Signup;
