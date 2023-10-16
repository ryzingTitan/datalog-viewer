import SessionMetadataService from "./SessionMetadataService";
import SessionMetadata from "./SessionMetadata";
import MockAdapter from "axios-mock-adapter";
import { AxiosError } from "axios";

describe("Session Metadata Service", () => {
  const sessionMetadataService = new SessionMetadataService();
  const apiMock = new MockAdapter(sessionMetadataService.instance);
  const encodedEmail = encodeURIComponent("test@test.com");

  it("should handle a successful request with a single element in the response", async () => {
    const firstSessionMetadata = {} as SessionMetadata;
    firstSessionMetadata.sessionId = "b6fc6776-afd8-45b5-8d14-450270aac153";
    firstSessionMetadata.startTime = new Date().toISOString();
    firstSessionMetadata.endTime = new Date().toISOString();

    apiMock
      .onGet(
        `/sessions/metadata?username=${encodedEmail}`,
        "",
        expect.objectContaining({
          Authorization: expect.stringMatching(/^Bearer /),
        }),
      )
      .reply(200, JSON.stringify(Array.of(firstSessionMetadata)));

    const response =
      await sessionMetadataService.getAllSessionMetadata("test@test.com");

    expect(response.status).toBe(200);
    expect(response.data).toStrictEqual(Array.of(firstSessionMetadata));
  });

  it("should handle a successful request with a multiple elements in the response", async () => {
    const firstSessionMetadata = {} as SessionMetadata;
    firstSessionMetadata.sessionId = "b6fc6776-afd8-45b5-8d14-450270aac153";
    firstSessionMetadata.startTime = new Date().toISOString();
    firstSessionMetadata.endTime = new Date().toISOString();

    const secondSessionMetadata = {} as SessionMetadata;
    secondSessionMetadata.sessionId = "18df8e0a-de35-4037-8da4-4baac236eb53";
    secondSessionMetadata.startTime = new Date().toISOString();
    secondSessionMetadata.endTime = new Date().toISOString();

    apiMock
      .onGet(
        `/sessions/metadata?username=${encodedEmail}`,
        "",
        expect.objectContaining({
          Authorization: expect.stringMatching(/^Bearer /),
        }),
      )
      .reply(
        200,
        JSON.stringify(Array.of(firstSessionMetadata, secondSessionMetadata)),
      );

    const response =
      await sessionMetadataService.getAllSessionMetadata("test@test.com");

    expect(response.status).toBe(200);
    expect(response.data).toStrictEqual(
      Array.of(firstSessionMetadata, secondSessionMetadata),
    );
  });

  it("should handle error", async () => {
    let errorResponse = {} as AxiosError;

    apiMock
      .onGet(
        `/sessions/metadata?username=${encodedEmail}`,
        "",
        expect.objectContaining({
          Authorization: expect.stringMatching(/^Bearer /),
        }),
      )
      .reply(500, null);

    try {
      await sessionMetadataService.getAllSessionMetadata("test@test.com");
    } catch (error: any) {
      errorResponse = error as AxiosError;
    }

    expect(errorResponse.response?.status).toBe(500);
    expect(errorResponse.response?.data).toBeNull();
  });
});
