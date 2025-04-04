interface User {
    username: string;
    role: string;
    balance: number;
}
export default function Dashboard({user, onLogout} : {user : User; onLogout : () => void}) {
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
                <div className = "card shadow text-center">
                    <div className = "card-body">
                        <h5 className = "card-title">Account Balance</h5>
                        <p className = "card-text">Balance: ${user.balance}</p>
                        <div className = "d-flex justify-content-center">
                            <button className = "btn me-2" style={{background : 'green', color: 'white'}}>Deposit</button>
                            <button className = "btn" style={{background : 'crimson', color: 'white'}}>Withdraw</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className = "text-center mt-4">
            <button className = "btn btn-danger" onClick = {onLogout}>Logout</button>
        </div>
    </div>
    )
} 