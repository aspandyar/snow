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
      {/* Цвет подложки приходит переменной CSS из ОДНОГО значения в
          конфиге — того же, в которое сходится кадр на переходе. Второй
          записи у него быть не должно: разойдутся, и на стыке сцены со
          страницей появится граница.
          Без подложки страница прозрачна, и до первого кадра WebGL
          зритель с тёмной темой браузера видит чёрную вспышку вместо
          задуманного светлого снега. */}
      <body
        className="min-h-full flex flex-col"
        style={{ '--подложка': сцена.фон } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
