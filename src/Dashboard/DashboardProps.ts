import Datalog from "../Session/Datalog";

export default interface DashboardProps {
  datalogs: Array<Datalog>;
  currentIndex: number;
}
