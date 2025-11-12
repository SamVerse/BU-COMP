import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'Ayush Pandey',
    email: 'pandeyayush.0005@gmail.com',
    phone: '+91 7275799282',
    department: 'Computer Science',
    year: '3rd Year',
    college: 'Bennett University',
    bio: 'Passionate about building innovative tech solutions',
    avatar: null, // URL to avatar image
    registrationDate: '2023-08-26',
  });

  const [stats, setStats] = useState({
    totalSubmissions: 5,
    eventsParticipated: 3,
    underReview: 2,
  });

  // Update user profile
  const updateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  // Update stats
  const updateStats = (updatedStats) => {
    setStats((prev) => ({ ...prev, ...updatedStats }));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    // Redirect to login page
  };

  const value = {
    user,
    stats,
    updateProfile,
    updateStats,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};