import { ReactElement } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import { AppBar, Toolbar } from "@mui/material";
import AuthenticationHeader from "@/components/Header/AuthenticationHeader";

export default async function Header(): Promise<ReactElement> {
  const session = await getServerSession(authOptions);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <AuthenticationHeader session={session} />
      </Toolbar>
    </AppBar>
  );
}
