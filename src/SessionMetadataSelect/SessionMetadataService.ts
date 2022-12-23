import axios, { AxiosResponse } from "axios";
import SessionMetadata from "./SessionMetadata";

export default class SessionMetadataService {
    instance = axios.create({
        baseURL: "http://localhost:8080/api"
    });

    public getAllSessionMetadata(): Promise<AxiosResponse<Array<SessionMetadata>>> {
        return this.instance.get<Array<SessionMetadata>>("/sessions/metadata")
    }
}