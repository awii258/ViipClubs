import React, {createContext, useEffect} from 'react';
import {AffiliateService} from './AffiliateService';
import {API} from './API';
import {AuthService} from './AuthService';
import {CompetitionService} from './CompetitionService';
import {DestinationService} from './DestinationService';
import {EventService} from './EventService';
import {TownService} from './TownService';

export const ServiceContext = createContext({});

/**
 * A wrapper component to provide the ServiceContext which can be used to access API services
 *
 * @module Services
 *
 * @param {string} host The hostname for system (e.g. https://service.manage.be-vip.com)
 * @param {function} onGetToken Should return a Promise which resolves the token data
 * @param {function} onSetToken Should return a Promise which resolves after storing the token data
 * @param {function} onSetUser Should return a Promise which resolves after storing the user
 * @param {any} children Child notes to be rendered within the wrapper
 *
 * @example
 * <Services
 *   host="https://service.manage.be-vip.com"
 *   onGetToken={getToken}
 *   onSetToken={setToken}
 *   onSetUser={setUser}
 * >
 *   ...
 * </Services>
 *
 */
const Services = ({host, onGetToken, onSetToken, onSetUser, children}) => {
  useEffect(() => {
    API.host = host;
    API.getToken = onGetToken;
    API.setToken = onSetToken;
    API.setUser = onSetUser;
  }, [host, onGetToken, onSetToken, onSetUser]);
  const services = {
    auth: new AuthService(),
    affiliate: new AffiliateService(),
    competition: new CompetitionService(),
    destination: new DestinationService(),
    event: new EventService(),
    town: new TownService()
  };
  return (
    <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>
  );
};

export default Services;
