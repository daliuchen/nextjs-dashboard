import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    // 在这里，您正在使用authConfig对象初始化NextAuth.js，并导出auth属性。您还在中间件中使用matcher选项来指定它应该在特定路径上运行。
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};