import * as axios from 'axios';

export class API {
  static host = '';
  static getToken = async () => null;
  static setToken = async () => null;
  static setUser = async () => null;

  static async reset() {
    await API.setUser(null);
    await API.setToken(null);
  }

  static async updateToken(data) {
    if (data) {
      const {
        access_token: token,
        expires_in: expiresIn,
        token_type: type,
        refresh_token: refresh
      } = data;
      const expires = new Date(new Date().getTime() + (expiresIn * 1000));
      await API.setToken({token, type, refresh, expires: expires.toISOString(), created: new Date().toISOString()});
    } else {
      await API.setToken(null);
    }
  }

  static async getConnection() {
    return new Promise(async (resolve) => {
      if (!API.connection) {
        // noinspection JSUnresolvedFunction
        API.connection = axios.create({
          baseURL: `${API.host}/api/`,
          timeout: 10000,
          responseType: 'json',
        });
        API.connection.interceptors.request.use(
          (config) => {
            return new Promise(async (resolveConfig) => {
              const done = async () => {
                const data = await API.getToken();
                if (data) {
                  const {type, token} = data;
                  config.headers.Authorization = `${type} ${token}`;
                }
                resolveConfig(config);
              };
              const exclusions = [
                'external/auth/login',
                'external/auth/refresh',
                'external/auth/logout',
                'external/auth/forgot-password',
                'external/auth/reset-password'
              ];
              if (exclusions.indexOf(config.url) < 0) {
                const token = await API.getToken();
                if (token) {
                  if (new Date(token.expires) < new Date()) {
                    API.connection
                      .post('external/auth/refresh', {token: token.refresh})
                      .then((response) => API.updateToken(response.data).then(() => done()))
                      .catch(() => {
                        API.reset().then(() => done());
                      });
                  } else {
                    await done();
                  }
                } else {
                  await done();
                }
              } else {
                await done();
              }
            });
          },
          (error) => Promise.reject(error),
        );
      }
      resolve(API.connection);
    });
  }

  static async handleError(error) {
    if (error && error.response) {
      if (error.response.status === 403) {
        await API.reset();
      }
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
}
