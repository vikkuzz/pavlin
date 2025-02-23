import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/AuthContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutPage from "@/components/LayoutPage";
import Head from "next/head";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Новоград Павлино | Главная",
  description: "Новости Новограда Павлино",
  keywords: [
    "Новоград Павлино",
    "жк Новоград Павлино",
    "Новоград Павлино самолет",
    "новоград",
    "павлино",
    "новоград павлино корпус 6",
    "новоград павлино корпус 7",
    "новоград павлино корпус 8",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Добавляем OG-метки */}
        <meta property="og:title" content="Новоград Павлино" />
        <meta
          property="og:description"
          content="Проект для объявлений, новостей и общения жителей жк 'Новоград Павлино'"
        />
        <meta property="og:url" content="https://www.ngpavlino.ru/" />
        <meta property="og:site_name" content="Новоград Павлино" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:type" content="website" />
        <meta property="yandex-verification" content="d7573c1dd9729d72" />

        {/* Другие метатеги, если нужны */}
        <title>Новоград Павлино</title>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script id="metrika-counter" defer strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(100008084, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });`}
        </Script>
        <AuthProvider>
          <AntdRegistry>
            <LayoutPage>
              <main className="flex min-h-screen flex-col items-center justify-between">
                {children}
              </main>
            </LayoutPage>
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
