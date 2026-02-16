# AVDA - Arya Vysya Doctors Alliance
## Complete Project Export

### Technology Stack
- **Frontend**: React 18 with TailwindCSS
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Authentication**: Emergent-managed Google OAuth
- **UI Components**: Shadcn/UI

### Directory Structure
```
/avda_export/
├── backend/
│   ├── server.py          # Main FastAPI application
│   ├── requirements.txt   # Python dependencies
│   └── .env              # Backend environment variables
├── frontend_src/
│   ├── App.js            # Main React app with routes
│   ├── index.js          # React entry point
│   ├── index.css         # Global styles
│   ├── App.css           # App-specific styles
│   ├── components/
│   │   ├── RegistrationForm.js    # 6-step doctor registration
│   │   ├── LoginPage.js           # Google OAuth login
│   │   ├── AuthCallback.js        # OAuth callback handler
│   │   ├── Dashboard.js           # User dashboard
│   │   ├── MembershipTierSelector.js  # Tier selection
│   │   ├── Footer.js              # Site footer
│   │   └── ui/                    # Shadcn UI components
│   ├── pages/
│   │   ├── PrivacyPolicy.js
│   │   ├── TermsOfUse.js
│   │   ├── RefundPaymentPolicy.js
│   │   ├── DirectoryDataPolicy.js
│   │   ├── ConsentProfileVisibility.js
│   │   └── GrievanceContact.js
│   ├── hooks/
│   │   └── use-toast.js
│   └── lib/
│       └── utils.js
├── database_export/
│   ├── users.json
│   ├── user_sessions.json
│   └── schema_info.txt
├── package.json           # Frontend dependencies
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── craco.config.js        # Create React App config override
└── environment_variables.md
```

### API Endpoints
- POST /api/doctors/register - Doctor registration
- GET /api/doctors - List all doctors
- GET /api/doctors/{id} - Get doctor by ID
- PUT /api/doctors/{id}/status - Update doctor status (admin)
- GET /api/doctors/search - Search doctors
- GET /api/stats - Get statistics
- GET /api/health - Health check

### Database Collections
1. **users** - Registered doctors/users
2. **user_sessions** - OAuth session management

### Membership Tiers
- Basic: ₹100/year
- Premium: ₹500/year (Recommended)
- VIP: ₹1500/year
