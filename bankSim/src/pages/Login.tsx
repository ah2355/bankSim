import { useState } from "react";

export default function Login({onLogin, onCreateAccount} : {onLogin : () => void; onCreateAccount : () => void}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        if(username === '' || password === ''){
            alert('Please fill in all fields');
            return;
        }
        
        if(password.length < 6){
            alert('Password must be more than 6 characters');
            return;
        }

        try{
            const response = await fetch('https://banksim-backend.onrender.com/api/login', {
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
            try{
                data = await response.json();
            } 
            catch(err){
                console.error(err);
                alert('Something went wrong while trying to login.');
                return;
            }
            if(response.ok){
                alert('Login successful!');
                onLogin();
            }
            else{

                if(data.error){
                    alert(data.error);
                } else {
                    alert('Failed to login. Please check your credentials.');
                }
            }

        }

        catch(err){
            console.error(err);
            alert("Something went wrong while trying to login.");
        }
    }


    return (
        <div className = "auth-background">
         <div className = "container d-flex justify-content-center align-items-center vh-100">
            <div className = "card p-4 shadow" style = {{width: '400px'}}>
                <h2 className = "text-center">LOGIN</h2>
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