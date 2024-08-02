import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

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
};
