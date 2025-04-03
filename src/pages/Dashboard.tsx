export default function Dashboard({user, onLogout} : {user : any; onLogout : () => void}) {
    return (
        <div className = "p-5">
            <div className = "card shadow p-3 mb-5 bg-body rounded">
                <h2 className = "mb-3 text-center"> Welcome, {user.username}!</h2>
            </div>
            <div className = "container mt-5">
                <div className="row">
                    <h3 className = "mb-3">Account Info</h3>
                </div>
            </div>
            <button className = "btn btn-danger" onClick = {onLogout}>Logout</button>
        </div>
    )
}