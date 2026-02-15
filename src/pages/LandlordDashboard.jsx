import { useEffect, useState } from 'react';
import API from '../api/api';

export default function LandlordDashboard(){
  const [mine, setMine] = useState([]);
  useEffect(()=>{ API.get('/rentals/mine').then(r=>setMine(r.data)).catch(()=>{}); }, []);
  return (
    <div style={{padding:20}}>
      <h2>Landlord Dashboard</h2>
      <p>Your rentals:</p>
      <ul>
        {mine.map(r=> <li key={r._id}>{r.title} — {r.price}</li>)}
      </ul>
    </div>
  );
}
