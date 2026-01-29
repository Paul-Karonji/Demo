# Hospital Management System - Browser Demo

A fully functional, browser-based Hospital Management System demo that runs entirely client-side with no backend required.

## 🌟 Features

### ✅ **Complete HMS Functionality**
- **Patient Management** - Registration, records, search, and queue management
- **Pharmacy** - Drug inventory, FEFO batch management, prescription dispensing
- **Laboratory** - Test catalog, sample tracking, results entry
- **Billing** - Invoice generation, payment processing, receipts
- **Reports & Analytics** - Dashboard metrics, charts, and data visualization

### 🎨 **Modern Design**
- Premium indigo/purple gradient color scheme
- Glassmorphism effects and smooth animations
- Fully responsive (desktop, tablet, mobile)
- Professional healthcare aesthetic

### 🔐 **Role-Based Access Control**
- 6 user roles with specific permissions
- Secure authentication system
- Role-specific dashboards

### 💾 **Client-Side Data Storage**
- Uses localStorage for data persistence
- Pre-populated with realistic demo data
- 50+ patients, 100+ drugs, 30+ lab tests

## 🚀 Quick Start

### Option 1: Local File System
1. Download or clone this repository
2. Open `index.html` in a modern web browser
3. Use demo credentials to login (shown on login page)

### Option 2: Live Server (Recommended)
1. Install a local server (e.g., Live Server for VS Code)
2. Serve the project directory
3. Navigate to `http://localhost:5500` (or your server's port)

### Option 3: GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Access via `https://yourusername.github.io/hms-demo/`

## 👥 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Administrator | `admin` | `admin123` |
| Doctor | `doctor` | `doctor123` |
| Nurse | `nurse` | `nurse123` |
| Pharmacist | `pharmacist` | `pharma123` |
| Lab Technician | `lab` | `lab123` |
| Receptionist | `reception` | `reception123` |

## 📁 Project Structure

```
HMS-Demo/
├── index.html                 # Login page
├── dashboard.html             # Main dashboard
├── patients/
│   ├── list.html             # Patient list
│   ├── register.html         # Patient registration
│   ├── details.html          # Patient details
│   └── queue.html            # Queue management
├── pharmacy/
│   ├── inventory.html        # Drug inventory
│   ├── prescriptions.html    # Prescription management
│   └── dispense.html         # Dispensation workflow
├── laboratory/
│   ├── tests.html            # Lab test catalog
│   ├── requests.html         # Lab requests
│   └── results.html          # Results entry
├── billing/
│   ├── invoices.html         # Invoice management
│   └── payments.html         # Payment processing
├── reports/
│   └── analytics.html        # Reports & analytics
└── assets/
    ├── css/                  # Stylesheets
    ├── js/                   # JavaScript modules
    └── images/               # Images and icons
```

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript (ES6+)** - All functionality
- **localStorage API** - Data persistence
- **Chart.js** - Data visualization

### Why No Framework?
- ✅ Zero dependencies - Works anywhere
- ✅ No build process required
- ✅ Fast loading times
- ✅ Easy to understand and modify
- ✅ Perfect for demos and prototypes

## 🎯 Key Features Explained

### Patient Management
- **Registration**: Multi-step form with validation
- **Search & Filter**: Real-time search by name, UPID, phone
- **Queue System**: Department-based queue with priority levels
- **Medical Records**: Complete patient history and vitals

### Pharmacy Module
- **FEFO Logic**: First Expiry First Out batch selection
- **Inventory Management**: Stock levels, expiry alerts
- **Prescription Workflow**: Doctor → Pharmacist → Dispensation
- **Auto-Billing**: Automatic bill generation on dispensation

### Laboratory Module
- **Test Catalog**: 15+ common lab tests
- **Sample Tracking**: Collection to results workflow
- **Results Entry**: Parameter validation and abnormal flagging
- **Turnaround Time**: Estimated completion times

### Billing System
- **Auto-Generation**: Bills created from consultations, pharmacy, lab
- **Multiple Payment Methods**: Cash, M-Pesa, Card, Insurance
- **Partial Payments**: Support for installment payments
- **Receipt Generation**: Printable receipts

### Analytics Dashboard
- **Real-Time Metrics**: Patient count, queue status, pending bills
- **Charts**: Patient visits trend, revenue by category
- **Recent Activity**: Live feed of system activities

## 🔧 Customization

### Changing Colors
Edit `assets/css/variables.css`:
```css
--primary-500: #6366F1;  /* Change to your brand color */
--gradient-primary: linear-gradient(135deg, #YourColor1 0%, #YourColor2 100%);
```

### Adding New Users
Edit `assets/js/data/generator.js` in the `generateUsers()` method.

### Modifying Demo Data
Adjust counts in `assets/js/data/generator.js`:
```javascript
this.generatePatients(50);  // Change number of patients
this.generateDrugs();       // Modify drug list
```

## 📊 Data Model

### localStorage Collections
- `hms_users` - System users
- `hms_patients` - Patient records
- `hms_visits` - Consultations
- `hms_queue` - Current queue
- `hms_drugs` - Drug catalog
- `hms_drug_batches` - Inventory batches
- `hms_prescriptions` - Prescriptions
- `hms_lab_tests` - Test catalog
- `hms_lab_requests` - Lab requests
- `hms_bills` - Invoices
- `hms_payments` - Payment records

### Storage Limits
- localStorage typically allows 5-10MB
- Current demo uses ~2-3MB
- Can handle 100+ patients comfortably

## 🔄 Resetting Demo Data

Open browser console and run:
```javascript
demoData.reset();
```

Or clear all data:
```javascript
storage.clearAll();
```

Then refresh the page to regenerate demo data.

## 🌐 Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Note**: Requires a modern browser with ES6+ support and localStorage.

## 📱 Mobile Support

Fully responsive design with:
- Collapsible sidebar navigation
- Touch-friendly buttons and inputs
- Optimized table views for small screens
- Mobile-first CSS approach

## 🎓 Learning Resources

This project demonstrates:
- Modern JavaScript (ES6+ classes, modules, arrow functions)
- CSS Grid and Flexbox layouts
- localStorage API usage
- Client-side routing
- Component-based architecture
- Data management without a database
- Role-based access control
- Form validation
- Chart.js integration

## ⚠️ Important Notes

### This is a DEMO
- **NOT for production use**
- No server-side validation
- No data encryption
- No backup/recovery
- localStorage can be cleared by users

### Security
- Passwords are stored in plain text (demo only!)
- No HTTPS required (client-side only)
- No sensitive data should be entered

### Performance
- Optimized for up to 500 patients
- Pagination limits table rendering
- Debounced search for performance
- Lazy loading where applicable

## 🤝 Contributing

This is a demo project, but suggestions are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- **Chart.js** - Data visualization
- **Google Fonts** - Inter and Outfit fonts
- **Emoji Icons** - Used throughout the interface

## 📞 Support

For questions or issues:
1. Check the browser console for errors
2. Verify localStorage is enabled
3. Try resetting demo data
4. Use a modern browser

## 🎉 Demo Highlights

### What Makes This Special
1. **Zero Backend** - Runs 100% in browser
2. **Realistic Data** - Pre-populated with meaningful demo data
3. **Production-Quality UI** - Modern, premium design
4. **Full Workflow** - Complete patient journey from registration to billing
5. **Educational** - Clean code, well-documented

### Perfect For
- 📚 Learning web development
- 🎨 UI/UX portfolio projects
- 🏥 Healthcare system demos
- 💼 Client presentations
- 🎓 Student projects

---

**Built with ❤️ using Vanilla JavaScript**

*No frameworks. No dependencies. Just pure web technologies.*
