
const ip_Input=document.querySelector("#search");
const form=document.querySelector("form");
const IP_address=document.querySelector("#Ip-address");
const location_IP=document.querySelector("#location");
const time_Zone= document.querySelector("#time-zone");
const ISP = document.querySelector("#isp");
const map = L.map('map').setView([0, 0], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


window.addEventListener("load", async function (event) {
    event.preventDefault();
        const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
          const userIpAddress = data.ip;
      ip_Input.value = userIpAddress; // Set the user's own IP address in the input field
      getIpinfo(userIpAddress);
   
  });

form.addEventListener("submit",function (event){
   event.preventDefault();
   ipValue = ip_Input.value;
 getIpinfo(ipValue);
  });
 


async function getIpinfo(ip) {
  try {
    const response = await fetch(`/.netlify/functions/IPaddress-Tracker?ipAddress=${ip}`);
    const data = await response.json();
    renderInfo(data);
    } catch (error) {
      renderError();
  }
}

function renderInfo(data){
    IP_address.innerHTML=data.ip;
  location_IP.innerHTML = `${data.location.city},${data.location.country}  ${data.location.postalCode}` ;
   time_Zone.innerHTML=  ` UTC${data.location.timezone}`;
 ISP.innerHTML=data.isp;
  const {location:{lat, lng} } = data;
  map.setView([lat, lng], 13);
  L.marker([lat, lng]).addTo(map);
   }

function renderError(){
  alert("Invalid Ip Address or domain");
  IP_address.innerHTML=" ";
  location_IP.innerHTML = " ";
   time_Zone.innerHTML= " ";
 ISP.innerHTML=" ";
 map.setView([0, 0], 15);

}