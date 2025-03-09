import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { Event } from '../types/event';
import { LoginCredentials } from '../types/auth';

import { Fleet, FleetFormData } from "../types/fleet";
import { DriverDto, FleetCard } from "../types/fleetCard";

// const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })
const API = axios.create({ baseURL: "http://localhost:8080" })

// intercept requests  before they are handled by then or catch
API.interceptors.request.use((req)=> {
    if(secureLocalStorage.getItem('token'))  {
         req.headers.authorization = `Bearer ${secureLocalStorage.getItem('token')}`
    }
    return req ;
})


/**
 * 
 * Instructor Apis
 *  
 */

// export const fetchInstructors = () => API.get(`/instructors`); 
// export const fetchInstructor = (id) => API.get(`/instructors`); 
// export const createInstructor = (formData) => API.get(`/instructors`); 
// export const deleteInstructor = (id) => API.get(`/instructors`); 
// export const updateInstructor = (formData) => API.get(`/instructors`); 





// Event API Calls
export const fetchEvents = () => API.get("/events");
export const fetchEventById = (id: string) => API.get(`/events/${id}`);
export const createEvent = (eventData: Event) => API.post("/events", eventData);
export const updateEvent = (eventData: Event) => API.put(`/events/${eventData.id}`, eventData);
export const deleteEvent = (id: string) => API.delete(`/events/${id}`);


export const getEligibleStudents = (lessonId: string, drivingSchoolId: string) => 
    API.get(`/api/participations/eligible-students`, {
      params: { lessonId, drivingSchoolId }
    });
export const getStudentParticipants = (eventId: string) => 
  API.get(`/api/participations/students`, {
    params: { eventId }
  });

    
export const getLessons = () => API.get(`/api/lessons`) ;
export const createEvent_participations = (requestData:any) => API.post(`/api/participations/create-event-with-participations`,requestData) ;


// ----------------------------------------------------------------------------------------
// export const fetchRooms = (userId) => API.get(`/rooms/${userId}`); // fetchRooms by userId
// export const fetchRoom = (id) => API.get(`/rooms/getRoom/${id}`);  // fetchRoom by id room
// export const fetchRoomsBySearch = (SearchQuery) => API.get(`/rooms/getRooms/search?searchQuery=${SearchQuery.search || 'none'}&tags=${SearchQuery.tags}&userId=${SearchQuery.userId}&isProfesseur=${SearchQuery.isProfesseur}`);
// export const createRoom = (formData) => API.post('/rooms/createRoom', formData);
// export const joinRoom = (formData) => API.post('/rooms/rejoindre', formData);
// export const updateCour = (id, updatedCour) => API.patch(`/cours/${id}`, updatedCour);
// export const addChapitre = (formData) => API.post(`/rooms/addChapitre`, formData);

// export const fetchChapitre = (id) => API.get(`/chapitres/${id}`);
// export const deleteChapitre = (data) => API.post(`/chapitres/delete`, data);
// export const updateChapitre = (data) => API.patch(`/chapitres/update`, data);

// export const consultChapitreByEtudiant = (data) => API.post(`/rooms/consulter`, data);
// export const deleteEtudiants = (data) => API.post(`/rooms/deleteEtudiants`, data);

// export const askfor_new_codeRoom = (idRoom) => API.patch(`/rooms/askfor_new_codeRoom`, idRoom);
// export const updateTheme = (data) => API.put(`/cours/updateTheme`, data);
// export const fetchThemes = () => API.get(`/cours/all/themes`);

// export const addComment = (data) => API.post(`/rooms/addComment`,data);
// export const getComments = (id) => API.get(`/rooms/getComments/${id}`);
// export const deleteComment = (id) => API.delete(`/rooms/deleteComment/${id}`);

// export const deleteComments_ByIdChapitre = (id) => API.delete(`/rooms/deleteComments/${id}`);


export const signIn = (formData:LoginCredentials) => API.post(`/login`, formData);


export const fetchFleets = (id: number) => API.get<Fleet[]>(`/get-managers-fleet/${id}`);

export const createFleet = (id:number,fleetData: FleetFormData) => API.post<Fleet>(`/ajouter-manager-fleet/${id}`, fleetData);

export const getAllFleets = (id : number) => API.get<FleetCard[]>(`/get-all/${id}`);

export const addDriverToCar = (idManagerFleet: number, vin: string, driver: DriverDto) => 
  API.post<FleetCard>(`/driver-to-car?idManagerFleet=${idManagerFleet}&vin=${vin}`, driver);


// export const updateFleet = (id: number, fleetData: FleetFormData) => axios.put<Fleet>(`${API_URL}/${id}`, fleetData);
// export const deleteFleet = (id: number) => axios.delete(`${API_URL}/${id}`);

// export const signUp = (formData) => API.post(`/users/signup`, formData);