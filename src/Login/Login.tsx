import { ReactElement, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import GcpJwt from "./GcpJwt";
import jwtDecode from "jwt-decode";
import LoginProps from "./LoginProps";
import { Avatar } from "@mui/material";

export default function Login(loginProps: LoginProps): ReactElement {
  const [name, setName] = useState(sessionStorage.getItem("name") as string);
  const [picture, setPicture] = useState(
    sessionStorage.getItem("picture") as string,
  );

  return name !== null && name !== "" ? (
    <Avatar alt={name} src={picture}></Avatar>
  ) : (
    <GoogleLogin
      type={"icon"}
      theme={"filled_blue"}
      onSuccess={(credentialResponse) => {
        sessionStorage.setItem("jwt", credentialResponse.credential as string);
        let decodedJwt: GcpJwt = jwtDecode(
          credentialResponse.credential as string,
        );
        sessionStorage.setItem("email", decodedJwt.email);
        sessionStorage.setItem("name", decodedJwt.name);
        sessionStorage.setItem("picture", decodedJwt.picture);
        setName(decodedJwt.name);
        setPicture(decodedJwt.picture);
        loginProps.setEmail(decodedJwt.email);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
