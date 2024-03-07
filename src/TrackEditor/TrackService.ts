import axios, { AxiosResponse } from "axios";
import Track from "./Track";

export default class TrackService {
  instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}/api`,
  });

  public getAll(accessToken: string): Promise<AxiosResponse<Array<Track>>> {
    return this.instance.get<Array<Track>>(`/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public save(accessToken: string, track: Track): Promise<AxiosResponse> {
    return this.instance.post(
      `/tracks`,
      {
        id: track.id,
        name: track.name,
        latitude: track.latitude,
        longitude: track.longitude,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }

  public update(accessToken: string, track: Track): Promise<AxiosResponse> {
    return this.instance.put(
      `/tracks/${track.id}`,
      {
        id: track.id,
        name: track.name,
        latitude: track.latitude,
        longitude: track.longitude,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }

  public delete(accessToken: string, id: string): Promise<AxiosResponse> {
    return this.instance.delete(`/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
