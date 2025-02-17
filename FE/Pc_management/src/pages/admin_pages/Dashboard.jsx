import "../styles/Dashboard.css";
import SidebarAdminPage from "../components/SidebarAdminPage";


const Dashboard = () => {
  return (
    <>
      <SidebarAdminPage />
      <div className="dashboard-container">
        <h1>Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
