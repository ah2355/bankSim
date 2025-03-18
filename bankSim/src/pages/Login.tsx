import { useState } from "react";

export default function Login({onLogin, onCreateAccount} : {onLogin : () => void; onCreateAccount : () => void}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        if(username === 'admin' && password === 'admin') {
            onLogin();
        } else{
            alert('Invalid credentials');
        }
    };
    return (
        <div className = "auth-background">
         <div className = "container d-flex justify-content-center align-items-center vh-100">
            <div className = "card p-4 shadow" style = {{width: '400px'}}>
                <h2 className = "text-center">Login</h2>
                <div className = "mb-3">
                    <label className= "form-label">Username</label>
                    <input type = "text" className = "form-control" placeholder="Enter username" onChange = {(e) => setUsername(e.target.value)} />
                </div>
                <div className = "mb-3">
                    <label className= "form-label">Password</label>
                    <input type = "password" className = "form-control" placeholder="Enter password" onChange = {(e) => setPassword(e.target.value)} />
                </div>
                <button className = "btn btn-primary w-100" onClick = {handleLogin}>Login</button>
                <button className = "btn btn-link w-100" onClick ={onCreateAccount}>Create Account</button>
            </div>
         </div>
        </div>
    );
}