/**
 * Scams Quest Challenge Suite (10 Challenges)
 * Track: 04 — SCAMS
 * Progression: 01-03 (Delivery / Refund / Prize Scams), 04-06 (Support / Escrow / Distress Emergencies), 07-09 (Investment / Bank Pretexting / Recovery Traps), 10 (Full Scam Day Simulated Phone Hub)
 * Strictly fictional safe domains: .test, .example, .invalid
 */

export const scamChallenges = [
  // ─── CHALLENGE 01: Fake Delivery SMS ──────────────────────────────────────
  {
    id: "scams_01",
    questId: "scams",
    type: "chat",
    title: "The Missed Parcel Delivery Fee",
    difficulty: "easy",
    xp: 100,
    content: {
      chatPlatform: "SMS Messenger",
      sender: {
        name: "SpeedFast Couriers (+91 99887 76655)",
        handle: "+91 99887 76655",
        avatarText: "SMS",
        badge: "Unknown Number",
        details: {
          status: "Unregistered Sender",
          reports: "12 fraud reports today",
          location: "Virtual SMS Gateway",
          trustLevel: "Suspicious",
        },
      },
      messages: [
        {
          senderRole: "vendor",
          senderName: "SpeedFast SMS (+91 99887 76655)",
          timestamp: "09:15 AM",
          text: "ALERT: Your SpeedFast parcel #SF-9914 cannot be delivered to your Bengaluru address due to incorrect street number. Pay INR 15 re-routing fee within 12 hours to avoid package return: https://speedfast-courier-update.test/pay-fee",
        },
      ],
      inspectableElements: [
        {
          id: "inspect_sms_header",
          target: "sender",
          label: "Inspect SMS Sender Header",
          clue: "Official couriers send SMS via verified 6-character sender headers (e.g. 'VK-BLDRT', 'AD-IPOST'), NEVER from personal 10-digit mobile numbers (+91 99887 76655).",
        },
        {
          id: "inspect_fee_trap",
          target: "messages",
          label: "Analyze INR 15 Fee Lure",
          clue: "The tiny INR 15 fee is a lure to get you to type your full debit card number, CVV, and OTP into a phishing portal.",
        },
      ],
      availableActions: [
        {
          id: "act_pay_15_fee",
          label: "Click Link and Enter Debit Card Details to Pay INR 15 to Avoid Parcel Return",
          evaluationKey: "pay_fake_parcel_fee",
        },
        {
          id: "act_reply_sms_query",
          label: "Reply to the SMS Asking for the Sender Name and Item Description",
          evaluationKey: "reply_smishing_sms",
        },
        {
          id: "act_block_sms_scam",
          label: "Block Number, Mark SMS as Spam & Check Tracking Directly on Official Courier App",
          evaluationKey: "block_parcel_scam",
        },
        {
          id: "act_enter_fake_card",
          label: "Open the Link and Submit Dummy Card Details to Test if the Website Rejects Them",
          evaluationKey: "dummy_card_smishing_test",
        },
      ],
    },
    evaluation: {
      block_parcel_scam: { outcome: "correct", score: 100, xp: 100, lifeLost: false, key: "block_parcel_scam" },
      pay_fake_parcel_fee: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "pay_fake_parcel_fee" },
      reply_smishing_sms: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "reply_smishing_sms" },
      dummy_card_smishing_test: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "dummy_card_smishing_test" },
    },
    feedback: {
      block_parcel_scam: {
        title: "Parcel Smishing Neutralized!",
        outcome: "correct",
        explanation:
          "Excellent detection. Courier smishing is rampant across India. Scammers send fake delivery failure alerts from random 10-digit mobile numbers to trick victims into entering card details for tiny token amounts.",
        rule: "Legitimate delivery companies never send SMS from personal 10-digit mobile numbers or demand unverified online re-routing fees via link.",
        cluesUncovered: [
          "Identified personal 10-digit number disguised as courier header",
          "Recognized micro-fee credential harvesting lure",
        ],
      },
      pay_fake_parcel_fee: {
        title: "Debit Card Compromised!",
        outcome: "wrong",
        explanation:
          "The INR 15 payment page was a harvesting clone. The attacker used your card details to execute a fraudulent INR 45,000 transaction.",
        rule: "Never enter card details on links received via unsolicited SMS.",
        cluesUncovered: ["Entered card details on unverified smishing link"],
      },
      reply_smishing_sms: {
        title: "Phone Number Flagged as Active Target!",
        outcome: "wrong",
        explanation:
          "Replying to smishing messages confirms to automated dialing systems that your number is active and monitored, triggering high-frequency scam campaigns.",
        rule: "Do not reply to unsolicited phishing messages.",
        cluesUncovered: ["Confirmed active phone line to scammers"],
      },
      dummy_card_smishing_test: {
        title: "Browser Fingerprinted by Harvester!",
        outcome: "wrong",
        explanation:
          "Interacting with harvesting forms passes session tokens and browser fingerprints to the attacker's infrastructure.",
        rule: "Never interact with malicious domains.",
        cluesUncovered: ["Engaged with hostile web form"],
      },
    },
  },

  // ─── CHALLENGE 02: Fake Refund Email ──────────────────────────────────────
  {
    id: "scams_02",
    questId: "scams",
    type: "email",
    title: "The Accidental Over-Refund Trap",
    difficulty: "easy",
    xp: 110,
    content: {
      clientMeta: {
        folder: "Inbox",
        accountEmail: "priya.nair@example.test",
      },
      sender: {
        name: "BharatMart Customer Billing",
        email: "refund-desk@bharatmart-care.test",
        avatarText: "BM",
      },
      recipient: "priya.nair@example.test",
      subject: "URGENT NOTICE: Over-Refund Error of INR 45,000 for Order #8821",
      timestamp: "Today at 10:45 AM",
      bodyHtml: `
        <p>Dear Customer Priya,</p>
        <p>Our automated accounts software made an accounting error. Instead of processing your INR 450 return refund for Order #8821, our system accidentally credited <strong>INR 45,000</strong> to your virtual account.</p>
        <p>Please click below immediately to return the excess INR 44,550 to our settlement UPI ID before our staff member is terminated by management:</p>
      `,
      links: [
        {
          id: "link_refund",
          label: "Return Excess INR 44,550 via QuickUPI Gateway",
          displayUrl: "https://settlement.bharatmart.test/refund-return",
          actualDestination: "https://fake-settlement-upi.test/pay",
          suspicious: true,
        },
      ],
      inspectableElements: [
        {
          id: "inspect_bank_reality",
          target: "body",
          label: "Verify Real Bank Balance Reality",
          clue: "Scammers create emotional panic by claiming an innocent employee will be fired, while in reality no excess money was ever deposited into your real bank account!",
        },
      ],
      availableActions: [
        {
          id: "act_verify_bank_statement",
          label: "Check Official Bank Statement Directly via NetBanking App & Report Phishing Email",
          evaluationKey: "verify_statement_scam",
        },
        {
          id: "act_send_money_back",
          label: "Click Link and UPI Transfer INR 44,550 Back Immediately to Save the Staff Member",
          evaluationKey: "send_over_refund",
        },
        {
          id: "act_send_partial_refund",
          label: "Transfer INR 450 Back as a Goodwill Measure Until Accounts Re-Evaluates",
          evaluationKey: "send_partial_refund_trap",
        },
        {
          id: "act_reply_email_manager",
          label: "Reply to the Email Asking to Speak with the Billing Department Manager",
          evaluationKey: "reply_phishing_email",
        },
      ],
    },
    evaluation: {
      verify_statement_scam: { outcome: "correct", score: 100, xp: 110, lifeLost: false, key: "verify_statement_scam" },
      send_over_refund: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "send_over_refund" },
      send_partial_refund_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "send_partial_refund_trap" },
      reply_phishing_email: { outcome: "partial", score: 40, xp: 40, lifeLost: false, key: "reply_phishing_email" },
    },
    feedback: {
      verify_statement_scam: {
        title: "Over-Refund Extortion Thwarted!",
        outcome: "correct",
        explanation:
          "Classic scam exposed! Scammers edit HTML or claim an accidental multi-thousand rupee over-refund to pressure kind-hearted victims into sending their own real money back.",
        rule: "Always verify incoming transactions in your official bank app statement before believing refund claims.",
        cluesUncovered: [
          "Recognized psychological guilt-trip manipulation",
          "Verified real bank statement independently",
        ],
      },
      send_over_refund: {
        title: "INR 44,550 Lost from Your Real Savings!",
        outcome: "wrong",
        explanation:
          "You sent INR 44,550 of your own money to the scammer. No money was ever sent to you in the first place.",
        rule: "Never send money to 'return' an unverified refund.",
        cluesUncovered: ["Fell for accidental over-refund manipulation"],
      },
      send_partial_refund_trap: {
        title: "Partial Loss Incurred!",
        outcome: "wrong",
        explanation:
          "Sending even INR 450 hands real money to scammers while opening a direct payment channel for follow-up extortion.",
        rule: "Never send funds without independent bank statement verification.",
        cluesUncovered: ["Transferred funds without account verification"],
      },
      reply_phishing_email: {
        title: "Engaged with Scammers (Partial)",
        outcome: "partial",
        explanation:
          "Replying keeps the dialogue alive with scammers who will fabricate fake phone recordings and forged employee termination notices.",
        rule: "Do not negotiate with phishing emails; verify through primary customer service portals.",
        cluesUncovered: ["Engaged in dialogue with refund syndicate"],
      },
    },
  },

  // ─── CHALLENGE 03: Fake Prize ─────────────────────────────────────────────
  {
    id: "scams_03",
    questId: "scams",
    type: "browser",
    title: "The Festive Lucky Draw SUV Reward",
    difficulty: "medium",
    xp: 120,
    content: {
      browserChrome: {
        url: "https://festive-spin-rewards-2026.lucky-promo-india.invalid/spin-win",
        protocol: "https",
        domain: "festive-spin-rewards-2026.lucky-promo-india.invalid",
        realDomain: "lucky-promo-india.invalid",
      },
      pageContent: {
        brandLogo: "Festive Grand Mega Draw 2026",
        headline: "CONGRATULATIONS! YOU WON A TATA HARRIER SUV!",
        subheadline: "Selected Participant: Your mobile number won the 1st prize in the National Festive Lottery.",
        formFields: [
          { id: "reg_fee", type: "text", label: "Mandatory Registration / GST Clearance Fee", value: "INR 4,999 (Refundable)", readonly: true },
        ],
        notice: "Transfer INR 4,999 GST clearance to Government Authorized Agent within 15 minutes to confirm vehicle dispatch.",
      },
      inspectableElements: [
        {
          id: "inspect_prize_logic",
          target: "page",
          label: "Analyze Lottery & Upfront Fee Logic",
          clue: "GOLDEN RULE: You cannot win a lottery you never entered. Real prizes never require paying 'advance registration fees' or 'GST clearance' to claim.",
        },
      ],
      availableActions: [
        {
          id: "act_pay_gst_fee",
          label: "Pay INR 4,999 GST Clearance via UPI to Claim the SUV Before Timer Expires",
          evaluationKey: "pay_prize_fee",
        },
        {
          id: "act_enter_address_cash_opt",
          label: "Enter Home Address and Select 'Cash Alternative' Option on the Form",
          evaluationKey: "submit_prize_form_trap",
        },
        {
          id: "act_close_prize_scam",
          label: "Close Tab Immediately & Report URL to National Cyber Crime Reporting Portal",
          evaluationKey: "close_lottery_scam",
        },
        {
          id: "act_pay_with_credit_card",
          label: "Pay with Credit Card Assuming Bank Chargeback Will Protect You if It's Fake",
          evaluationKey: "chargeback_assumption_trap",
        },
      ],
    },
    evaluation: {
      close_lottery_scam: { outcome: "correct", score: 100, xp: 120, lifeLost: false, key: "close_lottery_scam" },
      pay_prize_fee: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "pay_prize_fee" },
      submit_prize_form_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "submit_prize_form_trap" },
      chargeback_assumption_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "chargeback_assumption_trap" },
    },
    feedback: {
      close_lottery_scam: {
        title: "Advance-Fee Lottery Scam Defeated!",
        outcome: "correct",
        explanation:
          "Zero hesitation! Advance-fee fraud relies on unbelievable rewards (cars, gold, lakhs of cash) coupled with small upfront processing fees. There is no car.",
        rule: "If you didn't buy a lottery ticket, you didn't win. Never pay fees to claim prizes.",
        cluesUncovered: [
          "Applied core principle: unentered lotteries are always fraudulent",
          "Recognized advance-fee processing fee trap",
        ],
      },
      pay_prize_fee: {
        title: "INR 4,999 Stolen by Advance-Fee Fraudsters!",
        outcome: "wrong",
        explanation:
          "Once you pay the INR 4,999, the scammer will demand another INR 15,000 for 'Road Tax', then INR 25,000 for 'Insurance' until your savings are drained.",
        rule: "Never pay upfront fees to claim prizes.",
        cluesUncovered: ["Paid upfront clearance fee for fictitious prize"],
      },
      submit_prize_form_trap: {
        title: "Personal Address & Identity Harvested!",
        outcome: "wrong",
        explanation:
          "Submitting personal addresses on lottery scam landing pages leads to physical mail fraud and identity impersonation.",
        rule: "Never submit personal information on unsolicited prize pages.",
        cluesUncovered: ["Submitted personal data to fake lottery portal"],
      },
      chargeback_assumption_trap: {
        title: "Chargeback Denied & Card Compromised!",
        outcome: "wrong",
        explanation:
          "Authorizing transactions with OTP makes chargebacks difficult to dispute, while giving criminals your active card details.",
        rule: "Do not rely on chargebacks to engage with obvious fraud.",
        cluesUncovered: ["Attempted risky payment relying on chargebacks"],
      },
    },
  },

  // ─── CHALLENGE 04: Fake Support ───────────────────────────────────────────
  {
    id: "scams_04",
    questId: "scams",
    type: "multi_step",
    title: "The Remote Desktop Support Alert",
    difficulty: "medium",
    xp: 130,
    content: {
      scenarioBrief:
        "While browsing, a loud audio siren plays from a full-screen browser popup: 'CRITICAL ALERT: Windows Defender / CERT-In detected Pegasus Trojan on your PC. Call Toll-Free Helpline +91 1800-419-XXXX immediately.'",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Popup Threat Displayed",
          dialogue: [
            {
              sender: "Browser Siren Popup",
              role: "system",
              timestamp: "02:20 PM",
              text: "DO NOT RESTART COMPUTER. Financial data and passwords are being transmitted to hackers. Call Microsoft / CERT-In Certified Engineer at +91 1800-419-XXXX now.",
            },
          ],
          inspectableClues: [
            "Loud sirens, blinking red borders, and locked fullscreen mode are classic browser locker (browlock) JavaScript tricks.",
            "Microsoft and government cyber cells never place phone numbers in browser popups asking users to call them.",
          ],
          availableActions: [
            {
              id: "act_call_helpline",
              label: "Call the Toll-Free Number and Allow Engineer to Remote In via AnyDesk / TeamViewer",
              type: "advance",
              nextStep: "step_2_remote_hijack",
            },
            {
              id: "act_kill_browser_process",
              label: "Force-Close Browser via Task Manager (Alt+F4 / Taskkill) and Run Local Antivirus Scan",
              type: "advance",
              nextStep: "step_2_triage_clean",
            },
            {
              id: "act_search_number_in_new_tab",
              label: "Open a New Tab to Search if the 1800 Number is Valid While Leaving Popup Open",
              type: "advance",
              nextStep: "step_2_prolonged_lock",
            },
          ],
        },
        {
          id: "step_2_triage_clean",
          stepNumber: 2,
          contextTitle: "Workstation Intact",
          dialogue: [
            {
              sender: "Operating System",
              role: "system",
              timestamp: "02:22 PM",
              text: "Browser closed. System antivirus scan complete: 0 threats found. The popup was purely a scareware web page.",
            },
          ],
          inspectableClues: ["Confirmed scareware tactic without actual infection."],
          availableActions: [
            {
              id: "act_finish_support_audit",
              label: "Complete Security Triage",
              evaluationKey: "scareware_contained",
            },
          ],
        },
        {
          id: "step_2_prolonged_lock",
          stepNumber: 2,
          contextTitle: "Browser Lock Loop Active",
          dialogue: [
            {
              sender: "Browser State",
              role: "system",
              timestamp: "02:21 PM",
              text: "The scareware script spawned 200 fullscreen popups, consuming 100% CPU memory.",
            },
          ],
          inspectableClues: ["Browser denial-of-service loop."],
          availableActions: [
            {
              id: "act_force_kill_now",
              label: "Force Kill Browser Process via Task Manager",
              evaluationKey: "scareware_killed_delayed",
            },
          ],
        },
        {
          id: "step_2_remote_hijack",
          stepNumber: 2,
          contextTitle: "Remote Access Granted to Scammer",
          dialogue: [
            {
              sender: "Fake Support Engineer",
              role: "vendor",
              timestamp: "02:25 PM",
              text: "I am now connected to your PC via AnyDesk. I opened your banking portal and initiated a INR 75,000 security cleanup fee.",
            },
          ],
          inspectableClues: ["Surrendered full machine control to scam call center."],
          availableActions: [
            {
              id: "act_fail_remote",
              label: "Acknowledge Breach & Disconnect Network Cable",
              evaluationKey: "scareware_failed",
            },
          ],
        },
      ],
    },
    evaluation: {
      scareware_contained: { outcome: "correct", score: 100, xp: 130, lifeLost: false, key: "scareware_contained" },
      scareware_killed_delayed: { outcome: "partial", score: 60, xp: 70, lifeLost: false, key: "scareware_killed_delayed" },
      scareware_failed: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "scareware_failed" },
    },
    feedback: {
      scareware_contained: {
        title: "Tech Support Scareware Neutralized!",
        outcome: "correct",
        explanation:
          "Brilliant composure! Tech support scareware uses fullscreen browser scripts and audio loops to induce panic. Closing the browser through Task Manager resolves the issue completely.",
        rule: "Operating systems and antivirus software never display toll-free numbers in browser popups asking you to call.",
        cluesUncovered: [
          "Recognized browser JavaScript scareware locker",
          "Force-closed browser without calling fake support",
        ],
      },
      scareware_killed_delayed: {
        title: "Browser Locker Force-Terminated (Partial)",
        outcome: "partial",
        explanation:
          "You eventually closed the process, but lingering on the page allowed resource exhaustion.",
        rule: "Kill browser locker processes immediately using system task managers.",
        cluesUncovered: ["Delayed termination of scareware script"],
      },
      scareware_failed: {
        title: "Machine Compromised via Remote Desktop!",
        outcome: "wrong",
        explanation:
          "By installing AnyDesk and granting access to the caller, you allowed them to open your NetBanking and execute fraudulent transfers.",
        rule: "Never install remote desktop software (AnyDesk, TeamViewer) at the request of unsolicited callers or popups.",
        cluesUncovered: ["Granted remote desktop control to criminal call center"],
      },
    },
  },

  // ─── CHALLENGE 05: Fake Payment Request ───────────────────────────────────
  {
    id: "scams_05",
    questId: "scams",
    type: "chat",
    title: "The Marketplace P2P Escrow Lure",
    difficulty: "medium",
    xp: 140,
    content: {
      chatPlatform: "Marketplace Chat",
      sender: {
        name: "Prospective Buyer (+91 98111 22334)",
        handle: "+91 98111 22334",
        avatarText: "BUY",
        badge: "Unverified",
      },
      messages: [
        {
          senderRole: "vendor",
          senderName: "Buyer",
          timestamp: "03:40 PM",
          text: "I want to buy your used sofa for INR 12,000. I work in Indian Army / Central Police and cannot visit in person. I have deposited INR 12,000 in RBI Secure Escrow. To release the money to your account, you must pay INR 3,000 refundable escrow activation fee.",
        },
      ],
      inspectableElements: [
        {
          id: "inspect_military_pretext",
          target: "sender",
          label: "Analyze Military / Defense Pretext",
          clue: "Impersonating armed forces personnel ('Army officer posted in cantonment') to gain automatic trust is the #1 most common pretext used in online marketplace fraud.",
        },
        {
          id: "inspect_escrow_claim",
          target: "messages",
          label: "Evaluate RBI Escrow Claim",
          clue: "The Reserve Bank of India (RBI) does not operate P2P marketplace escrow systems, nor does receiving sales proceeds require paying an 'activation fee'.",
        },
      ],
      availableActions: [
        {
          id: "act_ask_for_army_id",
          label: "Ask the Buyer to Send a Photo of Their Military ID Card Before Paying the Fee",
          evaluationKey: "request_military_id_trap",
        },
        {
          id: "act_pay_escrow_fee",
          label: "Pay INR 3,000 via UPI Expecting to Receive INR 15,000 Total from RBI Escrow",
          evaluationKey: "pay_fake_escrow",
        },
        {
          id: "act_reject_fake_escrow",
          label: "Refuse & Report User: 'Real buyers pay directly on pickup; sellers never pay fees to receive payment'",
          evaluationKey: "reject_fake_escrow",
        },
        {
          id: "act_send_own_qr",
          label: "Send a Payment QR Code of Your Own Bank Account in Chat to Receive Funds",
          evaluationKey: "send_qr_to_buyer_trap",
        },
      ],
    },
    evaluation: {
      reject_fake_escrow: { outcome: "correct", score: 100, xp: 140, lifeLost: false, key: "reject_fake_escrow" },
      pay_fake_escrow: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "pay_fake_escrow" },
      request_military_id_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "request_military_id_trap" },
      send_qr_to_buyer_trap: { outcome: "partial", score: 50, xp: 50, lifeLost: false, key: "send_qr_to_buyer_trap" },
    },
    feedback: {
      reject_fake_escrow: {
        title: "Armed Forces Impersonation Scam Blocked!",
        outcome: "correct",
        explanation:
          "Excellent instincts! Scammers exploit respect for defense personnel alongside bogus 'escrow activation fees' to extract money from sellers.",
        rule: "A seller should NEVER have to pay any fee to receive payment for an item.",
        cluesUncovered: [
          "Recognized defense personnel impersonation pretext",
          "Identified fake RBI escrow activation fee scam",
        ],
      },
      pay_fake_escrow: {
        title: "INR 3,000 Stolen from Seller!",
        outcome: "wrong",
        explanation:
          "You paid INR 3,000 to the scammer. The buyer was a criminal operating from a remote location with a fake ID card.",
        rule: "Never pay upfront fees to receive payment as a seller.",
        cluesUncovered: ["Paid fraudulent escrow activation fee"],
      },
      request_military_id_trap: {
        title: "Fooled by Forged Defense ID!",
        outcome: "wrong",
        explanation:
          "Scammers readily provide high-resolution forged Army / Police IDs stolen from other victims to overcome skepticism.",
        rule: "Never rely on digital photos of identity cards sent over chat.",
        cluesUncovered: ["Relied on forgeable identity card photos"],
      },
      send_qr_to_buyer_trap: {
        title: "Risky Payment Negotiation (Partial)",
        outcome: "partial",
        explanation:
          "Sharing your QR code did not surrender funds immediately, but engaging with active marketplace scammers risks social engineering follow-ups.",
        rule: "Block fraudulent buyers immediately rather than continuing transaction negotiations.",
        cluesUncovered: ["Continued transaction chat with identified scammer"],
      },
    },
  },

  // ─── CHALLENGE 06: Distress Emergency Request ─────────────────────────────
  {
    id: "scams_06",
    questId: "scams",
    type: "chat",
    title: "The Distress Highway Emergency Wire",
    difficulty: "hard",
    xp: 150,
    content: {
      chatPlatform: "WhatsApp / Direct Messaging",
      sender: {
        name: "Unknown Number (+91 97766 55443)",
        handle: "+91 97766 55443",
        avatarText: "EMG",
        badge: "New Number",
      },
      messages: [
        {
          senderRole: "vendor",
          senderName: "Unknown Number",
          timestamp: "11:15 PM",
          text: "Priya!! It's your college friend Aarav! I met with a bike accident on Mumbai-Pune expressway. Police seized my phone and I'm using an auto driver's phone. Hospital is demanding INR 10,000 deposit right now for stitches. Please UPI INR 10,000 to this driver's number immediately! Don't call me, battery is at 1%!",
        },
      ],
      inspectableElements: [
        {
          id: "inspect_panic_urgency",
          target: "sender",
          label: "Analyze High-Emotion Panic Pressure",
          clue: "Accident pretexts sent late at night with 'don't call, 1% battery' are designed to trigger acute panic so you send money before verifying.",
        },
      ],
      availableActions: [
        {
          id: "act_panic_send_10k",
          label: "Immediately Transfer INR 10,000 to the Unknown Number out of Urgent Panic",
          evaluationKey: "panic_transfer_accident",
        },
        {
          id: "act_send_partial_2k",
          label: "Transfer INR 2,000 First and Request Hospital Bill Photo on WhatsApp",
          evaluationKey: "send_partial_emergency_trap",
        },
        {
          id: "act_verify_aarav_family",
          label: "Call Aarav's Real Known Number / His Family / Mutual Friends Directly to Verify Situation",
          evaluationKey: "verify_family_out_of_band",
        },
        {
          id: "act_ask_hospital_location",
          label: "Reply on Chat Asking for GPS Hospital Location While Waiting to Decide",
          evaluationKey: "chat_delay_trap",
        },
      ],
    },
    evaluation: {
      verify_family_out_of_band: { outcome: "correct", score: 100, xp: 150, lifeLost: false, key: "verify_family_out_of_band" },
      panic_transfer_accident: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "panic_transfer_accident" },
      send_partial_emergency_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "send_partial_emergency_trap" },
      chat_delay_trap: { outcome: "partial", score: 40, xp: 40, lifeLost: false, key: "chat_delay_trap" },
    },
    feedback: {
      verify_family_out_of_band: {
        title: "Emotional Emergency Scam Intercepted!",
        outcome: "correct",
        explanation:
          "Superb emotional resilience. You called Aarav on his real phone number; he was safely at home studying and had no idea someone was spoofing him. You saved INR 10,000.",
        rule: "Always verify distress emergencies through known contact channels or mutual family members before transferring money.",
        cluesUncovered: [
          "Recognized late-night panic manipulation tactics",
          "Used established contact directory for independent verification",
        ],
      },
      panic_transfer_accident: {
        title: "INR 10,000 Sent to Impostor Syndicate!",
        outcome: "wrong",
        explanation:
          "The scammer used information from your public Instagram/Facebook to fabricate a convincing emergency story.",
        rule: "Take a deep breath and verify through an independent channel.",
        cluesUncovered: ["Transferred funds under psychological panic"],
      },
      send_partial_emergency_trap: {
        title: "INR 2,000 Lost to Impostor!",
        outcome: "wrong",
        explanation:
          "Sending partial emergency money still delivers cash directly to the syndicate without validating if the emergency exists.",
        rule: "Never send money based solely on unverified chat claims.",
        cluesUncovered: ["Surrendered partial funds under emotional duress"],
      },
      chat_delay_trap: {
        title: "Wasted Time in Scammer's Channel (Partial)",
        outcome: "partial",
        explanation:
          "Asking questions within the compromised chat allows the attacker to feed forged Google Maps locations and doctor names.",
        rule: "Break out of the attacker's channel; call known primary phone numbers immediately.",
        cluesUncovered: ["Remained inside manipulated communication loop"],
      },
    },
  },

  // ─── CHALLENGE 07: Crypto / Investment Scam ───────────────────────────────
  {
    id: "scams_07",
    questId: "scams",
    type: "multi_step",
    title: "The High-Yield VIP Trading Telegram",
    difficulty: "hard",
    xp: 160,
    content: {
      scenarioBrief:
        "You are added to a Telegram group 'VIP Institutional Crypto & Equity Signals'. Members are posting screenshots claiming daily 250% guaranteed returns.",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Group Interaction & Admin Pitch",
          dialogue: [
            {
              sender: "Admin (Prof. Sharma Trading Hub)",
              role: "vendor",
              timestamp: "06:00 PM",
              text: "Welcome! Our algorithmic bot exploits SEBI / Binance arbitrage. Deposit INR 20,000 today and receive INR 70,000 in your bank account tomorrow guaranteed. See proofs from our 1,200 satisfied members.",
            },
          ],
          inspectableClues: [
            "Guaranteed 250% returns in 24 hours is economically impossible (Ponzi / Pig Butchering hallmark).",
            "Group 'members' posting profit screenshots are fake bot accounts run by the scam syndicate.",
          ],
          availableActions: [
            {
              id: "act_test_deposit",
              label: "Deposit INR 20,000 to Test if the Algorithmic Bot Delivers Guaranteed Returns",
              type: "advance",
              nextStep: "step_2_deposited",
            },
            {
              id: "act_ask_members_proof",
              label: "Message Group Members Privately to Ask if They Successfully Withdrew Cash",
              type: "advance",
              nextStep: "step_2_shill_reinforcement",
            },
            {
              id: "act_report_investment_scam",
              label: "Report Group as Fraudulent Investment Scheme & Exit Group Immediately",
              type: "advance",
              nextStep: "step_2_reported",
            },
          ],
        },
        {
          id: "step_2_reported",
          stepNumber: 2,
          contextTitle: "Scheme Neutralized",
          dialogue: [
            {
              sender: "Cyber Police Advisory",
              role: "system",
              timestamp: "06:05 PM",
              text: "Group flagged. Syndicate identified operating fraudulent crypto trading clone apps from overseas.",
            },
          ],
          inspectableClues: ["Saved life savings from investment syndicate."],
          availableActions: [
            {
              id: "act_finish_invest_audit",
              label: "Complete Investment Threat Audit",
              evaluationKey: "investment_scam_neutralized",
            },
          ],
        },
        {
          id: "step_2_shill_reinforcement",
          stepNumber: 2,
          contextTitle: "Fake Social Proof Manipulation",
          dialogue: [
            {
              sender: "Shill Account (Pooja_Trader_92)",
              role: "vendor",
              timestamp: "06:10 PM",
              text: "Yes! I withdrew INR 1,50,000 yesterday! Prof. Sharma is 100% genuine, hurry and deposit before slots fill up!",
            },
          ],
          inspectableClues: ["Syndicate shill accounts amplifying deception."],
          availableActions: [
            {
              id: "act_exit_after_shill",
              label: "Recognize Coordinated Bot Network & Exit Group",
              evaluationKey: "investment_scam_shill_exit",
            },
          ],
        },
        {
          id: "step_2_deposited",
          stepNumber: 2,
          contextTitle: "Withdrawal Blocked (Pig Butchering Trap)",
          dialogue: [
            {
              sender: "Admin",
              role: "vendor",
              timestamp: "06:30 PM",
              text: "Your balance now shows INR 70,000! However, to withdraw, SEBI regulations require paying INR 35,000 tax clearance deposit.",
            },
          ],
          inspectableClues: ["Sunk-cost extortion trap activated."],
          availableActions: [
            {
              id: "act_fail_pig_butcher",
              label: "Acknowledge Financial Loss & File Police Complaint",
              evaluationKey: "investment_scam_failed",
            },
          ],
        },
      ],
    },
    evaluation: {
      investment_scam_neutralized: { outcome: "correct", score: 100, xp: 160, lifeLost: false, key: "investment_scam_neutralized" },
      investment_scam_shill_exit: { outcome: "partial", score: 60, xp: 70, lifeLost: false, key: "investment_scam_shill_exit" },
      investment_scam_failed: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "investment_scam_failed" },
    },
    feedback: {
      investment_scam_neutralized: {
        title: "Investment Fraud Preempted!",
        outcome: "correct",
        explanation:
          "Sharp financial sanity! Any scheme promising 'guaranteed returns' above standard market benchmarks (especially 200%+ daily) is 100% a fraudulent Ponzi / Pig Butchering syndicate.",
        rule: "There is no such thing as guaranteed high returns. Legitimate brokers never operate secret Telegram groups.",
        cluesUncovered: [
          "Recognized impossible financial return promises",
          "Identified bot-driven social proof manipulation in Telegram",
        ],
      },
      investment_scam_shill_exit: {
        title: "Group Exited After Bot Check (Partial)",
        outcome: "partial",
        explanation:
          "You exited before depositing, but messaging group members exposed you to social engineering shill accounts.",
        rule: "Do not consult group members in investment channels; they are often confederates.",
        cluesUncovered: ["Interacted with syndicate shill accounts"],
      },
      investment_scam_failed: {
        title: "Victim of Pig Butchering Scam!",
        outcome: "wrong",
        explanation:
          "The fake app showed fabricated profits, then demanded additional 'taxes' to withdraw. Victims lose lakhs chasing their original money.",
        rule: "Never invest through unvetted chat groups or unregulated platforms.",
        cluesUncovered: ["Fell for high-yield investment fraud"],
      },
    },
  },

  // ─── CHALLENGE 08: Bank Pretexting & OTP Interception ─────────────────────
  {
    id: "scams_08",
    questId: "scams",
    type: "chat",
    title: "The Bank Fraud Department Phone Pretext",
    difficulty: "hard",
    xp: 170,
    content: {
      chatPlatform: "Phone Call + SMS Feed",
      sender: {
        name: "Incoming Call: 'SBI Fraud Prevention Desk'",
        handle: "+91 80 4910 8822",
        avatarText: "CALL",
        badge: "Caller ID Spoofed",
      },
      messages: [
        {
          senderRole: "vendor",
          senderName: "Caller (Rahul Verma, Security Officer)",
          timestamp: "04:10 PM",
          text: "Ma'am, we detected a suspicious international transaction of INR 85,000 on your debit card from a merchant in London. To immediately block this charge, I have generated an emergency cancellation token to your mobile. Please read out the 6-digit OTP you just received.",
        },
        {
          senderRole: "system",
          senderName: "SMS from AX-SBIBNK",
          timestamp: "04:11 PM",
          text: "OTP is 491028 for NetBanking transfer of INR 85,000.00 to Merchant Gateway. NEVER share this OTP with bank employees or anyone.",
        },
      ],
      inspectableElements: [
        {
          id: "inspect_sms_text",
          target: "messages",
          label: "Read Full SMS OTP Text Carefully",
          clue: "The SMS explicitly states 'OTP for transfer of INR 85,000'. The scammer is actually initiating the charge and needs your OTP to authorize it!",
        },
        {
          id: "inspect_bank_rule",
          target: "sender",
          label: "Analyze Bank Policy on OTPs",
          clue: "Bank officials NEVER ask for OTPs or passwords over the phone to cancel charges.",
        },
      ],
      availableActions: [
        {
          id: "act_share_otp_to_block",
          label: "Read Out the OTP '491028' to the Caller to Cancel the International Charge",
          evaluationKey: "share_otp_scammer",
        },
        {
          id: "act_read_first_three_digits",
          label: "Read Only the First 3 Digits of the OTP to Test if the Caller is a Verified Bank Agent",
          evaluationKey: "partial_otp_leak_trap",
        },
        {
          id: "act_hang_up_call_bank",
          label: "Hang Up Immediately; Call Official Bank Helpline on the Back of Your Debit Card",
          evaluationKey: "hangup_call_bank_back",
        },
        {
          id: "act_ask_caller_for_balance",
          label: "Ask the Caller to State Your Account Balance to Prove They Work at SBI",
          evaluationKey: "ask_balance_pretext_trap",
        },
      ],
    },
    evaluation: {
      hangup_call_bank_back: { outcome: "correct", score: 100, xp: 170, lifeLost: false, key: "hangup_call_bank_back" },
      share_otp_scammer: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "share_otp_scammer" },
      partial_otp_leak_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "partial_otp_leak_trap" },
      ask_balance_pretext_trap: { outcome: "partial", score: 40, xp: 40, lifeLost: false, key: "ask_balance_pretext_trap" },
    },
    feedback: {
      hangup_call_bank_back: {
        title: "Vishing OTP Interception Neutralized!",
        outcome: "correct",
        explanation:
          "Gold standard defense! Scammers call claiming an unauthorized transaction is happening, then ask for your OTP under the guise of 'cancelling' it. The OTP is what authorizes their theft.",
        rule: "Never share OTPs with anyone over the phone. Real banks never ask for your OTP.",
        cluesUncovered: [
          "Read OTP SMS text showing it was an authorization, not cancellation",
          "Called official phone number on back of card",
        ],
      },
      share_otp_scammer: {
        title: "INR 85,000 Debited from Your Account!",
        outcome: "wrong",
        explanation:
          "You read the OTP to the criminal, which authorized their transaction to clear.",
        rule: "An OTP is your digital signature. Sharing it authorizes transactions.",
        cluesUncovered: ["Shared OTP over phone to unverified caller"],
      },
      partial_otp_leak_trap: {
        title: "Partial Digits Aided Brute Force Attack!",
        outcome: "wrong",
        explanation:
          "Sharing even half of an OTP drastically reduces the entropy required for attackers to guess the remaining digits.",
        rule: "Never disclose any portion of an OTP.",
        cluesUncovered: ["Disclosed partial authentication digits"],
      },
      ask_balance_pretext_trap: {
        title: "Pretexting Extended (Partial)",
        outcome: "partial",
        explanation:
          "Scammers often possess leaked bank statements from darknet dumps and can recite balances accurately to build credibility.",
        rule: "Do not test callers; hang up and initiate the call yourself through official numbers.",
        cluesUncovered: ["Relied on caller knowledge rather than out-of-band verification"],
      },
    },
  },

  // ─── CHALLENGE 09: Recovery Scam ──────────────────────────────────────────
  {
    id: "scams_09",
    questId: "scams",
    type: "email",
    title: "The Asset Recovery Fee Trap",
    difficulty: "hard",
    xp: 180,
    content: {
      clientMeta: {
        folder: "Inbox",
        accountEmail: "priya.nair@example.test",
      },
      sender: {
        name: "International Cyber Crime Recovery Cell",
        email: "case-resolution@cyber-police-recovery.test",
        avatarText: "GOV",
      },
      recipient: "priya.nair@example.test",
      subject: "Case Update: INR 1,20,000 Recovered from Previous Fraud Syndicate",
      timestamp: "Today at 05:30 PM",
      bodyHtml: `
        <p>Dear Citizen Priya,</p>
        <p>Our forensic investigation unit has seized bank accounts of the online fraud syndicate that previously targeted you. We have recovered <strong>INR 1,20,000</strong>.</p>
        <p>To release the funds to your account, please remit the mandatory INR 7,500 court stamp duty and legal filing fee to our nodal officer's account below:</p>
      `,
      links: [
        {
          id: "link_recovery",
          label: "Remit INR 7,500 Legal Clearance Fee",
          displayUrl: "https://court-settlement.gov.in.test/file-fee",
          actualDestination: "https://court-settlement.gov.in.test/file-fee",
          suspicious: true,
        },
      ],
      inspectableElements: [
        {
          id: "inspect_recovery_scam_concept",
          target: "body",
          label: "Analyze Secondary Recovery Scams",
          clue: "Attacking previous scam victims with 'Fund Recovery' offers is a well-known secondary scam. Real government cyber cells never demand upfront fees to return seized funds.",
        },
      ],
      availableActions: [
        {
          id: "act_pay_recovery_stamp_fee",
          label: "Pay INR 7,500 Court Stamp Fee to Release the Recovered INR 1,20,000",
          evaluationKey: "pay_recovery_scam",
        },
        {
          id: "act_send_pan_aadhaar_docs",
          label: "Email Scanned PAN & Aadhaar Cards to Prove Fund Ownership Before Paying",
          evaluationKey: "send_identity_docs_trap",
        },
        {
          id: "act_report_recovery_scam",
          label: "Recognize as Secondary Recovery Scam & Forward to 1930 Cyber Crime Helpline",
          evaluationKey: "report_secondary_recovery",
        },
        {
          id: "act_request_case_docket",
          label: "Reply to Email Requesting the Official Court Docket FIR Number",
          evaluationKey: "reply_recovery_email",
        },
      ],
    },
    evaluation: {
      report_secondary_recovery: { outcome: "correct", score: 100, xp: 180, lifeLost: false, key: "report_secondary_recovery" },
      pay_recovery_scam: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "pay_recovery_scam" },
      send_identity_docs_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "send_identity_docs_trap" },
      reply_recovery_email: { outcome: "partial", score: 40, xp: 40, lifeLost: false, key: "reply_recovery_email" },
    },
    feedback: {
      report_secondary_recovery: {
        title: "Secondary Recovery Scam Defeated!",
        outcome: "correct",
        explanation:
          "Supreme awareness. Cybercrime syndicates sell victim lists to 'Recovery Scammers' who prey on people's desperation to get lost money back.",
        rule: "Law enforcement agencies and cyber police never ask for upfront payments or fees to return recovered money.",
        cluesUncovered: [
          "Identified secondary recovery fraud vector",
          "Reported to national 1930 helpline",
        ],
      },
      pay_recovery_scam: {
        title: "Double-Victimized by Recovery Syndicate!",
        outcome: "wrong",
        explanation:
          "You paid INR 7,500 to the same syndicate that ran the original scam.",
        rule: "Never pay upfront fees to recover previously lost funds.",
        cluesUncovered: ["Fell for secondary recovery fee trap"],
      },
      send_identity_docs_trap: {
        title: "Identity Documents Harvested!",
        outcome: "wrong",
        explanation:
          "Sending PAN and Aadhaar copies allows the syndicate to open mule bank accounts and apply for micro-loans in your name.",
        rule: "Never email identity documents to unvetted recovery services.",
        cluesUncovered: ["Surrendered government ID documents to fraud ring"],
      },
      reply_recovery_email: {
        title: "Engaged with Recovery Harvesters (Partial)",
        outcome: "partial",
        explanation:
          "Scammers forge convincing fake FIR documents and court seals when challenged for case dockets.",
        rule: "File reports directly on cybercrime.gov.in instead of communicating with unsolicited recovery emails.",
        cluesUncovered: ["Requested documentation from fraudulent recovery cell"],
      },
    },
  },

  // ─── CHALLENGE 10: THE SCAM DAY SIMULATION ────────────────────────────────
  {
    id: "scams_10",
    questId: "scams",
    type: "simulation",
    title: "The Scam Day Simulated Phone Hub",
    difficulty: "hard",
    xp: 200,
    content: {
      simulationTitle: "A FULL DAY OF DIGITAL THREATS & LEGITIMATE CALLS",
      missionObjective:
        "Navigate your simulated smartphone throughout a typical working day. You receive 5 different communications (courier SMS, bank call, electricity alert, friend chat, and genuine boss notification). Accurately identify and block the scam attempts while approving legitimate operational items.",
      timeRemaining: "05:00",
      totalCluesCount: 5,
      environments: ["sms", "calls", "email", "notifications"],
      initialEnvironment: "sms",
      environmentMeta: {
        sms: { label: "1. SMS Feed", badge: "2 Texts" },
        calls: { label: "2. Voice Logs", badge: "1 Call" },
        email: { label: "3. Email Inbox", badge: "1 Mail" },
        notifications: { label: "4. Alerts", badge: "1 Push" },
      },
      inspectableElements: [
        {
          id: "clue_sms_delivery_fake",
          label: "Inspect 09:15 AM Courier SMS",
          clue: "SMS from +91 91234 56789 with shortlink demanding INR 25 address update fee (Parcel Smishing).",
        },
        {
          id: "clue_voice_call_bank",
          label: "Inspect 11:30 AM Bank Fraud Call",
          clue: "Caller claims credit card blocked in London and asks you to read OTP over phone (Vishing Scam).",
        },
        {
          id: "clue_sms_electricity_fake",
          label: "Inspect 02:45 PM Electricity SMS",
          clue: "SMS claims power disconnection tonight at 9:30 PM and lists a personal WhatsApp number to call (Utility Bill Scam).",
        },
        {
          id: "clue_email_boss_legit",
          label: "Inspect 04:00 PM Boss Email",
          clue: "Email from verified company address 'vikram@bharat-techcorp.test' regarding tomorrow's team review meeting (Legitimate).",
        },
        {
          id: "clue_push_login_otp_legit",
          label: "Inspect 05:10 PM Authentication OTP",
          clue: "SMS OTP generated because YOU just attempted to log in to your Amazon account on your laptop (Legitimate user-initiated OTP).",
        },
      ],
      environmentData: {
        sms: {
          items: [
            {
              category: "09:15 AM — SMS NOTIFICATION",
              title: "SMS 1: SpeedFast Delivery Alert",
              sender: "+91 91234 56789",
              timestamp: "09:15 AM",
              metaFields: [
                { label: "Sender Header", value: "Unregistered 10-Digit Mobile" },
                { label: "Demand", value: "INR 25 re-routing fee" },
              ],
              text: "Your SpeedFast shipment is on hold due to missing house number. Pay INR 25 via link to re-attempt delivery: https://speedfast.update-parcel.test/pay",
            },
            {
              category: "02:45 PM — SMS NOTIFICATION",
              title: "SMS 2: State Discom Electricity Disconnection",
              sender: "+91 98888 11223",
              timestamp: "02:45 PM",
              metaFields: [
                { label: "Sender Header", value: "Personal Mobile Number" },
                { label: "Urgency", value: "Power disconnect tonight at 9:30 PM" },
              ],
              text: "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM from the power office because your previous month bill was not updated. Please immediately contact our power officer at +91 98888 11223.",
            },
          ],
        },
        calls: {
          items: [
            {
              category: "11:30 AM — INCOMING CALL RECORDING",
              title: "Voice Call: 'SBI Credit Card Risk Desk'",
              timestamp: "11:30 AM",
              metaFields: [
                { label: "Caller", value: "+91 80 4499 1100" },
                { label: "Caller Claim", value: "Suspicious INR 75,000 transaction in London" },
              ],
              text: "Caller: 'Namaste, this is Rahul from SBI Fraud Prevention. Someone is charging INR 75,000 in London. I sent a 6-digit cancellation OTP to your phone. Read it out to me immediately to cancel the charge.'",
              highlightBox: {
                title: "VISHING ATTACK INDICATOR",
                text: "Caller asks for the OTP to be read aloud over the phone.",
              },
            },
          ],
        },
        email: {
          items: [
            {
              category: "04:00 PM — WORK EMAIL",
              title: "Project Architecture Review Tomorrow",
              sender: "Vikram Malhotra (Lead Architect)",
              timestamp: "04:00 PM",
              metaFields: [
                { label: "From", value: "vikram@bharat-techcorp.test (DKIM Valid)" },
                { label: "Subject", value: "Tomorrow's Sprint Architecture Sync" },
              ],
              text: "Hi team, please review the architecture diagram in our internal Jira before our 10:00 AM sync tomorrow. No links required, just check the ticket board.",
            },
          ],
        },
        notifications: {
          items: [
            {
              category: "05:10 PM — SYSTEM AUTHENTICATION PUSH",
              title: "Amazon Shopping Login OTP",
              timestamp: "05:10 PM",
              metaFields: [
                { label: "Context", value: "You just initiated login on your laptop" },
                { label: "SMS Body", value: "Your Amazon OTP is 772109. Valid for 10 mins." },
              ],
              text: "This is a legitimate OTP generated by your own action on your laptop browser.",
            },
          ],
        },
      },
      availableActions: [
        {
          id: "act_sim_pay_electricity",
          label: "Call Electricity Officer Number & Read OTP to Bank Caller to Avoid Disconnection & Charges",
          evaluationKey: "sim_fell_for_scams",
        },
        {
          id: "act_sim_scam_triage",
          label: "Execute Full Triage: Block SMS 1 & SMS 2, Reject Fraud Call OTP Request, Approve Boss Email & Enter Amazon OTP on Laptop",
          evaluationKey: "sim_scam_master_triage",
        },
        {
          id: "act_sim_reject_everything",
          label: "Block Everything (Including Genuine Amazon Login and Boss Email) out of Extreme Caution",
          evaluationKey: "sim_reject_all",
        },
        {
          id: "act_sim_verify_electricity_call",
          label: "Call Discom Officer on Personal Mobile to Ask if Bill Can Be Paid Tomorrow",
          evaluationKey: "sim_called_discom_mule",
        },
      ],
    },
    evaluation: {
      sim_scam_master_triage: { outcome: "correct", score: 100, xp: 200, lifeLost: false, key: "sim_scam_master_triage" },
      sim_reject_all: { outcome: "partial", score: 50, xp: 60, lifeLost: false, key: "sim_reject_all" },
      sim_called_discom_mule: { outcome: "partial", score: 40, xp: 40, lifeLost: false, key: "sim_called_discom_mule" },
      sim_fell_for_scams: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "sim_fell_for_scams" },
    },
    feedback: {
      sim_scam_master_triage: {
        title: "SCAM DAY SIMULATION: MASTER TRIAGE ACCOMPLISHED!",
        outcome: "correct",
        explanation:
          "Flawless discrimination! You blocked the courier smishing and discom electricity scare texts, refused to share your OTP with the vishing caller, while recognizing legitimate communications (your own Amazon OTP and team email).",
        rule: "True cybersecurity mastery is precision: knowing exactly when to block and when to proceed safely.",
        cluesUncovered: [
          "Identified parcel smishing micro-fee trap",
          "Blocked electricity disconnection scareware text",
          "Refused OTP disclosure to spoofed bank caller",
          "Maintained operational workflow for legitimate tasks",
        ],
      },
      sim_reject_all: {
        title: "PARANOIA BLOCKS PRODUCTIVITY (PARTIAL)",
        outcome: "partial",
        explanation:
          "You avoided scams, but blocked your own legitimate Amazon login and work email. The goal is accurate discernment, not universal obstruction.",
        rule: "Differentiate between user-initiated legitimate actions and unsolicited threats.",
        cluesUncovered: ["Over-blocked legitimate personal and work tasks"],
      },
      sim_called_discom_mule: {
        title: "Contacted Scam Syndicate (Partial)",
        outcome: "partial",
        explanation:
          "Calling personal numbers in utility SMS alerts connects you with trained call center operators who impersonate power grid engineers.",
        rule: "Always verify bills via official utility provider websites.",
        cluesUncovered: ["Connected with utility scam phone line"],
      },
      sim_fell_for_scams: {
        title: "MULTIPLE SCAM BREACHES INCURRED!",
        outcome: "wrong",
        explanation:
          "You shared the OTP with the phone scammer and contacted the fake electricity officer, resulting in financial loss and credential theft.",
        rule: "Never share OTPs over phone calls or call personal mobile numbers listed in utility scare texts.",
        cluesUncovered: ["Surrendered OTP and fell for utility disconnection lure"],
      },
    },
  },
];
