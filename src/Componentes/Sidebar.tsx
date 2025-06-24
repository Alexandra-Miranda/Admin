import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ReportIcon from "@mui/icons-material/Report";
import ForumIcon from "@mui/icons-material/Forum";
import SettingsIcon from "@mui/icons-material/Settings";
import "./SidebarStyle.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { path: "/dashboard", icon: <DashboardIcon />, label: "Painel de Controlo" },
    { path: "/2", icon: <PersonAddAltIcon />, label: "Adicionar Admin" },
    { path: "/6", icon: <VerifiedUserIcon />, label: "Validação" },
    { path: "/8", icon: <WorkIcon />, label: "Vagas" },
    { path: "/7", icon: <GroupsIcon />, label: "Usuários" },
    { path: "/9", icon: <ReportIcon />, label: "Denúncias" },
    { path: "/10", icon: <ForumIcon />, label: "Comunicação" },
    { path: "/3", icon: <SettingsIcon />, label: "Definições" },
  ];

  return (
    <aside className="sidebar-modern">
      <div className="sidebar-logo">🎓 MédioLink</div>
      <nav>
        {menus.map((item) => (
          <div
            key={item.path}
            className={`sidebar-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
