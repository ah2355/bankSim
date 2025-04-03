import { useState } from "react";

export default function Login({onLogin, onCreateAccount} : {onLogin : () => void; onCreateAccount : () => void}) {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success'); 
    const handleLogin = async () => {
        if(username === '' || password === ''){
           setMessageType('error');
           setMessage('Please fill in all fields');
            return;
        }
        
        if(password.length < 6){
            setMessageType('error');
            setMessage('Password must be at least 6 characters long');
            return;
        }

        try{
            const response = await fetch(`${BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            let data;
            try {
                const raw = await response.text();
                console.log("RAW response from backend:", raw);
                console.log("bad");

                data = raw ? JSON.parse(raw) : null;

                if (!data) {
                    setMessageType('error');
                    setMessage('Empty response from server.');
                    return;
                }
            } catch (err) {
                console.error("JSON parse error:", err);
                setMessageType('error');
                setMessage('Invalid response from server.');
                return;
            }

            if(response.ok){
                setMessageType('success');
                setMessage('Login successful!');
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("isLoggedIn", "true");
                onLogin();
            }
            else{

                setMessageType('error');
                setMessage(data.error||'Login failed');
            }

        }

        catch(err){
            console.error(err);
            setMessageType('error');
            setMessage('Something went wrong while trying to login.');
        }
    }


    return (
        <div className = "auth-background">
         <div className = "container d-flex justify-content-center align-items-center vh-100">
            <div className = "card p-4 shadow" style = {{width: '400px'}}>
                <h2 className = "text-center">LOGIN</h2>
                {message && ( 
                    <div className={`alert alert-${messageType} mt-3 text-center w-100`} role="alert" > 
                      {message}
                       </div>
                )}
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