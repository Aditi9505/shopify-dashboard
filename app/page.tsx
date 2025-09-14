'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define type structures for your data
type Stat = { title: string; value: string };
type OrderByDate = { name: string; Orders: number };
type Customer = { name: string; spend: string };

type StatCardProps = {
  title: string;
  value: string;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-semibold text-gray-800 mt-2">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;


 // Replace with your ngrok URL

  // State for data fetched from backend
  const [stats, setStats] = useState<Stat[]>([]);
  const [ordersByDate, setOrdersByDate] = useState<OrderByDate[]>([]);
  const [topCustomers, setTopCustomers] = useState<Customer[]>([]);
  const [tenantId, setTenantId] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shop = params.get('shop');
    if (!shop) {
      console.error('No shop parameter in URL');
      return;
    }

    async function fetchTenantId(shop: string) {
      try {
        const response = await fetch(`${backendUrl}/api/tenantId?shop=${encodeURIComponent(shop)}`);
        if (!response.ok) {
          throw new Error('Tenant not found');
        }
        const data = await response.json();
        setTenantId(data.tenantId);
      } catch (err) {
        console.error('Failed to fetch tenantId:', err);
      }
    }
    fetchTenantId(shop);
  }, []);

  useEffect(() => {
    if (!tenantId) return;

    async function fetchDashboardData() {
  try {
    const [metricsRes, ordersRes, customersRes] = await Promise.all([
      fetch(`${backendUrl}/api/metrics?tenantId=${tenantId}`),
      fetch(`${backendUrl}/api/orders-by-date?tenantId=${tenantId}`),
      fetch(`${backendUrl}/api/top-customers?tenantId=${tenantId}`)
    ]);

    if (!metricsRes.ok) {
      const errorText = await metricsRes.text();
      console.error('Metrics API error response:', errorText);
      throw new Error('Error fetching metrics');
    }
    if (!ordersRes.ok) {
      const errorText = await ordersRes.text();
      console.error('Orders API error response:', errorText);
      throw new Error('Error fetching orders');
    }
    if (!customersRes.ok) {
      const errorText = await customersRes.text();
      console.error('Customers API error response:', errorText);
      throw new Error('Error fetching customers');
    }

    const metrics = await metricsRes.json();
    const ordersData = await ordersRes.json();
    const customersData = await customersRes.json();

    setStats(metrics);
    setOrdersByDate(ordersData);
    setTopCustomers(customersData);
  } catch (error) {
    console.error('Failed to fetch dashboard data', error);
  }
}

    fetchDashboardData();
  }, [tenantId]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </header>
        <main className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} title={stat.title} value={stat.value} />
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800">Orders by Date</h3>
              <div className="mt-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ordersByDate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Orders" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800">Top 5 Customers</h3>
              <ul className="mt-4 space-y-4">
                {topCustomers.map((customer) => (
                  <li key={customer.name} className="flex justify-between items-center">
                    <span className="text-gray-600">{customer.name}</span>
                    <span className="font-semibold text-gray-800">{customer.spend}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
