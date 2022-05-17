import { getCookie, accessCookie } from '../utils/cookie';

interface Value {
  email?: string;
  password?: string;
  token?: string;
}

// export async function makePostRequest(url: string, value: Value) {
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(value),
//     });

//     const json = await response.json();

//     if (!response.ok) {
//       const json = response.json();
//       return json;
//     } else {
//       console.log(json.message);
//       console.log(response.status);
//       return Promise.reject(`Ошибка ${json.status}`);
//     }
//   } catch (err) {
//     console.error('Ошибка:', err);
//   }
// }

// export async function makeGetRequest(url: string) {
//   try {
//     const response = await fetch(url, {
//       method: 'GET',

//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + getCookie(accessCookie),
//       },
//     });

//     if (response.status === 403) {
//       return response.status;
//     }

//     const json = await response.json();

//     if (json.success) {
//       return json;
//     } else {
//       console.log(json);
//       return Promise.reject(`Ошибка ${json.message}`);
//     }
//   } catch (err) {
//     console.log('Ошибка:', err);
//   }
// }
