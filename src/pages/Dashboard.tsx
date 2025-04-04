import React, { useState } from 'react';
interface User {
    username: string;
    role: string;
    balance: number;
    id: number;
}
export default function Dashboard({user, onLogout} : {user : User; onLogout : () => void}) {
    const [showDeposit, setShowDeposit] = useState(false);
    const [amount, setAmount] = useState(0);
    return (
    <div className = "container mb-5"> 
        <h2 className = "text-center mb-4">Welcome, {user.username}</h2>
        <div className = "d-flex flex-column justify-content-center align-items-center">
            <div className = "col-md-4 mb-2">
                <div className = "card shadow text-center">
                    <div className = "card-body">
                        <h5 className = "card-title">User Information</h5>
                        <p className = "card-text">Username: {user.username}</p>
                        <p className = "card-text">Role: {user.role}</p>
                    </div>
                </div>
            </div>

            <div className = "col-md-4">
                <div className = "card shadow text-center" style={{ width: "100%", maxWidth: "500px", padding: "20px 30px", 
                    borderRadius: "1rem"}}>
                    <div className = "card-body">
                        <h5 className = "card-title">Account Balance</h5>
                        <p className = "card-text">Balance: ${user.balance}</p>
                        <div className = "d-flex justify-content-center">
                            <button className = "btn me-2" style={{background : 'green', color: 'white'}} 
                            onClick={() => setShowDeposit(true)}>Deposit</button>
                            <button className = "btn" style={{background : 'crimson', color: 'white'}}>Withdraw</button>
                        </div>
                    </div>
                </div>
            </div>

            {showDeposit && (
                <div className = "col-md-4 mt-3">
                    <div className = "card shadow text-center">
                        <div className = "card-body">
                            <h3>Enter Deposit Amount</h3>
                            <div className = "d-flex justify-content-center align-items-center mb-3">
                                <button className = "btn btn-outline-secondary fs-4 px-4 py-2" onClick={() => setAmount((prev) => Math.max(0, Number(prev) - 1))}>-</button>
                                <div className="input-group" style={{ width: "160px", height: "60px" }}>
                                    <span className="input-group-text fs-4" style={{ backgroundColor: "#f8f9fa" }}>
                                     $</span> 
                                    <input type="number" step="0.01" min="0" value={amount}  onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        if (!isNaN(value) && value >= 0) {
                                            setAmount(value);
                                        } else {
                                            setAmount(0);
                                        }}} className="form-control text-center fw-bold" style={{ fontSize: "1.8rem", color: "blue", height: "60px", paddingTop: "0", paddingBottom: "0",}}
                                    />
                                    </div>
                                
                                <button className = "btn btn-outline-secondary fs-4 px-4 py-2" onClick = {() => setAmount(amount+1)}>+</button>
                            </div>

                            <button className = "btn btn-success" onClick = {async() => {
                                if(amount <= 0){
                                    alert('Please enter a valid amount');
                                    return;
                                }
                                try{
                                    const response = await fetch('http://localhost:5001/api/deposit', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                                        },
                                        body: JSON.stringify({
                                            amount: amount,
                                            userId: user.id
                                        })
                                    });
                                    const data = await response.json();
                                    if(response.ok){
                                        alert(`Deposited $${amount}`);
                                        setAmount(0);
                                        setShowDeposit(false);
                                    }
                                    else{
                                        alert(data.error || 'Deposit failed');
                                    }
                                }
                                catch(err){
                                    console.error(err);
                                    alert('Something went wrong');
                                }
                                }}>Confirm</button>

                            <button className = "btn btn-danger ms-2" onClick = {() => {
                                setShowDeposit(false);
                                setAmount(0);
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
                )}
        </div>
        <div className = "text-center mt-4">
            <button className = "btn btn-danger" onClick = {onLogout}>Logout</button>
        </div>
    </div>
    )
} 