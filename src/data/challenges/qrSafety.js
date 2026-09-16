/**
 * QR Safety Quest Challenge Suite (10 Challenges)
 * Track: 03 — QR SAFETY
 * Progression: 01-03 (QR Basics / Context / Destination), 04-06 (URL Structure / Redirects / Fake Payment), 07-09 (Physical Tampering / Social Pretext / Ambiguous Badges), 10 (Full Multi-Stage QR Journey Simulation)
 * Strictly fictional safe domains: .test, .example, .invalid
 */

export const qrSafetyChallenges = [
  // ─── CHALLENGE 01: QR Basics ──────────────────────────────────────────────
  {
    id: "qr_01",
    questId: "qr",
    type: "qr",
    title: "The Coffee Shop Digital Menu",
    difficulty: "easy",
    xp: 100,
    content: {
      itemTitle: "Table Acrylic Stand #14",
      physicalDescription:
        "You sit down at 'Chai & Code Cafe' in Indiranagar, Bengaluru. The table has an acrylic stand with a printed QR code labeled 'Scan for Digital Menu'.",
      qrData: {
        label: "Table 14 Menu Code",
        locationContext: "Chai & Code Cafe (Indiranagar, Bengaluru)",
        rawUrl: "https://menu.chaicode-cafe.test/tables/14",
        destinationDomain: "menu.chaicode-cafe.test",
        protocol: "https",
        isOverlaySticker: false,
        caption: "Table 14 • chai & snacks menu",
      },
      inspectableElements: [
        {
          id: "inspect_domain_clean",
          target: "url",
          label: "Inspect Decoded Domain Hostname",
          clue: "Domain 'menu.chaicode-cafe.test' matches the cafe's official name and uses HTTPS. No weird redirect parameters found.",
        },
        {
          id: "inspect_physical_print",
          target: "scan",
          label: "Inspect Physical Acrylic Print",
          clue: "The QR code is printed directly on the durable acrylic card with no secondary peel-and-stick stickers placed on top.",
        },
      ],
      availableActions: [
        {
          id: "act_ignore_menu",
          label: "Avoid Digital Menus Completely; Demand Physical Paper Menu Everywhere",
          evaluationKey: "avoid_all_qr",
        },
        {
          id: "act_view_menu",
          label: "Verify Decoded URL Hostname and Open Official Cafe Menu in Browser",
          evaluationKey: "open_legit_menu",
        },
        {
          id: "act_download_rewards_app",
          label: "Click Promotional Banner on Menu Page to Sideload 'CafeRewards.apk'",
          evaluationKey: "download_unverified_apk",
        },
        {
          id: "act_report_safe_qr",
          label: "Report Table Stand to Cyber Crime Police as Dangerous Quishing",
          evaluationKey: "false_alarm_report",
        },
      ],
    },
    evaluation: {
      open_legit_menu: { outcome: "correct", score: 100, xp: 100, lifeLost: false, key: "open_legit_menu" },
      avoid_all_qr: { outcome: "partial", score: 40, xp: 40, lifeLost: false, key: "avoid_all_qr" },
      download_unverified_apk: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "download_unverified_apk" },
      false_alarm_report: { outcome: "partial", score: 40, xp: 40, lifeLost: false, key: "false_alarm_report" },
    },
    feedback: {
      open_legit_menu: {
        title: "Legitimate QR Safely Verified!",
        outcome: "correct",
        explanation:
          "Good practice! You inspected the decoded URL before opening it and verified the physical context (direct print on table stand matching merchant name). Not all QR codes are malicious.",
        rule: "Always preview the decoded URL before allowing your phone to open a scanned link.",
        cluesUncovered: [
          "Verified domain matches physical merchant identity",
          "Confirmed authentic direct print without tampering",
        ],
      },
      avoid_all_qr: {
        title: "Overly Cautious Rejection",
        outcome: "partial",
        explanation:
          "While caution is healthy, outright refusal of digital services creates friction. Cyber awareness means verifying authenticity rather than unconditional avoidance.",
        rule: "Inspect the decoded destination and physical context instead of blanket avoidance.",
        cluesUncovered: ["Avoided benign digital menu"],
      },
      download_unverified_apk: {
        title: "Unvetted APK Sideloaded!",
        outcome: "wrong",
        explanation:
          "You tapped a promotional banner and downloaded an Android application package (.apk) from an unverified web source, putting your device at risk.",
        rule: "Never download or install application packages from web pages opened via QR codes.",
        cluesUncovered: ["Attempted APK download from unverified link"],
      },
      false_alarm_report: {
        title: "False Alarm (Partial)",
        outcome: "partial",
        explanation:
          "This was a legitimate cafe menu. The goal of cybersecurity is discerning genuine interactions from threats, not filing false reports.",
        rule: "Evaluate context and domain validity rather than reporting all QR codes unconditionally.",
        cluesUncovered: ["Over-cautious false positive on benign menu"],
      },
    },
  },

  // ─── CHALLENGE 02: Context Matters ────────────────────────────────────────
  {
    id: "qr_02",
    questId: "qr",
    type: "qr",
    title: "The Parking Meter Sticker Overlay",
    difficulty: "easy",
    xp: 110,
    content: {
      itemTitle: "Municipal Street Parking Meter #88",
      physicalDescription:
        "You park your vehicle on MG Road. On the metal parking kiosk, a crooked glossy adhesive sticker has been pasted directly over the city's official payment instructions.",
      qrData: {
        label: "Pasted Payment Sticker",
        locationContext: "Public Street Parking Kiosk (MG Road)",
        rawUrl: "https://pay-parking-bengaluru.fastag-meter.invalid/quickpay",
        destinationDomain: "fastag-meter.invalid",
        protocol: "https",
        isOverlaySticker: true,
        caption: "QUICK PAY • SCAN TO AVOID CLAMPING",
      },
      inspectableElements: [
        {
          id: "inspect_sticker_edge",
          target: "scan",
          label: "Inspect Physical Sticker Surface",
          clue: "Physical sticker is peeling at the corner. Underneath is the city municipality's official FASTag / parking signage!",
        },
        {
          id: "inspect_domain_parking",
          target: "url",
          label: "Analyze Decoded Domain Name",
          clue: "Domain 'fastag-meter.invalid' is a private rogue domain, not the municipal government transport portal ('transport.karnataka.test').",
        },
      ],
      availableActions: [
        {
          id: "act_pay_sticker",
          label: "Scan & Pay Parking Fee on Decoded Link Because Municipal Emblem is Printed on Sticker",
          evaluationKey: "pay_quishing_sticker",
        },
        {
          id: "act_enter_vehicle_test",
          label: "Enter Vehicle License Plate on Scanned Page to Check if Meter Has Your Record",
          evaluationKey: "enter_license_plate_trap",
        },
        {
          id: "act_alert_parking_warden",
          label: "Do Not Scan Sticker; Pay via City's Official Municipal App or Alert Parking Warden",
          evaluationKey: "report_sticker_overlay",
        },
        {
          id: "act_peel_and_pay",
          label: "Peel the Sticker Off and Scan the Scratched Surface Underneath Without Informing Anyone",
          evaluationKey: "peel_and_pay_unreported",
        },
      ],
    },
    evaluation: {
      report_sticker_overlay: { outcome: "correct", score: 100, xp: 110, lifeLost: false, key: "report_sticker_overlay" },
      pay_quishing_sticker: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "pay_quishing_sticker" },
      enter_license_plate_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "enter_license_plate_trap" },
      peel_and_pay_unreported: { outcome: "partial", score: 50, xp: 50, lifeLost: false, key: "peel_and_pay_unreported" },
    },
    feedback: {
      report_sticker_overlay: {
        title: "Physical Quishing Overlay Detected!",
        outcome: "correct",
        explanation:
          "Sharp physical forensics! Pasting rogue QR stickers over parking meters, fuel pumps, and public transit kiosks is a widespread quishing tactic to steal parking fees and payment card data.",
        rule: "Check whether a QR code is printed directly on the machine or pasted on as an adhesive sticker.",
        cluesUncovered: [
          "Discovered peeling adhesive sticker overlay",
          "Identified rogue commercial domain replacing municipal portal",
        ],
      },
      pay_quishing_sticker: {
        title: "Payment Diverted to Scammer!",
        outcome: "wrong",
        explanation:
          "You paid the criminal's virtual wallet and gave them your credit card details, while your vehicle remains unpaid and liable for towing.",
        rule: "Never scan stickers casually slapped onto public infrastructure.",
        cluesUncovered: ["Fell for public sticker overlay quishing"],
      },
      enter_license_plate_trap: {
        title: "Personal Data Collected by Phishers!",
        outcome: "wrong",
        explanation:
          "Entering vehicle details into unverified third-party pages links your phone number and license plate to aggressive phishing databases.",
        rule: "Never submit personal information on untrusted portals.",
        cluesUncovered: ["Entered vehicle data into fraudulent portal"],
      },
      peel_and_pay_unreported: {
        title: "Partial Action (Unreported Danger)",
        outcome: "partial",
        explanation:
          "Peeling the sticker helped you find the original code, but failing to report it to attendants leaves other drivers vulnerable to replaced stickers.",
        rule: "Always notify facility staff when physical tampering is discovered.",
        cluesUncovered: ["Identified sticker but failed to alert authorities"],
      },
    },
  },

  // ─── CHALLENGE 03: Destination ────────────────────────────────────────────
  {
    id: "qr_03",
    questId: "qr",
    type: "qr",
    title: "The Tech Summit Lookalike Destination",
    difficulty: "medium",
    xp: 120,
    content: {
      itemTitle: "Tech Conference Promo Standee",
      physicalDescription:
        "At a tech conference in Hyderabad, a flyer distributed by an unvetted vendor offers 'Free AI Developer T-Shirt & Pass: Scan to Claim'.",
      qrData: {
        label: "Conference Swag QR",
        locationContext: "Hyderabad Convention Center Hall 2",
        rawUrl: "https://bengaluru-tech-summit.events-register-pass.test/auth/google",
        destinationDomain: "events-register-pass.test",
        protocol: "https",
        isOverlaySticker: false,
        caption: "Scan for Free AI Swag Pass",
      },
      inspectableElements: [
        {
          id: "inspect_domain_reg",
          target: "url",
          label: "Deconstruct Hostname Hierarchy",
          clue: "'bengaluru-tech-summit' is only a subdomain prefix. The actual root domain is 'events-register-pass.test' which requests Google OAuth login.",
        },
        {
          id: "inspect_oauth_lure",
          target: "scan",
          label: "Analyze Swag Pretext",
          clue: "Promises of free expensive swag (hoodies, passes) are frequently used at events to trick developers into granting rogue OAuth tokens.",
        },
      ],
      availableActions: [
        {
          id: "act_refuse_swag",
          label: "Decline to Authorize OAuth; Verify Promotion Directly with Official Conference Desk",
          evaluationKey: "refuse_swag_quishing",
        },
        {
          id: "act_scan_oauth",
          label: "Scan QR & Authorize Google OAuth Access to Claim Free Developer T-Shirt",
          evaluationKey: "authorize_oauth_trap",
        },
        {
          id: "act_create_burner_auth",
          label: "Grant Read/Write Permissions Because the Login Page Shows an HTTPS SSL Lock",
          evaluationKey: "trust_ssl_oauth_trap",
        },
        {
          id: "act_share_booth_pass",
          label: "Take a Photo of the QR and Share in Developer Group to Let Colleagues Claim Swag",
          evaluationKey: "spread_swag_trap",
        },
      ],
    },
    evaluation: {
      refuse_swag_quishing: { outcome: "correct", score: 100, xp: 120, lifeLost: false, key: "refuse_swag_quishing" },
      authorize_oauth_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "authorize_oauth_trap" },
      trust_ssl_oauth_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "trust_ssl_oauth_trap" },
      spread_swag_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "spread_swag_trap" },
    },
    feedback: {
      refuse_swag_quishing: {
        title: "OAuth Consent Phishing Blocked!",
        outcome: "correct",
        explanation:
          "Excellent skepticism. Attackers place rogue flyers at crowded conferences to harvest corporate OAuth tokens and email access under the guise of free giveaways.",
        rule: "Never scan unknown promotional QR codes that demand account logins or OAuth permissions.",
        cluesUncovered: [
          "Detected OAuth token-harvesting destination",
          "Recognized free swag social engineering bait",
        ],
      },
      authorize_oauth_trap: {
        title: "OAuth Token Stolen!",
        outcome: "wrong",
        explanation:
          "The rogue app requested 'Read/Write access to Gmail and Google Drive'. The attacker gained persistent API access to your company files.",
        rule: "Treat OAuth consent prompts with extreme scrutiny.",
        cluesUncovered: ["Surrendered cloud token for fake t-shirt"],
      },
      trust_ssl_oauth_trap: {
        title: "Fell for SSL Lock Illusion!",
        outcome: "wrong",
        explanation:
          "HTTPS only encrypts connection traffic; it does not guarantee that the receiver is trustworthy or that requested OAuth scopes are safe.",
        rule: "SSL encryption does not mean the application or OAuth request is legitimate.",
        cluesUncovered: ["Relied on HTTPS lock for application trust"],
      },
      spread_swag_trap: {
        title: "Spread Phishing Lure to Teammates!",
        outcome: "wrong",
        explanation:
          "Sharing unvetted swag QR codes in developer groups exposes colleagues to credential and token harvesting.",
        rule: "Never amplify unverified promotions in team channels.",
        cluesUncovered: ["Shared malicious OAuth lure with teammates"],
      },
    },
  },

  // ─── CHALLENGE 04: URL Inspection ─────────────────────────────────────────
  {
    id: "qr_04",
    questId: "qr",
    type: "qr",
    title: "Obfuscated Open Redirect Parameters",
    difficulty: "medium",
    xp: 130,
    content: {
      itemTitle: "Electricity Bill Late-Fee Notice",
      physicalDescription:
        "A printed flyer in your apartment mailbox in Delhi claims: 'BESCOM / Discom Notice: Scan to clear overdue bill without penalty'.",
      qrData: {
        label: "Discom Bill Flyer QR",
        locationContext: "Apartment Letterbox (Delhi NCR)",
        rawUrl: "https://electricity-board.gov-service.test/out.php?url=https://bijli-bill-gateway.invalid/pay",
        destinationDomain: "electricity-board.gov-service.test",
        protocol: "https",
        isOverlaySticker: false,
        redirectNotice: "Chained open redirect: jumps to bijli-bill-gateway.invalid",
        caption: "Scan to pay electricity bill",
      },
      inspectableElements: [
        {
          id: "inspect_redirect_param",
          target: "url",
          label: "Analyze URL Query String (?url=...)",
          clue: "Notice the parameter '?url=https://bijli-bill-gateway.invalid/pay'. The initial domain simply forwards your browser to a fraudulent payment page!",
        },
      ],
      availableActions: [
        {
          id: "act_follow_redirect",
          label: "Trust Initial Domain 'electricity-board.gov-service.test' and Enter NetBanking PIN on Landing Page",
          evaluationKey: "follow_open_redirect",
        },
        {
          id: "act_enter_consumer_no",
          label: "Enter Consumer Account Number on Redirected Page to Check Balance Before Paying",
          evaluationKey: "submit_consumer_data",
        },
        {
          id: "act_pay_official_app",
          label: "Discard QR Flyer; Pay Bill Directly via Official Discom App / Electricity Board Portal",
          evaluationKey: "pay_direct_app",
        },
        {
          id: "act_forward_qr",
          label: "Forward QR Image to Apartment Community Group to See if Neighbors Received It",
          evaluationKey: "forward_suspicious_bill",
        },
      ],
    },
    evaluation: {
      pay_direct_app: { outcome: "correct", score: 100, xp: 130, lifeLost: false, key: "pay_direct_app" },
      follow_open_redirect: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "follow_open_redirect" },
      submit_consumer_data: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "submit_consumer_data" },
      forward_suspicious_bill: { outcome: "partial", score: 40, xp: 40, lifeLost: false, key: "forward_suspicious_bill" },
    },
    feedback: {
      pay_direct_app: {
        title: "Open Redirect Traversal Unmasked!",
        outcome: "correct",
        explanation:
          "Advanced catch! Open redirect parameters (like '?url=...' or '?redirect=...') allow attackers to show a legitimate-looking initial domain that immediately redirects to an unverified harvester.",
        rule: "Inspect the full query string for embedded redirect URLs before proceeding.",
        cluesUncovered: [
          "Identified open redirect parameter in QR payload",
          "Used authoritative direct payment channel instead",
        ],
      },
      follow_open_redirect: {
        title: "Redirected to Phishing Gateway!",
        outcome: "wrong",
        explanation:
          "You looked only at the initial hostname and missed the open redirect parameter that bounced your browser to a fake payment gateway.",
        rule: "Verify the final landing URL, not just the initial scanned hostname.",
        cluesUncovered: ["Overlooked open redirect parameter"],
      },
      submit_consumer_data: {
        title: "Consumer Information Harvested!",
        outcome: "wrong",
        explanation:
          "Entering consumer identifiers validates your identity to the scam operator, setting up targeted follow-up phone extortion.",
        rule: "Never interact with or submit forms on unverified redirect destinations.",
        cluesUncovered: ["Submitted identity details on rogue landing page"],
      },
      forward_suspicious_bill: {
        title: "Spreading Unverified Threat (Partial)",
        outcome: "partial",
        explanation:
          "Asking neighbors may help, but forwarding unverified payment links risks having elderly or unwary residents scan and fall victim.",
        rule: "Verify bills through official provider accounts rather than circulating questionable flyers.",
        cluesUncovered: ["Circulated ambiguous payment QR"],
      },
    },
  },

  // ─── CHALLENGE 05: Redirects ──────────────────────────────────────────────
  {
    id: "qr_05",
    questId: "qr",
    type: "qr",
    title: "The URL Shortener Obfuscation Chain",
    difficulty: "medium",
    xp: 140,
    content: {
      itemTitle: "Transit Station Free Wi-Fi QR",
      physicalDescription:
        "At a metro station in Pune, a poster promises 'Free High-Speed 5G Station Wi-Fi'.",
      qrData: {
        label: "Metro Wi-Fi Promo",
        locationContext: "Metro Station Concourse (Pune)",
        rawUrl: "https://tiny.example.test/metro-5g-free",
        destinationDomain: "tiny.example.test",
        protocol: "https",
        isOverlaySticker: false,
        redirectNotice: "Shortened link obscures final destination",
        caption: "Scan for Free 5G Wi-Fi Access",
      },
      inspectableElements: [
        {
          id: "inspect_shortener_risk",
          target: "url",
          label: "Analyze Shortened Link Transparency",
          clue: "'tiny.example.test' is a URL shortener that masks the real destination. Authentic public utility infrastructure uses transparent branded domains.",
        },
        {
          id: "inspect_wifi_permission",
          target: "scan",
          label: "Inspect Wi-Fi Onboarding Protocol",
          clue: "Public Wi-Fi logins happen via native captive portal popups, not by scanning shortened URLs that ask to install mobile profiles.",
        },
      ],
      availableActions: [
        {
          id: "act_install_profile",
          label: "Scan Shortened Link & Install Requested Device Configuration Profile for Free 5G",
          evaluationKey: "install_rogue_profile",
        },
        {
          id: "act_connect_native",
          label: "Do Not Scan; Connect to Wi-Fi via Phone Settings / Native Captive Portal Only",
          evaluationKey: "native_wifi_only",
        },
        {
          id: "act_open_incognito_otp",
          label: "Open Shortened Link in Incognito Tab and Enter Phone Number for SMS Access Code",
          evaluationKey: "enter_otp_shortlink",
        },
        {
          id: "act_download_speedtest",
          label: "Download 'SpeedTest_Accelerator.apk' Promoted on the Landing Page",
          evaluationKey: "download_speedtest_apk",
        },
      ],
    },
    evaluation: {
      native_wifi_only: { outcome: "correct", score: 100, xp: 140, lifeLost: false, key: "native_wifi_only" },
      install_rogue_profile: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "install_rogue_profile" },
      enter_otp_shortlink: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "enter_otp_shortlink" },
      download_speedtest_apk: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "download_speedtest_apk" },
    },
    feedback: {
      native_wifi_only: {
        title: "Malicious Profile Dropper Defended!",
        outcome: "correct",
        explanation:
          "Smart navigation. The shortened URL was configured to download a rogue MDM profile that routes all your mobile phone traffic through an attacker's proxy server.",
        rule: "Never install configuration profiles or certificates prompted by public QR codes.",
        cluesUncovered: [
          "Recognized obfuscation risk in URL shorteners",
          "Avoided rogue MDM profile installation",
        ],
      },
      install_rogue_profile: {
        title: "Traffic Intercepted via Rogue Proxy!",
        outcome: "wrong",
        explanation:
          "The profile installed a malicious root SSL certificate that decrypts your NetBanking and private communications.",
        rule: "Never install downloaded profiles from QR codes.",
        cluesUncovered: ["Installed hostile configuration profile"],
      },
      enter_otp_shortlink: {
        title: "Phone Number & OTP Intercepted!",
        outcome: "wrong",
        explanation:
          "The shortened landing page collected your phone number and OTP to subscribe your mobile number to expensive premium SMS billing services.",
        rule: "Do not submit phone numbers or verification codes on unverified shortened URLs.",
        cluesUncovered: ["Entered personal OTP on shortened link"],
      },
      download_speedtest_apk: {
        title: "Malware Installed on Smartphone!",
        outcome: "wrong",
        explanation:
          "The speed-test application contained spyware configured to access call logs and contacts.",
        rule: "Never install APKs from public Wi-Fi redirect pages.",
        cluesUncovered: ["Downloaded malicious utility app"],
      },
    },
  },

  // ─── CHALLENGE 06: Fake Payment ───────────────────────────────────────────
  {
    id: "qr_06",
    questId: "qr",
    type: "qr",
    title: "The EV Charging Station Spoofed Gateway",
    difficulty: "hard",
    xp: 150,
    content: {
      itemTitle: "Highway EV Fast Charger #04",
      physicalDescription:
        "You stop your EV at an express highway charging station near Mumbai. A printed QR code on the charger reads: 'Scan to Activate Fast Charge Session (INR 250)'.",
      qrData: {
        label: "EV Charger Activation QR",
        locationContext: "Mumbai-Pune Expressway EV Station",
        rawUrl: "https://quickpay-bharat.test/upi/collect?vpa=rogue-collector@okhdfcbank.test&amt=25000",
        destinationDomain: "quickpay-bharat.test",
        protocol: "https",
        isOverlaySticker: false,
        caption: "Scan with Any UPI App",
      },
      inspectableElements: [
        {
          id: "inspect_upi_params",
          target: "url",
          label: "Deconstruct UPI Deep-Link Parameters",
          clue: "Look closely at 'amt=25000' (INR 25,000 in paise vs INR 250.00) and VPA 'rogue-collector'. The charger's official network is 'PowerGridEV.test'.",
        },
      ],
      availableActions: [
        {
          id: "act_scan_and_enter_pin",
          label: "Scan with UPI App & Enter Your 6-Digit Secret PIN Quickly to Start Urgent Charging",
          evaluationKey: "blind_upi_pin",
        },
        {
          id: "act_trust_bharat_domain",
          label: "Approve Payment Request Because 'Bharat' and 'HDFC' Appear in the URL Text",
          evaluationKey: "trust_keywords_trap",
        },
        {
          id: "act_use_official_ev_app",
          label: "Use Official Verified EV Charging App on Your Phone to Start and Authorize Session",
          evaluationKey: "use_official_app",
        },
        {
          id: "act_test_dummy_pin",
          label: "Scan with UPI App and Enter Dummy PIN '0000' to Test if Payment System Validates",
          evaluationKey: "dummy_pin_trap",
        },
      ],
    },
    evaluation: {
      use_official_app: { outcome: "correct", score: 100, xp: 150, lifeLost: false, key: "use_official_app" },
      blind_upi_pin: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "blind_upi_pin" },
      trust_keywords_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "trust_keywords_trap" },
      dummy_pin_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "dummy_pin_trap" },
    },
    feedback: {
      use_official_app: {
        title: "UPI Tamper Attack Intercepted!",
        outcome: "correct",
        explanation:
          "Brilliant inspection! The QR encoded a direct UPI intent link with an inflated payment amount and a personal mule VPA. Using the verified mobile app protected your account.",
        rule: "Always verify the merchant name and exact debit amount displayed on your UPI app screen before entering your UPI PIN.",
        cluesUncovered: [
          "Inspected UPI deep-link payment parameters",
          "Verified recipient VPA before transaction",
        ],
      },
      blind_upi_pin: {
        title: "INR 25,000 Debited from Bank Account!",
        outcome: "wrong",
        explanation:
          "You entered your secret PIN without checking the merchant name or amount on the UPI confirmation sheet.",
        rule: "Entering your UPI PIN authorizes a debit from your account. Always double-check amount and recipient.",
        cluesUncovered: ["Entered UPI PIN without checking transaction details"],
      },
      trust_keywords_trap: {
        title: "Fooled by Brand Names in Query String!",
        outcome: "wrong",
        explanation:
          "Attackers frequently embed words like 'Bharat', 'Gov', or bank names inside unverified subdomains and parameters to inspire false trust.",
        rule: "Never trust domains based solely on familiar keywords in the URL text.",
        cluesUncovered: ["Fell for brand keyword spoofing"],
      },
      dummy_pin_trap: {
        title: "Transaction Failed but Data Transmitted!",
        outcome: "wrong",
        explanation:
          "Entering invalid PINs still submits your UPI intent session to the receiving gateway. If you accidentally entered your real PIN, the money is gone instantly.",
        rule: "Do not test unverified payment requests with real banking apps.",
        cluesUncovered: ["Attempted unsafe trial with UPI client"],
      },
    },
  },

  // ─── CHALLENGE 07: Physical Tampering ─────────────────────────────────────
  {
    id: "qr_07",
    questId: "qr",
    type: "qr",
    title: "The Merchant Counter Sticker Swap",
    difficulty: "hard",
    xp: 160,
    content: {
      itemTitle: "Merchant Soundbox & UPI Standee",
      physicalDescription:
        "At a busy electronic store in Chandni Chowk, Delhi, you go to pay INR 1,200. You notice the QR code on the payment standee feels thick and the paper surface has slight air bubbles.",
      qrData: {
        label: "Store UPI Payment Standee",
        locationContext: "Retail Store Checkout (Chandni Chowk, Delhi)",
        rawUrl: "https://upi-pay-gateway.test/collect/merchant-clone",
        destinationDomain: "upi-pay-gateway.test",
        protocol: "https",
        isOverlaySticker: true,
        caption: "UPI • Scan to Pay",
      },
      inspectableElements: [
        {
          id: "inspect_bubble_sticker",
          target: "scan",
          label: "Physically Touch & Inspect Standee Surface",
          clue: "Air bubbles and raised adhesive edges confirm a fraudulent sticker was stuck over the merchant's legitimate Soundbox QR code while the cashier looked away!",
        },
        {
          id: "inspect_merchant_name",
          target: "url",
          label: "Verify Payee Name",
          clue: "The decoded merchant name says 'Individual Mule - Ramesh K', while the shop name is 'Gupta Electronics Pvt Ltd'.",
        },
      ],
      availableActions: [
        {
          id: "act_pay_anyway",
          label: "Scan Standee and Pay INR 1,200 Immediately to Save Time in the Busy Queue",
          evaluationKey: "pay_tampered_qr",
        },
        {
          id: "act_inform_cashier",
          label: "Stop Payment; Alert Cashier that Their Standee Has Been Tampered with a Rogue Sticker",
          evaluationKey: "alert_merchant_tamper",
        },
        {
          id: "act_check_tick_only",
          label: "Scan and Pay if UPI App Shows Any Verified Green Tick on the Screen",
          evaluationKey: "trust_green_tick_trap",
        },
        {
          id: "act_pay_cash_silent",
          label: "Pay Cash Instead and Walk Away Without Mentioning the Tampered Standee to the Shopkeeper",
          evaluationKey: "pay_cash_unreported",
        },
      ],
    },
    evaluation: {
      alert_merchant_tamper: { outcome: "correct", score: 100, xp: 160, lifeLost: false, key: "alert_merchant_tamper" },
      pay_tampered_qr: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "pay_tampered_qr" },
      trust_green_tick_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "trust_green_tick_trap" },
      pay_cash_unreported: { outcome: "partial", score: 50, xp: 50, lifeLost: false, key: "pay_cash_unreported" },
    },
    feedback: {
      alert_merchant_tamper: {
        title: "Counterfeit Standee Unmasked!",
        outcome: "correct",
        explanation:
          "Heroic catch! Criminals enter busy shops as pretend customers and slap their own QR sticker over the merchant's standee, stealing all subsequent customer payments.",
        rule: "Always verify that the merchant name announced by the Soundbox or displayed in your UPI app matches the store you are standing in.",
        cluesUncovered: [
          "Discovered air bubbles indicating sticker overlay",
          "Cross-checked shop name with payee VPA",
        ],
      },
      pay_tampered_qr: {
        title: "Money Sent to Impostor!",
        outcome: "wrong",
        explanation:
          "Your INR 1,200 went to the criminal. The shop owner received nothing and demanded payment again.",
        rule: "Confirm payee name matches the merchant.",
        cluesUncovered: ["Paid fraudulent standee overlay"],
      },
      trust_green_tick_trap: {
        title: "Green Tick Misunderstood!",
        outcome: "wrong",
        explanation:
          "A green checkmark in payment apps often only means the VPA format is valid, not that the recipient is the authentic store owner standing in front of you.",
        rule: "Always match the business name explicitly with the merchant.",
        cluesUncovered: ["Misinterpreted VPA validation badge"],
      },
      pay_cash_unreported: {
        title: "Personal Safety (Unreported Hazard)",
        outcome: "partial",
        explanation:
          "You protected your own cash, but dozens of following customers will scan the sticker and lose their money.",
        rule: "Alert store owners immediately when counter payment materials are tampered.",
        cluesUncovered: ["Avoided personal loss but left threat active"],
      },
    },
  },

  // ─── CHALLENGE 08: Social Context ─────────────────────────────────────────
  {
    id: "qr_08",
    questId: "qr",
    type: "chat",
    title: "The Reverse QR 'Cashback' Trap",
    difficulty: "hard",
    xp: 170,
    content: {
      chatPlatform: "WhatsApp / Direct Messaging",
      sender: {
        name: "Buyer on OLX / Marketplace (+91 91234 56789)",
        handle: "+91 91234 56789",
        avatarText: "OLX",
        badge: "Unverified Buyer",
        details: {
          status: "New Contact",
          reports: "2 recent payment fraud flags",
          location: "Unknown",
          trustLevel: "Untrusted",
        },
      },
      messages: [
        {
          senderRole: "vendor",
          senderName: "Buyer (+91 91234 56789)",
          timestamp: "04:30 PM",
          text: "Hi sir, I want to buy your used laptop listed for INR 25,000. I am sending an official UPI Barcode QR. Please scan this in GooglePay / PhonePe and enter your UPI PIN to instantly receive INR 25,000 into your account.",
          attachment: {
            filename: "Instant_Cashback_Receive_INR_25000.png",
            size: "128 KB",
            type: "QR Image",
          },
        },
      ],
      inspectableElements: [
        {
          id: "inspect_upi_rule",
          target: "sender",
          label: "Analyze UPI Fundamentals",
          clue: "FUNDAMENTAL UPI RULE: Scanning a QR code or entering your UPI PIN is ONLY used to SEND money. You NEVER need to scan a QR or enter your PIN to RECEIVE money!",
        },
      ],
      availableActions: [
        {
          id: "act_scan_receive",
          label: "Scan QR in UPI App and Type UPI PIN Expecting INR 25,000 to Credit into Your Bank",
          evaluationKey: "fall_for_reverse_qr",
        },
        {
          id: "act_send_one_rupee_test",
          label: "Type UPI PIN with INR 1 First as a Test to See if Incoming Payment Connects",
          evaluationKey: "test_reverse_qr_trap",
        },
        {
          id: "act_refuse_reverse_qr",
          label: "Refuse & Block Scammer: 'You NEVER need to enter a PIN or scan a QR code to receive money'",
          evaluationKey: "block_reverse_qr",
        },
        {
          id: "act_share_full_bank_details",
          label: "Share Full NetBanking Username, Account Number, and IFSC in Chat Instead",
          evaluationKey: "share_bank_creds_trap",
        },
      ],
    },
    evaluation: {
      block_reverse_qr: { outcome: "correct", score: 100, xp: 170, lifeLost: false, key: "block_reverse_qr" },
      fall_for_reverse_qr: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "fall_for_reverse_qr" },
      test_reverse_qr_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "test_reverse_qr_trap" },
      share_bank_creds_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "share_bank_creds_trap" },
    },
    feedback: {
      block_reverse_qr: {
        title: "Reverse QR Scam Neutralized!",
        outcome: "correct",
        explanation:
          "Golden rule mastered! This is one of the most common scams in India. Attackers send a QR code claiming 'Scan to receive payment'. The moment you enter your UPI PIN, money is debited from your account.",
        rule: "You NEVER need to enter your UPI PIN or scan a QR code to receive money.",
        cluesUncovered: [
          "Applied core UPI principle: PIN is strictly for sending money",
          "Blocked online marketplace reverse-QR scammer",
        ],
      },
      fall_for_reverse_qr: {
        title: "INR 25,000 Debited from Your Account!",
        outcome: "wrong",
        explanation:
          "You scanned the QR and entered your UPI PIN. The transaction authorized a debit of INR 25,000 from your account to the scammer.",
        rule: "Entering your UPI PIN ALWAYS debits your account. Receiving money requires zero action.",
        cluesUncovered: ["Fell for reverse-QR receive money trap"],
      },
      test_reverse_qr_trap: {
        title: "INR 1 Sent; Trap Still Active!",
        outcome: "wrong",
        explanation:
          "Entering your PIN for INR 1 proved the fundamental concept: entering a PIN ALWAYS sends money out of your account, never receives it.",
        rule: "Never enter a PIN to receive money, regardless of amount.",
        cluesUncovered: ["Tested unsafe reverse-QR transfer"],
      },
      share_bank_creds_trap: {
        title: "Over-Disclosure of Banking Data!",
        outcome: "wrong",
        explanation:
          "Sharing full NetBanking usernames and account credentials in unencrypted marketplace chats enables credential stuffing attacks.",
        rule: "Never share sensitive banking credentials in buyer chats.",
        cluesUncovered: ["Over-shared banking data with unknown buyer"],
      },
    },
  },

  // ─── CHALLENGE 09: Ambiguous QR ───────────────────────────────────────────
  {
    id: "qr_09",
    questId: "qr",
    type: "multi_step",
    title: "The Conference Networking Badge QR",
    difficulty: "hard",
    xp: 180,
    content: {
      scenarioBrief:
        "At a cybersecurity summit in Bengaluru, a participant named 'Vikram' hands you his digital networking badge with a QR code.",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Badge Scan Result",
          dialogue: [
            {
              sender: "Optical Scanner Preview",
              role: "system",
              timestamp: "05:15 PM",
              text: "Decoded URL: 'https://connect-summit-pass.test/vcard/import?ref=vk99'. Link prompts to download 'ContactSync.apk' to view profile.",
            },
          ],
          inspectableClues: [
            "A digital business card (vCard) should simply be a .vcf text file or web page, NOT an Android package (.apk) installation file!",
            "Requesting APK sideloading is a severe malware infection vector.",
          ],
          availableActions: [
            {
              id: "act_install_apk",
              label: "Allow Unknown Sources & Sideload 'ContactSync.apk' to Import Contacts",
              type: "advance",
              nextStep: "step_2_infected",
            },
            {
              id: "act_download_inspect_perms",
              label: "Download APK File to Inspect Permissions in File Manager Before Deciding",
              type: "advance",
              nextStep: "step_2_downloaded_risk",
            },
            {
              id: "act_abort_apk",
              label: "Cancel Installation Immediately; Decline APK Sideload and Discard Rogue Badge",
              type: "advance",
              nextStep: "step_2_safe",
            },
          ],
        },
        {
          id: "step_2_safe",
          stepNumber: 2,
          contextTitle: "Incident Prevented",
          dialogue: [
            {
              sender: "Mobile Threat Defense",
              role: "system",
              timestamp: "05:17 PM",
              text: "APK blocked. Threat intelligence identifies 'ContactSync.apk' as a banking Trojan with SMS permission hijacking.",
            },
          ],
          inspectableClues: ["Saved device from Android banking trojan."],
          availableActions: [
            {
              id: "act_complete_qr_audit",
              label: "Finalize Threat Report & Warn Conference Security",
              evaluationKey: "blocked_apk_quishing",
            },
          ],
        },
        {
          id: "step_2_downloaded_risk",
          stepNumber: 2,
          contextTitle: "Hostile Package on Storage",
          dialogue: [
            {
              sender: "Storage Sentinel",
              role: "system",
              timestamp: "05:16 PM",
              text: "Warning: 'ContactSync.apk' contains embedded obfuscated payload attempting automatic intent execution.",
            },
          ],
          inspectableClues: ["Malicious binary staged on device storage."],
          availableActions: [
            {
              id: "act_purge_and_report",
              label: "Purge Downloaded Binary Immediately & Escalate to Security",
              evaluationKey: "purged_apk_quishing",
            },
          ],
        },
        {
          id: "step_2_infected",
          stepNumber: 2,
          contextTitle: "Device Compromised",
          dialogue: [
            {
              sender: "System Alert",
              role: "system",
              timestamp: "05:16 PM",
              text: "CRITICAL: Malicious APK granted SMS and accessibility permissions. Banking OTPs are being intercepted.",
            },
          ],
          inspectableClues: ["Malware granted full device oversight."],
          availableActions: [
            {
              id: "act_acknowledge_apk_trojan",
              label: "Acknowledge Device Compromise & Initiate Factory Reset",
              evaluationKey: "apk_quishing_failed",
            },
          ],
        },
      ],
    },
    evaluation: {
      blocked_apk_quishing: { outcome: "correct", score: 100, xp: 180, lifeLost: false, key: "blocked_apk_quishing" },
      purged_apk_quishing: { outcome: "partial", score: 60, xp: 80, lifeLost: false, key: "purged_apk_quishing" },
      apk_quishing_failed: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "apk_quishing_failed" },
    },
    feedback: {
      blocked_apk_quishing: {
        title: "Android Quishing Dropper Thwarted!",
        outcome: "correct",
        explanation:
          "Masterful discernment. Legitimate business cards never require installing an APK file. Any QR code prompting for application installations should be treated as high-risk malware.",
        rule: "Never sideload APKs or grant accessibility permissions prompted by a QR code scan.",
        cluesUncovered: [
          "Identified malicious APK payload disguised as contact card",
          "Blocked mobile banking Trojan installation",
        ],
      },
      purged_apk_quishing: {
        title: "Risky Download Purged (Partial)",
        outcome: "partial",
        explanation:
          "You deleted the malicious file before installation, but downloading unknown binaries onto storage carries zero-day dropper risks.",
        rule: "Reject APK downloads immediately at the browser prompt.",
        cluesUncovered: ["Downloaded and manually purged hostile binary"],
      },
      apk_quishing_failed: {
        title: "Banking Trojan Installed!",
        outcome: "wrong",
        explanation:
          "The sideloaded APK intercepted incoming SMS OTP messages and drained linked payment apps.",
        rule: "Never install apps from unverified QR code links.",
        cluesUncovered: ["Installed hostile APK from badge scan"],
      },
    },
  },

  // ─── CHALLENGE 10: THE QR JOURNEY SIMULATION ──────────────────────────────
  {
    id: "qr_10",
    questId: "qr",
    type: "simulation",
    title: "The Quishing Incident Journey Simulation",
    difficulty: "hard",
    xp: 200,
    content: {
      simulationTitle: "MULTI-STAGE QUISHING ATTACK INVESTIGATION",
      missionObjective:
        "Trace an end-to-end quishing campaign starting from a public airport promotional standee. Inspect each hop across the journey (Physical Poster → Scanner HUD → Browser Redirect → Login Clone → UPI Payment Request) and abort the chain at the critical junction.",
      timeRemaining: "04:15",
      totalCluesCount: 5,
      environments: ["poster", "browser", "payment", "notifications"],
      initialEnvironment: "poster",
      environmentMeta: {
        poster: { label: "1. Physical Poster" },
        browser: { label: "2. Browser Hop", badge: "Redirect" },
        payment: { label: "3. Payment Request", badge: "Active Trap" },
        notifications: { label: "4. Threat Intel", badge: "1 Alert" },
      },
      inspectableElements: [
        {
          id: "clue_poster_tamper",
          label: "Inspect Airport Lounge Poster",
          clue: "A sticker overlay has been pasted over the Kempegowda Bengaluru Airport lounge Wi-Fi poster.",
        },
        {
          id: "clue_browser_hop_redirect",
          label: "Inspect Browser Redirect Chain",
          clue: "The QR leads to 'airport-wifi-login.test' which executes a meta-refresh redirect to 'pay-portal-secure-checkout.invalid'.",
        },
        {
          id: "clue_ssl_mismatch",
          label: "Inspect SSL Certificate Mismatch",
          clue: "SSL certificate is registered to a private individual in Panama, not Bengaluru International Airport Authority.",
        },
        {
          id: "clue_payment_demand",
          label: "Inspect INR 1 Verification Charge",
          clue: "Page demands 'INR 1 refundable token fee via NetBanking' to harvest full banking login credentials.",
        },
        {
          id: "clue_cert_in_advisory",
          label: "Inspect CERT-In Quishing Advisory",
          clue: "CERT-In advisory warns of quishing campaigns at transit hubs deploying fake 'INR 1 verification' credential harvesters.",
        },
      ],
      environmentData: {
        poster: {
          items: [
            {
              category: "STAGE 1: PHYSICAL ENVIRONMENT",
              title: "Airport Lounge Wi-Fi Standee",
              timestamp: "Physical Scan",
              metaFields: [
                { label: "Location", value: "Gate 18 Lounge, Bengaluru Airport" },
                { label: "Surface Type", value: "Adhesive Vinyl Sticker Overlay" },
                { label: "Claimed Service", value: "Complimentary VIP High-Speed Wi-Fi" },
              ],
              text: "A shiny sticker is placed over the official lounge acrylic standee with the text 'Scan for 1-Click Airport Lounge High-Speed Internet'.",
              highlightBox: {
                title: "PHYSICAL ANOMALY",
                text: "The sticker edge is slightly misaligned with the official printed frame underneath.",
              },
            },
          ],
        },
        browser: {
          items: [
            {
              category: "STAGE 2: NETWORK HOP & BROWSER",
              title: "Redirect Chain Trace",
              timestamp: "HTTP 302 Hop",
              metaFields: [
                { label: "Hop 1 (Decoded)", value: "https://airport-wifi.test/login" },
                { label: "Hop 2 (Redirect)", value: "https://pay-portal-secure-checkout.invalid/auth/netbanking" },
                { label: "SSL Issuer", value: "Let's Encrypt Free Authority" },
              ],
              text: "The browser immediately bounces from the initial domain to an external unverified payment portal demanding NetBanking authentication.",
            },
          ],
        },
        payment: {
          items: [
            {
              category: "STAGE 3: HARVESTING ATTEMPT",
              title: "INR 1.00 Identity Verification Trap",
              timestamp: "Awaiting Action",
              metaFields: [
                { label: "Required Fields", value: "Bank Name, User ID, Password, Profile Password" },
                { label: "Pretext", value: "Mandatory TRAI / KYC INR 1 verification fee" },
              ],
              text: "The page asks you to select your bank (SBI / HDFC / ICICI) and enter your NetBanking username and transaction password to 'verify your Indian mobile identity'.",
              highlightBox: {
                title: "CREDENTIAL HARVESTING CRITICAL ZONE",
                text: "Official airport Wi-Fi only requires an OTP sent to your phone, NEVER NetBanking credentials!",
              },
            },
          ],
        },
        notifications: {
          items: [
            {
              category: "STAGE 4: CYBER INTELLIGENCE",
              title: "National Cyber Crime Reporting Portal Alert",
              timestamp: "Recent Bulletin",
              metaFields: [
                { label: "Advisory ID", value: "CYBER-2026-QR-99" },
              ],
              text: "Quishing syndicates are placing sticker overlays at airport lounges targeting business travellers with fake NetBanking verification traps.",
            },
          ],
        },
      },
      availableActions: [
        {
          id: "act_sim_enter_netbanking",
          label: "Enter NetBanking User ID and Password to Complete the INR 1 Verification",
          evaluationKey: "sim_submit_netbanking_quish",
        },
        {
          id: "act_sim_test_fake_creds",
          label: "Enter Dummy NetBanking Credentials to See if the Server Rejects Fake User IDs",
          evaluationKey: "sim_submit_fake_netbanking",
        },
        {
          id: "act_sim_abort_quish",
          label: "Abort Chain: Close Tab, Refuse NetBanking Entry & Report Sticker to Airport Security Desk",
          evaluationKey: "sim_abort_quishing_chain",
        },
        {
          id: "act_sim_ignore_only",
          label: "Close Tab on Phone and Walk Away Without Reporting the Sticker",
          evaluationKey: "sim_quish_unreported",
        },
      ],
    },
    evaluation: {
      sim_abort_quishing_chain: { outcome: "correct", score: 100, xp: 200, lifeLost: false, key: "sim_abort_quishing_chain" },
      sim_submit_netbanking_quish: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "sim_submit_netbanking_quish" },
      sim_submit_fake_netbanking: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "sim_submit_fake_netbanking" },
      sim_quish_unreported: { outcome: "partial", score: 50, xp: 70, lifeLost: false, key: "sim_quish_unreported" },
    },
    feedback: {
      sim_abort_quishing_chain: {
        title: "QR JOURNEY SIMULATION: ATTACK CHAIN SEVERED!",
        outcome: "correct",
        explanation:
          "Masterful defense across every stage! You inspected the physical sticker overlay, traced the HTTP 302 redirect hopping to a rogue domain, identified the bogus 'INR 1 NetBanking verification' pretext, and reported the physical device to airport security.",
        rule: "Real quishing defenses combine physical inspection, URL redirect analysis, and refusal to surrender credentials on unverified gateways.",
        cluesUncovered: [
          "Spotted physical adhesive overlay on airport standee",
          "Traced multi-hop HTTP redirect chain to rogue domain",
          "Recognized NetBanking harvesting pretext for Wi-Fi",
          "Alerted airport security to remove physical sticker",
        ],
      },
      sim_submit_netbanking_quish: {
        title: "NETBANKING CREDENTIALS SURRENDERED!",
        outcome: "wrong",
        explanation:
          "You entered your NetBanking password into a rogue quishing gateway for fake airport Wi-Fi. Attackers immediately initiated unauthorized wire transfers.",
        rule: "Public Wi-Fi never requires bank logins or NetBanking credentials.",
        cluesUncovered: ["Surrendered bank credentials to quishing portal"],
      },
      sim_submit_fake_netbanking: {
        title: "INTERACTIVE HONEYPOT TRAP TRIGGERED!",
        outcome: "wrong",
        explanation:
          "Quishing harvesters accept any typed input and immediately prompt for SMS OTPs, while recording your IP and device fingerprint.",
        rule: "Never interact with malicious harvesting portals; close the connection immediately.",
        cluesUncovered: ["Interacted with active credential harvester"],
      },
      sim_quish_unreported: {
        title: "PARTIAL SUCCESS (UNREPORTED)",
        outcome: "partial",
        explanation:
          "You protected your own account by closing the tab, but leaving the tampered sticker on the airport standee puts dozens of other passengers at risk.",
        rule: "Always report tampered public QR codes to venue staff.",
        cluesUncovered: ["Avoided personal loss but left threat active for others"],
      },
    },
  },
];
