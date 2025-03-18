import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
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

  return (
    <div>
      <Navbar onNavigate = {setCurrPage} />
      <div className = "container">
        {currPage === 'login' && <Login onLogin = {() => setCurrPage("dashboard")} onCreateAccount = {() => setCurrPage('createAcc')} />}
        {currPage === 'dashboard' && <Dashboard/>}
        {currPage === "createAcc" && <CreateAcc onAccountCreate = {() => setCurrPage('login')}/>}
      </div>

    </div>
  );
}

export default App;