import { Outlet } from 'react-router-dom';


export default function ChallengePage() {
  return (
    // <div className="challenge-page-container">
    <div className="challenge-page">

      <Outlet />
    </div>
  );
}