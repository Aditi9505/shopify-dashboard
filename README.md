Multi-Tenant Shopify Insights Dashboard
This project is a multi-tenant Shopify Data Ingestion & Insights web app that helps Shopify store owners visualize important data like orders, customers, and products in an easy-to-understand way. The project uses Next.js for the frontend with built-in API routes, Prisma ORM for database handling, and it’s deployed on Vercel for fast and scalable hosting

✅ Features Implemented
Real-time Data Ingestion: Connects to the Shopify Admin API via Webhooks to ingest Customers, Orders, and Products in real-time the moment they are created or updated.

Multi-Tenant Architecture: The database schema and backend logic are designed from the ground up to support multiple Shopify stores, with all data correctly isolated by a storeId.

Secure Insights Dashboard: A professional and secure frontend built with Next.js and React, protected by a full authentication system.

Email & Password Authentication: The dashboard is protected using NextAuth.js, ensuring only authorized users can view the store's sensitive data.

Key Metric Visualizations:

Displays summary cards for Total Revenue, Total Customers, and Total Orders.

Includes a "Top 5 Customers by Spend" table to identify key shoppers.

Features a "Sales Analytics" line chart (using Recharts) to visualize revenue trends over time.

Professional UI/UX: The dashboard is built with the modern Shadcn/ui component library and styled with Tailwind CSS for a polished, responsive, and visually appealing user experience.

🏗️ High-Level Architecture
The application follows a modern serverless architecture, prioritizing real-time data flow, scalability, and a decoupled frontend and backend.
<img width="3622" height="3840" alt="Architecture" src="https://github.com/user-attachments/assets/8bbf7c32-41f0-4f15-9a9d-829627ccb844" />


Data Flow:

An event (e.g., a new order) occurs in a Shopify store.

Shopify sends a webhook payload to a dedicated API endpoint hosted on Vercel.

The Vercel serverless function processes the webhook, identifies the store, and saves the data to the appropriate tables in the Railway MySQL database using Prisma.

A logged-in user viewing the dashboard on the Vercel frontend makes API calls to insight endpoints.

These endpoints query the Railway database via Prisma and return the aggregated data to the frontend for visualization in cards, tables, and charts.

🛠️ Tech Stack
Framework: Next.js (App Router)

Language: TypeScript

Backend: Next.js API Routes (Serverless Functions)

Frontend: React

Database: MySQL (hosted on Railway)

ORM: Prisma

Authentication: NextAuth.js

UI: Tailwind CSS, Shadcn/ui

Charts: Recharts

Deployment: Vercel (for the application) & Railway (for the database)

🔌 API Endpoints
POST /api/webhooks/shopify: Receives and processes webhook data from Shopify for customers, orders, and products.

GET /api/insights/summary: Returns a JSON object with total customers, orders, and revenue.

GET /api/insights/top-customers: Returns a JSON array of the top 5 customers by total spend.

GET /api/insights/monthly-sales: Returns a JSON array of aggregated monthly sales data for the line chart.

GET, POST /api/auth/[...nextauth]: Handles all user authentication flows (login, session management, logout) via NextAuth.js.

📝 Assumptions & Next Steps
Assumptions Made
Webhook-Only Sync: The service is designed for real-time data ingestion via webhooks. A full production system would require a separate "historical sync" job to import all past data for a newly onboarded store.

Manual User Creation: For this assignment, dashboard users are created manually via a direct SQL query. A production application would have a secure user sign-up and invitation flow.

Simplified Password Handling: For simplicity, passwords are stored as plain text. A production system must hash passwords using a library like bcrypt.

Next Steps to Productionize
Implement Historical Data Sync: Create a batch job that can pull all existing customers, products, and orders from a store upon initial setup.

Robust Error Handling & Retries: Implement a queue (like RabbitMQ or Redis) for webhook ingestion to handle failures and retry processing if the database is temporarily unavailable.

Tenant Onboarding UI: Build a user interface for store owners to connect their Shopify store and onboard themselves.

Password Hashing: Integrate bcrypt to securely hash and verify user passwords.

Advanced Analytics: Add more complex metrics, date-range filtering, and more advanced data visualizations to the dashboard.
