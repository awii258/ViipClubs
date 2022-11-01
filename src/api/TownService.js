import {API} from './API';

/**
 * A class, accessed via the ServiceContext, to access town details
 *
 * @class TownService
 */
export class TownService {

  /**
   * Retrieve a list of towns
   *
   * @param {number} page The page number to retrieve
   * @param {number} pageLength The number of towns per page you wish to retrieve
   * @param {string} search A string to search the towns list by, leave blank to ignore
   * @return Promise<object>
   */
  async getTowns(page = 1, pageLength = 50, search = '') {
    const params = new URLSearchParams();
    params.append('page', `${page}`);
    params.append('length', `${pageLength}`)
    if (search) {
      params.append('search', search);
    }
    return (await API.getConnection())
      .get(`external/towns?${params.toString()}`)
      .then(response => response.data)
      .catch(error => API.handleError(error));
  }

  /**
   * Retrieve a town by ID
   *
   * @param {number} id The town's unique ID
   * @return Promise<object>
   */
  async getTown(id) {
    return (await API.getConnection())
      .get(`external/towns/${id}`)
      .then(response => response.data.data)
      .catch(error => API.handleError(error));
  }
}
