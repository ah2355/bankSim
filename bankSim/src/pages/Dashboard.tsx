export default function Dashboard({user, onLogout} : {user : any; onLogout : () => void}) {
    return (
        <div className = "p-5">
            <div className = "card shadow p-3 mb-5 bg-body rounded">
                <h2 className = "mb-3"> Welcome, {user.username}!</h2>
            </div>
            <div>
                <h3 className = "mb-3">Account Balance</h3>
            </div>
            <button className = "btn btn-danger" onClick = {onLogout}>Logout</button>
        </div>
    )
}