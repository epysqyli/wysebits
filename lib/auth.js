import { getCookieParser } from "next/dist/server/api-utils";

const isLogged = (contextHeaders) => {
  return getCookieParser(contextHeaders)().hasOwnProperty("jwt");
};

export { isLogged };
