import { useCallback, useRef, useEffect } from 'react';

export const CONNECTING = 'CONNECTING';
export const OPEN = 'OPEN';
export const CLOSING = 'CLOSING';
export const CLOSED = 'CLOSED';

export const socketStates = {
  0: CONNECTING,
  1: OPEN,
  2: CLOSING,
  3: CLOSED,
};

type TOptions = {
  onMessage: (e: any) => void;
};

export const useSocket = (url: string, options: TOptions) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => console.log('Соединение открыто');
    ws.current.onclose = () => console.log('Соединение закрыто');

    gettingData();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      options.onMessage(e);
      // console.log(e.data);
    };
  }, []);
};

// export const useSocket: (url: string) => any = (url) => {
// const ws = useRef<any>(null);

// const connect: any = useCallback(() => {},[])
// eslint-disable-line react-hooks/exhaustive-deps

// const connect = useCallback(
//   (token) => {
//     ws.current = new WebSocket(`${url}?token=${token}`);

//     ws.current.onmessage = (event) => {
//       if (typeof options.onMessage === 'function') {
//         options.onMessage(event);
//       }
//     }; // Ваш код здесь

//     ws.current.onopen = (event) => {
//       if (typeof options.onConnect === 'function') {
//         options.onConnect(event);
//       }
//     };

//     ws.current.onerror = (event) => {
//       if (typeof options.onError === 'function') {
//         options.onError(event);
//       }
//     };

//     ws.current.onclose = (event) => {
//       if (typeof options.onDisconnect === 'function') {
//         options.onDisconnect(event);
//       }
//     };
//   },
//   [url, options],
// );

// export const

// useEffect(() => {
// if (ws.current) {
//   ws.current.onmessage = (event) => {
//     if (typeof options.onMessage === 'function') {
//       options.onMessage(event);
//     }
//   }; // Ваш код здесь

//   if (typeof options.onConnect === 'function') {
//     ws.current.onopen = options.onConnect;
//   }
//   if (typeof options.onError === 'function') {
//     ws.current.onerror = options.onError;
//   }
//   if (typeof options.onDisconnect === 'function') {
//     ws.current.onclose = options.onDisconnect;
//   }
// }
// }, [options, ws]);

// useEffect(() => {
// return () => {
// if (ws.current && typeof ws.current.close === 'function') {
// ws.current.close();
// }
// };
// }, []);

// const sendData = useCallback(
// (message) => {
// Ваш код здесь
// ws.current.send(JSON.stringify(message));
// },
// [ws],
// );

// return { connect};
// };
