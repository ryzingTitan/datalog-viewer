import axios, { AxiosResponse } from "axios";
import Datalog from "./Datalog";
import { buildWebStorage, setupCache } from "axios-cache-interceptor";
import Track from "../TrackEditor/Track";
import { User } from "@auth0/auth0-react";

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

  public createSession(
    track: Track,
    user: User,
    file: File,
    accessToken: string,
  ): Promise<AxiosResponse> {
    return this.instance.postForm(
      "/sessions",
      {
        userFirstName: user.given_name,
        userLastName: user.family_name,
        userEmail: user.email,
        trackName: track.name,
        trackLongitude: track.longitude,
        trackLatitude: track.latitude,
        uploadFile: file,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }

  public updateSession(
    sessionId: string,
    track: Track,
    user: User,
    file: File,
    accessToken: string,
  ): Promise<AxiosResponse> {
    return this.instance.putForm(
      `/sessions/${sessionId}`,
      {
        userFirstName: user.given_name,
        userLastName: user.family_name,
        userEmail: user.email,
        trackName: track.name,
        trackLongitude: track.longitude,
        trackLatitude: track.latitude,
        uploadFile: file,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
}
