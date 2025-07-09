# 📄 Gestion_electronique_de_documents
# 📄 Document Management System

A full-stack web application for organizing, uploading, and managing PDF documents with category-based classification.

## 🚀 Features

### 🔧 Backend (NestJS + Prisma)
- REST API for managing:
  - Categories & Subcategories
  - PDF Documents
- File upload handling
- Document deletion (single/multiple)
- Document count by subcategory
- PDF merging (optional with `pdf-merger-js`)
- Static file serving

### 💻 Frontend (React + Tailwind CSS)
- Dynamic document tree navigation
- PDF upload using FilePond
- PDF preview with `iframe`
- Select & batch actions (delete, download, etc.)
- Document filtering by subcategory
- Responsive UI with action buttons

---

## 🧱 Tech Stack

| Layer     | Technology                     |
|-----------|--------------------------------|
| Frontend  | React, TypeScript, Tailwind    |
| Backend   | NestJS, Prisma ORM, PostgreSQL |
| File Upload | Multer                        |
| Viewer    | HTML `iframe` + Lucide Icons   |

---

## ⚙️ Getting Started

### 🖥️ Frontend

```bash
cd frontend
npm install
npm run dev
```
### 🖥️ backend

```bash
cd backend
npm install
npm run start:dev
