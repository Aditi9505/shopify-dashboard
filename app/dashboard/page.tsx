'use client';

import React, { useEffect, useState } from 'react';

type OrderData = {
  name: string;
  Orders: number;
};

export default function Dashboard() {
  const [data, setData] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/orders-by-date?tenantId=1'); // use tenantId you want
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Orders By Date</h1>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.name}>
              <td>{d.name}</td>
              <td>{d.Orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
