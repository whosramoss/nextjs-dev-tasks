import { font } from "@utils/app-font";
import { cn } from "@utils/utils";
import AppMetadata from "@utils/app-metadata";
import "@styles/global.css";
import AppProvider from "@providers/AppProvider";

export const generateMetadata = () => {
  const isLocalMetadata = true;
  const m = new AppMetadata(isLocalMetadata);
  return m.completeMetadata;
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-primary", font.className)}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
