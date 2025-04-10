
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-toti-navy/30 dark:to-black">
      <div className="max-w-lg text-center px-6">
        <h1 className="text-6xl font-bold mb-6 text-toti-navy dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold text-toti-teal mb-4">Página não encontrada</h2>
        <p className="text-toti-slate dark:text-gray-300 text-lg mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <AnimatedButton onClick={handleBackToHome} className="mx-auto">
          <span className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </span>
        </AnimatedButton>
      </div>
    </div>
  );
};

export default NotFound;
