import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockSession = localStorage.getItem('demo_session');
    if (mockSession) {
      const session = JSON.parse(mockSession);
      setUser(session.user);
      setRole(session.role);
      setLoading(false);
      return;
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if(session?.user) fetchRole(session.user.id);
      else setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (localStorage.getItem('demo_session')) return;
      setUser(session?.user ?? null);
      if(session?.user) {
        fetchRole(session.user.id);
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId) => {
    const { data } = await supabase.from('users').select('role').eq('id', userId).single();
    if(data) setRole(data.role);
    setLoading(false);
  };

  const signIn = async (email, password) => {
    if (email === 'admin@demo.com' || email === 'user@demo.com') {
      const mockRole = email === 'admin@demo.com' ? 'admin' : 'user';
      const mockUser = { id: `mock-${mockRole}-123`, email };
      setUser(mockUser);
      setRole(mockRole);
      localStorage.setItem('demo_session', JSON.stringify({ user: mockUser, role: mockRole }));
      return { data: { user: mockUser }, error: null };
    }
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email, password) => {
    return supabase.auth.signUp({ email, password });
  };

  const signOut = () => {
    localStorage.removeItem('demo_session');
    setUser(null);
    setRole(null);
    return supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, role, signIn, signUp, signOut, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
