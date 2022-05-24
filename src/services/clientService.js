import ApiClient from "./_base";

class ClientService {
  async registerUser(user) {
    return await ApiClient.post(`user/signup`, user, {
      "Content-Type": "application/json",
    });
  }
  async loginUser(user) {
    return await ApiClient.post(`user/login`, user, {
      "Content-Type": "application/json",
    });
  }
  async getUserRoles(user) {
    return await ApiClient.post(`user/roles`, user, {
      "Content-Type": "application/json",
    });
  }

  async getAvailableUsers(adminId, startDate, endDate) {
    return await ApiClient.get(
      `user/available?adminId=${adminId}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  async getByEmail(email) {
    return await ApiClient.get(`user/${email}`);
  }

  async getById(userId) {
    return await ApiClient.get(`user/id/${userId}`);
  }

  async getTruckAccounts(adminId) {
    return await ApiClient.get(`user/trucks/${adminId}`);
  }

  async deleteUser(id) {
    return await ApiClient.delete(`user/delete?id=${id}`);
  }

  async editUser(user) {
    return await ApiClient.put(`user/edit`, user, {
      "Content-Type": "application/json",
    });
  }
}

export default new ClientService();
