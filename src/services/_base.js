const API_HOST = "https://localhost:44340";

const ApiClient = {
  get: (url, params = {}, header = {}) => {
    return ApiClient.makeRequest(
      `${API_HOST}/${url}`,
      "GET",
      params,
      header,
      false
    );
  },
  post: (url, params = {}, header = {}, isMultipart = false) => {
    return ApiClient.makeRequest(
      `${API_HOST}/${url}`,
      "POST",
      params,
      header,
      isMultipart
    );
  },
  put: (url, params = {}, header = {}) => {
    return ApiClient.makeRequest(
      `${API_HOST}/${url}`,
      "PUT",
      params,
      header,
      false
    );
  },
  delete: (url, params = {}, header = {}) => {
    return ApiClient.makeRequest(
      `${API_HOST}/${url}`,
      "DELETE",
      params,
      header,
      false
    );
  },
  makeRequest: async (
    url,
    type,
    params = {},
    headers = {},
    isMultipart = false
  ) => {
    try {
      type = type.toUpperCase();
      const request = {
        method: type,
        headers: headers,
      };
      if (type === "POST" || type === "PUT") {
        request.body = isMultipart ? params : JSON.stringify(params);
      }

      const result = await fetch(url, request);
      if (isMultipart) return await result.text();
      return await result.json();
    } catch (error) {
      throw error.message;
    }
  },
};

export default ApiClient;
