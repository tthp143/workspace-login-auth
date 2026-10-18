# Workspace Login (Next.js + NextAuth v5 + Prisma + GitHub)

ต้องมี Node.js 20.19 ขึ้นไป

## วิธีรันโปรเจกต์
```bash
npm install            # ติดตั้ง dependencies (และสร้าง Prisma client อัตโนมัติ)
cp .env.example .env   # Windows: copy .env.example .env แล้วแก้ค่าในไฟล์
npx auth secret        # สร้าง AUTH_SECRET (หรือใส่เองใน .env)
npm run db:migrate     # สร้างฐานข้อมูล SQLite (dev.db)
npm run db:seed        # สร้างบัญชี ADMIN สำหรับทดสอบ
npm run dev            # เปิด http://localhost:3000
```

## หน้าที่มี
| Path | คำอธิบาย |
|---|---|
| `/` | หน้าแรก แสดงสถานะ login |
| `/login` | Login ด้วย Email/Password หรือ GitHub |
| `/signup` | สมัครสมาชิก (role = USER) |
| `/admin` | เฉพาะ ADMIN (ถ้าไม่ใช่จะไปหน้า `/unauthorized`) |
| `/login-github` | หน้า login ด้วย GitHub อย่างเดียว |

## ตั้งค่า GitHub OAuth App
Settings → Developer settings → OAuth Apps → New OAuth App
- Homepage URL: `http://localhost:3000`
- Callback URL: `http://localhost:3000/api/auth/callback/github`
แล้วนำ Client ID / Secret ไปใส่ใน `.env`

## เทคโนโลยี
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, NextAuth v5 (beta), Prisma 7 + SQLite, bcryptjs

## หมายเหตุด้านความปลอดภัย
- ไฟล์ `.env` และ `dev.db` ไม่ถูก commit (อยู่ใน `.gitignore`)
- ผู้สมัครใหม่เป็น USER เสมอ ส่วน ADMIN สร้างผ่าน `npm run db:seed`
