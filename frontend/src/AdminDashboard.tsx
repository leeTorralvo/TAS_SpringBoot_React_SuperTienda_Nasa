import React, { useState, useEffect } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, Edit, Trash2, Users, Package, BarChart as ChartIcon, Loader2 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from "./services/api";
import type { User } from "./contexts/AuthContext";

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: "", description: "", price: 0, stock: 0
  });

  // Datos simulados para métricas (estilo NASA)
  const salesData = [
    { name: 'Lun', sales: 400 },
    { name: 'Mar', sales: 300 },
    { name: 'Mie', sales: 500 },
    { name: 'Jue', sales: 280 },
    { name: 'Vie', sales: 590 },
    { name: 'Sab', sales: 320 },
    { name: 'Dom', sales: 450 },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsData, usersData] = await Promise.all([
        api.get<Product[]>("/products"),
        api.get<User[]>("/users/clients")
      ]);
      setProducts(productsData);
      setUsers(usersData);
    } catch (error) {
      console.error("Fallo de comunicación con la base:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("¿Confirmar eliminación de suministro?")) return;
    try {
      await api.del(`/products/${id}`);
      fetchData();
    } catch (error) {
      alert("Error al eliminar el producto.");
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentProduct.id) {
        await api.put(`/products/${currentProduct.id}`, currentProduct);
      } else {
        await api.post("/products", currentProduct);
      }
      setIsDialogOpen(false);
      setCurrentProduct({ name: "", description: "", price: 0, stock: 0 });
      fetchData();
    } catch (error) {
      alert("Error al guardar el producto.");
    }
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-white/50" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-white">CENTRO DE CONTROL</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setCurrentProduct({ name: "", description: "", price: 0, stock: 0 })} className="btn-neon bg-white text-black">
              <PlusCircle className="mr-2 h-4 w-4" /> Registrar Suministro
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>{currentProduct.id ? 'Editar' : 'Registrar'} Producto</DialogTitle>
              <DialogDescription className="text-white/40">Ingrese las especificaciones del módulo de carga.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveProduct} className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Nombre</Label>
                <Input value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="col-span-3 bg-white/5 border-white/10" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Precio ($)</Label>
                <Input type="number" step="0.01" value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})} className="col-span-3 bg-white/5 border-white/10" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Stock</Label>
                <Input type="number" value={currentProduct.stock} onChange={e => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value)})} className="col-span-3 bg-white/5 border-white/10" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Descripción</Label>
                <Input value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} className="col-span-3 bg-white/5 border-white/10" />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-white text-black hover:bg-white/80">Confirmar Carga</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="inventory" className="data-[state=active]:bg-white/10"><Package className="w-4 h-4 mr-2"/>Inventario</TabsTrigger>
          <TabsTrigger value="clients" className="data-[state=active]:bg-white/10"><Users className="w-4 h-4 mr-2"/>Clientes</TabsTrigger>
          <TabsTrigger value="metrics" className="data-[state=active]:bg-white/10"><ChartIcon className="w-4 h-4 mr-2"/>Métricas</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="glass-panel rounded-lg mt-4 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/60">ID</TableHead>
                <TableHead className="text-white">Nombre</TableHead>
                <TableHead className="text-white">Precio</TableHead>
                <TableHead className="text-white">Stock</TableHead>
                <TableHead className="text-right text-white">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-mono text-white/40">{p.id}</TableCell>
                  <TableCell className="font-medium text-white">{p.name}</TableCell>
                  <TableCell className="text-white">${p.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={p.stock < 10 ? "border-red-500/50 text-red-400" : "border-white/20 text-white/60"}>
                      {p.stock} units
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white/60" onClick={() => { setCurrentProduct(p); setIsDialogOpen(true); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover:bg-red-500/20 text-red-400" onClick={() => p.id && handleDeleteProduct(p.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="clients" className="glass-panel rounded-lg mt-4">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white">Nombre</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Rol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id} className="border-white/5">
                  <TableCell className="text-white">{u.name}</TableCell>
                  <TableCell className="text-white/60">{u.email}</TableCell>
                  <TableCell><Badge className="bg-white/10 text-white border-white/20">{u.role}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="metrics" className="glass-panel p-6 rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-6 text-white/80">Flujo de Ventas Semanal (Simulado)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Bar dataKey="sales" fill="#ffffff" radius={[4, 4, 0, 0]} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;