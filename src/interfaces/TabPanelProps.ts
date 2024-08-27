import { ReactNode } from "react";

export default interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}
