import { ReactElement } from "react";
import Header from "@/components/Header/Header";
import TrackEditor from "@/components/TrackEditor/TrackEditor";

export default function Tracks(): ReactElement {
  return (
    <>
      <Header />
      <TrackEditor />
    </>
  );
}
