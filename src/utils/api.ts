import { clearScreenDown } from "readline";

export async function apiRequest(endpoint: string, method: string = "GET", data: any = null) {
  const token = localStorage.getItem("token"); 

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),  
    },
    ...(data && { body: JSON.stringify(data) }), 
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, options);
  return response.json(); 
}
