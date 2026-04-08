# ROV Draft Pro - Competitive Draft System

ระบบดราฟตัวละคร RoV สำหรับการแข่งขันระดับมืออาชีพ พร้อมระบบบันทึกข้อมูลและวิเคราะห์สถิติ

## ฟีเจอร์หลัก

### 1. ระบบดราฟแบบแข่งขันจริง
- รองรับรูปแบบการแข่งขัน BO1, BO3, BO5, BO7
- ระบบ Global Banpick - ตัวละครที่เลือกในเกมก่อนหน้าจะถูกล็อกในเกมถัดไป
- ลำดับการดราฟตามมาตรฐานการแข่งขัน:
  - Ban Phase 1: First Pick แบน 1 → Second Pick แบน 1 → First Pick แบน 1 → Second Pick แบน 1
  - Pick Phase 1: First Pick เลือก 1 → Second Pick เลือก 2 → First Pick เลือก 2 → Second Pick เลือก 1
  - Ban Phase 2: Second Pick แบน 1 → First Pick แบน 1 → Second Pick แบน 1 → First Pick แบน 1
  - Pick Phase 2: Second Pick เลือก 1 → First Pick เลือก 2 → Second Pick เลือก 2 → First Pick เลือก 1
- นับถอยหลัง 60 วินาทีต่อรอบ

### 2. ระบบ Login/Register
- สมัครสมาชิกด้วย Email/Password
- เข้าสู่ระบบด้วย Google
- จัดการโปรไฟล์ผู้ใช้

### 3. ระบบบันทึกข้อมูลการดราฟ
- บันทึกการดราฟลง Firebase Firestore
- เก็บข้อมูลการเลือกและแบนของทุกเกม
- บันทึกผลการแข่งขัน (ชนะ/แพ้/เสมอ/ฝึกซ้อม)

### 4. โปรไฟล์ผู้ใช้
- ตั้งค่าโปรไฟล์สาธารณะ/ส่วนตัว
- แสดงสถิติการดราฟ
- ดูประวัติการดราฟ

### 5. ระบบวิเคราะห์ (Analytics)
- อัตราชนะรวม
- สถิติตามรูปแบบการแข่งขัน (BO)
- ตัวละครที่เลือกบ่อยที่สุด
- ตัวละครที่แบนบ่อยที่สุด
- อัตราชนะตามตัวละคร

### 6. Hamburger Menu Navigation
- Draft (หน้าหลัก)
- Profile (โปรไฟล์)
- Analyst (วิเคราะห์)
- History (ประวัติการดราฟ)
- Meta Tournament (เร็วๆ นี้)

## โครงสร้างโปรเจค

```
Rov-New/
├── index.html              # หน้าดราฟหลัก
├── css/
│   └── styles.css          # สไตล์ทั้งหมด
├── js/
│   ├── main.js             # ไฟล์หลักสำหรับหน้า index
│   ├── data/
│   │   └── heroes.js       # ข้อมูลตัวละคร 127 ตัว
│   ├── components/
│   │   ├── HeroGrid.js     # คอมโพเนนต์แสดงตารางตัวละคร
│   │   ├── TeamPanel.js    # คอมโพเนนต์แสดงข้อมูลทีม
│   │   └── Toast.js        # คอมโพเนนต์แจ้งเตือน
│   ├── utils/
│   │   └── DraftManager.js # จัดการระบบดราฟ
│   ├── services/
│   │   ├── FirebaseService.js  # จัดการ Firebase
│   │   └── AuthManager.js      # จัดการ Authentication
│   └── pages/
│       ├── profile.js      # หน้าโปรไฟล์
│       ├── analyst.js      # หน้าวิเคราะห์
│       └── history.js      # หน้าประวัติ
├── pages/
│   ├── profile.html        # หน้าโปรไฟล์
│   ├── analyst.html        # หน้าวิเคราะห์
│   └── history.html        # หน้าประวัติ
└── rovhero/                # โฟลเดอร์รูปภาพตัวละคร
```

## การติดตั้ง

1. Clone repository:
```bash
git clone https://github.com/bossjas47/Rov.git
```

2. เปิดไฟล์ `index.html` ในเบราว์เซอร์

3. สำหรับการพัฒนา แนะนำให้ใช้ Live Server

## Firebase Configuration

โปรเจคนี้ใช้ Firebase สำหรับ:
- Authentication (Email/Password, Google)
- Firestore Database (บันทึกข้อมูลการดราฟ)

การตั้งค่า Firebase อยู่ในไฟล์ `js/services/FirebaseService.js`

## ข้อมูลตัวละคร

ระบบรองรับตัวละคร RoV ทั้งหมด 127 ตัว พร้อมข้อมูล:
- ชื่อภาษาอังกฤษ
- ชื่อภาษาไทย
- บทบาท (Tank, Fighter, Assassin, Mage, Marksman, Support)
- รูปภาพ

## การใช้งาน

1. เข้าสู่ระบบหรือสมัครสมาชิก
2. เลือกรูปแบบการแข่งขัน (BO1-BO7)
3. เริ่มดราฟตามลำดับที่กำหนด
4. เมื่อจบการดราฟ บันทึกข้อมูลลงระบบ
5. ดูสถิติและวิเคราะห์ผลการดราฟได้ที่หน้า Analyst

## License

MIT License
