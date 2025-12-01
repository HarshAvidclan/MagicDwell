import { MagicDwellAPI } from './BaseURL';

export const Auth = {
  REGISTER: MagicDwellAPI + 'Auth' + '/Register',
  LOGIN: MagicDwellAPI + 'Auth' + '/Login',
  FORGOTPASSWORD: MagicDwellAPI + 'Auth' + '/ForgotPassword',
  RESETPASSWORD: MagicDwellAPI + 'Auth' + '/ResetPassword',
  GETROLES: MagicDwellAPI + 'Auth' + '/GetRoles',
  CONFIRMEMAIL: MagicDwellAPI + 'Auth' + '/ConfirmEmail',
  SOCIAL: MagicDwellAPI + 'Auth' + '/Social',
};

export const PropertyMaster = {
  GET: MagicDwellAPI + 'PropertyMaster' + '/Get',
};

export const Property = {
  ADDEDIT: MagicDwellAPI + 'Property' + '/ADDEDIT',
  GETFORLISTING: MagicDwellAPI + 'Property' + '/GetForListing',
  GETBYPOSTID: MagicDwellAPI + 'Property' + '/GetByPostId',
};

export const Image = {
  UPLOAD: MagicDwellAPI + 'Image' + '/Upload',
};

export const User = {
  GETCURRENTUSER: MagicDwellAPI + 'User' + '/GetCurrentUser',
};

export const VehicleMaster = {
  GET: MagicDwellAPI + 'VehicleMaster' + '/Get',
  GETBRANDMODELBYID: MagicDwellAPI + 'VehicleMaster' + '/GetBrandModelById',
};

export const Vehicle = {
  GETVEHICLEBYPOSTID: MagicDwellAPI + 'Vehicle' + '/GetVehicleByPostId',
  ADDEDIT: MagicDwellAPI + 'Vehicle' + '/AddEdit',
  GETFORLISTING: MagicDwellAPI + 'Vehicle' + '/GetForListing',
};

export const AppSetting = {
  GETVALUE: (key: string) => `${MagicDwellAPI}AppSetting/GetValue/${encodeURIComponent(key)}`,
};

export const Post = {
  GETFORLISTING: MagicDwellAPI + 'Post' + '/GetForListing',
};

export const Mappls = {
  AUTOSUGGEST: MagicDwellAPI + 'Mappls' + '/Autosuggest',
};