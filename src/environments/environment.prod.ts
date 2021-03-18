const subDomain = (location.host.split('.')[1] ? window.location.host.split('.')[0] : 'test')+'.';
export const environment = {
  production: false,
  apiUrl: 'http://'+subDomain+'api.siseweb.com/v1/api/',
  version: '1.0.0',
  apiUrlFile: 'http://fm.api.siseweb.com/'
};
