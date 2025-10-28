# Aadhaar Sahayak 🪪

An official web application developed to help Indian residents plan their Aadhaar enrolment or update process with step-by-step document checklists, eligibility guides, and quality advisory references. This project was created during an internship and may be integrated with official UIDAI services in the future.

## 🌟 Features

### 📋 Document Checker Wizard
- **Interactive Multi-Step Form**: Navigate through purpose, age group, category, and document selection
- **Smart Document Recommendations**: Get personalized document lists based on your profile
- **Comprehensive Coverage**: 
  - New Aadhaar Enrolment (0-5 years, 5-18 years, 18+ years)
  - Aadhaar Updates (Name, Address, Date of Birth, Gender)
  - Support for Indian Citizens, NRIs, and Foreign Nationals

### 🌐 Online Services Portal
- **Address Update Wizard**: Specialized flow for online address update submissions
- **Age-Based Filtering**: Tailored document requirements for different age groups
- **Category-Specific Guidance**: Separate flows for Indian residents, NRIs, and foreign nationals
- **Document Preview**: Review eligible documents before submission

### 📚 Document Advisory Center
- **Quality Standards Guide**: Mandatory specifications for document scanning and photography
- **Document-Specific Advisories**: Detailed requirements for 40+ document types including:
  - Identity proofs (Passport, Voter ID, Driving License, PAN Card)
  - Address proofs (Utility bills, Bank statements, Property documents)
  - Relationship proofs (Birth certificate, Marriage certificate)
  - Special category documents (OCI, LTV, Transgender ID, Disability certificates)
- **Professional Formatting**: Clear, organized presentation of requirements

### 🎨 Modern UI/UX
- **Dark Mode Support**: System-aware theme with manual toggle
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Beautiful Components**: Built with Radix UI primitives and Tailwind CSS
- **Smooth Animations**: Enhanced user experience with thoughtful transitions
- **Accessibility First**: WCAG compliant component library

### 📥 Export & Print
- **PDF Generation**: Download your document checklist as a professional PDF
- **Print Optimization**: Clean print layouts for physical copies
- **Shareable Checklists**: Save and share your personalized requirements

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **PDF Export**: [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/)
- **Code Quality**: [Biome](https://biomejs.dev/) (linting & formatting)

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 9.x (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DavyJonesCodes/AadhaarSahayak.git
cd aadhaar-sahayak
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 📂 Project Structure

```
aadhaar-sahayak/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page with document checker
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── online-services/   # Online services wizard
│   │   └── advisory/          # Document advisory center
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI primitives
│   │   ├── document-checker.tsx
│   │   ├── online-services.tsx
│   │   ├── document-advisory.tsx
│   │   ├── results-display.tsx
│   │   └── ...
│   ├── config/               # Configuration & data
│   │   ├── wizard-config.ts        # Document matrices (Lists I-IV)
│   │   ├── online-services-config.ts
│   │   ├── advisory-config.ts
│   │   ├── document-details.ts     # Document specifications
│   │   └── wizard-types.ts
│   ├── lib/                  # Utility functions
│   │   └── utils.ts
│   └── styles/              # Global styles
│       └── globals.css
├── public/                   # Static assets
│   ├── AadhaarLogo.png
│   ├── site.webmanifest
│   └── docs/
│       └── uidai-document-guide.pdf
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── biome.json
└── README.md
```

## 🎯 Key Features Explained

### Document Lists (UIDAI Schedules)

The application implements all four UIDAI document lists:

- **List I**: Documents for 0-5 years enrolment (HoF-based, Document-based, Foreign nationals)
- **List II**: Documents for 5-18 years enrolment
- **List III**: Documents for 18+ years enrolment
- **List IV**: Documents for updates (Name, Address, Date of Birth, Gender)

### Supported Document Types (40+)

#### Identity & Address Proofs
- Indian Passport, PAN Card, Voter ID, Driving License
- Ration Card, Service Photo ID, Pensioner ID
- Bank Passbook, Bank Statements, Insurance Policy

#### Utility Bills (PoA)
- Electricity, Water, Gas, Telephone/Broadband bills

#### Government Certificates
- UIDAI Standard Certificates (MP/MLA, Gazetted Officers, Tehsildar, NACO, DCPO, Village Panchayat)
- SC/ST/OBC Certificates, Domicile Certificate
- Marriage Certificate, Birth Certificate

#### Special Categories
- Transgender Identity Card/Certificate
- Disability Identity Card/Certificate
- MGNREGA Job Card + Domicile Certificate
- Prisoner Induction Document (PID)

#### Foreign Nationals
- OCI Passport, Nepal/Bhutan Passport & Citizenship
- Long Term Visa (LTV) for minority communities
- FRRO/FRO Registration Certificate

### Document Quality Standards

Built-in advisory system ensures:
- Proper scanning orientation and alignment
- Uniform lighting without shadows
- No blur, smudges, or obscured text
- Clear visibility of holograms and watermarks
- Correct page ordering for multi-page documents
- Natural color accuracy

## 🔧 Configuration

Customize the application by editing configuration files in `src/config/`:
- `wizard-config.ts` - Document matrices and eligibility rules
- `document-details.ts` - Individual document specifications
- `advisory-config.ts` - Advisory page content
- `online-services-config.ts` - Online service flows

## 🙏 Acknowledgments

- UIDAI for comprehensive Aadhaar documentation guidelines
- Next.js team for the excellent React framework
- Radix UI for accessible component primitives
- Tailwind CSS for the utility-first styling approach
- All contributors who help improve this tool

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/DavyJonesCodes/AadhaarSahayak/issues)
- Visit official UIDAI resources at [uidai.gov.in](https://uidai.gov.in)

---

**Developed to streamline Aadhaar enrolment and update processes for all Indian residents**
