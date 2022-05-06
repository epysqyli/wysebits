import Cookies from "cookies";

const isLogged = (context) => {
  const cookies = new Cookies(context.req, context.res);
  const jwt = cookies.get("jwt");
  return jwt === undefined ? false : true;
};

export { isLogged };
