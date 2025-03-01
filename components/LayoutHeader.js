'use client'
import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { usePathname } from "next/navigation";
import SignOut from "./Signout";
import Link from "next/link";
import { navItems } from "@/collections/navMenu";
import { useAuth } from "@/AuthContext";

const { Header } = Layout;

const items = navItems.map((el) => ({
  key: el.key,
  label: <Link href={el.href}>{el.label}</Link>,
}));

const LayoutHeader = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [navItem, setNavItem] = useState();

  useEffect(() => {
    const path = navItems.find((el) => el.href === pathname);
    if (path) {
      setNavItem(path.key);
    }
  }, [pathname]);
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[navItem]}
        selectedKeys={[navItem]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
      {user ? (
        <div className="flex items-center gap-2">
          <p className="text-xl text-white">{user.email}</p>
          <SignOut />
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href="/login">
            <button className="p-2 rounded-sm bg-blue-500 hover:bg-blue-600 text-md leading-6 font-semibold text-white w-48">
              Авторизуйтесь здесь
            </button>
          </Link>
        </div>
      )}
    </Header>
  );
};

export default LayoutHeader;
