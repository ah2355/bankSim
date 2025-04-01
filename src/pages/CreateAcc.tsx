import {useState} from 'react';

export default function CreateAcc({onAccountCreate} : {onAccountCreate : () => void}) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleCreateAccount = async () => {
        if(userName === '' || password === '' || confirmPassword === ''){
            alert('Please fill in all fields');
            return;
        }
        
        if(password.length < 6){
            alert('Password must be more than 6 characters');
            return;
        }
        
        if(password !== confirmPassword){
            alert('Passwords do not match')
            return;
        }

        try {
            const response = await fetch('https://banksim-backend.onrender.com/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName,
                    password: password
                })
            });

            const data = await response.json();
            console.log("Response status:", response.status);
            console.log("Response data:", data);
            if (response.ok) {
                alert('Account created successfully! You can now log in.');
                onAccountCreate();
            } else {
                alert(data.error || "Failed to create account.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }

    }

    return(
        <div className = "auth-background">
            <div className = "d-flex justify-content-center align-items-center vh-100"> 
            <div className = "card p-4 shadow" style = {{width: '400px'}}> 
                <h2>Create Account</h2>
                <div className = "mb-3">
                    <label className = "form-label">Username</label>
                    <input type = "text" className = "form-control" placeholder = "Enter username" onChange = {(e) => setUserName(e.target.value)} />
                </div>
                <div className = "mb-3">
                    <label className = "form-label">Password</label>
                    <input type = "password" className = "form-control" placeholder = "Enter password" onChange = {(e) => setPassword(e.target.value)} />
                </div>
                <div className = "mb-3">
                    <label className = "form-label">Confirm Password</label>
                    <input type = "password" className = "form-control" placeholder = "Confirm password" onChange = {(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button className = "btn btn-primary w-100" onClick = {handleCreateAccount}>Create Account</button>
            </div>
        </div>
        </div>
    );
}