import axios from "axios";
// http://localhost:5000
// https://ticketmanagenment-backend.onrender.com
const API = axios.create({
  baseURL: "https://ticketmanagenment-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});


// 👉 add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // backend reads this
  }
  return config;
});


// AUTH
// -------------------------
export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/register", data);
export const getCurrentUser = () => API.get("/auth/user");


// User Profile 
export const getProfile = () => API.get("/user/getProfile")


// Ticket routes
export const createTicket = (data) => API.post("/ticket/createTicket", data)
export const getTicket = () => API.get("/ticket/getTickets")
export const getParticularTicket = (data) => API.get(`/ticket/getParticularTicket/${data}`)
export const replyParticularTicket = (chatId, text) => API.post(`/ticket/reply/${chatId}`, text)

export const assignTicket = (ticketId, data) => API.patch(`/ticket/assign/${ticketId}`, data)
export const changeStatus = (ticketId, data) => API.patch(`/ticket/changeStatus/${ticketId}`, data)
// TeamMembers

export const getTeamMembers = () => API.get('/team/getmember');
export const addTeamMember = (data) => API.post("/team/addMember", data);
export const updateMember = (memberId, data) => API.put(`/team/updatemember/${memberId}`, data)
export const deleteMember = (memberId, data) => API.delete(`/team/deletemember/${memberId}`, data)

export const getDashboardMetrics = (params) => API.get("/analytics/dashboard", { params });