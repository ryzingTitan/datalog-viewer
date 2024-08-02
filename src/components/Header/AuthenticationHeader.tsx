"use client";

import { ReactElement } from "react";
import AuthenticationHeaderProps from "@/interfaces/AuthenticationHeaderProps";
import { Avatar, IconButton, Stack, Tooltip } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import { signIn, signOut } from "next-auth/react";

export default function AuthenticationHeader(
  authenticationHeaderProps: AuthenticationHeaderProps,
): ReactElement {
  if (authenticationHeaderProps.session) {
    return (
      <Stack direction="row" spacing={1}>
        <Tooltip title={authenticationHeaderProps.session.user?.name}>
          <Avatar
            src={authenticationHeaderProps.session.user?.image ?? undefined}
          />
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton aria-label="logout" onClick={() => signOut()}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  } else {
    return (
      <Tooltip title="Login">
        <IconButton aria-label="login" onClick={() => signIn("google")}>
          <Login />
        </IconButton>
      </Tooltip>
    );
  }
}
