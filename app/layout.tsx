import type { Metadata } from "next";
import "./globals.css";

import { сцена } from "@/lib/config";

export const metadata: Metadata = {
  title: "snow",
  description: "Ледяная сфера из кирпичей над заснеженной равниной — трёхмерная сцена на прокрутке.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      {/* Подложка красится тем же цветом, что и фон сцены, и берётся из
          того же числа в конфиге. Без этого страница прозрачна, и до
          первого кадра WebGL зритель у которого браузер в тёмной теме
          видит чёрную вспышку вместо задуманного светлого снега. */}
      <body className="min-h-full flex flex-col" style={{ background: сцена.фон }}>
        {children}
      </body>
    </html>
  );
}
