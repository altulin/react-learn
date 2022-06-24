import { useCallback, useRef, useEffect } from 'react';
import { useDispatch } from '../../index';
import * as actons from '../redux/actions/wsAction/wsActions';

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
  const { onMessage } = options;

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => {
      console.log('open');
      dispatch(actons.connectionStart());
    };
    ws.current.onerror = (e) => {
      console.log(e);
      dispatch(actons.connectionError(e));
    };

    ws.current.onclose = () => {
      console.log('close');

      dispatch(actons.connectionClosed());
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
      dispatch(actons.getMessage(onMessage(e)));
    };
  }, []); // eslint-disable-line
};
