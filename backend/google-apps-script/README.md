# Aegis Academy — Google Apps Script Backend Deployment Guide

This directory contains the production-grade Google Apps Script backend for the **Aegis Academy Corporate Portal & Management Platform**.

## Architecture Overview
- **Backend Runtime**: Google Apps Script (Serverless Web App)
- **Database Engine**: Google Sheets (`AEGIS_ACADEMY_DATABASE` with 10 structured sheets)
- **File Storage**: Google Drive (for applicant resumes and portfolios)
- **Email Engine**: Google Apps Script `MailApp` with branded responsive HTML templates
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS (hosted on Vercel)

---

## 1. Quick Setup (5 Minutes)

### Step 1: Create the Google Spreadsheet
1. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Name it: **`AEGIS_ACADEMY_DATABASE`**.
3. Note the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/`**`<SPREADSHEET_ID>`**`/edit`

### Step 2: Open the Apps Script Editor
1. In your Google Sheet, click **Extensions > Apps Script**.
2. Rename the project to **`Aegis-Academy-Backend`**.

### Step 3: Copy the Script Files
Create the following `.gs` files in the Apps Script editor and copy the corresponding code from this directory:
- `Config.gs`
- `Database.gs`
- `EnrollmentService.gs`
- `ContactService.gs`
- `QuoteService.gs`
- `CareerService.gs`
- `ContentService.gs`
- `AuthService.gs`
- `AdminService.gs`
- `EmailService.gs`
- `SetupDatabase.gs`
- `Code.gs`

### Step 4: Configure Script Properties
1. In the Apps Script editor, click on **Project Settings** (gear icon on the left menu).
2. Scroll to **Script Properties** and click **Add script property**:
   - `SPREADSHEET_ID`: Your Google Sheet ID from Step 1.
   - `ADMIN_SECRET_KEY`: A strong random string (used for signing admin JWT session tokens).
   - `ADMIN_EMAIL`: Your admissions/team notification email (e.g. `admissions@aegisacademy.in`).
   - `DRIVE_RESUMES_FOLDER_ID`: (Optional) ID of a Google Drive folder for resumes. If not set, the script will automatically create a folder named `Aegis_Academy_Resumes`.

### Step 5: Run the Database Initializer
1. In the Apps Script code editor, select `SetupDatabase.gs` from the file list.
2. From the function dropdown at the top, select **`setupSpreadsheetDatabase`**.
3. Click **Run**.
4. Grant the requested Google permissions (Spreadsheet, Drive, Mail).
5. Open your Google Sheet — all 10 sheets (`Enrollments`, `Contact_Messages`, `Quote_Requests`, `Job_Applications`, `Programs`, `Projects`, `Events`, `Admin_Users`, `Platform_Settings`, `Activity_Logs`) are now configured with frozen headers and branding!
6. Default Super Admin credentials created:
   - **Email**: `admin@aegisacademy.in`
   - **Password**: `Aegis@Admin2026!` *(Change this after initial login)*

### Step 6: Deploy as Web App
1. Click **Deploy > New deployment**.
2. Select type: **Web app** (gear icon).
3. Configuration:
   - **Description**: `Aegis Academy Production Backend v2`
   - **Execute as**: `Me (your Google account)`
   - **Who has access**: `Anyone` *(Required for public form submissions from Vercel)*
4. Click **Deploy**.
5. Copy the generated **Web App URL** (format: `https://script.google.com/macros/s/.../exec`).

---

## 2. Connecting to Frontend (Vercel)

1. In your Vercel Project Settings (or in your local `.env` file):
   ```env
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
2. Redeploy the frontend on Vercel.
3. Every submission from the website now writes directly to your Google Sheet in real-time, uploads candidate resumes to Google Drive, sends branded student confirmation emails, and updates the live Admin Dashboard!
