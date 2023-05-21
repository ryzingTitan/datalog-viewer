import axios, { AxiosResponse } from "axios";
import Datalog from "./Datalog";

export default class SessionService {
  instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}/api`,
  });

  public getDatalogsBySessionId(
    sessionId: string
  ): Promise<AxiosResponse<Array<Datalog>>> {
    return this.instance.get<Array<Datalog>>(
      "/sessions/".concat(sessionId).concat("/datalogs")
    );
  }
}
