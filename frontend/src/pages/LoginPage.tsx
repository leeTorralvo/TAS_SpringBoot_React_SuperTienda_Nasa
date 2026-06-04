import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) errors.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Email inválido";
    if (!password) errors.password = "La contraseña es obligatoria";
    else if (password.length < 6) errors.password = "Mínimo 6 caracteres";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Card className="w-full max-w-md bg-card border-white/10">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <span className="text-black font-bold text-sm">NASA</span>
          </div>
          <CardTitle className="text-2xl text-white">Iniciar Sesión</CardTitle>
          <CardDescription className="text-slate-400">Acceda a su cuenta de SUPERTIENDAS NASA</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: undefined })); }}
                placeholder="correo@ejemplo.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                required
              />
              {fieldErrors.email && <p className="text-xs text-red-400">{fieldErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: undefined })); }}
                placeholder="••••••••"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                required
              />
              {fieldErrors.password && <p className="text-xs text-red-400">{fieldErrors.password}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" disabled={submitting} className="w-full btn-neon">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ingresando...</> : "Ingresar"}
            </Button>
            <p className="text-sm text-slate-400">
              ¿No tiene cuenta?{" "}
              <Link to="/register" className="text-slate-100 hover:underline hover:text-white transition-colors">Regístrese aquí</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
