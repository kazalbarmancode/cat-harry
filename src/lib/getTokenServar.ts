import { headers } from "next/headers";
import { auth } from "./auth";

const getTokenServar = async() => {
    const jwtToken = await auth.api.getToken({
        headers: await headers(),
      });
      const token = jwtToken?.token;
return token   
};

export default getTokenServar;