import axios, { AxiosResponse } from "axios";
import SessionMetadata from "./SessionMetadata";

export default class SessionMetadataService {
  instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}/api`,
  });

  public getAllSessionMetadata(
    email: string,
  ): Promise<AxiosResponse<Array<SessionMetadata>>> {
    let encodedEmail = encodeURIComponent(email);

    return this.instance.get<Array<SessionMetadata>>(
      `/sessions/metadata?username=${encodedEmail}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      },
    );
  }
}
