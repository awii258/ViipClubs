import {API} from './API';

/**
 * A class, accessed via the ServiceContext, to access destination details
 *
 * @class DestinationService
 */
export class DestinationService {

  /**
   * Retrieve a list of destinations
   *
   * @param {number} page The page number to retrieve
   * @param {number} pageLength The number of destinations per page you wish to retrieve
   * @return Promise<object>
   */
  async getDestinations(page = 1, pageLength = 50) {
    const params = new URLSearchParams();
    params.append('page', `${page}`);
    params.append('length', `${pageLength}`)
    return (await API.getConnection())
      .get(`external/destinations?${params.toString()}`)
      .then(response => response.data)
      .catch(error => API.handleError(error));
  }
}
