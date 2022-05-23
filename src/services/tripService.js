import ApiClient from "./_base";

class TripService {
  async getAll() {
    return await ApiClient.get(`trip`);
  }

  async getByTruckId(truckId) {
    return await ApiClient.get(`trip/truck/${truckId}`);
  }

  async saveTrip(trip) {
    return await ApiClient.post(`trip`, trip, {
      "Content-Type": "application/json",
    });
  }

  async deleteTrip(id) {
    return await ApiClient.delete(`trip?id=${id}`);
  }

  async editTrip(trip) {
    return await ApiClient.put(`trip`, trip, {
      "Content-Type": "application/json",
    });
  }
}

export default new TripService();
