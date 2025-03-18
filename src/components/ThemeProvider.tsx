
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // This ensures hydration matches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render children once mounted to avoid hydration mismatch
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
      {mounted ? children : null}
    </NextThemesProvider>
  );
}
