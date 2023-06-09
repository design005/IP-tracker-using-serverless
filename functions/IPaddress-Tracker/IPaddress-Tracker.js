// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

exports.handler = async function (event) {
   
  let ipAddress = event.queryStringParameters.ipAddress;
   // if (!ipAddress) {
  //   // If no specific IP address is provided, get the user's IP address from the request headers
  //   ipAddress = event.headers["true-client-iP"];
  //  console.log(ipAddress);
  //  
  // }
  const API_KEY = process.env.API_KEY   
       const Url=`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`;
    
 try{
  const response = await fetch(Url);
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
   }
}
  catch(error){
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }

 }
  
}
