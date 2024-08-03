import { ReactElement } from "react";
import Header from "@/components/Header/Header";
import CarEditor from "@/components/CarEditor/CarEditor";

export default function Cars(): ReactElement {
  return (
    <>
      <Header />
      <CarEditor />
    </>
  );
}
