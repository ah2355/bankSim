import {useState} from 'react';

export default function CreateAcc({onAccountCreate} : {onAccountCreate : () => void}) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleCreateAccount = () => {

        if(userName === '' || password === '' || confirmPassword === ''){
            alert('Please fill in all fields');
            return;
        }
        
        if(password.length < 6){
            alert('Password must be more than 6 characters');
            return;
        }
        
        if(password === confirmPassword){
            onAccountCreate();
        } else {
            alert('Passwords do not match');
        }

        alert('Account created');
        onAccountCreate();
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