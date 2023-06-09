import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },
  async createSportground(sportground) {
    const res = await axios.post(`${this.placemarkUrl}/api/sportgrounds`, sportground);
    return res.data;
  },

  async deleteAllSportgrounds() {
    const response = await axios.delete(`${this.placemarkUrl}/api/sportgrounds`);
    return response.data;
  },

  async deleteSportground(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/sportgrounds/${id}`);
    return response;
  },

  async getAllSportgrounds() {
    const res = await axios.get(`${this.placemarkUrl}/api/sportgrounds`);
    return res.data;
  },

  async getSportground(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/sportgrounds/${id}`);
    return res.data;
  },

  async getAllClubs() {
    const res = await axios.get(`${this.placemarkUrl}/api/clubs`);
    return res.data;
  },

  async createClub(id, club) {
    const res = await axios.post(`${this.placemarkUrl}/api/sportgrounds/${id}/clubs`, club);
    return res.data;
  },

  async deleteAllClubs() {
    const res = await axios.delete(`${this.placemarkUrl}/api/clubs`);
    return res.data;
  },

  async getClub(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/clubs/${id}`);
    return res.data;
  },

  async deleteClub(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/clubs/${id}`);
    return res.data;
  },


  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

};