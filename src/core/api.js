export const serverUrl = 'http://192.168.100.3:3000';
const apiUrl = `${serverUrl}/api`;
export const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
export const authHeaders = (token) => ({...headers, 'Authorization': `Bearer ${token}`});
