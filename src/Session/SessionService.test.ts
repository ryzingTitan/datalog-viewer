import SessionService from "./SessionService"
import MockAdapter from "axios-mock-adapter";

describe("Session Service", () => {
    const sessionService = new SessionService()
    const apiMock = new MockAdapter(sessionService.instance);
})