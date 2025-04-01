import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar"; // Import the Navbar component

export const metadata: Metadata = {
  title: "Task Tracker",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
