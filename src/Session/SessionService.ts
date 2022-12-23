import axios, { AxiosResponse } from "axios";
import Datalog from "./Datalog";

export default class SessionService {
    instance = axios.create({
        baseURL: "http://localhost:8080/api/datalogs"
    });

    public getSessionById(sessionId: string): Promise<AxiosResponse<Array<Datalog>>> {
        return this.instance.get<Array<Datalog>>("/sessions/".concat(sessionId))
    }
}