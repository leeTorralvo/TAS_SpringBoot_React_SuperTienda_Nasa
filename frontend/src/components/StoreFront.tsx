import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, CreditCard, Loader2 } from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const StoreFront = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await api.get<Product[]>("/products");
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find((p) => p.id === Number(id));
      return total + (product?.price || 0) * qty;
    }, 0);
  };

  const handlePurchase = async () => {
    if (Object.keys(cart).length === 0) return;

    setPurchasing(true);
    try {
      const result = await api.post<{ status: string; totalAmount: string; clientName: string }>("/purchases", {
        clientId: user?.id,
        productQuantities: cart,
      });

      alert(`¡Misión Exitosa! \n\nResumen: ${result.status}\nTotal: $${result.totalAmount}\nCliente: ${result.clientName}`);
      setCart({});
      fetchProducts();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error crítico de comunicación con la estación base.";
      alert(`Error: ${message}`);
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/50">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="tracking-widest uppercase text-xs">Sincronizando con el cinturón de asteroides...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white shadow-neon-white">EXPLORAR TIENDA</h2>
          <p className="text-white/40 text-sm">Suministros galácticos de alta calidad</p>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-white/40 uppercase">Total Carrito</p>
            <p className="text-xl font-mono text-white">${calculateTotal().toFixed(2)}</p>
          </div>
          <button 
            disabled={Object.keys(cart).length === 0 || purchasing}
            onClick={handlePurchase}
            className="btn-neon bg-white text-black hover:bg-white/90"
          >
            {purchasing ? <Loader2 className="animate-spin mr-2" /> : <CreditCard className="mr-2" />}
            Simular Pago
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="glass-panel border-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 group">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="text-[10px] border-white/20 text-white/60">
                  ID: {product.id}
                </Badge>
                <Badge className={product.stock > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                  {product.stock > 0 ? `${product.stock} DISPONIBLES` : "SIN STOCK"}
                </Badge>
              </div>
              <CardTitle className="text-xl mt-2 text-white group-hover:text-white/90 transition-colors">
                {product.name}
              </CardTitle>
              <CardDescription className="text-white/50 line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-mono font-bold text-white">
                ${product.price.toFixed(2)}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => addToCart(product.id)}
                disabled={product.stock === 0}
                className="w-full bg-white/5 border border-white/10 hover:bg-white/20 hover:border-white/40 text-white transition-all"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Añadir al Carrito {cart[product.id] ? `(${cart[product.id]})` : ""}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoreFront;