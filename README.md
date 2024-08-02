## ShopEase- A Supermarket Management System

It is designed to streamline and enhance a supermarket's management and shopping experience. The system provides comprehensive tools for super admins (owners) and admins (staff) to manage products, track sales, and monitor inventory efficiently. Additionally, it offers a user-friendly interface for customers to browse, purchase, rate, and review products.

### Clone the repo

```bash
git clone https://github.com/shresritik/ShopEase
```

### Setup .env file

Create .env file with the help of .env.example inside backend and optionally frontend

### Setup and Installation

## Method 1

1. Install dependencies by navigating to directories frontend and backend respectively then run

```bash
npm install
```

2. Run the frontend server

```bash
npm run dev
```

3. Database migration inside backend folder

```bash
npm run migrate
```

4. Seed

```bash
npm run seed
```

5. Run the backend server

```bash
npm start
```

## Method 2 (Docker build)

Run script.sh

```bash
chmod +x script.sh
```

```bash
./script.sh
```

For build mode

```bash
./script.sh -b
```

## Resources

[eSewa Guide](https://developer.esewa.com.np/pages/Epay#transactionflow)
[prisma Guide](https://www.prisma.io/docs/orm/overview/databases/postgresql)
