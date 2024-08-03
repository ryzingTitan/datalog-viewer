import { Session } from "next-auth";

export default interface DatalogSession extends Session {
  idToken: string;
}
