import Sidebar from "./Sidebar";
import "./AdminLayoutStyle.css"; // vamos criar esse CSS também

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}