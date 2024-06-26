import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@providers/ConvexClientProvider";
import { TooltipProvider } from "@components/ui/tooltip";
import { ThemeProvider } from "@providers/theme-provider";
import { Toaster } from "@components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat-App",
  description: "NextJs, Clerk, Convex, TailwindCSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          <ConvexClientProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Toaster richColors/>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
