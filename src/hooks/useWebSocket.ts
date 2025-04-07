import { useCallback, useEffect, useRef, useState } from "react";
import { CryptoData } from "../types";
import { throttle } from "../helpers/throttle";

export const useWebSocket = (updateInterval: number) => {
  const [data, setData] = useState<CryptoData[] | []>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const intervalMs = updateInterval;

  const handleMessage = useCallback(
    throttle((message) => {
      try {
        const newData = JSON.parse(message.data);
        setData(newData);
        lastUpdateRef.current = Date.now();
      } catch (err) {
        console.error(err);
      }
    }, intervalMs),
    [intervalMs]
  );

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (message) => {
        const now = Date.now();

        if (now - lastUpdateRef.current >= intervalMs) {
          console.log("w");
          handleMessage(message);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };

      wsRef.current = ws;
    };

    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [intervalMs, handleMessage]);

  return data;
};
