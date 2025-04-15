import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

interface User {
  username: string;
  role: string;
  balance: number;
  id: number;
}

interface Transaction {
  id: number;
  userId: number;
  type: string;
  amount: number;
  created_at : string;
}

export default function Dashboard({ user, setUser, onLogout }: { user: User; setUser: (user: User) => void; onLogout: () => void }) {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isVisible, setIsVisible] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const showTimer = setTimeout(() => setIsVisible(false), 2500);
      const removeTimer = setTimeout(() => setMessage(''), 3000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [message]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_URL}/api/transactions/${user.id}`);
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (err) {
        console.error('Failed to fetch transactions', err);
      }
    };
    fetchTransactions();
  }, [user.id]);
  

  const handleTransaction = async (type: 'deposit' | 'withdraw') => {
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount, userId: user.id })
      });
      const data = await response.json();
      if (response.ok) {
        setMessageType('success');
        setMessage(`${type === 'deposit' ? 'Deposited' : 'Withdrawn'} $${amount}`);
        setAmount(0);
        if (type === 'deposit') setShowDeposit(false);
        if (type === 'withdraw') setShowWithdraw(false);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        await fetchTransactions(); 
      } else {
        setMessageType('error');
        setMessage(data.error || `${type} failed`);
      }
    } catch (err) {
      console.error(err);
      setMessageType('error');
      setMessage('Something went wrong');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch(`${API_URL}/api/transactions/${user.id}`);
    if (res.ok) {
      const data = await res.json();
      setTransactions(data.transactions);
    } else {
      console.error('Failed to fetch transactions');
    }
  };

  return (
    <div className="container mb-5">
      <h2 className="text-center mb-4">Welcome, {user.username}</h2>
      {message && (
        <div className={`alert alert-${messageType} fade ${isVisible ? 'show' : ''} mt-3 text-center w-100`} role="alert" style={{ transition: 'opacity 0.5s ease-in-out' }}>
          {message}
        </div>
      )}

      <div className="d-flex flex-column justify-content-center align-items-center gap-4">
        <div className="card shadow text-center" style={{ maxWidth: '500px', width: '100%', padding: '20px 30px', borderRadius: '1rem' }}>
          <div className="card-body">
            <h5 className="card-title">User Information</h5>
            <p className="card-text">Username: {user.username}</p>
            <p className="card-text">Role: {user.role}</p>
          </div>
        </div>

        <div className="card shadow text-center" style={{ maxWidth: '500px', width: '100%', padding: '20px 30px', borderRadius: '1rem' }}>
          <div className="card-body">
            <h5 className="card-title">Account Balance</h5>
            <p className="card-text">Balance: ${user.balance}</p>
            <div className="d-flex justify-content-center">
              <button className="btn me-2" style={{ background: 'green', color: 'white' }} onClick={() => setShowDeposit(true)}>Deposit</button>
              <button className="btn" style={{ background: 'crimson', color: 'white' }} onClick={() => setShowWithdraw(true)}>Withdraw</button>
            </div>
          </div>
        </div>

        {(showDeposit || showWithdraw) && (
          <div className="card shadow text-center" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="card-body">
              <h3>Enter {showDeposit ? 'Deposit' : 'Withdraw'} Amount</h3>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button className="btn btn-outline-secondary fs-4 px-4 py-2" onClick={() => setAmount((prev) => Math.max(0, prev - 1))}>-</button>
                <div className="input-group" style={{ width: '160px', height: '60px' }}>
                  <span className="input-group-text fs-4" style={{ backgroundColor: '#f8f9fa' }}>$</span>
                  <input type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))} className="form-control text-center fw-bold" style={{ fontSize: '1.8rem', height: '60px', color: showDeposit ? 'blue' : 'crimson' }} />
                </div>
                <button className="btn btn-outline-secondary fs-4 px-4 py-2" onClick={() => setAmount(amount + 1)}>+</button>
              </div>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button className={`btn btn-${showDeposit ? 'success' : 'danger'}`} onClick={() => handleTransaction(showDeposit ? 'deposit' : 'withdraw')}>Confirm</button>
                <button className="btn btn-secondary" onClick={() => { showDeposit ? setShowDeposit(false) : setShowWithdraw(false); setAmount(0); }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className = "card shadow text-center" style={{ maxWidth: '500px', width: '100%', padding: '20px 30px', borderRadius: '1rem' }}>
          <div className="card-body">
            <div className = "card-title"><h5>Transaction History</h5></div>
             <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className = "table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.type}</td>
                      <td>${transaction.amount}</td>
                      <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        
        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}