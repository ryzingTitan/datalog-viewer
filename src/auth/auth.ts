import GoogleProvider from "next-auth/providers/google";
import { Account, AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import DatalogViewerSession from "@/interfaces/DatalogViewerSession";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const missingError = "missing in environment variables.";

if (!googleClientId) {
  throw Error("GOOGLE_CLIENT_ID" + missingError);
}

if (!googleClientSecret) {
  throw Error("GOOGLE_CLIENT_SECRET" + missingError);
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: JWT;
      account: Account | null;
    }): Promise<JWT> {
      if (account) {
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        return token;
      } else if (Date.now() < token.expiresAt * 1000) {
        return token;
      } else {
        if (!token.refreshToken) throw new TypeError("Missing refresh token");

        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: googleClientId,
              client_secret: googleClientSecret,
              grant_type: "refresh_token",
              refresh_token: token.refreshToken,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError;

          token.idToken = newTokens.id_token;
          token.expiresAt = Math.floor(
            Date.now() / 1000 + newTokens.expires_in,
          );
          if (newTokens.refresh_token)
            token.refreshToken = newTokens.refresh_token;

          return token;
        } catch (error) {
          console.error("Error refreshing id token", error);
          return token;
        }
      }
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<DatalogViewerSession> {
      return {
        user: session.user,
        expires: session.expires,
        idToken: token.idToken as string,
      };
    },
  },
};
