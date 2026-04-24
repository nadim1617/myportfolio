import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const { checkPassword } = usePortfolio();
  const navigate = useNavigate();
  const [pwd, setPwd]       = useState('');
  const [show, setShow]     = useState(false);
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (checkPassword(pwd)) {
        sessionStorage.setItem('admin_authenticated', '1');
        navigate('/admin/dashboard');
      } else {
        setError('Incorrect password. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__bg" />
      <div className="admin-login__card">
        <div className="admin-login__icon"><FaShieldAlt /></div>
        <h1 className="admin-login__title">Admin Panel</h1>
        <p className="admin-login__sub">Enter your password to manage portfolio content</p>

        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-login__field">
            <FaLock className="admin-login__field-icon" />
            <input
              type={show ? 'text' : 'password'}
              value={pwd}
              onChange={e => { setPwd(e.target.value); setError(''); }}
              placeholder="Password"
              className={`admin-login__input ${error ? 'admin-login__input--error' : ''}`}
              autoFocus
            />
            <button type="button" className="admin-login__eye" onClick={() => setShow(s => !s)}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit" className="btn btn-primary admin-login__btn" disabled={loading}>
            {loading ? <span className="admin-login__spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="admin-login__hint">Default password: <code>admin123</code> — change it in Settings after login.</p>
        <a href="/" className="admin-login__back">← Back to Portfolio</a>
      </div>
    </div>
  );
}
