import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { ReactElement } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SessionMetadataSelect from "../SessionMetadataSelect/SessionMetadataSelect";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import HeaderProps from "./HeaderProps";
import { Stack } from "@mui/material";
import AuthenticationHeader from "../AuthenticationHeader/AuthenticationHeader";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header(headerProps: HeaderProps): ReactElement {
  function handleDrawerOpen() {
    headerProps.setOpen(true);
  }

  return (
    <AppBar position="fixed" open={headerProps.open}>
      <Toolbar>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ flexGrow: 1 }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(headerProps.open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <SessionMetadataSelect
            selectedSessionId={headerProps.selectedSessionId}
            setSessionId={headerProps.setSelectedSessionId}
          ></SessionMetadataSelect>
          <AuthenticationHeader />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
