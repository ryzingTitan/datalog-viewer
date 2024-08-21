"use client";

import { ReactElement } from "react";
import HeaderProps from "@/interfaces/HeaderProps";
import { Avatar, IconButton, Stack, Tooltip } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import { signIn, signOut } from "next-auth/react";

export default function AuthenticationHeader(
  headerProps: HeaderProps,
): ReactElement {
  if (headerProps.session) {
    return (
      <Stack direction="row" spacing={1}>
        <Tooltip title={headerProps.session.user?.name}>
          <Avatar src={headerProps.session.user?.image ?? undefined} />
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton onClick={() => signOut({ callbackUrl: "/" })}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  } else {
    return (
      <Tooltip title="Login">
        <IconButton onClick={() => signIn("google")}>
          <Login />
        </IconButton>
      </Tooltip>
    );
  }
}
