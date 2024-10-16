import {Card} from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import {fetchCardData, fetchLatestInvoices, fetchRevenue} from '@/app/lib/data';

import {lusitana} from '@/app/ui/fonts';

export default async function Page() {
    // 这里可以做是因为这个组件是在服务端渲染的，所以可以直接调用 fetch操作，如果是在客户端渲染的话，需要使用useEffect
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
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
                <Card title="Collected" value={totalPaidInvoices} type="collected"/>
                <Card title="Pending" value={totalPendingInvoices} type="pending"/>
                <Card title="Total Invoices" value={numberOfInvoices} type="invoices"/>
                {<Card
                    title="Total Customers"
                    value={numberOfCustomers}
                    type="customers"
                />}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart revenue={revenue}/>
                <LatestInvoices latestInvoices={latestInvoices}/>
            </div>
        </main>
    );
}