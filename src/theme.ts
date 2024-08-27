"use client";
import { Roboto } from "next/font/google";
import { createTheme, Theme } from "@mui/material/styles";
import { NextFont } from "next/dist/compiled/@next/font";

const roboto: NextFont = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme: Theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: "dark",
  },
});

export default theme;
