import Data from "./Data";
import TrackInfo from "./TrackInfo";
import User from "./User";

export default interface Datalog {
  sessionId: string;
  timestamp: string;
  data: Data;
  trackInfo: TrackInfo;
  user: User;
}
