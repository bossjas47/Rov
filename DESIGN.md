# Project Design: ROV Draft Pro

ระบบจำลองการดราฟตัวละครสำหรับการแข่งขันเกม ROV (Arena of Valor) ที่รองรับการทำงานแบบ Real-time และการจัดการข้อมูลผ่าน Firebase

## 🏗️ Architecture Overview (ภาพรวมสถาปัตยกรรม)

โปรเจกต์นี้ถูกออกแบบด้วยโครงสร้าง **Frontend-Driven** ที่เน้นความเรียบง่ายและการตอบสนองที่รวดเร็ว โดยใช้เทคโนโลยีสมัยใหม่ดังนี้:

*   **UI Framework:** [Tailwind CSS](https://tailwindcss.com/) สำหรับการออกแบบที่ยืดหยุ่นและ Responsive
*   **Icons:** [Lucide Icons](https://lucide.dev/) สำหรับสัญลักษณ์ต่างๆ ในระบบ
*   **Backend & Database:** [Firebase](https://firebase.google.com/) (Authentication & Firestore) สำหรับระบบสมาชิกและการบันทึกข้อมูลดราฟ
*   **Data Structure:** ข้อมูลตัวละครถูกจัดเก็บในรูปแบบ JSON Object เพื่อความรวดเร็วในการเข้าถึง

---

## 📁 Directory Structure (โครงสร้างโฟลเดอร์)

```text
.
├── index.html          # หน้าหลักของระบบ (Lobby/Draft Room)
├── DESIGN.md           # เอกสารอธิบายการออกแบบระบบ
├── README.md           # เอกสารแนะนำการใช้งานเบื้องต้น
├── css/                # ไฟล์สไตล์เพิ่มเติม
│   └── styles.css      # การปรับแต่ง UI เฉพาะจุด
├── js/                 # ส่วนประมวลผลหลัก (Logic)
│   ├── components/     # UI Components ที่ใช้ซ้ำ (HeroGrid, TeamPanel, Toast)
│   ├── data/           # ข้อมูลดิบ (heroes.js เก็บข้อมูลตัวละคร 127 ตัว)
│   ├── pages/          # Logic เฉพาะหน้า (profile, history, analyst)
│   ├── services/       # การเชื่อมต่อภายนอก (AuthManager, FirebaseService)
│   ├── utils/          # เครื่องมือช่วยประมวลผล (DraftManager)
│   ├── main.js         # จุดเริ่มต้นของแอปพลิเคชัน
│   └── shared.js       # ฟังก์ชันที่ใช้ร่วมกันทุกหน้า
├── pages/              # หน้าเว็บย่อยอื่นๆ
│   ├── analyst.html    # ระบบวิเคราะห์การดราฟ
│   ├── history.html    # ประวัติการดราฟ
│   └── profile.html    # ข้อมูลส่วนตัวผู้ใช้
└── rovhero/            # คลังรูปภาพตัวละครทั้งหมด (.png)
```

---

## 💎 Key Features Design (การออกแบบฟีเจอร์หลัก)

### 1. Draft System (ระบบดราฟ)
*   **Logic:** ควบคุมโดย `DraftManager.js` ซึ่งจัดการลำดับการ Ban/Pick ตามมาตรฐานการแข่งขัน
*   **Real-time:** ออกแบบมาเพื่อรองรับการซิงค์ข้อมูลผ่าน Firebase (ในเวอร์ชันที่เปิดใช้งาน)
*   **BO System:** รองรับการเลือกรูปแบบการเล่นทั้ง BO1, BO3, และ BO5

### 2. Hero Management (การจัดการตัวละคร)
*   **Data Model:** ตัวละครแต่ละตัวมีคุณสมบัติ `id`, `heroId`, `name`, `thaiName`, `role`, และ `imageFile`
*   **Filtering:** ระบบกรองตัวละครตามตำแหน่ง (Role) เช่น Marksman, Mage, Tank เพื่อความสะดวกในการเลือก

### 3. User Experience (ประสบการณ์ผู้ใช้)
*   **Responsive Design:** รองรับการใช้งานทั้งบน Desktop และ Mobile
*   **Visual Feedback:** มีระบบ Toast Notification สำหรับแจ้งเตือนสถานะต่างๆ และการใช้สี (Blue/Red) เพื่อแยกทีมอย่างชัดเจน

---

## 🛠️ Technical Implementation (การนำไปใช้งานทางเทคนิค)

*   **State Management:** ใช้ JavaScript Object ในการเก็บสถานะการดราฟปัจจุบัน (Current Draft State)
*   **Image Assets:** รูปภาพตัวละครทั้งหมดถูกเก็บไว้ในโฟลเดอร์ `rovhero/` เพื่อให้เรียกใช้งานได้ทันทีโดยไม่ต้องพึ่งพา External URL
*   **Authentication:** ใช้ Firebase Auth สำหรับระบบสมัครสมาชิกและเข้าสู่ระบบผ่าน Email หรือ Google Login

---

## 🚀 Future Roadmap (แผนการพัฒนาในอนาคต)
*   เพิ่มระบบวิเคราะห์สถิติการชนะ (Win Rate Analysis)
*   ระบบแชร์ผลการดราฟไปยัง Social Media
*   การดราฟแบบ Multi-user พร้อมกันในห้องเดียว (Real-time Multiplayer Draft)
