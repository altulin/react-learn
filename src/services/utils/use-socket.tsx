import { useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
  typeSuccess: string;
  typeError: string;
  typeClosed: string;
  typeMesssage: string;
};

export const useSocket = (url: string, options: TOptions) => {
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();
  const { onMessage, typeSuccess, typeError, typeClosed, typeMesssage } =
    options;

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => {
      console.log('open');
      dispatch({
        type: typeSuccess,
      });
    };
    ws.current.onerror = (e) => {
      console.log(e);
      dispatch({ type: typeError, payload: e });
    };

    ws.current.onclose = () => {
      console.log('close');

      dispatch({
        type: typeClosed,
      });
    };

    gettingData();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []); // eslint-disable-line

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      dispatch({ type: typeMesssage, payload: onMessage(e) });
    };
  }, []); // eslint-disable-line
};
