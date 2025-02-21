import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/AuthContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutPage from "@/components/LayoutPage";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <AntdRegistry>
            <LayoutPage>{children}</LayoutPage>
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
