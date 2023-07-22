import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Dashboard() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      {/* Your dashboard content goes here */}
    </div>
  );
}





