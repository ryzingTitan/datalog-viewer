import { Session } from "next-auth";

export default interface HeaderProps {
  session: Session | null;
}
