import {API} from './API';

/**
 * A class, accessed via the ServiceContext, to access affiliate details
 *
 * @class AffiliateService
 */
export class AffiliateService {

  /**
   * Retrieve a list of towns which include at least one affiliate
   *
   * @return Promise<string[]>
   */
  async getTowns() {
    return (await API.getConnection())
      .get(`external/affiliates/towns`)
      .then(response => response.data['towns'])
      .catch(error => API.handleError(error));
  }

  /**
   * Retrieve a list of affiliates
   *
   * @param {number} page The page number to retrieve
   * @param {number} pageLength The number of affiliates per page you wish to retrieve
   * @param {string} search A string to search the affiliates list by, leave blank to ignore
   * @param {string|number} town The name or ID of a town/city to filter the affiliates list, leave blank to ignore
   * @param {number|null} latitude A latitude to search affiliates by location, must be supplied with a longitude
   * @param {number|null} longitude A longitude to search affiliates by location, must be supplied with a latitude
   * @param {boolean} saved A toggle to set whether to only list affiliates saved by the current user
   * @return Promise<object>
   */
  async getAffiliates(
    page = 1,
    pageLength = 50,
    search = '',
    town = '',
    latitude = null,
    longitude = null,
    saved = false
  ) {
    const params = new URLSearchParams();
    params.append('page', `${page}`);
    params.append('length', `${pageLength}`)
    if (search) {
      params.append('search', search);
    }
    if (town) {
      params.append('town', town);
    }
    if (latitude !== null && longitude !== null) {
      params.append('latitude', `${latitude}`);
      params.append('longitude', `${longitude}`);
    }
    if (saved) {
      params.append('saved', '1');
    }
    return (await API.getConnection())
      .get(`external/affiliates?${params.toString()}`)
      .then(response => response.data)
      .catch(error => API.handleError(error));
  }

  /**
   * Retrieve an affiliate by ID
   *
   * @param {number} id The affiliate's unique ID
   * @return Promise<object>
   */
  async getAffiliate(id) {
    return (await API.getConnection())
      .get(`external/affiliates/${id}`)
      .then(response => response.data.data)
      .catch(error => API.handleError(error));
  }

  /**
   * Toggle whether the current user has saved the given affiliate
   *
   * @param {number} id The affiliate's unique ID
   * @return Promise<object>
   */
  async toggleSave(id) {
    return (await API.getConnection())
      .post(`external/affiliates/${id}/toggle`)
      .then(response => response.data.data)
      .catch(error => API.handleError(error));
  }

  /**
   * Check the current user in at the given affiliate
   *
   * @param {number} id The affiliate's unique ID
   * @return Promise<object>
   */
  async checkIn(id) {
    return (await API.getConnection())
      .post(`external/affiliates/${id}/check-in`)
      .then(response => response.data.data)
      .catch(error => API.handleError(error));
  }
}
