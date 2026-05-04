# EmailJS Setup Guide for Kuber.cab

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)
3. Verify your email address

### Step 2: Add Email Service
1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or any email provider
4. Connect your email account (info.kubercab@gmail.com)
5. Copy the **Service ID** (e.g., `service_kubercab`)

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```html
Subject: 🚗 New Kuber.cab Rental Booking Request

Hello Kuber.cab Team,

A new rental booking request has been received:

📍 TRIP DETAILS:
• Pickup: {{pickup_address}}
• Drop-off: {{dropoff_address}}
• Start Date: {{start_date}}
• Duration: {{duration}} day(s)
• Booking Time: {{booking_time}}

🚙 VEHICLE DETAILS:
• Type: {{vehicle_type}}
• Category: {{vehicle_category}}
• Model: {{vehicle_model}}
• Price: {{vehicle_price}}

👤 CUSTOMER DETAILS:
• Age: 21+ years confirmed
• License Number: {{license_number}}
• Aadhar Number: {{aadhar_number}}

📎 DOCUMENTS:
{{#if license_image}}
• Driving License: [Image attached]
{{/if}}
{{#if aadhar_image}}
• Aadhar Card: [Image attached]
{{/if}}

Please process this booking request and contact the customer.

Best regards,
Kuber.cab Booking System
```

4. Save and copy the **Template ID** (e.g., `template_booking`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

### Step 5: Update Code
Replace these values in `RentalBookingPage.tsx`:

```javascript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

## 🎯 Features Added

### ✅ Email Integration:
- **Automatic email** sent to info.kubercab@gmail.com
- **Document attachments** (license & Aadhar as base64)
- **Complete booking details** in professional format
- **Timestamp** with Indian timezone

### ✅ Enhanced WhatsApp:
- **Email confirmation** mentioned in WhatsApp message
- **Booking timestamp** included
- **Document reference** for uploaded files
- **Professional formatting**

### ✅ User Experience:
- **Toast notifications** for email status
- **Loading states** during email sending
- **Error handling** for failed emails
- **Success confirmation** for both email and WhatsApp

## 📧 Email Template Features

The email will include:
- **Complete trip details**
- **Vehicle information**
- **Customer verification status**
- **Uploaded documents as attachments**
- **Professional formatting**
- **Timestamp with Indian timezone**

## 🔒 Security & Privacy

- **Base64 encoding** for secure file transmission
- **No file storage** on external servers
- **Direct email delivery** to business email
- **GDPR compliant** with EmailJS

## 💰 Cost

- **100 emails/month FREE**
- **$15/month** for 1000 emails
- **Perfect for small to medium businesses**

## 🛠️ Testing

1. Fill out the booking form
2. Upload test documents
3. Submit the form
4. Check your email for the booking details
5. Verify WhatsApp message includes email reference

## 📞 Support

If you need help setting up EmailJS:
- EmailJS Documentation: https://www.emailjs.com/docs/
- Support: support@emailjs.com