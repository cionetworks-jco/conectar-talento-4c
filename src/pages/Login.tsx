import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Header from '@/components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    const { error } = await login(email, password);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('¡Bienvenido!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container flex items-center justify-center py-16">
        <Card className="w-full max-w-md" style={{ boxShadow: 'var(--shadow-lg)' }}>
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-primary-foreground">DP</span>
            </div>
            <CardTitle className="font-display text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Accede a tu perfil profesional</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="text-accent hover:underline font-medium">Regístrate aquí</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
