import axios, { AxiosResponse } from "axios";
import Datalog from "./Datalog";
import { buildWebStorage, setupCache } from "axios-cache-interceptor";

export default class SessionService {
  instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}/api`,
  });

  cache = setupCache(this.instance, {
    storage: buildWebStorage(localStorage, "axios-cache:"),
  });

  public getDatalogsBySessionId(
    sessionId: string,
    accessToken: string,
  ): Promise<AxiosResponse<Array<Datalog>>> {
    return this.cache.get<Array<Datalog>>(`/sessions/${sessionId}/datalogs`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
