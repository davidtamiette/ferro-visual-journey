
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // This ensures hydration matches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render the provider to avoid context issues, but conditionally render children
  return (
    <NextThemesProvider 
      {...props}
      enableSystem={true}
      enableColorScheme={true}
      attribute="class"
      defaultTheme="light"
      storageKey="toti-theme"
      disableTransitionOnChange={false}
    >
      {mounted ? children : 
        // Render a placeholder with the same structure during SSR/hydration
        <div className="min-h-screen bg-background">{children}</div>
      }
    </NextThemesProvider>
  );
}
