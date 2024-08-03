import GoogleProvider from "next-auth/providers/google";
import { Account, AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import DatalogSession from "@/interfaces/DatalogSession";

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
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<DatalogSession> {
      return {
        user: session.user,
        expires: session.expires,
        idToken: token.idToken as string,
      };
    },
  },
};
