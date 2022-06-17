import { urlRegister } from '../../utils/endpoints';
import {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailed,
} from './mainActions/mainActions';
import { checkResponse } from './mainActions/response';
import { createNewCookie } from '../../utils/cookie';
import { AppDispatch } from '../../..';

const registerUser = (value: {
  email: string;
  password: string;
  name: string;
}) => {
  return async function (dispatch: AppDispatch) {
    dispatch(registerUserRequest());

    await fetch(urlRegister, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((res) => checkResponse(res))
      .then((res) => {
        if (res && res.success) {
          console.log(res);
          dispatch(
            registerUserSuccess({ email: res.user.email, name: res.user.name }),
          );
          createNewCookie(res);
        }
      })
      .catch(() => dispatch(registerUserFailed()));
  };
};

export default registerUser;
