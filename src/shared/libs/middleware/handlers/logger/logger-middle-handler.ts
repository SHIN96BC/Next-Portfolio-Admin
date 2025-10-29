// middleware-handlers/logger.middleware.ts
import { NextRequest } from 'next/server';
import { Middleware, NextHandler } from '../../middleware-type';

/**
 * loggerMiddleware
 *
 * 요청 URL, 메서드, 시간 등을 콘솔에 출력하는 기본 로깅 미들웨어
 */
const loggerMiddleHandler: Middleware = async (req: NextRequest, next: NextHandler) => {
  console.log(`[Logger] ${req.method} ${req.nextUrl.pathname} @ ${new Date().toISOString()}`);
  return next(req);
};

export default loggerMiddleHandler;
