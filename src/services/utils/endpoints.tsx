const baseUrl = 'https://norma.nomoreparties.space/api';
const baseWs = 'wss://norma.nomoreparties.space';

export const urlForgot = `${baseUrl}/password-reset`;
export const urlReset = `${baseUrl}/password-reset/reset`;
export const urlRegister = `${baseUrl}/auth/register`;
export const urlLogin = `${baseUrl}/auth/login`;
export const urlLogout = `${baseUrl}/auth/logout`;
export const urlProfile = `${baseUrl}/auth/user`;
export const urlToken = `${baseUrl}/auth/token`;
export const urlOrder = `${baseUrl}/orders`;

export const orders_all = `${baseWs}/orders/all`;
export const orders_user = `${baseWs}/orders`;
