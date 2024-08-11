import Datalog from "@/interfaces/Datalog";

export default interface DashboardProps {
  datalogs: Array<Datalog>;
  currentIndex: number;
}
