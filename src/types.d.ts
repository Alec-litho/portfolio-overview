export interface Asset {
  id: string;
  symbol: string;
  amount: number;
  price: number;
  change24h: number;
}

export interface CryptoData {
  symbol: string;
  price: number;
  change: number;
}
