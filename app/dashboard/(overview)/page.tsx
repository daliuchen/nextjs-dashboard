import {Card} from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import {fetchCardData, fetchLatestInvoices, fetchRevenue} from '@/app/lib/data';
import { Suspense } from 'react';
import {CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton} from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';




import {lusitana} from '@/app/ui/fonts';

export default async function Page() {
    // 这里可以做是因为这个组件是在服务端渲染的，所以可以直接调用 fetch操作，如果是在客户端渲染的话，需要使用useEffect
    // 这种方式是服务端的静态渲染，只是在build的时候调用了一场

    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
    } = await fetchCardData();

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>

                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}