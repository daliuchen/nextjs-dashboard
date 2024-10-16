import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login', //pages选项允许你自定义登录、登出和错误页面的路由
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now 这可以对接多种第三方登录服务，比如Google
} satisfies NextAuthConfig;