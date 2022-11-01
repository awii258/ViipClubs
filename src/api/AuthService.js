import {API} from './API';

/**
 * A class, accessed via the ServiceContext, to access authentication actions
 *
 * @class AuthService
 */
export class AuthService {

  /**
   * Log in the user
   *
   * @param {string} email The user's email address
   * @param {string} password The user's password
   * @return Promise<object>
   */
  async login(email, password) {
    return (await API.getConnection())
      .post('external/auth/login', {email, password})
      .then(response => (
        API.updateToken(response.data).then(() => response.data)
      ))
      .catch(error => API.handleError(error));
  }

  /**
   * Retrieve the logged-in user
   *
   * @return Promise<object>
   */
  async me() {
    return (await API.getConnection())
      .get('external/auth/me')
      .then(response => {
        const user = response.data.data;
        return API.setUser(user).then(() => user);
      })
      .catch(async error => {
        await API.setUser(null);
        return API.handleError(error);
      });
  }

  /**
   * Update the logged-in user's profile
   *
   * @param {string} firstName The user's first name
   * @param {string} lastName The user's last name
   * @param {string} email The user's email address
   * @param {Date} dateOfBirth The user's date of birth as a Javascript Date object
   * @param {number} destinationID The ID of the users chosen destination
   *
   * @return Promise<object>
   */
  async updateProfile(firstName, lastName, email, dateOfBirth, destinationID = null) {
    return (await API.getConnection())
      .put('external/auth/me', {
        first_name: firstName,
        last_name: lastName,
        email,
        date_of_birth: dateOfBirth.toISOString(),
        destination_id: destinationID
      })
      .then(response => {
        const user = response.data.data;
        return API.setUser(user).then(() => user);
      })
      .catch(async error => {
        await API.setUser(null);
        return API.handleError(error);
      });
  }

  /**
   * Update the logged-in user's profile image
   *
   * @param {File} file The file to upload for the user's profile image
   *
   * @return Promise<string>
   */
  async uploadImage(file) {
    const body = new FormData();
    body.append('image', file);
    return (await API.getConnection())
      .post(
        'external/auth/image',
        body,
        {headers: {'Accept': 'application/json', 'Content-Type': 'multipart/form-data'}}
      ).then(response => response.data.path).catch(error => API.handleError(error));
  }

  /**
   * Log out the current user
   *
   * @return Promise<object>
   */
  async logout() {
    return (await API.getConnection())
      .post('external/auth/logout')
      .then(async () => await API.reset())
      .catch(error => API.handleError(error));
  }

  /**
   * Request a password reset email for the given details
   *
   * @param {string} email The user's email address
   * @param {string} resetUrl The url to send to the user, should contain {TOKEN} to signify where the reset token will
   *                          be inserted (e.g. https://example.com/reset-password/{TOKEN}
   * @return Promise<null>
   */
  async forgotPassword(email, resetUrl) {
    return (await API.getConnection())
      .post('external/auth/forgot-password', {email, reset_url: resetUrl})
      .then(() => null)
      .catch(error => API.handleError(error));
  }

  /**
   * Reset a user's password
   *
   * @param {string} email The user's email address
   * @param {string} password The user's desired password
   * @param {string} token The reset password token passed via the URL
   * @return Promise<null>
   */
  async resetPassword(email, password, token) {
    return (await API.getConnection())
      .post('external/auth/reset-password', {email, password, token})
      .then(response => response.data)
      .catch(error => API.handleError(error));
  }
}
