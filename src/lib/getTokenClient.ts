import { authClient } from "./auth-client";

const getTokenClient =async () => {
   const { data, error } = await authClient.token()


  const token = data?.token
  return token
}


export default getTokenClient;