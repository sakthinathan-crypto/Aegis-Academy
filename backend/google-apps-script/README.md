# Aegis Academy — Google Apps Script Backend Deployment Guide

This directory contains the hardened Google Apps Script backend for the **Aegis Academy Corporate Portal & Management Platform**.

## Architecture Overview
- **Backend Runtime**: Google Apps Script (Serverless Web App)
- **Database Engine**: Google Sheets (`AEGIS_ACADEMY_DATABASE` with 10 structured sheets)
- **File Storage**: Google Drive (private-only storage for applicant resumes)
- **Email Engine**: Google Apps Script `MailApp` with HTML-escaped responsive templates
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS (hosted on Vercel)

---

## 1. Quick Setup & Security Configuration

### Step 1: Create the Google Spreadsheet
1. Go to [Google Sheets](https://sheets.new) and create or open your production spreadsheet.
2. Note the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/`**`<SPREADSHEET_ID>`**`/edit`

### Step 2: Copy All Script Files
Open **Extensions > Apps Script** and ensure all `.gs` files from this directory are present and updated:
- `Config.gs`
- `Validation.gs`
- `Database.gs`
- `AuthService.gs`
- `AdminService.gs`
- `EnrollmentService.gs`
- `ContactService.gs`
- `QuoteService.gs`
- `CareerService.gs`
- `ContentService.gs`
- `EmailService.gs`
- `SetupDatabase.gs`
- `Code.gs`

### Step 3: Configure Script Properties
In the Apps Script editor, go to **Project Settings > Script Properties** and configure:
- `SPREADSHEET_ID`: Your Google Sheet ID from Step 1.
- `ADMIN_SECRET_KEY`: A cryptographically random string (**minimum 32 characters**, e.g., 64 hex chars generated via `openssl rand -hex 32`). Used strictly for password key derivation and signing session JWTs.
- `ADMIN_EMAIL`: Your admissions/team notification email (e.g., `admissions@aegisacademy.in`).
- `DRIVE_RESUMES_FOLDER_ID`: *(Recommended)* ID of a dedicated private Google Drive folder (`Restricted` access, no link sharing) for candidate resumes.
- `INITIAL_ADMIN_PASSWORD`: *(Temporary, only needed when initializing an empty `Admin_Users` sheet)* Set a strong initial password (>= 12 characters). `setupSpreadsheetDatabase()` automatically deletes this property after seeding the first Super Admin record.

### Step 4: Initialize Database (Safe & Idempotent)
1. Select `SetupDatabase.gs` and run **`setupSpreadsheetDatabase`**.
2. Grant the requested Google permissions (Spreadsheet, Drive, Mail).
3. Existing records in any sheet are **never** overwritten or deleted.

### Step 5: Deploy as Web App
1. Click **Deploy > New deployment** (or **Manage deployments > Edit > New version** when updating an existing deployment).
2. Select type: **Web app**:
   - **Execute as**: `Me (your Google account)`
   - **Who has access**: `Anyone` *(Required for public form submissions from Vercel)*
3. Copy the Web App URL (`https://script.google.com/macros/s/.../exec`).

---

## 2. Connecting to Frontend (Vercel)

1. In your Vercel Project **Settings > Environment Variables**, configure:
   ```env
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
   *(Never store `ADMIN_SECRET_KEY`, spreadsheet IDs, or passwords in `VITE_*` variables.)*
2. Redeploy the frontend on Vercel so updated security headers (`vercel.json`) and API transport changes take effect.

---

## 3. Secret Rotation Procedure

If `ADMIN_SECRET_KEY` or an administrator password needs rotation:
1. Rotate `ADMIN_SECRET_KEY` in Apps Script **Project Settings > Script Properties** (all existing 6-hour JWT tokens are immediately invalidated).
2. Re-hash affected `Admin_Users` rows using `AuthService.hashPassword(newPassword, AuthService.generateSalt())` because `hashPassword` incorporates `ADMIN_SECRET_KEY` via HMAC-SHA256.
3. Update `SPREADSHEET_ID` / `DRIVE_RESUMES_FOLDER_ID` permissions if compromised and audit `Activity_Logs`.
