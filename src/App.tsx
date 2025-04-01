import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import {useState} from "react";
import CreateAcc from "./pages/CreateAcc";
function App(){
  // let items = ['Sword', 'Shield', 'Potion', 'Boots', 'Helmet'];
  // const handleSelectItem = (item : string) => {
  //   console.log(item);
  // }
  const [currPage, setCurrPage] = useState('login');
  const [user, setUser] = useState(() => { 
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      return JSON.parse(storedUser);
    }else{
      return null;
    }
  });


  return (
    <div>
      <Navbar onNavigate = {(targetPage) => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if(targetPage === 'dashboard' && (!user||!isLoggedIn)){
          setCurrPage('login');
        }
        else{
          setCurrPage(targetPage);
        }
      }} />
      <div className = "container">
        {currPage === 'login' && <Login onLogin = {() =>{ const storedUser = localStorage.getItem("user"); 
        setUser(storedUser ? JSON.parse(storedUser) : null);
          setCurrPage('dashboard')}} onCreateAccount = {() => setCurrPage('createAcc')}/>}
        {currPage === 'dashboard' && user && <Dashboard user ={user} onLogout = {() => {
          localStorage.removeItem("user");
          localStorage.removeItem("isLoggedIn");
          setUser(null);
          setCurrPage('login');
        }} />}
        {currPage === "createAcc" && <CreateAcc onAccountCreate = {() => setCurrPage('login')}/>}
      </div>

    </div>
  );
}

export default App;