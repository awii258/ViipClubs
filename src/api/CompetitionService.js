import {API} from './API';

/**
 * A class, accessed via the ServiceContext, to access competition details
 *
 * @class CompetitionService
 */
export class CompetitionService {

  /**
   * Retrieve a list of competitions
   *
   * @param {number} page The page number to retrieve
   * @param {number} pageLength The number of competitions per page you wish to retrieve
   * @return Promise<object>
   */
  async getCompetitions(page = 1, pageLength = 50) {
    const params = new URLSearchParams();
    params.append('page', `${page}`);
    params.append('length', `${pageLength}`)
    return (await API.getConnection())
      .get(`external/competitions?${params.toString()}`)
      .then(response => response.data)
      .catch(error => API.handleError(error));
  }

  /**
   * Retrieve a competition by ID
   *
   * @param {number} id The competition's unique ID
   * @return Promise<object>
   */
  async getCompetition(id) {
    return (await API.getConnection())
      .get(`external/competitions/${id}`)
      .then(response => response.data.data)
      .catch(error => API.handleError(error));
  }
}
