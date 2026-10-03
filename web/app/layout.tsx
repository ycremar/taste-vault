import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Taste Library",description:"Your selections, evolving interpretations and reusable rubrics.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>;}
