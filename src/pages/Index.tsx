import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Users, Globe, Shield, ArrowRight } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Users, title: 'Perfiles Profesionales', desc: 'Registra tu experiencia, educación, certificaciones y fortalezas en un perfil completo.' },
    { icon: Search, title: 'Búsqueda Avanzada', desc: 'Encuentra al profesional ideal filtrando por país, fortaleza, educación y más.' },
    { icon: Globe, title: 'Red Internacional', desc: 'Conecta con profesionales de toda América para tus proyectos.' },
    { icon: Shield, title: 'Seguro y Confiable', desc: 'Tus datos protegidos con las mejores prácticas de seguridad.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 opacity-20">
          <img src={heroBanner} alt="Profesionales colaborando" className="h-full w-full object-cover" />
        </div>
        <div className="relative container py-20 sm:py-32">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Directorio Profesional Internacional
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-primary-foreground/80 leading-relaxed">
              Encuentra y conecta con los mejores profesionales de América para tus proyectos. 
              Perfiles verificados, búsqueda inteligente.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => navigate('/registro')}
                className="bg-accent text-accent-foreground hover:bg-teal-dark text-base px-6"
              >
                Crear mi Perfil <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/directorio')}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-6"
              >
                <Search className="mr-2 h-4 w-4" /> Explorar Directorio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-foreground">
            Todo lo que necesitas para conectar profesionales
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
            Una plataforma diseñada para facilitar la búsqueda de talento en toda la región.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="stat-card text-center animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <f.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">
            ¿Listo para ser parte del directorio?
          </h2>
          <p className="mt-3 text-primary-foreground/80 text-lg">
            Registra tu perfil y conecta con profesionales de toda América.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/registro')}
            className="mt-6 bg-accent text-accent-foreground hover:bg-teal-dark text-base px-8"
          >
            Registrarme Ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2025 Directorio Profesional Internacional. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Index;
