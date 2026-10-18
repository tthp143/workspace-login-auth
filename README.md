# Workspace Login Auth

เว็บแอปพลิเคชันตัวอย่างสำหรับสาธิตระบบเข้าสู่ระบบและจัดการสิทธิ์ผู้ใช้งาน พัฒนาด้วย **Next.js, NextAuth.js v5, Prisma และ SQLite** รองรับการเข้าสู่ระบบด้วยอีเมล/รหัสผ่านและ GitHub OAuth รวมถึงการสมัครสมาชิกและหน้าสำหรับผู้ดูแลระบบ

## คุณสมบัติหลัก

- เข้าสู่ระบบด้วย Email และ Password
- เข้าสู่ระบบด้วยบัญชี GitHub (ต้องตั้งค่า GitHub OAuth ก่อน)
- สมัครสมาชิกใหม่ โดยบัญชีที่สมัครจะได้รับบทบาท `USER`
- จำกัดหน้า Admin ให้เข้าได้เฉพาะผู้ใช้ที่มีบทบาท `ADMIN`
- จัดเก็บบัญชีผู้ใช้ใน SQLite ผ่าน Prisma ORM
- เข้ารหัสรหัสผ่านก่อนบันทึกลงฐานข้อมูลด้วย bcryptjs
- ใช้ session แบบ JWT ผ่าน NextAuth.js

## เทคโนโลยีที่ใช้

- Next.js 16 (App Router)
- React 19 และ TypeScript
- NextAuth.js v5
- Prisma ORM 7
- SQLite
- Tailwind CSS 4
- bcryptjs

## สิ่งที่ต้องติดตั้งก่อน

- [Node.js](https://nodejs.org/) **เวอร์ชัน 20.19 ขึ้นไป**
- npm (ติดตั้งมาพร้อม Node.js)
- [Git](https://git-scm.com/)

ตรวจสอบเวอร์ชันผ่าน Terminal หรือ Command Prompt:

```bash
node -v
npm -v
git --version
```

## วิธีติดตั้งและรันโปรเจกต์

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/tthp143/workspace-login-auth.git
cd workspace-login-auth
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

คำสั่งนี้ติดตั้งแพ็กเกจที่จำเป็น และสร้าง Prisma Client ตามสคริปต์ `postinstall` ของโปรเจกต์

### 3. สร้างไฟล์ Environment

คัดลอกไฟล์ตัวอย่าง `.env.example` เป็น `.env`

**Windows (Command Prompt):**
```bat
copy .env.example .env
```

**macOS / Linux:**
```bash
cp .env.example .env
```

เปิดไฟล์ `.env` แล้วตรวจสอบค่าต่อไปนี้:

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="ใส่ค่า secret ที่สร้างขึ้น"
AUTH_GITHUB_ID="ใส่ GitHub OAuth Client ID"
AUTH_GITHUB_SECRET="ใส่ GitHub OAuth Client Secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="ตั้งรหัสผ่านผู้ดูแลระบบที่ปลอดภัย"
```

สร้างค่า `AUTH_SECRET` ด้วยคำสั่ง:

```bash
npx auth secret
```

นำค่าที่ได้ไปใส่ใน `.env` เป็น `AUTH_SECRET` หากยังไม่ต้องการใช้การเข้าสู่ระบบด้วย GitHub ให้ข้ามการตั้งค่า OAuth ได้ แต่ควรตั้งค่า `AUTH_SECRET` และค่าฐานข้อมูลให้เรียบร้อย

> **ความปลอดภัย:** ห้าม commit หรือเผยแพร่ไฟล์ `.env` และห้ามใช้รหัสผ่านตัวอย่างในระบบจริง

### 4. (ทางเลือก) ตั้งค่า GitHub OAuth

หากต้องการเข้าสู่ระบบด้วย GitHub:

1. เปิด GitHub แล้วไปที่ **Settings → Developer settings → OAuth Apps**
2. เลือก **New OAuth App**
3. กำหนดค่าแอปสำหรับการพัฒนาในเครื่องดังนี้
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. สร้าง OAuth App แล้วนำ **Client ID** และ **Client Secret** มาใส่ใน `AUTH_GITHUB_ID` และ `AUTH_GITHUB_SECRET` ในไฟล์ `.env`
5. บันทึกไฟล์ก่อนเริ่มเซิร์ฟเวอร์ใหม่

อย่าแชร์ Client Secret ต่อสาธารณะ หากเปลี่ยน URL หรือ Deploy ไปยังเซิร์ฟเวอร์อื่น ต้องปรับ URL ของ OAuth App ให้ตรงกับโดเมนและ callback URL นั้นด้วย

### 5. เตรียมฐานข้อมูล

รันคำสั่ง:

```bash
npm run db:migrate
```

คำสั่งนี้ใช้ Prisma Migrate เพื่อใช้ migration ที่อยู่ในโปรเจกต์กับฐานข้อมูล SQLite

### 6. สร้างบัญชี Admin สำหรับทดสอบ

```bash
npm run db:seed
```

คำสั่งนี้สร้างบัญชีผู้ดูแลระบบตามค่า `ADMIN_EMAIL` และ `ADMIN_PASSWORD` ในไฟล์ `.env` หากไม่ได้กำหนดค่าดังกล่าว สคริปต์จะใช้ค่าเริ่มต้น `admin@example.com` และ `admin1234`

**แนะนำให้กำหนดอีเมลและรหัสผ่านของตนเองในไฟล์ `.env` ก่อนรัน seed** และอย่าใช้รหัสผ่านเริ่มต้นในระบบที่เปิดให้บุคคลอื่นเข้าถึง

### 7. เริ่มเซิร์ฟเวอร์

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

หยุดเซิร์ฟเวอร์ได้ด้วย `Ctrl + C` ใน Terminal

## วิธีใช้งานแต่ละหน้า

| หน้า | URL | วิธีใช้งาน |
| --- | --- | --- |
| หน้าแรก | `/` | แสดงสถานะการเข้าสู่ระบบ หากยังไม่ Login จะแสดงลิงก์ Login และ Sign Up หาก Login แล้วจะแสดงชื่อ/อีเมล บทบาทผู้ใช้ ลิงก์ Admin และปุ่ม Logout |
| เข้าสู่ระบบ | `/login` | กรอก Email และ Password แล้วกด Login หรือเลือกเข้าสู่ระบบด้วย GitHub หลังตั้งค่า OAuth |
| สมัครสมาชิก | `/signup` | กรอกชื่อ อีเมล รหัสผ่าน และยืนยันรหัสผ่าน จากนั้นกดสร้างบัญชี รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร |
| ผู้ดูแลระบบ | `/admin` | หน้าสำหรับบทบาท `ADMIN` เท่านั้น ผู้ใช้ทั่วไปจะถูกส่งไปหน้า `/unauthorized` และผู้ที่ยังไม่ Login จะถูกส่งไปหน้า Login |
| เข้าสู่ระบบด้วย GitHub | `/login-github` | หน้าสำหรับเริ่มเข้าสู่ระบบผ่าน GitHub โดยตรง ต้องตั้งค่า OAuth ให้ถูกต้องก่อน |

### ทดลองใช้งานตามลำดับ

1. เปิด `http://localhost:3000`
2. เลือก **Sign Up** เพื่อสร้างบัญชีผู้ใช้ทั่วไป
3. กลับไปหน้า **Login** แล้วเข้าสู่ระบบด้วยบัญชีที่สมัครไว้
4. สังเกตว่าหน้าแรกแสดงชื่อหรืออีเมลและบทบาท `USER`
5. ทดลองเปิด `http://localhost:3000/admin` บัญชีทั่วไปไม่ควรเข้าถึงหน้า Admin ได้
6. Logout แล้วเข้าสู่ระบบด้วยบัญชี Admin ที่สร้างจาก `npm run db:seed`
7. เปิดหน้า `/admin` อีกครั้งเพื่อทดสอบการจำกัดสิทธิ์ Admin
8. หากตั้งค่า GitHub OAuth แล้ว ให้ทดลองปุ่ม GitHub ในหน้า Login ด้วย

## บทบาทผู้ใช้งาน

| Role | สิทธิ์ |
| --- | --- |
| `USER` | บัญชีที่สมัครผ่านหน้า Sign Up และผู้ใช้ GitHub ที่ยังไม่ได้กำหนดบทบาทอื่น |
| `STAFF` | มี enum บทบาทในฐานข้อมูล แต่สิทธิ์เฉพาะของ STAFF ยังไม่ได้แสดงในหน้า Admin ปัจจุบัน |
| `ADMIN` | เข้าใช้งานหน้า `/admin` ได้ |

การสมัครสมาชิกจากหน้าเว็บจะกำหนดบทบาทเป็น `USER` ไม่ใช่ `ADMIN` บัญชี Admin สำหรับทดสอบสร้างด้วยคำสั่ง seed เท่านั้น

## โครงสร้างไฟล์สำคัญ

```text
workspace-login-auth/
├── app/
│   ├── admin/page.tsx          # หน้า Admin และตรวจสอบ role
│   ├── login/page.tsx          # เข้าสู่ระบบด้วยอีเมล/รหัสผ่าน หรือ GitHub
│   ├── login-github/page.tsx   # หน้าเข้าสู่ระบบด้วย GitHub
│   ├── signup/page.tsx         # แบบฟอร์มสมัครสมาชิก
│   ├── signup/actions.ts       # การทำงานของฟอร์มสมัครสมาชิก
│   ├── auth.ts                 # ตั้งค่า NextAuth และ providers
│   └── lib/prisma.ts           # การเชื่อมต่อ Prisma
├── prisma/
│   ├── migrations/             # Migration ของฐานข้อมูล
│   ├── schema.prisma           # โครงสร้างข้อมูล User และ Role
│   └── seed.ts                 # สร้างบัญชี Admin
├── .env.example                # ตัวอย่างค่าตั้งต้นของ Environment
├── prisma.config.ts            # การตั้งค่า Prisma
├── package.json                # Dependencies และ scripts
└── README.md
```

## คำสั่งที่ใช้บ่อย

| คำสั่ง | รายละเอียด |
| --- | --- |
| `npm install` | ติดตั้ง Dependencies |
| `npm run dev` | เปิดเซิร์ฟเวอร์สำหรับพัฒนา |
| `npm run build` | Build โปรเจกต์ |
| `npm run start` | เปิดเซิร์ฟเวอร์จาก Build |
| `npm run lint` | ตรวจสอบโค้ดด้วย ESLint |
| `npm run db:migrate` | ใช้ Prisma migrations กับฐานข้อมูล |
| `npm run db:seed` | สร้างบัญชี Admin สำหรับทดสอบ |
| `npx auth secret` | สร้างค่า AUTH_SECRET |

## การแก้ปัญหาเบื้องต้น

- **ติดตั้งแพ็กเกจไม่สำเร็จ:** ตรวจสอบว่า Node.js เป็นเวอร์ชัน 20.19 ขึ้นไป แล้วลอง `npm install` อีกครั้ง
- **Prisma แจ้งปัญหาเกี่ยวกับ Client:** ลองรัน `npx prisma generate`
- **ไม่พบฐานข้อมูลหรือ migration:** ตรวจสอบ `DATABASE_URL` ใน `.env` แล้วรัน `npm run db:migrate`
- **Login ด้วย Email ไม่ผ่าน:** ตรวจสอบอีเมล/รหัสผ่าน และลองรัน `npm run db:seed` เพื่อสร้างหรือยืนยันบัญชี Admin
- **GitHub Login ใช้ไม่ได้:** ตรวจสอบ Client ID, Client Secret และ callback URL `http://localhost:3000/api/auth/callback/github`
- **เข้าหน้า Admin ไม่ได้:** ตรวจสอบว่าบัญชีที่ Login มี role เป็น `ADMIN` ไม่ใช่ `USER`

## Repository

https://github.com/tthp143/workspace-login-auth
