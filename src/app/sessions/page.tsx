import { ReactElement } from "react";
import Header from "@/components/Header/Header";
import SessionEditor from "@/components/SessionEditor/SessionEditor";

export default function Sessions(): ReactElement {
  return (
    <>
      <Header />
      <SessionEditor />
    </>
  );
}
