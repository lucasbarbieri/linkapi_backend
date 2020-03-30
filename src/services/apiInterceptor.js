const axios = require("axios");

class ApiInterceptor {
  constructor(url, headers) {
    if (!headers) {
      headers = {};
    }

    const ApiInterceptor = axios.create({
      baseURL: url,
      headers
    });

    ApiInterceptor.interceptors.response.use(
      response => {
        return { status: response.status, data: response.data };
      },
      error => {
        return { status: error.response.status, data: response.data };
      }
    );

    return ApiInterceptor;
  }
}

module.exports = ApiInterceptor;
