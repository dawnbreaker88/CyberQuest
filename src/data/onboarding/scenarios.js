export const onboardingScenarios = [
  // 01 — PHISHING
  {
    id: "baseline_phishing_01",
    category: "phishing",
    categoryName: "Phishing",
    context: "You're checking your university email inbox on Monday morning.",
    source: "UNIVERSITY IT SUPPORT",
    sender: "it-support@univer5ity.test",
    subject: "URGENT: Your account requires immediate verification",
    body: "Your campus account has been flagged for suspicious logins and will be permanently disabled within 24 hours. Verify your credentials immediately via our self-service portal: https://university-ver1fy.test/portal",
    options: [
      { id: "open", label: "Open the link immediately to prevent account suspension" },
      { id: "inspect", label: "Inspect the sender domain and link URL for character typos" },
      { id: "forward", label: "Forward the email to your personal account to test on your phone" },
      { id: "report", label: "Contact university IT directly through official campus channels" }
    ],
    scoring: {
      open: 0,
      inspect: 2,
      forward: 1,
      report: 3
    }
  },
  // 02 — PHISHING
  {
    id: "baseline_phishing_02",
    category: "phishing",
    categoryName: "Phishing",
    context: "You receive a notification from an online cloud storage provider.",
    source: "CLOUD STORAGE ALERT",
    sender: "billing@cl0ud-drive-support.test",
    subject: "Receipt for Annual Subscription Renewal: $299.00",
    body: "Thank you for your renewal. If you did not authorize this $299 charge, click the dispute button below within 60 minutes to request an instant reversal.",
    options: [
      { id: "dispute", label: "Click Dispute Charge immediately to stop the $299 withdrawal" },
      { id: "check_bank", label: "Check your actual bank/card statement directly in your banking app" },
      { id: "reply", label: "Reply directly to the email stating you did not make this purchase" },
      { id: "ignore", label: "Delete the email without checking anything" }
    ],
    scoring: {
      dispute: 0,
      check_bank: 3,
      reply: 1,
      ignore: 2
    }
  },

  // 03 — PASSWORD SECURITY
  {
    id: "baseline_passwords_01",
    category: "passwords",
    categoryName: "Passwords",
    context: "You're setting up a master password for your primary email and password manager.",
    source: "ACCOUNT SECURITY SETUP",
    sender: "System Prompt",
    subject: "Choose your primary master passphrase",
    body: "Select the strategy that offers the highest protection against automated dictionary and hash cracking attacks.",
    options: [
      { id: "complex_short", label: "P@$$w0rd!1 (8 characters with symbols and substitutions)" },
      { id: "passphrase", label: "timber-coastal-orbit-velvet (4 random unrelated words with high entropy)" },
      { id: "personal", label: "DogName2026! (combines pet name, birth year, and an exclamation mark)" },
      { id: "reuse", label: "Your favorite familiar password that you use everywhere" }
    ],
    scoring: {
      complex_short: 1,
      passphrase: 3,
      personal: 1,
      reuse: 0
    }
  },
  // 04 — PASSWORD SECURITY
  {
    id: "baseline_passwords_02",
    category: "passwords",
    categoryName: "Passwords",
    context: "A public data breach leak exposes passwords from a gaming forum you joined 4 years ago.",
    source: "SECURITY NEWS BULLETIN",
    sender: "Breach Notification Service",
    subject: "Your email appeared in a recent credential dump",
    body: "The gaming forum database leaked plain hashes. You used a variation of your current standard password on that forum.",
    options: [
      { id: "nothing", label: "Do nothing since you haven't visited that gaming forum in years" },
      { id: "reset_gaming", label: "Change only your gaming forum password" },
      { id: "full_audit", label: "Update passwords across all accounts sharing that password & enable 2FA" },
      { id: "wait", label: "Wait until one of your bank accounts sends a warning notification" }
    ],
    scoring: {
      nothing: 0,
      reset_gaming: 1,
      full_audit: 3,
      wait: 0
    }
  },

  // 05 — QR SAFETY
  {
    id: "baseline_qr_01",
    category: "qr",
    categoryName: "QR Safety",
    context: "You're parking at a downtown metered spot.",
    source: "PHYSICAL PARKING KIOSK",
    sender: "Parking Meter Terminal",
    subject: "Payment options",
    body: "You notice a printed vinyl QR code sticker pasted OVER the official LCD screen instructions stating: 'Scan here for Quick Pay contactless checkout via FastPark'.",
    options: [
      { id: "scan_pay", label: "Scan the QR code and enter your card details on the mobile website" },
      { id: "inspect_kiosk", label: "Check if the sticker is an overlay tamper and use the official hardware slot" },
      { id: "scan_preview", label: "Scan the code just to preview the URL without buying anything" },
      { id: "park_free", label: "Assume the meter is broken and leave without paying" }
    ],
    scoring: {
      scan_pay: 0,
      inspect_kiosk: 3,
      scan_preview: 1,
      park_free: 1
    }
  },
  // 06 — QR SAFETY
  {
    id: "baseline_qr_02",
    category: "qr",
    categoryName: "QR Safety",
    context: "You receive a package in the mail with a flyer inside.",
    source: "DELIVERY INSERTS",
    sender: "Promotional Delivery Card",
    subject: "Claim your $50 Gift Card Reward",
    body: "A flyer with a prominent QR code reads: 'Scan now with your camera to claim a $50 gift card for reviewing your recent order.'",
    options: [
      { id: "scan_claim", label: "Scan and fill out the survey with your home address and email" },
      { id: "inspect_url", label: "Verify order through the official merchant app without scanning untrusted flyers" },
      { id: "share_friend", label: "Send a photo of the QR code to a group chat" },
      { id: "scan_camera", label: "Scan it with camera to see what app it tries to launch" }
    ],
    scoring: {
      scan_claim: 0,
      inspect_url: 3,
      share_friend: 0,
      scan_camera: 1
    }
  },

  // 07 — SCAMS
  {
    id: "baseline_scams_01",
    category: "scams",
    categoryName: "Scams",
    context: "You receive an SMS text on your phone.",
    source: "INCOMING SMS",
    sender: "+1 (555) 018-4921",
    subject: "Package Delivery Attempt Failed",
    body: "USPS Notice: Your package could not be delivered due to an incomplete street address. Update your details within 12 hours at usps-address-redelivery.test/track to avoid return to sender.",
    options: [
      { id: "click_sms", label: "Click the SMS link immediately to confirm your address" },
      { id: "reply_stop", label: "Reply 'STOP' to the text message" },
      { id: "check_official", label: "Go directly to the official USPS website or app using your original tracking number" },
      { id: "call_sender", label: "Call the +1 (555) phone number back to speak with the delivery driver" }
    ],
    scoring: {
      click_sms: 0,
      reply_stop: 1,
      check_official: 3,
      call_sender: 1
    }
  },
  // 08 — SCAMS
  {
    id: "baseline_scams_02",
    category: "scams",
    categoryName: "Scams",
    context: "You receive an urgent direct message on Discord / Telegram from an old mutual friend.",
    source: "DIRECT CHAT MESSAGE",
    sender: "FriendAccount_99",
    subject: "Urgent favor needed",
    body: "Hey! I'm competing in an esports championship vote and I'm only 2 votes away from qualifying! Can you please vote for my team here? [link]. It only takes a quick Steam login!",
    options: [
      { id: "login_steam", label: "Click link and log in with Steam to support your friend" },
      { id: "verify_voice", label: "Message or call your friend through a secondary channel to see if their account was compromised" },
      { id: "send_password", label: "Ask them why they need your Steam login" },
      { id: "block_silent", label: "Block the account immediately without telling anyone" }
    ],
    scoring: {
      login_steam: 0,
      verify_voice: 3,
      send_password: 1,
      block_silent: 2
    }
  },

  // 09 — SOCIAL ENGINEERING
  {
    id: "baseline_socialEngineering_01",
    category: "socialEngineering",
    categoryName: "Social Engineering",
    context: "You're at your desk when your phone rings from a number labeled with your bank's name.",
    source: "INCOMING PHONE CALL",
    sender: "+1 (800) 555-BANK",
    subject: "Fraud Prevention Department",
    body: "Caller: 'Hello, this is Marcus from Fraud Prevention. We see an unauthorized $850 wire transfer pending. To cancel it, I've just sent a one-time verification code to your phone. Please read back the 6-digit code to me now.'",
    options: [
      { id: "read_code", label: "Read the 6-digit SMS code to Marcus so he can stop the fraudulent wire" },
      { id: "hangup_call_back", label: "Hang up immediately and call the official customer service number printed on your physical bank card" },
      { id: "ask_name", label: "Ask Marcus for his employee ID and badge number to confirm his identity" },
      { id: "give_ssn", label: "Offer your SSN or card PIN instead of the OTP" }
    ],
    scoring: {
      read_code: 0,
      hangup_call_back: 3,
      ask_name: 1,
      give_ssn: 0
    }
  },
  // 10 — SOCIAL ENGINEERING
  {
    id: "baseline_socialEngineering_02",
    category: "socialEngineering",
    categoryName: "Social Engineering",
    context: "You're working remotely and receive an urgent message from your manager on WhatsApp.",
    source: "MOBILE CHAT",
    sender: "+1 (555) 012-9844 (Manager's Photo)",
    subject: "Urgent executive task",
    body: "'Hey, I'm stuck in a confidential executive board meeting and can't take calls. I need you to purchase 5 Apple gift cards worth $100 each for the client presentation. Send the scratch-off claim codes here ASAP. I will reimburse you by EOD.'",
    options: [
      { id: "buy_cards", label: "Rush to purchase the gift cards to ensure the client presentation succeeds" },
      { id: "verify_slack", label: "Verify the request through official corporate Slack or company email before spending anything" },
      { id: "ask_card_details", label: "Ask your manager for the company credit card number in the chat" },
      { id: "refuse_rudely", label: "Refuse the request and ignore your manager" }
    ],
    scoring: {
      buy_cards: 0,
      verify_slack: 3,
      ask_card_details: 1,
      refuse_rudely: 2
    }
  }
];

export const domainInsights = {
  phishing: {
    strengthTitle: "PHISHING DEFENSE",
    strengthDesc: "You consistently scrutinize sender addresses, link domains, and artificial urgency before clicking.",
    blindSpotTitle: "PHISHING BLIND SPOT",
    blindSpotDesc: "Deceptive domain character substitutions and lookalike alerts can occasionally slip past your quick glance."
  },
  passwords: {
    strengthTitle: "CREDENTIAL ARCHITECTURE",
    strengthDesc: "You prioritize high-entropy passphrases and strict account isolation over predictable keyword patterns.",
    blindSpotTitle: "CREDENTIAL REUSE RISK",
    blindSpotDesc: "You might rely on familiar password variations that are vulnerable if one secondary service is breached."
  },
  qr: {
    strengthTitle: "PHYSICAL TAMPER SKEPTICISM",
    strengthDesc: "You verify terminal authenticity and avoid scanning untrusted QR stickers placed in public environments.",
    blindSpotTitle: "QUISHING BLIND SPOT",
    blindSpotDesc: "Disguised QR codes in public kiosks or flyers could lead you to unverified mobile credential traps."
  },
  scams: {
    strengthTitle: "MANIPULATION RESISTANCE",
    strengthDesc: "You pause and verify parcel alerts, unexpected charges, and emergency favors through out-of-band channels.",
    blindSpotTitle: "PANIC TRIGGER VULNERABILITY",
    blindSpotDesc: "Urgent financial countdowns or delivery cancellation notices can induce hasty decisions under stress."
  },
  socialEngineering: {
    strengthTitle: "AUTHORITY & PRETEXT RESISTANCE",
    strengthDesc: "You reject urgent requests from authority figures and verify phone/chat caller claims through established channels.",
    blindSpotTitle: "EXECUTIVE & VISHING PRESSURE",
    blindSpotDesc: "Direct calls from apparent authorities or managers claiming emergencies can make you hesitant to challenge them."
  }
};
