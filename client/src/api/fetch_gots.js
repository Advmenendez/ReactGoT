import { GET_GOTS } from "./fetch_routes";






const getGots = async () => { 

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
 
};

const token = localStorage.getItem("token")
const tokenParsed = token.replaceAll('"','')



headers.Authorization = `Bearer ${tokenParsed}`
  
  const gots = await fetch(GET_GOTS, {
    method: "GET",
    credentials: "include",
    headers: headers,
  });
  const resGots = await gots.json();
  console.log(resGots);
  return resGots;
};

export default getGots;