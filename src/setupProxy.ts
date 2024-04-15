// src/setupProxy.ts
import { createProxyMiddleware } from 'http-proxy-middleware';
import {Express} from "express" // You may need to install the types for Express if not already installed

export default function setupProxy(app: Express) {
  app.use(
    '/all-nft',
    createProxyMiddleware({
      target: 'https://api.pinata.cloud',
      changeOrigin: true,
    })
  );
}
