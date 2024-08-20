import { useState } from "react";
import Dashboard from "./Dashboard";
import EventRecord from "./EventRecord";
import CertificateRecord from "./CertificateRecord";
import ValidateCerti from "./ValidateCerti";

export default function DashBody() {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <Dashboard />;
      case "events":
        return <EventRecord />;
      case "certificates":
        return <CertificateRecord />;
      case "validate":
        return <ValidateCerti />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="bg-black text-white min-h-80vh flex">
      <aside
        id="default-sidebar"
        className="fixed top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-white bg-black"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className={`flex items-center p-2 text-white rounded-lg hover:bg-gray-700 ${selectedTab === "dashboard" ? "bg-gray-700" : ""
                  }`}
                onClick={() => setSelectedTab("dashboard")}
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <hr />
            <li>
              <a
                href="#"
                className={`flex items-center p-2 text-white rounded-lg hover:bg-gray-700 ${selectedTab === "events" ? "bg-gray-700" : ""
                  }`}
                onClick={() => setSelectedTab("events")}
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M3 3H15V15H3z" />
                  <path d="M3 9h12v6H3zM6 0h6v3H6zM0 6h18v3H0z" />
                </svg>
                <span className="ms-3">Event Records</span>
              </a>
            </li>
            <hr />
            <li>
              <a
                href="#"
                className={`flex items-center p-2 text-white rounded-lg hover:bg-gray-700 ${selectedTab === "certificates" ? "bg-gray-700" : ""
                  }`}
                onClick={() => setSelectedTab("certificates")}
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M3 3h12v3H3zm0 6h12v6H3zM6 0h6v3H6zM0 6h18v3H0z" />
                </svg>
                <span className="ms-3">Certificate Record</span>
              </a>
            </li>
            <hr />
            
            <li>
              <a
                href="#"
                className={`flex items-center p-2 text-white rounded-lg hover:bg-gray-700 ${selectedTab === "validate" ? "bg-gray-700" : ""
                  }`}
                onClick={() => setSelectedTab("validate")}
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6 0h6v3H6zM3 3h12v3H3zM0 6h18v3H0zM3 9h12v6H3z" />
                </svg>
                <span className="ms-3">Validate Certificate</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
}
