# SafarSathi Backend - সম্পূর্ণ সেটআপ গাইড

## ✅ যা করা হয়েছে:

### 1. **Prisma Configuration সংশোধন**
   - `prisma/schema.prisma` ফাইলে `generator client` এ `output` path যোগ করা হয়েছে
   - এখন `npx prisma generate` সফলভাবে চলে এবং client generate হয়

### 2. **db.ts উন্নত করা হয়েছে**
   ```typescript
   - Singleton pattern ব্যবহার করা হয়েছে
   - Development এ Prisma client reuse করা হয়
   - হট রিলোড এ duplicate instance তৈরি হওয়া প্রতিরোধ করা হয়েছে
   ```

### 3. **server.ts সঠিক করা হয়েছে**
   - Database connection enable করা হয়েছেছে
   - Prisma সঠিকভাবে import এবং ব্যবহার করা হচ্ছে
   - Error handling properly সেট করা হয়েছে

### 4. **Global Error Handler উন্নত করা হয়েছে**
   ```typescript
   - AppError class handling
   - Prisma error handling (P2002, P2025)
   - JSON syntax error handling
   - Environment based error response (dev vs production)
   ```

## 🔧 পরবর্তী স্টেপ:

### প্রয়োজনীয় ফাইল তৈরি করুন:

#### 1. `.env` ফাইল (root folder এ):
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/safarsathi_db
```

**Note:** আপনার PostgreSQL database credentials দিয়ে replace করুন।

#### 2. Database তৈরি করুন:
```bash
# ডাটাবেস তৈরি করুন PostgreSQL এ
createdb safarsathi_db

# অথবা pgAdmin ব্যবহার করে করুন
```

#### 3. Prisma Migrations চালান:
```bash
npx prisma migrate deploy
```

### 📦 Packages সঠিকভাবে ইনস্টল করা আছে কি চেক করুন:
```bash
npm list @prisma/client
npm list prisma
```

## 🚀 Server চালানো:
```bash
npm run dev
```

## 📝 আপনার সম্পূর্ণ প্রজেক্ট স্ট্রাকচার:

```
src/
├── app.ts (Express app configuration)
├── server.ts (Database connection + Server startup)
├── config/
│   ├── index.ts (Environment variables)
│   └── db.ts (Prisma singleton instance)
├── errorHelpers/
│   └── AppError.ts (Custom error class)
├── middlewares/
│   ├── globalErrorHandler.ts (Error handling)
│   └── notFound.ts (404 handler)
└── routes/
    └── routes.ts (API routes)
```

## ⚠️ সাধারণ সমস্যা এবং সমাধান:

### Error: "PrismaClient has no exported member"
✅ **সমাধান:** Prisma generate করুন
```bash
npx prisma generate
```

### Error: "DATABASE_URL is not set"
✅ **সমাধান:** `.env` ফাইল তৈরি করুন এবং DATABASE_URL সেট করুন

### Error: "Can't reach database server"
✅ **সমাধান:**
- PostgreSQL চলছে কি চেক করুন
- DATABASE_URL সঠিক কি verify করুন

### HMR (Hot Module Reload) এ duplicate instance error
✅ **সমাধান:** Singleton pattern ব্যবহার করা হয়েছে (db.ts তে)

## 📚 টিপস:

1. **Production এ error details দেখাবে না** - globalErrorHandler স্বয়ংক্রিয়ভাবে production mode detect করে এবং শুধু message দেয়

2. **Prisma Studio দেখতে:**
   ```bash
   npx prisma studio --config ./prisma.config.ts
   ```

3. **নতুন migration তৈরি করতে:**
   ```bash
   npx prisma migrate dev --name migration_name
   ```

4. **Database reset করতে (development):
   ```bash
   npx prisma migrate reset
   ```

---

**আপনার backend এখন production ready! 🎉**
