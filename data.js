/**
 * Ezrah Dental Opportunity Scanner - Data Layer
 * Realistic Bengaluru Dental Clinic Dataset with objective technical audits.
 */

window.EZRAH_SEED_DATA = {
  clinics: [
    {
      id: "blr-c01",
      name: "Indiranagar Dental Specialties & Orthodontics",
      address: "812, 12th Main Rd, HAL 2nd Stage, Indiranagar",
      area: "Indiranagar",
      city: "Bengaluru",
      phone: "+91 80 4123 9901",
      website: "https://indiranagardentalcare.example.in",
      source: "Google Places API • Verified Business Listing",
      createdAt: "2025-02-10T09:30:00Z"
    },
    {
      id: "blr-c02",
      name: "Koramangala Smile Studio & Implant Center",
      address: "44, 4th Cross, 5th Block, Koramangala",
      area: "Koramangala",
      city: "Bengaluru",
      phone: "+91 80 2553 4412",
      website: "https://koramangalasmiles.example.com",
      source: "Bengaluru Dental Association Registry",
      createdAt: "2025-02-11T11:15:00Z"
    },
    {
      id: "blr-c03",
      name: "Whitefield Laser Dental & Aesthetic Clinic",
      address: "Unit 301, ITPL Main Road, Brookefield, Whitefield",
      area: "Whitefield",
      city: "Bengaluru",
      phone: "+91 80 6712 3344",
      website: "https://whitefieldlaserdental.example.in",
      source: "Google Places API • Verified Business Listing",
      createdAt: "2025-02-12T08:45:00Z"
    },
    {
      id: "blr-c04",
      name: "Apex Dental Excellence HSR",
      address: "Sector 3, 27th Main Rd, HSR Layout",
      area: "HSR Layout",
      city: "Bengaluru",
      phone: "+91 98450 11223",
      website: "https://apexdentalhsr.example.com",
      source: "Practo Verified Provider Profile",
      createdAt: "2025-02-13T14:20:00Z"
    },
    {
      id: "blr-c05",
      name: "Jayanagar Family Dentists & Kids Care",
      address: "15, 33rd Cross, 4th Block, Jayanagar",
      area: "Jayanagar",
      city: "Bengaluru",
      phone: "+91 80 2664 7789",
      website: "https://jayanagarfamilydentist.example.org",
      source: "Google Places API",
      createdAt: "2025-02-14T10:00:00Z"
    },
    {
      id: "blr-c06",
      name: "Malleshwaram Heritage Dental Clinic",
      address: "78, 8th Cross Road, Margosa Road, Malleshwaram",
      area: "Malleshwaram",
      city: "Bengaluru",
      phone: "+91 80 2334 0981",
      website: "https://malleshwaramdental.example.in",
      source: "JustDial Verified Commercial Listing",
      createdAt: "2025-02-15T16:10:00Z"
    },
    {
      id: "blr-c07",
      name: "JP Nagar Advanced Root Canal & Surgery Clinic",
      address: "Phase 3, 15th Cross, JP Nagar",
      area: "JP Nagar",
      city: "Bengaluru",
      phone: "+91 98801 44556",
      website: "https://jpnagarrootcanal.example.com",
      source: "Google Places API",
      createdAt: "2025-02-16T12:00:00Z"
    },
    {
      id: "blr-c08",
      name: "Green Glen Dental & Implantology",
      address: "Bellandur Outer Ring Road, Near EcoSpace",
      area: "Whitefield",
      city: "Bengaluru",
      phone: "+91 80 4900 8822",
      website: "https://greenglendental.example.in",
      source: "Google Places API",
      createdAt: "2025-02-17T09:00:00Z"
    },
    {
      id: "blr-c09",
      name: "ToothCraft Cosmetic & Aligners Center",
      address: "80 Feet Rd, 6th Block, Koramangala",
      area: "Koramangala",
      city: "Bengaluru",
      phone: "+91 99002 99881",
      website: "https://toothcraftblr.example.com",
      source: "Official Clinic Domain Registry",
      createdAt: "2025-02-18T13:45:00Z"
    },
    {
      id: "blr-c10",
      name: "Prime Care Dental Hub",
      address: "100ft Inner Ring Rd, Indiranagar Stage 1",
      area: "Indiranagar",
      city: "Bengaluru",
      phone: "+91 80 4099 1100",
      website: "https://primecaredentalblr.example.com",
      source: "Google Places API",
      createdAt: "2025-02-19T10:30:00Z"
    }
  ],

  audits: [
    {
      clinicId: "blr-c01",
      website: "https://indiranagardentalcare.example.in",
      websiteStatus: "Online (Reachable)",
      isHttps: true,
      loadTimeSeconds: 4.8,
      overallQualityScore: 48,
      opportunityScore: 86,
      subscores: {
        performance: 44,
        mobileUx: 42,
        seoFundamentals: 57,
        conversionCta: 31,
        trustCredibility: 72,
        dentalFunctionality: 35
      },
      primaryOpportunity: "Online Appointment Flow & Mobile CTA Redesign",
      recommendedServices: [
        "Website redesign",
        "Appointment booking system",
        "WhatsApp enquiry integration"
      ],
      findings: [
        "No interactive appointment booking calendar detected on landing or service pages",
        "Primary phone CTA requires 3 clicks to reveal on smartphone viewports",
        "No instant WhatsApp chat widget detected for mobile patient triage",
        "Treatment price guides or insurance empanelment details are not published",
        "Desktop site is built on an legacy CMS with 4.8s mobile load latency"
      ],
      dentalUxChecklist: {
        appointmentBookingFlow: "Not detected",
        phoneClickToCall: "Detected (buried in footer)",
        whatsAppCta: "Not detected",
        contactForm: "Detected (requires 7 mandatory fields)",
        clinicAddressOnPage: "Detected",
        googleMapsEmbed: "Detected",
        doctorDentistProfiles: "Detected",
        dentalServicesDetailed: "Detected",
        emergencyCareNotice: "Not detected",
        patientTestimonials: "Detected (unverified text blocks)",
        beforeAfterPhotos: "Not detected",
        pricingIndications: "Not detected",
        openingHoursPublished: "Detected",
        mobileFriendlyNav: "Poor (drawer overflows viewport)"
      },
      analyzedAt: "2025-02-20T10:14:22Z"
    },
    {
      clinicId: "blr-c02",
      website: "https://koramangalasmiles.example.com",
      websiteStatus: "Online (Reachable)",
      isHttps: true,
      loadTimeSeconds: 3.2,
      overallQualityScore: 56,
      opportunityScore: 78,
      subscores: {
        performance: 60,
        mobileUx: 55,
        seoFundamentals: 65,
        conversionCta: 40,
        trustCredibility: 75,
        dentalFunctionality: 42
      },
      primaryOpportunity: "WhatsApp Lead Integration & Treatment Pages",
      recommendedServices: [
        "WhatsApp integration",
        "Patient enquiry automation",
        "Performance/SEO improvements"
      ],
      findings: [
        "High patient footfall in Koramangala but site lacks automated WhatsApp booking bot",
        "Smile makeover before/after gallery missing structured clinical schema",
        "Appointment button triggers generic 'mailto:' link instead of confirmed slot booking"
      ],
      dentalUxChecklist: {
        appointmentBookingFlow: "Deficient (mailto trigger)",
        phoneClickToCall: "Detected",
        whatsAppCta: "Not detected",
        contactForm: "Detected",
        clinicAddressOnPage: "Detected",
        googleMapsEmbed: "Detected",
        doctorDentistProfiles: "Detected",
        dentalServicesDetailed: "Detected",
        emergencyCareNotice: "Not detected",
        patientTestimonials: "Detected",
        beforeAfterPhotos: "Not detected",
        pricingIndications: "Not detected",
        openingHoursPublished: "Detected",
        mobileFriendlyNav: "Acceptable"
      },
      analyzedAt: "2025-02-20T11:05:00Z"
    },
    {
      clinicId: "blr-c03",
      website: "https://whitefieldlaserdental.example.in",
      websiteStatus: "Online (Slow TTFB)",
      isHttps: false,
      loadTimeSeconds: 6.4,
      overallQualityScore: 36,
      opportunityScore: 92,
      subscores: {
        performance: 28,
        mobileUx: 30,
        seoFundamentals: 38,
        conversionCta: 25,
        trustCredibility: 50,
        dentalFunctionality: 45
      },
      primaryOpportunity: "Complete Modernization & SSL Security Overhaul",
      recommendedServices: [
        "Website redesign",
        "Appointment booking system",
        "Performance/SEO improvements",
        "Lead capture"
      ],
      findings: [
        "Site lacks active SSL certificate (triggers browser security warnings)",
        "Mobile performance score is critically low due to unoptimized 4K banner assets",
        "Zero instant booking mechanism for tech-corridor Whitefield patients"
      ],
      dentalUxChecklist: {
        appointmentBookingFlow: "Not detected",
        phoneClickToCall: "Not detected",
        whatsAppCta: "Not detected",
        contactForm: "Deficient (Broken reCAPTCHA)",
        clinicAddressOnPage: "Detected",
        googleMapsEmbed: "Not detected",
        doctorDentistProfiles: "Detected",
        dentalServicesDetailed: "Detected",
        emergencyCareNotice: "Not detected",
        patientTestimonials: "Not detected",
        beforeAfterPhotos: "Not detected",
        pricingIndications: "Not detected",
        openingHoursPublished: "Detected",
        mobileFriendlyNav: "Fails touch target guidelines"
      },
      analyzedAt: "2025-02-21T08:20:10Z"
    },
    {
      clinicId: "blr-c04",
      website: "https://apexdentalhsr.example.com",
      websiteStatus: "Online",
      isHttps: true,
      loadTimeSeconds: 2.4,
      overallQualityScore: 71,
      opportunityScore: 62,
      subscores: {
        performance: 78,
        mobileUx: 72,
        seoFundamentals: 70,
        conversionCta: 55,
        trustCredibility: 85,
        dentalFunctionality: 65
      },
      primaryOpportunity: "Automated Patient Booking & CRM Sync",
      recommendedServices: [
        "CRM integration",
        "Appointment booking system",
        "Patient enquiry automation"
      ],
      findings: [
        "Site looks clean on desktop but uses third-party redirect for booking",
        "WhatsApp button exists but connects to doctor's personal phone rather than clinic desk bot"
      ],
      dentalUxChecklist: {
        appointmentBookingFlow: "External 3rd-party redirect",
        phoneClickToCall: "Detected",
        whatsAppCta: "Detected (Personal number)",
        contactForm: "Detected",
        clinicAddressOnPage: "Detected",
        googleMapsEmbed: "Detected",
        doctorDentistProfiles: "Detected",
        dentalServicesDetailed: "Detected",
        emergencyCareNotice: "Detected",
        patientTestimonials: "Detected",
        beforeAfterPhotos: "Detected",
        pricingIndications: "Not detected",
        openingHoursPublished: "Detected",
        mobileFriendlyNav: "Good"
      },
      analyzedAt: "2025-02-21T09:12:00Z"
    },
    {
      clinicId: "blr-c05",
      website: "https://jayanagarfamilydentist.example.org",
      websiteStatus: "Online (Reachable)",
      isHttps: true,
      loadTimeSeconds: 3.8,
      overallQualityScore: 50,
      opportunityScore: 81,
      subscores: {
        performance: 52,
        mobileUx: 46,
        seoFundamentals: 54,
        conversionCta: 38,
        trustCredibility: 68,
        dentalFunctionality: 40
      },
      primaryOpportunity: "Mobile UX Redesign & Pediatric Booking Form",
      recommendedServices: [
        "Website redesign",
        "Appointment booking system",
        "WhatsApp integration"
      ],
      findings: [
        "Family practice with heavy pediatric clientele, but appointment forms fail on mobile Safari",
        "No weekend emergency care CTA despite advertising 7-day consultation"
      ],
      dentalUxChecklist: {
        appointmentBookingFlow: "Not detected",
        phoneClickToCall: "Detected",
        whatsAppCta: "Not detected",
        contactForm: "Detected",
        clinicAddressOnPage: "Detected",
        googleMapsEmbed: "Detected",
        doctorDentistProfiles: "Detected",
        dentalServicesDetailed: "Detected",
        emergencyCareNotice: "Not detected",
        patientTestimonials: "Detected",
        beforeAfterPhotos: "Not detected",
        pricingIndications: "Not detected",
        openingHoursPublished: "Detected",
        mobileFriendlyNav: "Poor"
      },
      analyzedAt: "2025-02-21T10:45:00Z"
    },
    {
      clinicId: "blr-c06",
      website: "https://malleshwaramdental.example.in",
      websiteStatus: "Online",
      isHttps: true,
      loadTimeSeconds: 4.1,
      overallQualityScore: 45,
      opportunityScore: 84,
      subscores: {
        performance: 48,
        mobileUx: 40,
        seoFundamentals: 49,
        conversionCta: 33,
        trustCredibility: 70,
        dentalFunctionality: 30
      },
      primaryOpportunity: "Multi-Language (Kannada/English) Web Portal",
      recommendedServices: [
        "Website redesign",
        "WhatsApp enquiry integration",
        "Lead capture"
      ],
      findings: [
        "Reputed 20-year-old clinic with high word-of-mouth, but digital presence is static brochureware",
        "No digital booking or modern WhatsApp widget"
      ],
      dentalUxChecklist: {
        appointmentBookingFlow: "Not detected",
        phoneClickToCall: "Detected",
        whatsAppCta: "Not detected",
        contactForm: "Detected",
        clinicAddressOnPage: "Detected",
        googleMapsEmbed: "Detected",
        doctorDentistProfiles: "Detected",
        dentalServicesDetailed: "Detected",
        emergencyCareNotice: "Not detected",
        patientTestimonials: "Not detected",
        beforeAfterPhotos: "Not detected",
        pricingIndications: "Not detected",
        openingHoursPublished: "Detected",
        mobileFriendlyNav: "Poor"
      },
      analyzedAt: "2025-02-21T11:30:00Z"
    },
    {
      clinicId: "blr-c07",
      website: "https://jpnagarrootcanal.example.com",
      websiteStatus: "Online",
      isHttps: true,
      loadTimeSeconds: 2.1,
      overallQualityScore: 82,
      opportunityScore: 35,
      subscores: {
        performance: 89,
        mobileUx: 84,
        seoFundamentals: 85,
        conversionCta: 78,
        trustCredibility: 90,
        dentalFunctionality: 80
      },
      primaryOpportunity: "Specialized AI Dental Chatbot Integration",
      recommendedServices: [
        "AI/chatbot solution"
      ],
      findings: [
        "Modern website with functional booking system already configured",
        "Low urgency for full redesign; potential niche fit only for 24/7 AI emergency triage"
      ],
      dentalUxChecklist: {
        appointmentBookingFlow: "Detected (Cal.com / Integrated)",
        phoneClickToCall: "Detected",
        whatsAppCta: "Detected",
        contactForm: "Detected",
        clinicAddressOnPage: "Detected",
        googleMapsEmbed: "Detected",
        doctorDentistProfiles: "Detected",
        dentalServicesDetailed: "Detected",
        emergencyCareNotice: "Detected",
        patientTestimonials: "Detected",
        beforeAfterPhotos: "Detected",
        pricingIndications: "Detected",
        openingHoursPublished: "Detected",
        mobileFriendlyNav: "Excellent"
      },
      analyzedAt: "2025-02-21T14:10:00Z"
    },
    {
      clinicId: "blr-c08",
      website: "https://greenglendental.example.in",
      websiteStatus: "Online",
      isHttps: true,
      loadTimeSeconds: 3.9,
      overallQualityScore: 54,
      opportunityScore: 76,
      subscores: {
        performance: 58,
        mobileUx: 50,
        seoFundamentals: 60,
        conversionCta: 42,
        trustCredibility: 65,
        dentalFunctionality: 45
      },
      primaryOpportunity: "Tech-Belt Corporate Appointment Scheduling Flow",
      recommendedServices: [
        "Appointment booking system",
        "WhatsApp integration",
        "Website improvement"
      ],
      findings: [
        "Surrounded by corporate IT parks near EcoSpace, yet website has no after-hours quick booking",
        "Missing doctor accreditation details"
      ],
      dentalUxChecklist: {
        appointmentBookingFlow: "Not detected",
        phoneClickToCall: "Detected",
        whatsAppCta: "Not detected",
        contactForm: "Detected",
        clinicAddressOnPage: "Detected",
        googleMapsEmbed: "Detected",
        doctorDentistProfiles: "Deficient",
        dentalServicesDetailed: "Detected",
        emergencyCareNotice: "Not detected",
        patientTestimonials: "Detected",
        beforeAfterPhotos: "Not detected",
        pricingIndications: "Not detected",
        openingHoursPublished: "Detected",
        mobileFriendlyNav: "Acceptable"
      },
      analyzedAt: "2025-02-22T08:50:00Z"
    },
    {
      clinicId: "blr-c09",
      website: "https://toothcraftblr.example.com",
      websiteStatus: "Online",
      isHttps: true,
      loadTimeSeconds: 3.4,
      overallQualityScore: 64,
      opportunityScore: 68,
      subscores: {
        performance: 66,
        mobileUx: 62,
        seoFundamentals: 71,
        conversionCta: 50,
        trustCredibility: 78,
        dentalFunctionality: 55
      },
      primaryOpportunity: "Aligner Consultation Workflow & Lead Magnet",
      recommendedServices: [
        "Lead capture",
        "CRM integration",
        "Custom web application"
      ],
      findings: [
        "Focuses on clear aligners and aesthetics but lacks interactive smile assessment calculator",
        "Patient leads drop off due to lack of immediate WhatsApp follow-up"
      ],
      dentalUxChecklist: {
        appointmentBookingFlow: "Detected (Static calendar form)",
        phoneClickToCall: "Detected",
        whatsAppCta: "Detected",
        contactForm: "Detected",
        clinicAddressOnPage: "Detected",
        googleMapsEmbed: "Detected",
        doctorDentistProfiles: "Detected",
        dentalServicesDetailed: "Detected",
        emergencyCareNotice: "Not detected",
        patientTestimonials: "Detected",
        beforeAfterPhotos: "Detected",
        pricingIndications: "Not detected",
        openingHoursPublished: "Detected",
        mobileFriendlyNav: "Good"
      },
      analyzedAt: "2025-02-22T09:40:00Z"
    },
    {
      clinicId: "blr-c10",
      website: "https://primecaredentalblr.example.com",
      websiteStatus: "Online (DNS Warning)",
      isHttps: true,
      loadTimeSeconds: 5.2,
      overallQualityScore: 41,
      opportunityScore: 89,
      subscores: {
        performance: 36,
        mobileUx: 38,
        seoFundamentals: 45,
        conversionCta: 28,
        trustCredibility: 60,
        dentalFunctionality: 38
      },
      primaryOpportunity: "Full Digital Refresh & WhatsApp Booking",
      recommendedServices: [
        "Website redesign",
        "Appointment booking system",
        "WhatsApp enquiry integration",
        "Performance/SEO improvements"
      ],
      findings: [
        "High-density Indiranagar clinic with outdated 2017 WordPress theme and broken contact form",
        "No WhatsApp button despite 85% of Bengaluru urban patients preferring WhatsApp enquiries",
        "Mobile layout shifts heavily during load (CLS > 0.35)"
      ],
      dentalUxChecklist: {
        appointmentBookingFlow: "Not detected",
        phoneClickToCall: "Detected",
        whatsAppCta: "Not detected",
        contactForm: "Broken (Server 500 error on submit)",
        clinicAddressOnPage: "Detected",
        googleMapsEmbed: "Detected",
        doctorDentistProfiles: "Detected",
        dentalServicesDetailed: "Detected",
        emergencyCareNotice: "Not detected",
        patientTestimonials: "Detected",
        beforeAfterPhotos: "Not detected",
        pricingIndications: "Not detected",
        openingHoursPublished: "Detected",
        mobileFriendlyNav: "Poor"
      },
      analyzedAt: "2025-02-22T11:15:00Z"
    }
  ],

  contacts: [
    {
      id: "cnt-01",
      clinicId: "blr-c01",
      contactType: "Public Business Email",
      value: "care@indiranagardentalcare.example.in",
      source: "Official Clinic Website Contact Footer",
      verified: true,
      lastVerified: "2025-02-20",
      whatsappNumber: "+91 98451 22334"
    },
    {
      id: "cnt-02",
      clinicId: "blr-c02",
      contactType: "Public Business Email",
      value: "appointments@koramangalasmiles.example.com",
      source: "Official Clinic Header & Google Listing",
      verified: true,
      lastVerified: "2025-02-20",
      whatsappNumber: "+91 98452 33445"
    },
    {
      id: "cnt-03",
      clinicId: "blr-c03",
      contactType: "Public Business Email",
      value: "info@whitefieldlaserdental.example.in",
      source: "Official Domain WHOIS & Web Contact Page",
      verified: true,
      lastVerified: "2025-02-21",
      whatsappNumber: null
    },
    {
      id: "cnt-04",
      clinicId: "blr-c04",
      contactType: "Public Business Email",
      value: "reception@apexdentalhsr.example.com",
      source: "Official Clinic Website",
      verified: true,
      lastVerified: "2025-02-21",
      whatsappNumber: "+91 98450 11223"
    },
    {
      id: "cnt-05",
      clinicId: "blr-c05",
      contactType: "Public Business Email",
      value: "enquiry@jayanagarfamilydentist.example.org",
      source: "Official Clinic Contact Page",
      verified: true,
      lastVerified: "2025-02-21",
      whatsappNumber: null
    },
    {
      id: "cnt-06",
      clinicId: "blr-c06",
      contactType: "Public Business Email",
      value: "contact@malleshwaramdental.example.in",
      source: "Verified Clinic Stationery & Web Portal",
      verified: true,
      lastVerified: "2025-02-21",
      whatsappNumber: "+91 98801 88776"
    },
    {
      id: "cnt-07",
      clinicId: "blr-c07",
      contactType: "Public Business Email",
      value: "dr.admin@jpnagarrootcanal.example.com",
      source: "Official Clinic About Page",
      verified: true,
      lastVerified: "2025-02-21",
      whatsappNumber: "+91 98801 44556"
    },
    {
      id: "cnt-08",
      clinicId: "blr-c08",
      contactType: "Public Business Email",
      value: "helpdesk@greenglendental.example.in",
      source: "Official Clinic Website",
      verified: true,
      lastVerified: "2025-02-22",
      whatsappNumber: null
    },
    {
      id: "cnt-09",
      clinicId: "blr-c09",
      contactType: "Public Business Email",
      value: "consult@toothcraftblr.example.com",
      source: "Official Website Booking Portal",
      verified: true,
      lastVerified: "2025-02-22",
      whatsappNumber: "+91 99002 99881"
    },
    {
      id: "cnt-10",
      clinicId: "blr-c10",
      contactType: "No verified email found",
      value: null,
      source: "No verified public business email found",
      verified: false,
      lastVerified: "2025-02-22",
      whatsappNumber: "+91 80 4099 1100"
    }
  ],

  outreach: [
    {
      clinicId: "blr-c01",
      recipient: "care@indiranagardentalcare.example.in",
      subject: "A quick observation regarding Indiranagar Dental Specialties's mobile booking flow",
      body: `Hi Team Indiranagar Dental Specialties,

I came across your practice while reviewing dental services in Indiranagar, Bengaluru.

I noticed that while your clinic enjoys strong patient credibility, your website currently does not provide an interactive appointment booking flow, and the contact button requires multiple scrolls on mobile devices.

One specific improvement that could help capture more prospective patients would be adding a streamlined mobile booking workflow paired with an instant WhatsApp enquiry button.

Ezrah Innovations builds fast, responsive websites and automated enquiry workflows for healthcare practices in Bengaluru.

If useful, I would be glad to share a short 3-point concept of how we would modernize your appointment flow.

Best regards,
Rohan Verma
Solutions Director • Ezrah Innovations
Bengaluru, India

---
To opt out of future business communications from Ezrah Innovations, reply with "Unsubscribe".`,
      status: "draft",
      approvedAt: null,
      sentAt: null,
      doNotContact: false
    },
    {
      clinicId: "blr-c02",
      recipient: "appointments@koramangalasmiles.example.com",
      subject: "Patient booking experience on Koramangala Smile Studio",
      body: `Hi Koramangala Smile Studio Team,

I came across your clinic while studying patient enquiry touchpoints across Koramangala.

Your treatment listings look comprehensive, but I noted that clicking your appointment call-to-action triggers a generic email link rather than a real-time slot selector or WhatsApp integration.

Ezrah Innovations builds custom clinic portals that connect online visitors directly to front-desk appointment calendars.

Would you be open to seeing a 2-minute overview of how this can increase qualified patient bookings?

Best regards,
Ananya Rao
Ezrah Innovations • Bengaluru

---
Reply "Opt out" to decline future notes.`,
      status: "sent",
      approvedAt: "2025-02-21T14:30:00Z",
      sentAt: "2025-02-21T14:32:00Z",
      doNotContact: false
    },
    {
      clinicId: "blr-c04",
      recipient: "reception@apexdentalhsr.example.com",
      subject: "Direct CRM sync for Apex Dental Excellence HSR",
      body: `Hi Apex Dental Team,

I was reviewing dental clinics in HSR Layout and noticed your strong practice reputation.

From our website audit, we observed that your online booking routes patients off-site to a 3rd-party directory rather than keeping them on your branded domain.

Ezrah Innovations specializes in custom, self-hosted appointment and patient enquiry automation systems for Bengaluru medical centers.

Happy to share a quick mock-up if of interest.

Best,
Rohan Verma
Ezrah Innovations

---
Reply "Unsubscribe" to cease messages.`,
      status: "replied",
      approvedAt: "2025-02-20T09:10:00Z",
      sentAt: "2025-02-20T09:12:00Z",
      doNotContact: false
    },
    {
      clinicId: "blr-c07",
      recipient: "dr.admin@jpnagarrootcanal.example.com",
      subject: "Do not contact test entry",
      body: "",
      status: "dnc",
      approvedAt: null,
      sentAt: null,
      doNotContact: true
    }
  ]
};
