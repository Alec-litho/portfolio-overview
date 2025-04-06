import { useCallback, useEffect, useRef, useState } from "react";
import { throttle } from "../helpers/throttle";
import { Asset } from "../types";


export const useWebSocket = (updateInterval: number) => {
  const [data, setData] = useState<Asset[] | []>([]);
  const [error, setError] = useState<Error | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const intervalMs = updateInterval;

  const handleMessage = useCallback(
    throttle((message: WebSocketMessage) => {
      try {
        const newData = JSON.parse(message.data);
        setData(newData);
        lastUpdateRef.current = Date.now();
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed"));
      }
    }, intervalMs),
    [intervalMs]
  );

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

      ws.onopen = () => {
        console.log("WebSocket connected");
        setError(null);
      };

      ws.onmessage = (message: WebSocketMessage) => {
        const now = Date.now();

        if (now - lastUpdateRef.current >= intervalMs) {
          console.log("w");
          handleMessage(message);
        }
      };

      ws.onerror = (err) => {
        setError(new Error(`WebSocket error: ${err}`));
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

  return { data, error };
};
