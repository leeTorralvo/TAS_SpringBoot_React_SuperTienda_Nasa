import { 
  Package, Users, BarChart3, 
  Store, ShoppingBag, LayoutDashboard 
} from "lucide-react";

interface SidebarProps {
  role: "ADMIN" | "CLIENT";
}

export const Sidebar = ({ role }: SidebarProps) => {
  const adminLinks = [
    { name: "Métricas", icon: <BarChart3 className="w-5 h-5" />, href: "#" },
    { name: "Gestión de Inventario", icon: <Package className="w-5 h-5" />, href: "#" },
    { name: "Registro de Clientes", icon: <Users className="w-5 h-5" />, href: "#" },
  ];

  const clientLinks = [
    { name: "Explorar Tienda", icon: <Store className="w-5 h-5" />, href: "#" },
    { name: "Mis Compras", icon: <ShoppingBag className="w-5 h-5" />, href: "#" },
  ];

  const navItems = role === "ADMIN" ? adminLinks : clientLinks;

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/10 glass-panel h-[calc(100vh-73px)]">
      <nav className="flex-1 p-4 space-y-2">
        <div className="pb-4 px-2">
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
            Menú {role}
          </p>
        </div>
        
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white shadow-neon-white border border-white/20">
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </a>

        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-center text-white/30">v1.0.0-PROXIMA</p>
      </div>
    </aside>
  );
};