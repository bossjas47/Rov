# ROV Draft Pro - Competitive Draft System

ระบบดราฟตัวละคร RoV สำหรับการแข่งขันระดับมืออาชีพ พร้อมระบบบันทึกข้อมูลและวิเคราะห์สถิติ

## ฟีเจอร์หลัก

### 1. ระบบดราฟแบบแข่งขันจริง
- รองรับ BO1, BO3, BO5, BO7
- Global Banpick - ตัวละครที่เลือกในเกมก่อนหน้าจะถูกล็อกในเกมถัดไป
- ลำดับการดราฟตามมาตรฐานการแข่งขัน
- นับถอยหลัง 60 วินาทีต่อรอบ

### 2. ระบบ Login/Register
- Email/Password
- Google Sign-in

### 3. ระบบบันทึกข้อมูลการดราฟ (Firebase)
- บันทึกลง Firestore
- เก็บข้อมูลการเลือกและแบนของทุกเกม
- บันทึกผลการแข่งขัน

### 4. Hamburger Menu
- Draft (หน้าหลัก)
- Profile (โปรไฟล์สาธารณะ/ส่วนตัว)
- Analyst (วิเคราะห์สถิติ)
- History (ประวัติการดราฟ)

### 5. ระบบ Analyst
- อัตราชนะรวม
- สถิติตาม BO
- ตัวละครที่เลือก/แบนบ่อยที่สุด
- อัตราชนะตามตัวละคร

## โครงสร้างโปรเจค

```
Rov-New/
├── index.html              # หน้าดราฟหลัก
├── README.md               # ไฟล์นี้
├── css/
│   └── styles.css          # สไตล์ทั้งหมด
├── js/
│   ├── main.js             # โค้ดหลัก
│   ├── data/
│   │   └── heroes.js       # ข้อมูลตัวละคร 127 ตัว
│   ├── components/
│   │   ├── HeroGrid.js     # ตารางตัวละคร
│   │   ├── TeamPanel.js    # แสดงทีม
│   │   └── Toast.js        # แจ้งเตือน
│   ├── utils/
│   │   └── DraftManager.js # จัดการดราฟ
│   ├── services/
│   │   ├── FirebaseService.js  # Firebase
│   │   └── AuthManager.js      # Authentication
│   └── pages/
│       ├── profile.js      # หน้าโปรไฟล์
│       ├── analyst.js      # หน้าวิเคราะห์
│       └── history.js      # หน้าประวัติ
├── pages/
│   ├── profile.html        # หน้าโปรไฟล์
│   ├── analyst.html        # หน้าวิเคราะห์
│   └── history.html        # หน้าประวัติ
└── rovhero/                # โฟลเดอร์รูปภาพตัวละคร (ว่าง)
```

## การติดตั้ง

1. แตกไฟล์ ZIP
2. ใส่รูปภาพตัวละครในโฟลเดอร์ `rovhero/`
3. เปิด `index.html` ในเบราว์เซอร์

## การ Push ขึ้น GitHub

```bash
cd Rov-New
git init
git add .
git commit -m "ROV Draft Pro v2.0"
git branch -M main
git remote add origin https://github.com/bossjas47/Rov.git
git push -u origin main --force
```

## Firebase Config

อยู่ใน `js/services/FirebaseService.js`

## ข้อมูลตัวละคร

127 ตัว - ดูชื่อไฟล์ใน `js/data/heroes.js`

## License

MIT
