import MockAdapter from "axios-mock-adapter";
import { AxiosError } from "axios";
import SessionService from "./SessionService";
import Datalog from "./Datalog";

describe("Session Metadata Service", () => {
  const sessionService = new SessionService();
  const apiMock = new MockAdapter(sessionService.instance);
  const sessionId = "b6fc6776-afd8-45b5-8d14-450270aac153";

  it("should handle a successful request with a single element in the response", async function () {
    const firstDatalog = {} as Datalog;
    firstDatalog.sessionId = sessionId;
    firstDatalog.timestamp = new Date().toISOString();
    firstDatalog.data.intakeAirTemperature = 155;

    apiMock
      .onGet("/sessions/".concat(sessionId).concat("/datalogs"))
      .reply(200, JSON.stringify(Array.of(firstDatalog)));

    const response = await sessionService.getDatalogsBySessionId(sessionId);

    expect(response.status).toBe(200);
    expect(response.data).toStrictEqual(Array.of(firstDatalog));
  });

  it("should handle a successful request with a multiple elements in the response", async function () {
    const firstDatalog = {} as Datalog;
    firstDatalog.sessionId = sessionId;
    firstDatalog.timestamp = new Date().toISOString();
    firstDatalog.data.intakeAirTemperature = 160;

    const secondDatalog = {} as Datalog;
    secondDatalog.sessionId = sessionId;
    secondDatalog.timestamp = new Date().toISOString();
    secondDatalog.data.intakeAirTemperature = 165;

    apiMock
      .onGet("/sessions/".concat(sessionId).concat("/datalogs"))
      .reply(200, JSON.stringify(Array.of(firstDatalog, secondDatalog)));

    const response = await sessionService.getDatalogsBySessionId(sessionId);

    expect(response.status).toBe(200);
    expect(response.data).toStrictEqual(Array.of(firstDatalog, secondDatalog));
  });

  it("should handle error", async function () {
    let errorResponse = {} as AxiosError;

    apiMock
      .onGet("/sessions/".concat(sessionId).concat("/datalogs"))
      .reply(500, null);

    try {
      await sessionService.getDatalogsBySessionId(sessionId);
    } catch (error: any) {
      errorResponse = error as AxiosError;
    }

    expect(errorResponse.response?.status).toBe(500);
    expect(errorResponse.response?.data).toBeNull();
  });
});
