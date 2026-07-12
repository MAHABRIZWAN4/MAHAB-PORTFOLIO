# UptimeRobot Setup Guide

## Overview
UptimeRobot is a free uptime monitoring service that will keep your Hugging Face Space backend from going to sleep due to inactivity.

## When to Set This Up
⚠️ **Do this AFTER deploying your backend to Hugging Face Spaces**

## Setup Steps

### 1. Sign Up for UptimeRobot
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Add New Monitor
1. Once logged in, click **"Add New Monitor"** button
2. Fill in the following details:

   **Monitor Type:** `HTTP(s)`
   
   **Friendly Name:** `Mahab Portfolio Backend`
   
   **URL:** `https://your-space-name.hf.space/ping`
   - Replace `your-space-name` with your actual Hugging Face Space name
   - Example: `https://mahab-portfolio-backend.hf.space/ping`
   
   **Monitoring Interval:** `Every 5 minutes` (recommended)
   - Free plan allows checks every 5 minutes
   - This ensures your backend stays awake
   
   **Monitor Timeout:** `30 seconds` (default is fine)

3. Click **"Create Monitor"**

### 3. Verify It's Working
1. After creating the monitor, you'll see it in your dashboard
2. Wait 5 minutes for the first check
3. Status should show as "Up" with a green indicator
4. If it shows "Down", verify:
   - Your Hugging Face Space is deployed and running
   - The `/ping` endpoint exists in your backend (it should already be there)
   - The URL is correct

### 4. Email Alerts (Optional but Recommended)
1. Go to **"My Settings"** in UptimeRobot dashboard
2. Under **"Alert Contacts"**, add your email
3. Configure alert preferences:
   - Get notified when backend goes down
   - Get notified when it comes back up
   - Set alert threshold (e.g., "Alert me when down for 2 minutes")

## What This Does
- **Prevents Sleep:** Hugging Face Spaces go to sleep after 15 minutes of inactivity. UptimeRobot pings your backend every 5 minutes, keeping it awake 24/7.
- **Uptime Monitoring:** You'll know immediately if your backend goes down
- **Free Forever:** The free plan is sufficient for this use case

## Ping Endpoint
The `/ping` endpoint is already implemented in your backend (`backend/app/main.py`). It returns:
```json
{
  "status": "alive",
  "timestamp": "2024-01-15T10:30:00.000000"
}
```

## Cost
**FREE** - UptimeRobot's free plan includes:
- Up to 50 monitors
- 5-minute check intervals
- Email alerts
- 2-month log retention

## Notes
- This is only needed for Hugging Face Spaces deployment
- For other hosting platforms (Vercel, Railway, Render), check if they have built-in keep-alive features
- You can pause the monitor anytime if you want the backend to sleep (to save resources)

## Troubleshooting

### Monitor Shows "Down"
1. Check if your Hugging Face Space is running
2. Visit the `/ping` URL directly in your browser
3. Check Hugging Face Space logs for errors

### Backend Still Going to Sleep
1. Verify monitoring interval is 5 minutes (not longer)
2. Check that the monitor is enabled (not paused)
3. Ensure the URL is correct and includes `/ping` at the end

## Alternative: Hugging Face Spaces Settings
If you have a Hugging Face Pro account, you can also:
1. Go to your Space settings
2. Enable "Always on" (requires Pro subscription)
3. This is more reliable but costs money

For free hosting, UptimeRobot is the best solution.
