# Deployment Guide: Backend on Render, Frontend on Vercel

## ✅ Configuration Complete

Your Django backend is now configured to use PostgreSQL with environment variables. The database configuration will work for both local development and Render deployment.

---

## 🚀 Backend Deployment on Render

### Step 1: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **PostgreSQL**
3. Fill in:
   - **Name**: `clms-database` (or any name)
   - **Database**: `clms` (or your preferred name)
   - **User**: Leave default or customize
   - **Region**: Choose closest to your users
4. Click **Create Database**
5. **Save the connection details** shown (you'll need them in Step 3)

### Step 2: Deploy Backend Web Service

1. In Render Dashboard, click **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `clms-backend` (or any name)
   - **Region**: Same as database
   - **Branch**: `main` (or your main branch)
   - **Root Directory**: `backend` (if your backend is in a subfolder)
   - **Runtime**: `Python 3`
   - **Build Command**: 
     ```
     pip install -r requirements.txt
     ```
   - **Start Command**:
     ```
     gunicorn backend_project.wsgi:application --bind 0.0.0.0:$PORT
     ```

### Step 3: Set Environment Variables on Render

In your Render Web Service dashboard, go to **Environment** tab and add:

```
DB_ENGINE=django.db.backends.postgresql
DB_NAME=<your-database-name>
DB_USER=<your-database-user>
DB_PASSWORD=<your-database-password>
DB_HOST=<your-database-host>
DB_PORT=5432
DJANGO_SECRET_KEY=<generate-a-secure-secret-key>
DEBUG=False
ALLOWED_HOSTS=<your-backend-url.onrender.com>
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
CORS_ALLOW_ALL_ORIGINS=False
```

**Important**: 
- Replace `<your-database-*>` with values from Step 1
- Generate a secure `DJANGO_SECRET_KEY` (you can use: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`)
- Replace `<your-backend-url.onrender.com>` with your actual Render backend URL
- Replace `<your-frontend.vercel.app>` with your Vercel frontend URL (you'll update this after deploying frontend)

### Step 4: Run Migrations

After deployment, in Render dashboard:
1. Go to your Web Service
2. Click **Shell** tab
3. Run:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser  # Optional: create admin user
   ```

### Step 5: Get Your Backend URL

After deployment completes, Render will give you a URL like:
```
https://clms-backend.onrender.com
```
**Save this URL** - you'll need it for frontend deployment.

---

## 🎨 Frontend Deployment on Vercel

### Step 1: Deploy Frontend

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Select your framework (Next.js, React, etc.)
   - **Root Directory**: `./` (or your frontend folder if separate)
   - **Build Command**: (usually auto-detected)
   - **Output Directory**: (usually auto-detected)

### Step 2: Set Environment Variables on Vercel

In Vercel project settings → **Environment Variables**, add:

```
NEXT_PUBLIC_DJANGO_API_URL=https://your-backend.onrender.com
```

Replace `https://your-backend.onrender.com` with your actual Render backend URL from Step 5 above.

### Step 3: Update Backend CORS Settings

After you get your Vercel frontend URL (e.g., `https://your-app.vercel.app`):

1. Go back to Render dashboard → Your Web Service → **Environment** tab
2. Update `CORS_ALLOWED_ORIGINS`:
   ```
   CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
   ```
3. **Redeploy** your backend service

---

## 🔧 Local Development

Your `.env` file is already configured for local development. Just make sure:

1. PostgreSQL is running locally
2. Database `clms` exists (create it if needed)
3. Run migrations:
   ```bash
   python manage.py migrate
   ```

---

## 📝 Quick Checklist

- [ ] PostgreSQL database created on Render
- [ ] Backend deployed on Render with all environment variables set
- [ ] Migrations run on Render database
- [ ] Frontend deployed on Vercel with `NEXT_PUBLIC_DJANGO_API_URL` set
- [ ] Backend CORS updated with Vercel frontend URL
- [ ] Test API calls from frontend to backend

---

## 🐛 Troubleshooting

### Backend won't start on Render
- Check **Logs** tab in Render dashboard
- Verify all environment variables are set correctly
- Ensure `gunicorn` is in `requirements.txt` ✅ (already included)

### CORS errors
- Make sure `CORS_ALLOWED_ORIGINS` includes your exact Vercel URL (with `https://`)
- Check that `corsheaders` is in `INSTALLED_APPS` ✅ (already added)
- Verify `CorsMiddleware` is first in `MIDDLEWARE` ✅ (already configured)

### Database connection errors
- Verify database credentials match exactly
- Check that database is in same region as web service
- Ensure database is not paused (free tier pauses after inactivity)

---

## 🎉 You're Done!

Your backend will be accessible at: `https://your-backend.onrender.com`
Your frontend will be accessible at: `https://your-app.vercel.app`

Both are now connected and ready to use!
