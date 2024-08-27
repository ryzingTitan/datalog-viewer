import Datalog from "@/interfaces/Datalog";
import { Session } from "@/interfaces/Session";

export default interface TrackMapProps {
  datalogs: Array<Datalog>;
  session: Session | undefined;
}
