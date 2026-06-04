import { UserCircle, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();

  const roleLabel = user?.role === "ADMIN" ? "Administrador" : "Cliente";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-panel px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-neon-glow">
          <span className="text-black font-bold text-xs">NASA</span>
        </div>
        <h1 className="text-xl font-black tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
          SUPERTIENDAS <span className="text-white/70">NASA</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-md border border-white/10 bg-white/5">
          <UserCircle className="w-5 h-5 text-white/60" />
          <div className="text-right">
            <p className="text-sm font-medium text-white leading-tight">{user?.name || "Usuario"}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">{roleLabel}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 rounded-md border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-colors text-sm"
          title="Cerrar sesión"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
};

export default Header;