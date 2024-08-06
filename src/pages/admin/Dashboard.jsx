import React from 'react'
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
  const {user} = useAuth();
  return (
    <div>{user.avatar}</div>
  );
}

export default Dashboard;