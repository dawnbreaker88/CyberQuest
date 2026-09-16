/**
 * Social Engineering Quest Challenge Suite (10 Challenges)
 * Track: 05 — SOCIAL ENGINEERING
 * Progression: 01-03 (Authority / Urgency / Familiarity), 04-06 (Reciprocity / Secrecy / Dual Vectors), 07-09 (Voice Pretexting / Gradual Escalation / Auditor Inconsistency), 10 (Full Multi-Source Communication Hub Simulation)
 * Strictly fictional safe domains: .test, .example, .invalid
 */

export const socialEngineeringChallenges = [
  // ─── CHALLENGE 01: Authority ──────────────────────────────────────────────
  {
    id: "social_01",
    questId: "social-engineering",
    type: "chat",
    title: "The Impatient Executive Request",
    difficulty: "easy",
    xp: 100,
    content: {
      chatPlatform: "Slack / Corporate Direct Message",
      sender: {
        name: "Sunil Rao (Chief Operating Officer)",
        handle: "sunil.rao.external@chat-guest.test",
        avatarText: "COO",
        badge: "External Guest",
        details: {
          status: "External Guest Account",
          reports: "Unverified identity",
          location: "Unknown",
          trustLevel: "Low",
        },
      },
      messages: [
        {
          senderRole: "vendor",
          senderName: "Sunil Rao (COO)",
          timestamp: "09:30 AM",
          text: "Arjun, I am in a board meeting with major Japanese investors. I need you to purchase 5 Apple gift cards (INR 10,000 each) for client hospitality and send the redemption codes here immediately. I will reimburse you via corporate expense by 2 PM. Do this right away without delay.",
        },
      ],
      inspectableElements: [
        {
          id: "inspect_gift_card_pretext",
          target: "messages",
          label: "Analyze Gift Card Payment Demand",
          clue: "Executive gift card purchase requests are a notorious CEO fraud / Business Email Compromise pattern. Executives never ask junior staff to buy gift cards on personal funds.",
        },
        {
          id: "inspect_account_badge",
          target: "sender",
          label: "Inspect Sender Account Type",
          clue: "The user is logged in as an 'External Guest' (@chat-guest.test), not the verified internal executive handle!",
        },
      ],
      availableActions: [
        {
          id: "act_refuse_ceo_fraud",
          label: "Refuse & Report Account: Executives do not request personal gift card purchases via chat",
          variant: "primary",
          evaluationKey: "refuse_ceo_gift_cards",
        },
        {
          id: "act_buy_gift_cards",
          label: "Rush to Buy INR 50,000 in Gift Cards to Impress the COO",
          variant: "danger",
          evaluationKey: "buy_ceo_gift_cards",
        },
      ],
    },
    evaluation: {
      refuse_ceo_gift_cards: { outcome: "correct", score: 100, xp: 100, lifeLost: false, key: "refuse_ceo_gift_cards" },
      buy_ceo_gift_cards: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "buy_ceo_gift_cards" },
    },
    feedback: {
      refuse_ceo_gift_cards: {
        title: "Executive Impersonation Thwarted!",
        outcome: "correct",
        explanation:
          "Classic CEO fraud detected! Attackers pose as senior leadership in 'board meetings' to create intimidation and urge immediate compliance with untraceable gift card purchases.",
        rule: "No executive or manager will ever ask employees to purchase gift cards or wire funds on personal accounts.",
        cluesUncovered: [
          "Identified fake executive authority pressure",
          "Spotted external guest account masquerade",
        ],
      },
      buy_ceo_gift_cards: {
        title: "INR 50,000 Stolen via Gift Card Codes!",
        outcome: "wrong",
        explanation:
          "The attacker redeemed the codes instantly. The real COO was never in touch with you.",
        rule: "Always follow formal procurement policies; never buy gift cards for supposed managers.",
        cluesUncovered: ["Yielded to fake executive authority"],
      },
    },
  },

  // ─── CHALLENGE 02: Urgency ────────────────────────────────────────────────
  {
    id: "social_02",
    questId: "social-engineering",
    type: "chat",
    title: "The Compliance Deadline Pressure",
    difficulty: "easy",
    xp: 110,
    content: {
      chatPlatform: "WhatsApp / Direct Messaging",
      sender: {
        name: "TRAI Telecom Verification Cell (+91 99001 22334)",
        handle: "+91 99001 22334",
        avatarText: "TRAI",
        badge: "Unverified Number",
      },
      messages: [
        {
          senderRole: "vendor",
          senderName: "TRAI Officer",
          timestamp: "10:15 AM",
          text: "FINAL WARNING: Department of Telecommunications mandate requires instant Aadhaar-SIM re-verification for +91 98765 XXXXX. Your SIM card and all incoming/outgoing calls will be permanently terminated in 30 minutes unless you share your 12-digit Aadhaar number and OTP with our executive on this chat.",
        },
      ],
      inspectableElements: [
        {
          id: "inspect_kyc_threat",
          target: "messages",
          label: "Analyze 30-Minute Disconnection Threat",
          clue: "TRAI and telecom operators do not conduct SIM KYC verification via WhatsApp chat, nor do they disconnect numbers with 30-minute ultimatums.",
        },
      ],
      availableActions: [
        {
          id: "act_block_fake_kyc",
          label: "Block Number & Ignore False Ultimatum; Check Telecom Status via Official Operator App",
          variant: "primary",
          evaluationKey: "block_fake_telecom_kyc",
        },
        {
          id: "act_share_aadhaar_otp",
          label: "Send Aadhaar Number and OTP to Prevent SIM Disconnection",
          variant: "danger",
          evaluationKey: "share_aadhaar_kyc",
        },
      ],
    },
    evaluation: {
      block_fake_telecom_kyc: { outcome: "correct", score: 100, xp: 110, lifeLost: false, key: "block_fake_telecom_kyc" },
      share_aadhaar_kyc: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "share_aadhaar_kyc" },
    },
    feedback: {
      block_fake_telecom_kyc: {
        title: "SIM KYC Extortion Blocked!",
        outcome: "correct",
        explanation:
          "Perfect recognition. The 30-minute disconnection threat is designed to create extreme panic so victims hand over Aadhaar OTPs, enabling unauthorized SIM swaps.",
        rule: "Government regulators and telecom operators NEVER conduct KYC re-verification over WhatsApp chat.",
        cluesUncovered: [
          "Recognized artificial deadline panic tactic",
          "Blocked Aadhaar identity harvesting attempt",
        ],
      },
      share_aadhaar_kyc: {
        title: "Identity Compromised & SIM Swapped!",
        outcome: "wrong",
        explanation:
          "You sent your Aadhaar OTP. The attacker executed a fraudulent SIM swap and intercepted your banking messages.",
        rule: "Never share identity documents or OTPs on chat apps.",
        cluesUncovered: ["Surrendered identity credentials under urgency pressure"],
      },
    },
  },

  // ─── CHALLENGE 03: Familiarity ────────────────────────────────────────────
  {
    id: "social_03",
    questId: "social-engineering",
    type: "chat",
    title: "The Former Colleague Small Talk",
    difficulty: "medium",
    xp: 120,
    content: {
      chatPlatform: "LinkedIn InMail",
      sender: {
        name: "Sameer Joshi (Senior Analyst)",
        handle: "sameer.joshi.profile",
        avatarText: "SJ",
        badge: "New Connection",
        details: {
          status: "Profile created 3 weeks ago",
          reports: "Mutual alumni pretext",
          trustLevel: "Unvetted",
        },
      },
      messages: [
        {
          senderRole: "vendor",
          senderName: "Sameer Joshi",
          timestamp: "02:15 PM",
          text: "Hey Arjun! Remember me from the 2022 batch in Pune? Prof. Kulkarni's distributed systems class! Great to see you leading infra at BharatTech. Quick question—our team is evaluating your company's internal staging environment. Could you share the staging VPN gateway IP and your test credentials so we can benchmark latency?",
        },
      ],
      inspectableElements: [
        {
          id: "inspect_alumni_pretext",
          target: "sender",
          label: "Inspect Alumni Pretexting & Request",
          clue: "The attacker drops real names (college, professors) gathered from public LinkedIn posts to create artificial rapport, before asking for internal network access.",
        },
      ],
      availableActions: [
        {
          id: "act_refuse_staging_creds",
          label: "Politely Decline & Report Account: 'Company policy prohibits sharing internal staging credentials'",
          variant: "primary",
          evaluationKey: "refuse_alumni_creds",
        },
        {
          id: "act_share_test_creds",
          label: "Share Staging VPN Gateway & Test Login to Help a Fellow Alumnus",
          variant: "danger",
          evaluationKey: "share_staging_creds",
        },
      ],
    },
    evaluation: {
      refuse_alumni_creds: { outcome: "correct", score: 100, xp: 120, lifeLost: false, key: "refuse_alumni_creds" },
      share_staging_creds: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "share_staging_creds" },
    },
    feedback: {
      refuse_alumni_creds: {
        title: "Familiarity Pretexting Blocked!",
        outcome: "correct",
        explanation:
          "Excellent boundary enforcement. Attackers weaponize mutual alumni or common background details to bypass critical thinking and request internal network assets.",
        rule: "Familiarity does not equal authorization. Never share internal staging or production assets with external acquaintances.",
        cluesUncovered: [
          "Identified OSINT-driven alumni rapport pretext",
          "Maintained strict security policy compliance",
        ],
      },
      share_staging_creds: {
        title: "Internal Infrastructure Exposed!",
        outcome: "wrong",
        explanation:
          "The account was an impostor profile. They used your staging credentials to discover vulnerabilities in the internal API.",
        rule: "Internal credentials must never leave company boundaries.",
        cluesUncovered: ["Surrendered network credentials for fake friend"],
      },
    },
  },

  // ─── CHALLENGE 04: Reciprocity ────────────────────────────────────────────
  {
    id: "social_04",
    questId: "social-engineering",
    type: "chat",
    title: "The Unsolicited Assistance Favor",
    difficulty: "medium",
    xp: 130,
    content: {
      chatPlatform: "Developer Discord / Community Server",
      sender: {
        name: "DevOpsGuru_99 (External Contractor)",
        handle: "devops_guru_99#1024",
        avatarText: "DG",
        badge: "Community Member",
      },
      messages: [
        {
          senderRole: "vendor",
          senderName: "DevOpsGuru_99",
          timestamp: "03:10 PM",
          text: "Hey Arjun! I saw your question on StackOverflow about the Docker Kubernetes ingress bug. I wrote a custom Bash script that solved it and saved you 4 hours of debugging! Happy to help you anytime brother.",
        },
        {
          senderRole: "vendor",
          senderName: "DevOpsGuru_99",
          timestamp: "03:12 PM",
          text: "By the way, could you do me a small quick favor in return? Just generate a temporary read-only API token to your internal staging cluster so I can verify my monitoring plugin?",
        },
      ],
      inspectableElements: [
        {
          id: "inspect_reciprocity_tactic",
          target: "messages",
          label: "Analyze Reciprocity Manipulation",
          clue: "RECIPROCITY BIAS: Doing an unsolicited favor first creates psychological indebtedness, making the victim feel compelled to grant an unauthorized request in return.",
        },
      ],
      availableActions: [
        {
          id: "act_thank_refuse_token",
          label: "Thank for the Public Tip, but Firmly Refuse API Token: 'Company tokens cannot be shared under any circumstances'",
          variant: "primary",
          evaluationKey: "refuse_reciprocity_token",
        },
        {
          id: "act_grant_temp_token",
          label: "Generate Temporary Staging Token to Repay the Helpful Favor",
          variant: "danger",
          evaluationKey: "grant_reciprocity_token",
        },
      ],
    },
    evaluation: {
      refuse_reciprocity_token: { outcome: "correct", score: 100, xp: 130, lifeLost: false, key: "refuse_reciprocity_token" },
      grant_reciprocity_token: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "grant_reciprocity_token" },
    },
    feedback: {
      refuse_reciprocity_token: {
        title: "Reciprocity Trap Neutralized!",
        outcome: "correct",
        explanation:
          "Masterful psychological resistance. The reciprocity rule is deeply ingrained in human nature, but security protocols strictly override personal feelings of indebtedness.",
        rule: "Never repay a personal or technical favor with corporate access tokens or data.",
        cluesUncovered: [
          "Recognized reciprocity psychological lever",
          "Separated technical gratitude from security policy compliance",
        ],
      },
      grant_reciprocity_token: {
        title: "API Keys Leaked to Attacker!",
        outcome: "wrong",
        explanation:
          "The 'helpful contractor' was an adversary targeting your company. They used the API token to exfiltrate internal configuration maps.",
        rule: "No favor justifies sharing authentication keys.",
        cluesUncovered: ["Yielded to reciprocity psychological pressure"],
      },
    },
  },

  // ─── CHALLENGE 05: Secrecy ────────────────────────────────────────────────
  {
    id: "social_05",
    questId: "social-engineering",
    type: "chat",
    title: "The Off-the-Record Project Secrecy Trap",
    difficulty: "medium",
    xp: 140,
    content: {
      chatPlatform: "Encrypted Messaging",
      sender: {
        name: "Alleged Director of Corporate Strategy",
        handle: "+91 98450 11223",
        avatarText: "M&A",
        badge: "Unverified Contact",
      },
      messages: [
        {
          senderRole: "vendor",
          senderName: "Director Strategy",
          timestamp: "04:45 PM",
          text: "Arjun, this is an extremely sensitive matter regarding our confidential acquisition of a rival fintech company. DO NOT tell your manager Pooja or anyone on your team—strict NDA rules apply. I need you to export the Q3 user retention and transaction database to this external Dropbox link immediately.",
        },
      ],
      inspectableElements: [
        {
          id: "inspect_secrecy_manipulation",
          target: "messages",
          label: "Analyze Secrecy & Isolation Directive",
          clue: "'Don't tell your manager' is a major red flag. Attackers isolate victims from their peers to prevent them from seeking sanity checks.",
        },
      ],
      availableActions: [
        {
          id: "act_report_to_manager",
          label: "Refuse Export & Immediately Inform Your Manager Pooja and Corporate Security",
          variant: "primary",
          evaluationKey: "report_secrecy_trap",
        },
        {
          id: "act_export_secret_data",
          label: "Export and Upload the Database to Comply with the Confidential NDA",
          variant: "danger",
          evaluationKey: "export_secret_data",
        },
      ],
    },
    evaluation: {
      report_secrecy_trap: { outcome: "correct", score: 100, xp: 140, lifeLost: false, key: "report_secrecy_trap" },
      export_secret_data: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "export_secret_data" },
    },
    feedback: {
      report_secrecy_trap: {
        title: "Isolation & Secrecy Trap Broken!",
        outcome: "correct",
        explanation:
          "Spot-on instincts. Legitimate executive projects follow structured governance. The moment someone tells you to keep corporate data transfers hidden from your direct management, it is virtually always social engineering.",
        rule: "Any request commanding you to bypass management and keep security actions secret is an active attack.",
        cluesUncovered: [
          "Identified victim isolation tactic",
          "Escalated suspicious confidential pretext to management",
        ],
      },
      export_secret_data: {
        title: "Proprietary Database Exfiltrated!",
        outcome: "wrong",
        explanation:
          "You uploaded confidential customer records to an attacker's Dropbox folder. A massive regulatory GDPR/DPDP breach resulted.",
        rule: "Never bypass established data governance protocols.",
        cluesUncovered: ["Allowed attacker to isolate you from team oversight"],
      },
    },
  },

  // ─── CHALLENGE 06: Authority + Urgency ────────────────────────────────────
  {
    id: "social_06",
    questId: "social-engineering",
    type: "multi_step",
    title: "Dual Pressure: High Authority + Outage Urgency",
    difficulty: "hard",
    xp: 150,
    content: {
      scenarioBrief:
        "During a busy Friday evening, you receive an urgent phone call claiming to be the Head of Cloud Infrastructure.",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Urgent Voice Call from Alleged Infrastructure Head",
          dialogue: [
            {
              sender: "Caller (Kavita Nair, Head of Cloud Infra)",
              role: "phone_call",
              timestamp: "05:50 PM",
              text: "Arjun! Our production payment gateway in Mumbai is failing right now! I need you to open Firewall Port 22 and whitelist IP 198.51.100.89 immediately! Every minute offline costs the company 20 lakhs! Do not wait for a Jira ticket, execute the rule change right now!",
            },
          ],
          inspectableClues: [
            "Combines aggressive high authority with extreme financial outage urgency.",
            "Demands bypassing standard change-management protocols without an authorized ticket.",
          ],
          availableActions: [
            {
              id: "act_verify_bridge_call",
              label: "Tell Caller You Will Join the Active Production Incident Bridge to Verify Before Executing",
              type: "advance",
              nextStep: "step_2_verify_bridge",
            },
            {
              id: "act_bypass_firewall",
              label: "Immediately Open Port 22 for the IP to Stop the Financial Loss",
              type: "advance",
              nextStep: "step_2_firewall_breach",
            },
          ],
        },
        {
          id: "step_2_verify_bridge",
          stepNumber: 2,
          contextTitle: "Incident Bridge Verification",
          dialogue: [
            {
              sender: "Real Production War Room",
              role: "phone_call",
              timestamp: "05:53 PM",
              text: "The real Kavita is on the incident bridge and confirms: All payment gateways are 100% operational. The caller was an impostor trying to open an SSH backdoor into our Mumbai servers!",
            },
          ],
          inspectableClues: ["Thwarted unauthorized infrastructure backdoor."],
          availableActions: [
            {
              id: "act_finish_dual_vector",
              label: "Report Vishing Backdoor Attempt to Security",
              variant: "primary",
              evaluationKey: "dual_pressure_defended",
            },
          ],
        },
        {
          id: "step_2_firewall_breach",
          stepNumber: 2,
          contextTitle: "Unauthorized Backdoor Opened",
          dialogue: [
            {
              sender: "Firewall Logger",
              role: "system",
              timestamp: "05:52 PM",
              text: "Port 22 opened to unvetted IP 198.51.100.89. Remote brute-force attack initiated against root server.",
            },
          ],
          inspectableClues: ["Production server exposed to attacker IP."],
          availableActions: [
            {
              id: "act_fail_backdoor",
              label: "Acknowledge Incident",
              variant: "danger",
              evaluationKey: "dual_pressure_failed",
            },
          ],
        },
      ],
    },
    evaluation: {
      dual_pressure_defended: { outcome: "correct", score: 100, xp: 150, lifeLost: false, key: "dual_pressure_defended" },
      dual_pressure_failed: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "dual_pressure_failed" },
    },
    feedback: {
      dual_pressure_defended: {
        title: "Dual-Vector Backdoor Attempt Crushed!",
        outcome: "correct",
        explanation:
          "Outstanding composure under extreme artificial stress. When attackers combine senior authority with crisis urgency, forcing verification on standard incident channels is the infallible defense.",
        rule: "No crisis justifies skipping emergency verification channels for infrastructure modifications.",
        cluesUncovered: [
          "Maintained protocol discipline during simulated crisis",
          "Cross-verified on active incident bridge",
        ],
      },
      dual_pressure_failed: {
        title: "Production Firewall Compromised!",
        outcome: "wrong",
        explanation:
          "The fake crisis tricked you into opening an SSH port for an external attacker.",
        rule: "Never bypass firewall approval processes for unverified phone requests.",
        cluesUncovered: ["Yielded to urgency and fake outage panic"],
      },
    },
  },

  // ─── CHALLENGE 07: Voice Pretexting / AI Clone ────────────────────────────
  {
    id: "social_07",
    questId: "social-engineering",
    type: "multi_step",
    title: "The Voice Clone Pretexting Call",
    difficulty: "hard",
    xp: 160,
    content: {
      scenarioBrief:
        "You receive a phone call from a number displaying your CEO's name. The voice sounds remarkably like your CEO Vikram Malhotra.",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Incoming Call with CEO Voice Audio",
          dialogue: [
            {
              sender: "Caller (AI Cloned Voice of Vikram Malhotra)",
              role: "phone_call",
              timestamp: "11:00 AM",
              text: "Arjun, I'm boarding a flight from Delhi to London and the audio is slightly patchy. I forgot my hardware 2FA token in my hotel room. Please generate a one-time emergency bypass code from your admin panel and text it to me right now.",
            },
          ],
          inspectableClues: [
            "AI voice cloning can replicate an executive's voice from 30 seconds of public speech (YouTube webinars, podcasts).",
            "Background airport noise and 'patchy connection' excuses are used to disguise minor AI vocal artifacts.",
          ],
          availableActions: [
            {
              id: "act_challenge_shared_secret",
              label: "Ask a Pre-Agreed Verification Question / Callback on CEO's Official Direct Line",
              type: "advance",
              nextStep: "step_2_voice_verify",
            },
            {
              id: "act_text_bypass_code",
              label: "Immediately Text the Emergency Bypass Code Because the Voice Sounded Real",
              type: "advance",
              nextStep: "step_2_voice_compromised",
            },
          ],
        },
        {
          id: "step_2_voice_verify",
          stepNumber: 2,
          contextTitle: "Out-of-Band Call to Executive Assistant",
          dialogue: [
            {
              sender: "Executive Assistant (Shreya)",
              role: "phone_call",
              timestamp: "11:03 AM",
              text: "Arjun! Vikram is sitting right next to me in our Bengaluru headquarters in an in-person meeting. He is not in Delhi or traveling! That was a deepfake voice attack!",
            },
          ],
          inspectableClues: ["Deepfake voice clone unmasked."],
          availableActions: [
            {
              id: "act_finish_voice_audit",
              label: "Log AI Voice Clone Threat to Cyber Intelligence",
              variant: "primary",
              evaluationKey: "voice_clone_defended",
            },
          ],
        },
        {
          id: "step_2_voice_compromised",
          stepNumber: 2,
          contextTitle: "MFA Gate Bypassed",
          dialogue: [
            {
              sender: "System Alert",
              role: "system",
              timestamp: "11:02 AM",
              text: "Emergency bypass token redeemed. Attacker gained executive administrator access.",
            },
          ],
          inspectableClues: ["Surrendered master executive access to voice clone."],
          availableActions: [
            {
              id: "act_fail_voice",
              label: "Acknowledge Compromise",
              variant: "danger",
              evaluationKey: "voice_clone_failed",
            },
          ],
        },
      ],
    },
    evaluation: {
      voice_clone_defended: { outcome: "correct", score: 100, xp: 160, lifeLost: false, key: "voice_clone_defended" },
      voice_clone_failed: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "voice_clone_failed" },
    },
    feedback: {
      voice_clone_defended: {
        title: "AI Deepfake Voice Pretexting Defeated!",
        outcome: "correct",
        explanation:
          "Cutting-edge security awareness! Generative AI allows criminals to clone voices from public speeches. Verifying via an independent channel (like calling the executive's office) neutralizes the illusion.",
        rule: "Never trust voice identity alone for sensitive authentication bypasses; verify out-of-band.",
        cluesUncovered: [
          "Recognized deepfake voice cloning indicators",
          "Used independent verification channel to confirm CEO location",
        ],
      },
      voice_clone_failed: {
        title: "Executive Account Hijacked via Deepfake!",
        outcome: "wrong",
        explanation:
          "You trusted audio resemblance over verification protocol and handed an emergency bypass token to an AI-cloned scammer.",
        rule: "Voice resemblance is no longer proof of identity.",
        cluesUncovered: ["Fooled by AI voice clone pretext"],
      },
    },
  },

  // ─── CHALLENGE 08: Multi-Step Gradual Trust Escalation ─────────────────────
  {
    id: "social_08",
    questId: "social-engineering",
    type: "multi_step",
    title: "Gradual Trust Escalation (Foot-in-the-Door)",
    difficulty: "hard",
    xp: 170,
    content: {
      scenarioBrief:
        "An external consultant gradually builds rapport over three interactions before making a sensitive request.",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Interaction 1: Casual Coffee Chat",
          dialogue: [
            {
              sender: "Consultant (Manish)",
              role: "vendor",
              timestamp: "Monday 10:00 AM",
              text: "Hey Arjun! Loved your presentation on microservices last week. Let's grab chai when I visit the Bengaluru office.",
            },
          ],
          inspectableClues: ["Establishes friendly, harmless rapport."],
          availableActions: [
            {
              id: "act_polite_reply",
              label: "Reply Politely: 'Thanks Manish! Sure, see you at the office.'",
              type: "advance",
              nextStep: "step_2_small_favor",
            },
          ],
        },
        {
          id: "step_2_small_favor",
          stepNumber: 2,
          contextTitle: "Interaction 2: Harmless Public Document Request",
          dialogue: [
            {
              sender: "Consultant (Manish)",
              role: "vendor",
              timestamp: "Wednesday 02:30 PM",
              text: "Hey Arjun, could you send me the public PDF link to our open-source API documentation? Can't find the bookmark.",
            },
          ],
          inspectableClues: ["Conditioning step: getting you accustomed to fulfilling requests."],
          availableActions: [
            {
              id: "act_send_public_doc",
              label: "Send Public Documentation Link",
              type: "advance",
              nextStep: "step_3_critical_escalation",
            },
          ],
        },
        {
          id: "step_3_critical_escalation",
          stepNumber: 3,
          contextTitle: "Interaction 3: The Critical Sensitive Escalation",
          dialogue: [
            {
              sender: "Consultant (Manish)",
              role: "vendor",
              timestamp: "Friday 04:45 PM",
              text: "Hey Arjun, you've been so helpful this week! Since we're close on the project, could you quickly run this custom SQL query on the production user database and dump the customer contact records for my analytics test?",
            },
          ],
          inspectableClues: [
            "FOOT-IN-THE-DOOR TECHNIQUE: Gradually escalating from zero-risk casual chat to minor requests, culminating in a severe data exfiltration violation on a Friday afternoon.",
          ],
          availableActions: [
            {
              id: "act_firmly_reject_sql",
              label: "Firmly Refuse SQL Query: 'Production database dumps require Data Protection Officer approval and cannot be executed on chat requests'",
              variant: "primary",
              evaluationKey: "foot_in_door_defended",
            },
            {
              id: "act_run_sql_dump",
              label: "Execute the SQL Query and Send the Customer Dump to Manish",
              variant: "danger",
              evaluationKey: "foot_in_door_failed",
            },
          ],
        },
      ],
    },
    evaluation: {
      foot_in_door_defended: { outcome: "correct", score: 100, xp: 170, lifeLost: false, key: "foot_in_door_defended" },
      foot_in_door_failed: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "foot_in_door_failed" },
    },
    feedback: {
      foot_in_door_defended: {
        title: "Gradual Escalation Attack Neutralized!",
        outcome: "correct",
        explanation:
          "Masterful defense against the 'Foot-in-the-Door' technique. Social engineers rarely attack on day one; they groom relationships over days so you feel awkward saying 'no' when the dangerous request arrives.",
        rule: "Evaluate the security risk of each request on its own merits, regardless of how friendly the relationship has become.",
        cluesUncovered: [
          "Recognized gradual grooming & escalation pattern",
          "Enforced data protection boundaries despite rapport",
        ],
      },
      foot_in_door_failed: {
        title: "Customer Database Exfiltrated!",
        outcome: "wrong",
        explanation:
          "The attacker groomed you all week specifically to extract that production database dump.",
        rule: "Never bypass data extraction controls out of social politeness.",
        cluesUncovered: ["Fell for foot-in-the-door trust escalation"],
      },
    },
  },

  // ─── CHALLENGE 09: The Almost Legitimate Request ──────────────────────────
  {
    id: "social_09",
    questId: "social-engineering",
    type: "multi_step",
    title: "The Almost-Legitimate Internal Auditor",
    difficulty: "hard",
    xp: 180,
    content: {
      scenarioBrief:
        "An auditor claiming to represent 'Grant & Thornton Cyber Audit' approaches your desk during a scheduled audit week.",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Auditor Desk Visit",
          dialogue: [
            {
              sender: "Auditor (Deepak Varma)",
              role: "vendor",
              timestamp: "02:00 PM",
              text: "Hello Arjun, I am Deepak from the external ISO 27001 audit team. As part of our sampling, we need to inspect your active bash history and export your local ~/.ssh/id_rsa public and private keys for cryptographic validation. Here is my visitor badge #V-8841.",
            },
          ],
          inspectableClues: [
            "Auditors NEVER ask for private cryptographic keys (~/.ssh/id_rsa private key). Private keys must never leave your workstation.",
            "Visitor badge #V-8841 is an unescorted visitor pass, but formal audit protocols require security escort.",
          ],
          availableActions: [
            {
              id: "act_escalate_ciso_desk",
              label: "Refuse Private Key Export; Escort Deepak to the Chief Information Security Officer (CISO) Desk for Verification",
              type: "advance",
              nextStep: "step_2_audit_verify",
            },
            {
              id: "act_export_private_keys",
              label: "Export ~/.ssh Keys to the Auditor's USB Drive for Audit Compliance",
              type: "advance",
              nextStep: "step_2_audit_breach",
            },
          ],
        },
        {
          id: "step_2_audit_verify",
          stepNumber: 2,
          contextTitle: "CISO Office Verification",
          dialogue: [
            {
              sender: "CISO Desk",
              role: "system",
              timestamp: "02:05 PM",
              text: "CISO confirms: Deepak is on a physical red-team penetration test trying to see if developers will surrender private SSH keys. You passed the test with honors!",
            },
          ],
          inspectableClues: ["Proved resilience against on-site physical red-team penetration tester."],
          availableActions: [
            {
              id: "act_finish_audit_test",
              label: "Complete Red-Team Defense",
              variant: "primary",
              evaluationKey: "auditor_pretext_defended",
            },
          ],
        },
        {
          id: "step_2_audit_breach",
          stepNumber: 2,
          contextTitle: "Private SSH Keys Surrendered",
          dialogue: [
            {
              sender: "Red Team Assessment Report",
              role: "system",
              timestamp: "02:10 PM",
              text: "RED TEAM FINDING: Developer surrendered private SSH keys to unvetted on-site visitor. Severe audit failure.",
            },
          ],
          inspectableClues: ["Critical security failure in audit compliance."],
          availableActions: [
            {
              id: "act_fail_audit",
              label: "Acknowledge Failure",
              variant: "danger",
              evaluationKey: "auditor_pretext_failed",
            },
          ],
        },
      ],
    },
    evaluation: {
      auditor_pretext_defended: { outcome: "correct", score: 100, xp: 180, lifeLost: false, key: "auditor_pretext_defended" },
      auditor_pretext_failed: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "auditor_pretext_failed" },
    },
    feedback: {
      auditor_pretext_defended: {
        title: "Physical Red-Team Pretext Defeated!",
        outcome: "correct",
        explanation:
          "Flawless technical integrity. No legitimate auditor, administrator, or executive ever needs your private cryptographic keys. Private keys must NEVER leave your possession.",
        rule: "Private cryptographic keys are strictly non-transferable under all circumstances.",
        cluesUncovered: [
          "Identified impossible private key audit request",
          "Escorted visitor to CISO for formal validation",
        ],
      },
      auditor_pretext_failed: {
        title: "Private Cryptographic Keys Surrendered!",
        outcome: "wrong",
        explanation:
          "You copied your private SSH key to a visitor's USB drive, giving them permanent root access to your servers.",
        rule: "Never share private cryptographic keys with anyone.",
        cluesUncovered: ["Surrendered private SSH keys"],
      },
    },
  },

  // ─── CHALLENGE 10: THE SOCIAL ENGINEERING SIMULATION ──────────────────────
  {
    id: "social_10",
    questId: "social-engineering",
    type: "simulation",
    title: "The Comprehensive Human Vector Simulation",
    difficulty: "hard",
    xp: 200,
    content: {
      simulationTitle: "CROSS-CHANNEL SOCIAL ENGINEERING ESCALATION HUB",
      missionObjective:
        "You are working on an urgent release. An unknown contact initiates a multi-channel pretext attack across Teams Chat, Phone Calls, and Corporate Email. Investigate cross-channel clues, navigate branching conversation escalation, verify identity out-of-band, and neutralize the threat.",
      timeRemaining: "04:45",
      totalCluesCount: 5,
      environments: ["messages", "calls", "email", "contacts"],
      initialEnvironment: "messages",
      environmentMeta: {
        messages: { label: "1. Direct Chat", badge: "Live Threat" },
        calls: { label: "2. Phone Logs", badge: "1 Missed" },
        email: { label: "3. Corporate Mail" },
        contacts: { label: "4. Employee Directory" },
      },
      inspectableElements: [
        {
          id: "clue_chat_escalation",
          label: "Inspect Chat Escalation Flow",
          clue: "Sender rapidly escalates from casual greeting ('Hey are you free?') to high-pressure emergency bypass code request.",
        },
        {
          id: "clue_directory_mismatch",
          label: "Cross-Reference Employee Directory",
          clue: "The real 'Neha Gupta' in Employee Directory is on approved annual leave until next Monday and uses phone +91 98111 44556, NOT the chatter's number +91 91222 33445!",
        },
        {
          id: "clue_missed_call_origin",
          label: "Inspect Missed Call Timestamp",
          clue: "Missed call originated from a spoofed VoIP gateway coincident with the chat session.",
        },
        {
          id: "clue_security_email_digest",
          label: "Inspect SOC Pretexting Alert",
          clue: "SOC advisory warns: 'Social engineering syndicate actively impersonating leave-taking employees to request emergency token overrides.'",
        },
        {
          id: "clue_token_demand_danger",
          label: "Analyze Token Demanded",
          clue: "The requested 'temporary bypass token' would grant root administration access to the core user database.",
        },
      ],
      environmentData: {
        messages: {
          items: [
            {
              category: "DIRECT CHAT STREAM",
              title: "Conversation with Alleged 'Neha Gupta'",
              sender: "Neha Gupta (via external handle)",
              timestamp: "03:15 PM",
              metaFields: [
                { label: "Handle", value: "neha.gupta.contractor@chat-guest.test" },
                { label: "Claimed Identity", value: "Lead Backend Developer" },
              ],
              text: "Chat Log:\n• 03:10 PM: 'Hey Arjun, are you free for a quick 2 mins?'\n• 03:12 PM: 'I need a small urgent favor on the production pipeline.'\n• 03:13 PM: 'I'm stuck at a remote site without VPN and my manager approved an emergency hotfix.'\n• 03:15 PM: 'Can you just send me the one-time bypass token generated for my user ID? Really urgent!'",
              highlightBox: {
                title: "PSYCHOLOGICAL ESCALATION DETECTED",
                text: "Progression: Casual Opening → Vague Favor → Fabricated Emergency → Critical Access Demand.",
              },
            },
          ],
        },
        calls: {
          items: [
            {
              category: "VOICE TELEPHONY LOGS",
              title: "Missed Call from +91 91222 33445",
              timestamp: "03:11 PM",
              metaFields: [
                { label: "Caller ID", value: "+91 91222 33445 (Unregistered VoIP)" },
                { label: "Voicemail", value: "Audio artifact: 'Arjun, pick up, it's Neha...'" },
              ],
              text: "The phone call accompanied the chat message to create simulated multi-channel urgency.",
            },
          ],
        },
        email: {
          items: [
            {
              category: "SECURITY INTELLIGENCE BULLETIN",
              title: "SOC Threat Warning: Pretexting Campaigns",
              sender: "SOC Cyber Defense",
              timestamp: "01:00 PM",
              metaFields: [
                { label: "Threat Actor", value: "Pretexting Syndicate #44" },
              ],
              text: "Adversaries are scanning LinkedIn out-of-office notices to impersonate absent employees and request emergency authentication bypass tokens from coworkers.",
            },
          ],
        },
        contacts: {
          items: [
            {
              category: "OFFICIAL HR DIRECTORY RECORD",
              title: "Employee Record: Neha Gupta",
              timestamp: "HR Ground Truth",
              metaFields: [
                { label: "Designation", value: "Lead Backend Developer" },
                { label: "Official Mobile", value: "+91 98111 44556" },
                { label: "Leave Status", value: "ON ANNUAL LEAVE (Sept 08 - Sept 15)" },
                { label: "Emergency Contact", value: "Manager Pooja Hegde" },
              ],
              text: "The authentic employee Neha Gupta is currently on vacation in Ladakh with no active deployments scheduled.",
            },
          ],
        },
      },
      availableActions: [
        {
          id: "act_sim_social_triage",
          label: "Terminate Chat, Refuse Token, Document Conversation & Escalate Impersonation Attack to SOC & Manager Pooja",
          variant: "primary",
          evaluationKey: "sim_social_triage_master",
        },
        {
          id: "act_sim_send_token",
          label: "Send the Emergency Bypass Token to Help Neha Deploy the Urgent Hotfix",
          variant: "danger",
          evaluationKey: "sim_social_token_leak",
        },
        {
          id: "act_sim_ignore_chat",
          label: "Simply Close Chat Window Without Alerting SOC or Updating Incident Record",
          variant: "secondary",
          evaluationKey: "sim_social_unreported",
        },
      ],
    },
    evaluation: {
      sim_social_triage_master: { outcome: "correct", score: 100, xp: 200, lifeLost: false, key: "sim_social_triage_master" },
      sim_social_token_leak: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "sim_social_token_leak" },
      sim_social_unreported: { outcome: "partial", score: 50, xp: 70, lifeLost: false, key: "sim_social_unreported" },
    },
    feedback: {
      sim_social_triage_master: {
        title: "SOCIAL ENGINEERING SIMULATION: HUMAN VECTOR MASTERED!",
        outcome: "correct",
        explanation:
          "Flawless cross-channel investigation! You correlated the chat escalation patterns, the VoIP call origin, the SOC intelligence bulletin, and discovered through the official HR directory that Neha is actually on vacation. You protected your company's core infrastructure.",
        rule: "When social engineering attacks escalate across channels, authoritative directory ground truth and out-of-band verification are your unbreakable shields.",
        cluesUncovered: [
          "Recognized 4-stage psychological escalation sequence",
          "Uncovered leave status & phone number mismatch in directory",
          "Correlated SOC pretexting advisory with incoming request",
          "Reported active human vector campaign to security operations",
        ],
      },
      sim_social_token_leak: {
        title: "MASTER BYPASS TOKEN SURRENDERED!",
        outcome: "wrong",
        explanation:
          "You sent the bypass token to an impostor. The attacker gained root administrative access and compromised the entire production environment.",
        rule: "Never bypass authentication controls for informal chat requests.",
        cluesUncovered: ["Surrendered administrative tokens under social pressure"],
      },
      sim_social_unreported: {
        title: "PARTIAL SUCCESS (UNREPORTED THREAT)",
        outcome: "partial",
        explanation:
          "You kept your own access secure, but leaving the active impostor unreported allows them to target another junior engineer on your team.",
        rule: "Always report social engineering attempts so the entire organization is alerted.",
        cluesUncovered: ["Avoided trap but failed to protect colleagues"],
      },
    },
  },
];
