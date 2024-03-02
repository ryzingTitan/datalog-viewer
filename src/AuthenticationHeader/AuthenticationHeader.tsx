import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationHeaderProps from "./AuthenticationHeaderProps";
import IconButton from "@mui/material/IconButton";
import { Login, Logout } from "@mui/icons-material";
import { Avatar, Stack } from "@mui/material";

export default function AuthenticationHeader(
  loginProps: AuthenticationHeaderProps,
) {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isAuthenticated) {
    loginProps.setEmail(user?.email);

    return (
      <Stack direction={"row"}>
        <Avatar alt={user?.name} src={user?.picture} />
        <IconButton
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <Logout titleAccess={"Logout"} />
        </IconButton>
      </Stack>
    );
  }

  return (
    <IconButton onClick={() => loginWithRedirect()}>
      <Login titleAccess={"Login"} />
    </IconButton>
  );
}
