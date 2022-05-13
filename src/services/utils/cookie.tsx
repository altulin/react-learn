export const accessCookie = 'accessToken';
export const refreshCookie = 'refreshToken';

interface Props {
  expires?: any;
  path?: string;
}

export const setCookie = async (name: string, value: string, props?: Props) => {
  // props = props || {};
  props = {
    path: '/',
    ...props,
  };

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
  console.log(document.cookie);
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

  await setCookie(refreshCookie, refreshToken);
  await setCookie(accessCookie, accessToken.split('Bearer ')[1]);
};
