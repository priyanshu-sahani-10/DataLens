import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata = {
  title: "DataLens — Turn Raw Data Into Actionable Insight",
  description: "Upload a CSV and get automated analysis, visualizations, and smart insights in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} antialiased`}
      >
        {children}
        <Toaster
          position="bottom-left"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
