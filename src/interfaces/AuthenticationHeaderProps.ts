import { Session } from "next-auth";

export default interface AuthenticationHeaderProps {
  session: Session | null;
}
