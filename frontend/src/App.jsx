import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { AdminDashboard } from "./AdminDashboard";
import { StoreFront } from "./components/StoreFront";
import { useAuth } from "./contexts/AuthContext";

function AppContent() {
  const { user } = useAuth();
  const role = user?.role || "CLIENT";

  return (
    <div className="flex h-screen w-full bg-slate-950 text-white overflow-hidden">
      <Sidebar role={role} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {role === "ADMIN" ? <AdminDashboard /> : <StoreFront />}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
