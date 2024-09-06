import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Quicksand } from "next/font/google";
import { RecoilRoot } from "recoil";
import { Toaster } from "sonner";

const inter = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${inter.className}`}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RecoilRoot>
          <Navbar />
          <div className="mt-20">
            <Component {...pageProps} />
          </div>
          <Toaster
            position="top-right"
            duration={1200}
            expand={true}
            richColors
          />
        </RecoilRoot>
      </ThemeProvider>
    </main>
  );
}
