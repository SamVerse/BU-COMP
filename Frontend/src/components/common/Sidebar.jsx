import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUpload,
  faFolder,
  faCalendar,
  faCog,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { id: "dashboard", path: "/dashboard", icon: faUser, label: "Profile" },
    { id: "submissions", path: "/submissions", icon: faUpload, label: "Submission" },
    // { id: "projects", path: "/projects", icon: faFolder, label: "Projects" },
    { id: "events", path: "/events", icon: faCalendar, label: "Events" },
    { id: "settings", path: "/settings", icon: faCog, label: "Settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-0 w-60 h-full bg-slate-900 text-white flex flex-col border-r border-slate-800">

      {/* Brand */}
      <div className="px-6 py-5">
        <h1 className="text-xl font-semibold tracking-tight">HireInsight</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
              ${isActive(item.path)
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
          >
            <FontAwesomeIcon icon={item.icon} className="text-base" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* USER FOOTER */}
      {/* USER FOOTER */}
      <div className="px-5 py-4 border-t border-slate-800 flex items-center gap-3">

        {/* Icon instead of blue bar */}
        <FontAwesomeIcon
          icon={faUserCircle}
          className="text-blue-500 text-2xl"
        />

        <div className="leading-tight">
          <p className="text-sm font-medium">Ayush Pandey</p>
          <p className="text-xs text-gray-400">pandeyayush.0005@gmail.com</p>
        </div>
      </div>


    </aside>
  );
}
