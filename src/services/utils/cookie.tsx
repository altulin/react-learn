interface Props {
  expires?: any;
}

export const lifeTime = 10; // время жизни токена

export const setCookie = async (name: string, value: string, props?: Props) => {
  props = props || {};
  let exp = props.expires;

  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName as keyof Props];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        //eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, '', {
    expires: -1,
  });
}

export const createNewCookie = async (data: {
  refreshToken: string;
  accessToken: string;
}) => {
  const { refreshToken, accessToken } = data;

  await setCookie('refreshToken', refreshToken);
  await setCookie('accessToken', accessToken.split('Bearer ')[1], {
    expires: lifeTime,
  });
};
