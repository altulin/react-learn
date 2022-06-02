import { useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
} from '../redux/actions/wsActionTypes';

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
  const dispatch = useDispatch();

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => {
      dispatch({
        type: WS_CONNECTION_SUCCESS,
      });
    };
    ws.current.onerror = (e) => {
      dispatch({ type: 'WS_CONNECTION_ERROR', payload: e });
    };

    ws.current.onclose = () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
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
      dispatch({ type: 'WS_GET_MESSAGE', payload: options.onMessage(e) });
    };
  }, []); // eslint-disable-line
};
