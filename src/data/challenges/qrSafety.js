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
          id: "act_view_menu",
          label: "Open Menu URL in Browser",
          variant: "primary",
          evaluationKey: "open_legit_menu",
        },
        {
          id: "act_report_safe_qr",
          label: "Report Menu as Malicious Quishing to Police",
          variant: "secondary",
          evaluationKey: "false_alarm_report",
        },
      ],
    },
    evaluation: {
      open_legit_menu: { outcome: "correct", score: 100, xp: 100, lifeLost: false, key: "open_legit_menu" },
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
      false_alarm_report: {
        title: "False Alarm (Partial)",
        outcome: "partial",
        explanation:
          "This was a legitimate cafe menu. The goal of cybersecurity is discerning genuine interactions from threats, not blocking normal digital services.",
        rule: "Evaluate context and domain validity rather than rejecting all QR codes unconditionally.",
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
          id: "act_alert_parking_warden",
          label: "Do Not Scan; Alert Parking Attendant to Fraudulent Sticker Overlay",
          variant: "primary",
          evaluationKey: "report_sticker_overlay",
        },
        {
          id: "act_pay_sticker",
          label: "Scan & Pay Parking Fee on the Decoded Link",
          variant: "danger",
          evaluationKey: "pay_quishing_sticker",
        },
      ],
    },
    evaluation: {
      report_sticker_overlay: { outcome: "correct", score: 100, xp: 110, lifeLost: false, key: "report_sticker_overlay" },
      pay_quishing_sticker: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "pay_quishing_sticker" },
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
          label: "Decline to Scan; Report Rogue Standee to Conference Organizers",
          variant: "primary",
          evaluationKey: "refuse_swag_quishing",
        },
        {
          id: "act_scan_oauth",
          label: "Scan QR & Authorize Google OAuth Access to Claim T-Shirt",
          variant: "danger",
          evaluationKey: "authorize_oauth_trap",
        },
      ],
    },
    evaluation: {
      refuse_swag_quishing: { outcome: "correct", score: 100, xp: 120, lifeLost: false, key: "refuse_swag_quishing" },
      authorize_oauth_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "authorize_oauth_trap" },
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
          id: "act_pay_official_app",
          label: "Discard QR; Pay Directly via Official Discom App / Electricity Board Portal",
          variant: "primary",
          evaluationKey: "pay_direct_app",
        },
        {
          id: "act_follow_redirect",
          label: "Trust the First Domain Name and Enter NetBanking PIN on the Redirected Page",
          variant: "danger",
          evaluationKey: "follow_open_redirect",
        },
      ],
    },
    evaluation: {
      pay_direct_app: { outcome: "correct", score: 100, xp: 130, lifeLost: false, key: "pay_direct_app" },
      follow_open_redirect: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "follow_open_redirect" },
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
          id: "act_connect_native",
          label: "Do Not Scan; Connect to Wi-Fi via Phone Settings / Captive Portal Only",
          variant: "primary",
          evaluationKey: "native_wifi_only",
        },
        {
          id: "act_install_profile",
          label: "Scan Shortened Link & Install Requested Configuration Profile",
          variant: "danger",
          evaluationKey: "install_rogue_profile",
        },
      ],
    },
    evaluation: {
      native_wifi_only: { outcome: "correct", score: 100, xp: 140, lifeLost: false, key: "native_wifi_only" },
      install_rogue_profile: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "install_rogue_profile" },
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
          id: "act_use_official_ev_app",
          label: "Use Official Verified EV Charging App on Your Phone to Start Session",
          variant: "primary",
          evaluationKey: "use_official_app",
        },
        {
          id: "act_scan_and_enter_pin",
          label: "Scan with UPI App & Enter Your 6-Digit Secret PIN without Checking Amount",
          variant: "danger",
          evaluationKey: "blind_upi_pin",
        },
      ],
    },
    evaluation: {
      use_official_app: { outcome: "correct", score: 100, xp: 150, lifeLost: false, key: "use_official_app" },
      blind_upi_pin: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "blind_upi_pin" },
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
          id: "act_inform_cashier",
          label: "Stop Payment; Alert the Cashier that Their Standee Has Been Tampered",
          variant: "primary",
          evaluationKey: "alert_merchant_tamper",
        },
        {
          id: "act_pay_anyway",
          label: "Pay the QR Code Anyway to Save Time",
          variant: "danger",
          evaluationKey: "pay_tampered_qr",
        },
      ],
    },
    evaluation: {
      alert_merchant_tamper: { outcome: "correct", score: 100, xp: 160, lifeLost: false, key: "alert_merchant_tamper" },
      pay_tampered_qr: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "pay_tampered_qr" },
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
          id: "act_refuse_reverse_qr",
          label: "Refuse & Block Scammer: 'You do not enter PIN or scan QR to receive money'",
          variant: "primary",
          evaluationKey: "block_reverse_qr",
        },
        {
          id: "act_scan_receive",
          label: "Scan the QR and Type Your UPI PIN Expecting to Receive INR 25,000",
          variant: "danger",
          evaluationKey: "fall_for_reverse_qr",
        },
      ],
    },
    evaluation: {
      block_reverse_qr: { outcome: "correct", score: 100, xp: 170, lifeLost: false, key: "block_reverse_qr" },
      fall_for_reverse_qr: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "fall_for_reverse_qr" },
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
              id: "act_abort_apk",
              label: "Cancel Installation Immediately & Discard Malicious Badge",
              type: "advance",
              nextStep: "step_2_safe",
            },
            {
              id: "act_install_apk",
              label: "Allow Unknown Sources & Sideload 'ContactSync.apk'",
              type: "advance",
              nextStep: "step_2_infected",
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
              label: "Finalize Threat Report",
              variant: "primary",
              evaluationKey: "blocked_apk_quishing",
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
              label: "Acknowledge Infection",
              variant: "danger",
              evaluationKey: "apk_quishing_failed",
            },
          ],
        },
      ],
    },
    evaluation: {
      blocked_apk_quishing: { outcome: "correct", score: 100, xp: 180, lifeLost: false, key: "blocked_apk_quishing" },
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
          id: "act_sim_abort_quish",
          label: "Abort Chain: Close Tab, Refuse NetBanking Entry & Report Sticker to Airport Security Desk",
          variant: "primary",
          evaluationKey: "sim_abort_quishing_chain",
        },
        {
          id: "act_sim_enter_netbanking",
          label: "Enter NetBanking User ID and Password to Complete the INR 1 Verification",
          variant: "danger",
          evaluationKey: "sim_submit_netbanking_quish",
        },
        {
          id: "act_sim_ignore_only",
          label: "Close Tab on Phone and Walk Away Without Reporting the Sticker",
          variant: "secondary",
          evaluationKey: "sim_quish_unreported",
        },
      ],
    },
    evaluation: {
      sim_abort_quishing_chain: { outcome: "correct", score: 100, xp: 200, lifeLost: false, key: "sim_abort_quishing_chain" },
      sim_submit_netbanking_quish: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "sim_submit_netbanking_quish" },
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
