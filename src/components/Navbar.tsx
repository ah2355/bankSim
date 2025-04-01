
export default function Navbar({onNavigate} : {onNavigate : (page : string) => void}){
    return(
        <nav className = "navbar navbar-expand-lg navbar-light bg-dark">
            <h2 className = "text-white">BankSim</h2>
            <div className = "container"> 
                <span className = "navbar-brand" onClick = {() => onNavigate('login')}/>
                <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav ms-auto">
                        <li className = "nav-item">
                            <button className = "btn btn-outline-light me-2" onClick = {() => onNavigate('login')}>Login</button>
                        </li>
                        <li className = "nav-item">
                        <button className = "btn btn-outline-light me-2" onClick = {() => onNavigate('dashboard')}>Dashboard</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}