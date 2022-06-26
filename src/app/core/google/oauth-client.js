import config from '../constants/app-config';
import {google} from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  config.google.clientID,
  config.google.clientSecret,
  'postmessage'
);

export default oauth2Client;
