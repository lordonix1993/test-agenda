import axios from 'axios';
import { CONFIG } from '../config/main';

export const http = axios.create({
  baseURL: `${CONFIG.apiURL}`,
});
