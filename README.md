# 🚗 Auto.DE – Full‑Stack Fahrzeuganzeigen‑Plattform  
**Next.js 14 (App Router) · Express · MongoDB Atlas · NextAuth**

Auto.DE ist eine vollständige Plattform zur Verwaltung von Fahrzeuganzeigen.  
Das Projekt besteht aus:

- Benutzer‑Frontend (Next.js)
- Admin‑Panel (mit Rollen & Berechtigungen)
- Backend‑API (Express)
- Cloud‑Datenbank (MongoDB Atlas)
- Google‑Login (NextAuth)
- Rollenverwaltung (User / Admin / Moderator)
- Verwaltung von Anzeigen, Nachrichten, Einstellungen und Statistiken

---

## 📌 Inhaltsverzeichnis
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Projektstruktur](#-projektstruktur)
- [Umgebungsvariablen](#-umgebungsvariablen)
- [Lokale Entwicklung](#-lokale-entwicklung)
- [Aktueller Stand](#-aktueller-stand)
- [Nächste Schritte](#-nächste-schritte)

---

## 🚀 Features

### 🔐 Authentifizierung
- Login über Google OAuth
- Automatisches Syncen des Users nach jedem Login
- Speichern von Rolle & User‑ID im JWT/Session
- Automatische Hochstufung der Admin‑E‑Mail zu **admin**

### 🗄 Datenbank – MongoDB Atlas
- Vollständige Verbindung zu Atlas (Free Tier)
- Kostenloser M0‑Cluster
- Automatisch generierter Datenbank‑User
- Backend ist vollständig mit Atlas verbunden

### 🧩 Backend (Express)
**Modelle:**
- User  
- CarListing  
- ContactMessage  
- SiteSettings  
- ActivityLog  

**Öffentliche API:**
- `GET /api/cars` → nur aktive Anzeigen  
- `GET /api/cars/:id` → nur aktive Anzeigen + View‑Counter  

**Admin‑API (geschützt durch INTERNAL_API_SECRET):**
- Benutzerverwaltung  
- Anzeigenverwaltung (Approve / Reject / Delete)  
- Nachrichtenverwaltung  
- Seiteneinstellungen  
- Dashboard‑Statistiken (Aggregation)  

### 🖥 Frontend (Next.js 14)
- App Router Struktur
- Vollständiges Admin‑Panel:
  - Dashboard (KPIs + Charts)
  - Users
  - Listings
  - Messages
  - Settings
- Middleware‑Schutz für `/admin/**`
- BFF‑Layer für sichere Kommunikation mit dem Backend
- Contact‑Form speichert zusätzlich eine ContactMessage in MongoDB

---

## 🧱 Tech Stack

### Frontend
- Next.js 14  
- TypeScript  
- NextAuth  
- TailwindCSS  
- shadcn/ui  
- Axios  

### Backend
- Node.js + Express  
- MongoDB Atlas  
- Mongoose  

---

## 🏗 Projektstruktur


Managed by : Amirhossein Akbari