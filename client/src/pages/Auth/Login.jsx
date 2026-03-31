import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signIn, signUp } = useAuth();

  if (user) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { error: authError } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);
        
      if (authError) throw authError;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (type) => {
    setError('');
    setLoading(true);

    const creds =
      type === 'admin'
        ? { email: 'admin1@example.com', password: 'admin123' }
        : { email: 'user1@example.com', password: 'user123' };

    try {
      // 1. Try to sign in normally
      const { error: signInError } = await signIn(creds.email, creds.password);
      
      if (!signInError) return;

      // 2. If sign in fails, try to sign up the demo user
      // Note: This requires "Confirm Email" to be OFF in Supabase settings
      const { error: signUpError } = await signUp(creds.email, creds.password);
      
      if (signUpError) throw signUpError;

      // If sign up works, the user might need to click "Sign In" again if auto-confirm is off
      setError('Demo account created! Please sign in again (ensure "Confirm Email" is disabled in Supabase).');
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight">
          SmartCity
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 font-medium">
          {isLogin ? 'Sign in to access your dashboard' : 'Create a citizen account'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Email address</label>
              <div className="mt-2">
                <input
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-all bg-slate-50 focus:bg-white"
                  placeholder="hello@city.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-2">
                <input
                  type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-all bg-slate-50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit" disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 hover:shadow-lg transform active:scale-[0.98]"
              >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing...
                    </span>
                ) : (isLogin ? 'Sign in' : 'Sign up')}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="p-4 bg-indigo-50 rounded-xl mb-6 border border-indigo-100">
                <p className="text-sm text-indigo-800 font-medium text-center mb-3">
                    Quick demo access
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin')}
                    disabled={loading}
                    className="w-full py-2 px-3 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-black disabled:opacity-50"
                  >
                    Demo Admin1
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('user')}
                    disabled={loading}
                    className="w-full py-2 px-3 rounded-lg text-sm font-semibold bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Demo User1
                  </button>
                </div>
            </div>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500 font-semibold transition-colors focus:outline-none"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
