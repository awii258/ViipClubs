import {API} from './API';

/**
 * A class, accessed via the ServiceContext, to access event details
 *
 * @class EventService
 */
export class EventService {

  /**
   * Format a date object for use in a querystring (internal method)
   *
   * @param {Date} date The date to format
   * @return string
   */
  formatDate(date) {
    const offset = date.getTimezoneOffset()
    const toFormat = new Date(date.getTime() - (offset * 60 * 1000))
    return toFormat.toISOString().split('T')[0];
  }

  /**
   * Retrieve a list of events
   *
   * @param {number} page The page number to retrieve
   * @param {number} pageLength The number of events per page you wish to retrieve
   * @param {Date|null} from A JavaScript Date object to represent the first day you wish to retrieve events for
   * @param {Date|null} to A JavaScript Date object to represent the last day you wish to retrieve events for
   * @param {string|number} town The name or ID of a town/city to filter the events list, leave blank to ignore
   * @param {number|null} affiliate The ID of an affiliate to filter the events list, leave blank to ignore
   * @return Promise<object>
   */
  async getEvents(
    page = 1,
    pageLength = 50,
    from = null,
    to = null,
    town = '',
    affiliate = null
  ) {
    const params = new URLSearchParams();
    params.append('page', `${page}`);
    params.append('length', `${pageLength}`)
    if (from) {
      params.append('from', this.formatDate(from));
    }
    if (to) {
      params.append('to', this.formatDate(to));
    }
    if (town) {
      params.append('town', town);
    }
    if (affiliate) {
      params.append('affiliate', `${affiliate}`);
    }
    return (await API.getConnection())
      .get(`external/events?${params.toString()}`)
      .then(response => response.data)
      .catch(error => API.handleError(error));
  }

  /**
   * Retrieve a event by ID
   *
   * @param {number} id The event's unique ID
   * @return Promise<object>
   */
  async getEvent(id) {
    return (await API.getConnection())
      .get(`external/events/${id}`)
      .then(response => response.data.data)
      .catch(error => API.handleError(error));
  }
}
