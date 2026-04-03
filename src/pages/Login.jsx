import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Login(){
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
        try{
            const res = await api.post('/auth/login', {email, password});
            login(
                { name: res.data.name, role:res.data.role},
                res.data.token
            );
            navigate('/dashboard');
        } catch(err){
            setError('Invalid email or password');
        } finally{
            setLoading(false);
        }
    };

      const handleDemoLogin = async (role) => {
    const credentials = {
      MANAGER: { email: 'manager@demo.com', password: 'demo1234' },
      STAFF:   { email: 'staff@demo.com',   password: 'demo1234' },
    };
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', credentials[role]);
      login(
        { name: res.data.name, role: res.data.role },
        res.data.token
      );
      navigate('/dashboard');
    } catch (err) {
      setError('Demo login failed — please try again');
    } finally {
      setLoading(false);
    }
  };
    return(
        <div className="min-h-screen bg-green-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
                <h1 className="text-2xl font-bold text-green-800 mb-1">🌿 FreshTrack</h1>
                 <p className="text-sm text-gray-500 mb-6">
                Kitchen Inventory Management
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input type="email" value={email} onChange={e=> setEmail(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm
                            focus:outline-none focus:ring-2 focus:ring-green-500"
                        required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input type="password" value={password} onChange={e=> setPassword(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm
                            focus:outline-none focus:ring-2 focus:ring-green-500"
                        required/>
                    </div>
                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                     )}
                     <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-700 hover:bg-green-600 text-white
                        rounded-lg py-2 text-sm font-medium transition
                        disabled:opacity-50">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-400">
                Try a demo account
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('MANAGER')}
              disabled={loading}
              className="flex flex-col items-center border-2 border-green-200
                hover:border-green-500 hover:bg-green-50 rounded-lg py-3
                px-2 transition disabled:opacity-50 group">
              <span className="text-xl mb-1">👨‍💼</span>
              <span className="text-xs font-semibold text-green-800">
                Manager
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                Full access
              </span>
            </button>

            <button
              onClick={() => handleDemoLogin('STAFF')}
              disabled={loading}
              className="flex flex-col items-center border-2 border-blue-200
                hover:border-blue-500 hover:bg-blue-50 rounded-lg py-3
                px-2 transition disabled:opacity-50 group">
              <span className="text-xl mb-1">👩‍🍳</span>
              <span className="text-xs font-semibold text-blue-800">
                Staff
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                Kitchen view
              </span>
            </button>
          </div>
        </div>

            </div>
        </div>
    );
}