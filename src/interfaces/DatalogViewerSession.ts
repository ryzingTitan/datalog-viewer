import { Session } from "next-auth";

export default interface DatalogViewerSession extends Session {
  idToken: string;
}
