/**
 * Password Security Quest Challenge Suite (10 Challenges)
 * Track: 02 — PASSWORD SECURITY
 * Progression: 01-03 (Recognition/Entropy/Patterns), 04-06 (Application/Reuse/Passphrases), 07-09 (MFA Fatigue/Breach/Recovery), 10 (Account Takeover Defense Simulation)
 * Strictly fictional safe domains: .test, .example, .invalid
 */

export const passwordChallenges = [
  // ─── CHALLENGE 01: The Obvious Password ───────────────────────────────────
  {
    id: "passwords_01",
    questId: "passwords",
    type: "password_builder",
    title: "The Obvious Password",
    difficulty: "easy",
    xp: 100,
    content: {
      objectivePrompt:
        "Test various password candidates against brute-force dictionary attack bots. Observe how short and common words crack in 0 seconds.",
      initialPassword: "password123",
      presets: [
        { label: "Common Dictionary Word", value: "admin123" },
        { label: "Predictable Word + Digits", value: "welcome2026" },
        { label: "High Entropy Passphrase", value: "tulip-bengaluru-rocket-monsoon" },
      ],
      availableActions: [
        {
          id: "act_test_weak",
          label: "Submit Tested Password",
          variant: "primary",
          evaluationKey: "evaluate_entropy",
        },
      ],
    },
    evaluation: {
      evaluate_entropy: { outcome: "correct", score: 100, xp: 100, lifeLost: false, key: "evaluate_entropy" },
    },
    feedback: {
      evaluate_entropy: {
        title: "Entropy Analysis Mastered!",
        outcome: "correct",
        explanation:
          "Great experimentation! Common dictionary words and sequences like 'admin123' or 'welcome2026' are present in attacker wordlists (RockYou list) and crack instantly.",
        rule: "Never use common dictionary words or predictable number sequences in passwords.",
        cluesUncovered: [
          "Identified dictionary wordlist vulnerability",
          "Observed instantaneous crack time for short words",
        ],
      },
    },
  },

  // ─── CHALLENGE 02: Personal Information ───────────────────────────────────
  {
    id: "passwords_02",
    questId: "passwords",
    type: "password_builder",
    title: "The Personal Data Trap",
    difficulty: "easy",
    xp: 110,
    content: {
      objectivePrompt:
        "A user named Rahul Sharma born in 1998 living in Bengaluru creates passwords. Test how personal details undermine strength.",
      initialPassword: "Rahul@1998",
      personalDataKeywords: ["Rahul", "Sharma", "1998", "Bengaluru"],
      presets: [
        { label: "Name + Birth Year", value: "Rahul@1998" },
        { label: "City + Pincode", value: "Bengaluru#560001" },
        { label: "Random Unique Passphrase", value: "monsoon-chai-breeze-glacier" },
      ],
      availableActions: [
        {
          id: "act_submit_personal",
          label: "Submit Entropy Test",
          variant: "primary",
          evaluationKey: "evaluate_personal_data",
        },
      ],
    },
    evaluation: {
      evaluate_personal_data: { outcome: "correct", score: 100, xp: 110, lifeLost: false, key: "evaluate_personal_data" },
    },
    feedback: {
      evaluate_personal_data: {
        title: "OSINT Profiling Resilience Learned!",
        outcome: "correct",
        explanation:
          "Attackers scrape public social media profiles (LinkedIn, Instagram) to build custom target wordlists with names, birth years, and favorite teams.",
        rule: "Never include personal names, birth years, vehicle numbers, or home cities in passwords.",
        cluesUncovered: [
          "Recognized OSINT profiling risks in credential generation",
          "Proved weakness of name and birth year combinations",
        ],
      },
    },
  },

  // ─── CHALLENGE 03: The Pattern ────────────────────────────────────────────
  {
    id: "passwords_03",
    questId: "passwords",
    type: "password_builder",
    title: "Predictable Modification Patterns",
    difficulty: "medium",
    xp: 120,
    content: {
      objectivePrompt:
        "When websites force monthly password changes, users often increment 'Password123' to 'Password124'. Test how rainbow tables anticipate this.",
      initialPassword: "P@ssw0rd123!",
      presets: [
        { label: "Basic Leetspeak Substitution", value: "P@ssw0rd123!" },
        { label: "Sequential Month Increment", value: "September2026#" },
        { label: "4-Word Unrelated Passphrase", value: "orbit-sitar-pepper-orbit" },
      ],
      availableActions: [
        {
          id: "act_submit_patterns",
          label: "Analyze Modification Patterns",
          variant: "primary",
          evaluationKey: "evaluate_patterns",
        },
      ],
    },
    evaluation: {
      evaluate_patterns: { outcome: "correct", score: 100, xp: 120, lifeLost: false, key: "evaluate_patterns" },
    },
    feedback: {
      evaluate_patterns: {
        title: "Predictable Mutation Trap Avoided!",
        outcome: "correct",
        explanation:
          "Automated brute-force tools (like Hashcat) automatically apply leetspeak masks (@ for a, 0 for o) and sequential number increments. They take less than 1 second to crack.",
        rule: "Simple substitutions like 'P@ssw0rd123' offer zero resistance against modern cracking rigs.",
        cluesUncovered: [
          "Identified leetspeak vulnerability in rainbow tables",
          "Recognized predictable sequential increment risks",
        ],
      },
    },
  },

  // ─── CHALLENGE 04: Reuse ──────────────────────────────────────────────────
  {
    id: "passwords_04",
    questId: "passwords",
    type: "decision",
    title: "Cross-Service Password Reuse Dilemma",
    difficulty: "medium",
    xp: 130,
    content: {
      scenarioText:
        "You register on a new local food delivery discount portal 'QuickBite Deals'. The site asks you to set a password. You are tempted to use the same strong password you use for your primary Gmail and NetBanking accounts.",
      availableActions: [
        {
          id: "act_generate_unique",
          label: "Generate a Unique 20-Character Password Specific to QuickBite",
          variant: "primary",
          evaluationKey: "generate_unique",
        },
        {
          id: "act_reuse_banking",
          label: "Reuse Your Master NetBanking Password (It's 16 characters with symbols)",
          variant: "danger",
          evaluationKey: "reuse_banking",
        },
        {
          id: "act_slight_tweak",
          label: "Use Your Standard Password with 'QB' Appended to the End",
          variant: "secondary",
          evaluationKey: "tweak_reuse",
        },
      ],
    },
    evaluation: {
      generate_unique: { outcome: "correct", score: 100, xp: 130, lifeLost: false, key: "generate_unique" },
      reuse_banking: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "reuse_banking" },
      tweak_reuse: { outcome: "partial", score: 40, xp: 50, lifeLost: false, key: "tweak_reuse" },
    },
    feedback: {
      generate_unique: {
        title: "Credential Stuffing Immunization!",
        outcome: "correct",
        explanation:
          "Brilliant principle. If 'QuickBite' ever suffers a data breach and stores passwords in plaintext or weak hashes, attackers will test that credential across 500+ other popular platforms. Unique passwords isolate breaches.",
        rule: "Every service must have a completely unique password.",
        cluesUncovered: ["Isolated blast radius of potential third-party breaches"],
      },
      reuse_banking: {
        title: "High-Risk Blast Radius Exposure!",
        outcome: "wrong",
        explanation:
          "If the small discount site is breached, attackers immediately take over your banking and primary email inboxes using automated credential stuffing.",
        rule: "Never reuse passwords between critical accounts and random third-party websites.",
        cluesUncovered: ["Exposed high-value banking credentials to low-trust portal"],
      },
      tweak_reuse: {
        title: "Predictable Variation (Partial)",
        outcome: "partial",
        explanation:
          "Credential stuffing algorithms automatically strip and test site-specific suffixes like 'QB' or 'Zomato'.",
        rule: "Use true randomness rather than appending website initials to a shared base.",
        cluesUncovered: ["Avoided direct reuse but used crackable pattern"],
      },
    },
  },

  // ─── CHALLENGE 05: Password Manager ───────────────────────────────────────
  {
    id: "passwords_05",
    questId: "passwords",
    type: "decision",
    title: "Password Manager vs Human Memory",
    difficulty: "medium",
    xp: 140,
    content: {
      scenarioText:
        "You now manage 85 online accounts across work, banking, utilities, shopping, and social apps. What is the most resilient, secure strategy for credential management?",
      availableActions: [
        {
          id: "act_use_manager",
          label: "Use an Encrypted Password Manager with a Strong Master Passphrase + MFA",
          variant: "primary",
          evaluationKey: "use_manager",
        },
        {
          id: "act_excel_sheet",
          label: "Keep an Unencrypted Excel / Notes File on Your Desktop",
          variant: "danger",
          evaluationKey: "excel_sheet",
        },
        {
          id: "act_memorize_all",
          label: "Attempt to Memorize All 85 Unique Passwords in Your Head",
          variant: "secondary",
          evaluationKey: "memorize_all",
        },
      ],
    },
    evaluation: {
      use_manager: { outcome: "correct", score: 100, xp: 140, lifeLost: false, key: "use_manager" },
      excel_sheet: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "excel_sheet" },
      memorize_all: { outcome: "partial", score: 50, xp: 60, lifeLost: false, key: "memorize_all" },
    },
    feedback: {
      use_manager: {
        title: "Gold Standard Credential Security!",
        outcome: "correct",
        explanation:
          "Using a reputable zero-knowledge password manager allows you to generate 24+ character random passwords for every single account while only needing to memorize one strong master passphrase.",
        rule: "A password manager is the only scalable defense against credential stuffing and weak passwords.",
        cluesUncovered: ["Eliminated human cognitive fatigue in credential management"],
      },
      excel_sheet: {
        title: "Plaintext Credential Hazard!",
        outcome: "wrong",
        explanation:
          "Any malware, browser extension, or unauthorized device access will instantly exfiltrate your entire digital identity in one file.",
        rule: "Never store credentials in plaintext documents or unencrypted notes.",
        cluesUncovered: ["Created single catastrophic point of failure"],
      },
      memorize_all: {
        title: "Cognitive Overload (Partial)",
        outcome: "partial",
        explanation:
          "Humans cannot memorize 85 random 20-character strings without reverting to predictable patterns or password reuse.",
        rule: "Outsource credential entropy to password managers.",
        cluesUncovered: ["Recognized memory limitations"],
      },
    },
  },

  // ─── CHALLENGE 06: Passphrase ─────────────────────────────────────────────
  {
    id: "passwords_06",
    questId: "passwords",
    type: "password_builder",
    title: "Passphrase Length vs Complexity Entropy",
    difficulty: "hard",
    xp: 150,
    content: {
      objectivePrompt:
        "Compare a short complex string ('k$8#Q9!') against a long 4-word passphrase ('monsoon-rickshaw-galaxy-sitar'). Observe which provides superior brute-force resistance and human memorability.",
      initialPassword: "monsoon-rickshaw-galaxy-sitar",
      presets: [
        { label: "Short Complex (8 chars)", value: "k$8#Q9!x" },
        { label: "Long Unique Passphrase (30 chars)", value: "monsoon-rickshaw-galaxy-sitar" },
        { label: "Ultra Passphrase with Numbers", value: "chandrayaan-breeze-saffron-2026" },
      ],
      availableActions: [
        {
          id: "act_submit_passphrase",
          label: "Evaluate Passphrase Resistance",
          variant: "primary",
          evaluationKey: "evaluate_passphrase",
        },
      ],
    },
    evaluation: {
      evaluate_passphrase: { outcome: "correct", score: 100, xp: 150, lifeLost: false, key: "evaluate_passphrase" },
    },
    feedback: {
      evaluate_passphrase: {
        title: "Length Trumps Complexity!",
        outcome: "correct",
        explanation:
          "Entropy scales exponentially with length. A 30-character passphrase of 4 random words takes trillions of years to brute-force, while remaining effortless for humans to type.",
        rule: "Length is the single most powerful factor in brute-force resistance. Choose long passphrases.",
        cluesUncovered: [
          "Demonstrated exponential entropy of 25+ character length",
          "Achieved maximum crack resistance with human memorability",
        ],
      },
    },
  },

  // ─── CHALLENGE 07: MFA Fatigue ────────────────────────────────────────────
  {
    id: "passwords_07",
    questId: "passwords",
    type: "multi_step",
    title: "The 2:00 AM MFA Fatigue Flood",
    difficulty: "hard",
    xp: 160,
    content: {
      scenarioBrief:
        "At 2:15 AM, your phone begins buzzing repeatedly with authenticator push notifications: 'Approve sign-in to BharatTech Corporate SSO from Frankfurt, Germany?'",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Repeated MFA Push Notification Bombardment",
          dialogue: [
            {
              sender: "Authenticator System",
              role: "system",
              timestamp: "02:15 AM",
              text: "Sign-in request #1: IP 185.220.101.5 (Frankfurt, Germany). Device: Linux Chrome. [APPROVE] / [DENY]",
            },
            {
              sender: "Authenticator System",
              role: "system",
              timestamp: "02:16 AM",
              text: "Sign-in request #2: IP 185.220.101.5 (Frankfurt, Germany). Device: Linux Chrome. [APPROVE] / [DENY]",
            },
            {
              sender: "Authenticator System",
              role: "system",
              timestamp: "02:17 AM",
              text: "Sign-in request #3: IP 185.220.101.5 (Frankfurt, Germany). Device: Linux Chrome. [APPROVE] / [DENY]",
            },
          ],
          inspectableClues: [
            "Attacker already possesses your password and is trying to trigger MFA Fatigue (Push Bombing).",
            "Login origin is an unfamiliar offshore proxy (Frankfurt, Germany).",
            "The attacker hopes you will click 'Approve' simply to silence your buzzing phone.",
          ],
          availableActions: [
            {
              id: "act_deny_and_reset",
              label: "Click Deny & Report Fraud, Then Immediately Change Password",
              type: "advance",
              nextStep: "step_2_deny",
            },
            {
              id: "act_approve_silence",
              label: "Click Approve Just to Make the Phone Stop Buzzing",
              type: "advance",
              nextStep: "step_2_approve",
            },
          ],
        },
        {
          id: "step_2_deny",
          stepNumber: 2,
          contextTitle: "Immediate Threat Containment",
          dialogue: [
            {
              sender: "BharatTech SOC Desk",
              role: "system",
              timestamp: "02:20 AM",
              text: "Fraud alert received. Rogue session blocked at IP level. Password reset enforced. Excellent response.",
            },
          ],
          inspectableClues: ["Account takeover thwarted at MFA gate."],
          availableActions: [
            {
              id: "act_complete_mfa_defense",
              label: "Finalize Security Hardening",
              variant: "primary",
              evaluationKey: "mfa_fatigue_defended",
            },
          ],
        },
        {
          id: "step_2_approve",
          stepNumber: 2,
          contextTitle: "Unauthorized Access Granted",
          dialogue: [
            {
              sender: "System Alert",
              role: "system",
              timestamp: "02:18 AM",
              text: "CRITICAL: Attacker authenticated into Corporate Active Directory from Frankfurt. Data exfiltration initiated.",
            },
          ],
          inspectableClues: ["Attacker bypassed MFA via psychological exhaustion."],
          availableActions: [
            {
              id: "act_fail_mfa",
              label: "Acknowledge Compromise",
              variant: "danger",
              evaluationKey: "mfa_fatigue_failed",
            },
          ],
        },
      ],
    },
    evaluation: {
      mfa_fatigue_defended: { outcome: "correct", score: 100, xp: 160, lifeLost: false, key: "mfa_fatigue_defended" },
      mfa_fatigue_failed: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "mfa_fatigue_failed" },
    },
    feedback: {
      mfa_fatigue_defended: {
        title: "MFA Push Bombing Repelled!",
        outcome: "correct",
        explanation:
          "Steely discipline! MFA Fatigue attacks rely on sleep deprivation and annoyance. Denying the prompt and changing your password neutralized the threat because the attacker already had your password.",
        rule: "If you receive an unexpected MFA prompt, someone already has your password. Deny the prompt and change your password immediately.",
        cluesUncovered: [
          "Recognized MFA fatigue attack vector",
          "Denied fraudulent push prompt",
          "Identified underlying password compromise",
        ],
      },
      mfa_fatigue_failed: {
        title: "MFA Fatigue Trap Succeeded!",
        outcome: "wrong",
        explanation:
          "You approved a fraudulent prompt to silence your phone, granting the adversary complete access to your corporate network.",
        rule: "Never approve an authentication prompt you did not personally initiate.",
        cluesUncovered: ["Yielded to push fatigue pressure"],
      },
    },
  },

  // ─── CHALLENGE 08: Credential Breach ──────────────────────────────────────
  {
    id: "passwords_08",
    questId: "passwords",
    type: "multi_step",
    title: "Third-Party Data Breach Triage",
    difficulty: "hard",
    xp: 170,
    content: {
      scenarioBrief:
        "A national delivery platform 'QuickBite' announces that 10 million user hashes were leaked on the dark web. You used your email 'arjun.verma@example.test' there.",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Breach Notification Received",
          dialogue: [
            {
              sender: "Cyber Threat Intelligence Feed",
              role: "system",
              timestamp: "10:00 AM",
              text: "BREACH CONFIRMED: QuickBite database dump contains usernames, email addresses, and bcrypt password hashes. Automated credential stuffing attacks are expected within hours.",
            },
          ],
          inspectableClues: [
            "Your password on QuickBite was also used for your personal GitHub and LinkedIn accounts.",
            "Attackers will use botnets to test this combination across all major services.",
          ],
          availableActions: [
            {
              id: "act_rotate_all_reused",
              label: "Change Password on QuickBite AND All Services Where that Password Was Reused",
              type: "advance",
              nextStep: "step_2_rotate_success",
            },
            {
              id: "act_rotate_only_breached",
              label: "Change Password ONLY on QuickBite and Leave Other Accounts As-Is",
              type: "advance",
              nextStep: "step_2_partial_breach",
            },
          ],
        },
        {
          id: "step_2_rotate_success",
          stepNumber: 2,
          contextTitle: "Full Blast Radius Remediation",
          dialogue: [
            {
              sender: "Security Monitor",
              role: "system",
              timestamp: "10:15 AM",
              text: "GitHub and LinkedIn passwords rotated to unique passphrases. 2FA verified on all accounts. Threat neutralized.",
            },
          ],
          inspectableClues: ["Eliminated credential stuffing attack vector."],
          availableActions: [
            {
              id: "act_confirm_rotation",
              label: "Complete Triage Protocol",
              variant: "primary",
              evaluationKey: "full_rotation_success",
            },
          ],
        },
        {
          id: "step_2_partial_breach",
          stepNumber: 2,
          contextTitle: "Secondary Account Takeover",
          dialogue: [
            {
              sender: "GitHub Security Alert",
              role: "system",
              timestamp: "11:30 AM",
              text: "ALERT: Unauthorized login from Tor Exit Node using your breached password on GitHub. Repositories accessed.",
            },
          ],
          inspectableClues: ["Credential stuffing succeeded on non-rotated accounts."],
          availableActions: [
            {
              id: "act_acknowledge_stuffing",
              label: "Acknowledge Breach",
              variant: "danger",
              evaluationKey: "partial_rotation_failure",
            },
          ],
        },
      ],
    },
    evaluation: {
      full_rotation_success: { outcome: "correct", score: 100, xp: 170, lifeLost: false, key: "full_rotation_success" },
      partial_rotation_failure: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "partial_rotation_failure" },
    },
    feedback: {
      full_rotation_success: {
        title: "Credential Stuffing Preempted!",
        outcome: "correct",
        explanation:
          "Proactive remediation! When one service breaches, any other service sharing that password is automatically compromised. Rotating all matching credentials closes the window.",
        rule: "When a service is breached, immediately rotate passwords on every account where you may have reused that credential.",
        cluesUncovered: [
          "Identified cross-service credential stuffing vector",
          "Remediated full blast radius across linked services",
        ],
      },
      partial_rotation_failure: {
        title: "Credential Stuffing Succeeded!",
        outcome: "wrong",
        explanation:
          "Attackers took the breached hash from QuickBite, cracked it, and immediately logged into your GitHub account where the same password was reused.",
        rule: "Rotating only the breached site does not protect other accounts using the same password.",
        cluesUncovered: ["Left secondary accounts vulnerable to stuffing"],
      },
    },
  },

  // ─── CHALLENGE 09: Account Recovery ───────────────────────────────────────
  {
    id: "passwords_09",
    questId: "passwords",
    type: "decision",
    title: "Account Recovery Hardening",
    difficulty: "hard",
    xp: 180,
    content: {
      scenarioText:
        "You are setting up recovery options for your primary Google / Microsoft account. Many services offer 'Security Questions' (Mother's maiden name, childhood pet, first school) alongside offline 'Recovery Backup Codes' and FIDO2 Security Keys. Which configuration is most resilient against social engineering?",
      availableActions: [
        {
          id: "act_fido_codes",
          label: "Disable Security Questions; Use 16-Digit Offline Recovery Codes & Hardware Keys",
          variant: "primary",
          evaluationKey: "fido_recovery_codes",
        },
        {
          id: "act_use_security_questions",
          label: "Use Standard Security Questions with Real Answers (e.g. your real high school in Delhi)",
          variant: "danger",
          evaluationKey: "standard_security_questions",
        },
        {
          id: "act_fake_answers",
          label: "Use Security Questions but Fill Them with Random 20-Character Passphrases",
          variant: "secondary",
          evaluationKey: "fake_answer_passwords",
        },
      ],
    },
    evaluation: {
      fido_recovery_codes: { outcome: "correct", score: 100, xp: 180, lifeLost: false, key: "fido_recovery_codes" },
      fake_answer_passwords: { outcome: "partial", score: 60, xp: 80, lifeLost: false, key: "fake_answer_passwords" },
      standard_security_questions: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "standard_security_questions" },
    },
    feedback: {
      fido_recovery_codes: {
        title: "Recovery Architecture Hardened!",
        outcome: "correct",
        explanation:
          "Security questions are notoriously weak because answers (high schools, pet names, mother's maiden names) are easily discovered via social media and voter records. Offline single-use recovery codes and hardware tokens provide unbreakable recovery.",
        rule: "Never rely on easily researchable security questions for account recovery.",
        cluesUncovered: [
          "Eliminated social engineering recovery bypasses",
          "Implemented offline cryptographically generated recovery codes",
        ],
      },
      fake_answer_passwords: {
        title: "Better, but Manageable via Vault (Partial)",
        outcome: "partial",
        explanation:
          "Using random passphrases as security question answers prevents OSINT guessing, but offline backup codes are the cleaner standard.",
        rule: "Treat security question answers as secondary passwords if forced to use them.",
        cluesUncovered: ["Neutralized OSINT guessing"],
      },
      standard_security_questions: {
        title: "Account Recovered by Attacker!",
        outcome: "wrong",
        explanation:
          "An attacker checked your LinkedIn/Facebook, found your high school and hometown, and reset your password through the recovery form.",
        rule: "Never use truthful answers to public knowledge security questions.",
        cluesUncovered: ["Surrendered recovery channel to OSINT lookup"],
      },
    },
  },

  // ─── CHALLENGE 10: ACCOUNT TAKEOVER SIMULATION ────────────────────────────
  {
    id: "passwords_10",
    questId: "passwords",
    type: "simulation",
    title: "Account Takeover Defense Simulation",
    difficulty: "hard",
    xp: 200,
    content: {
      simulationTitle: "ACCOUNT SECURITY & RECOVERY COMMAND CENTER",
      missionObjective:
        "Your primary cloud identity is under active attack. Investigate security alerts, audit active login sessions across IP locations, revoke unauthorized devices, and reconfigure authentication credentials before session hijacking is complete.",
      timeRemaining: "03:45",
      totalCluesCount: 5,
      environments: ["email", "account", "settings", "notifications"],
      initialEnvironment: "account",
      environmentMeta: {
        account: { label: "Login Activity", badge: "1 Rogue IP" },
        email: { label: "Security Mail", badge: "2 Alerts" },
        settings: { label: "MFA & Recovery" },
        notifications: { label: "Push Alerts", badge: "1" },
      },
      inspectableElements: [
        {
          id: "clue_rogue_session",
          label: "Inspect Active Sessions Log",
          clue: "Active session from IP 185.220.101.44 (Frankfurt, Germany via Tor) logged in 4 minutes ago using your old breached password!",
        },
        {
          id: "clue_sms_mfa_vulnerability",
          label: "Inspect MFA Method in Settings",
          clue: "MFA is currently set to SMS only, vulnerable to SIM swap attacks. Authenticator App or FIDO2 is recommended.",
        },
        {
          id: "clue_recovery_email_change",
          label: "Inspect Pending Recovery Email Request",
          clue: "A pending request exists to change your recovery email to 'backup-temp@mail-proxy.test'!",
        },
        {
          id: "clue_password_age",
          label: "Inspect Password Last Changed Date",
          clue: "Master password was last changed 480 days ago and matches the leaked QuickBite hash.",
        },
        {
          id: "clue_security_notification",
          label: "Inspect Incident Notification",
          clue: "SOC Alert: 'Suspicious API token generated on user account from overseas proxy.'",
        },
      ],
      environmentData: {
        account: {
          items: [
            {
              category: "ACTIVE CONCURRENT SESSIONS",
              title: "Session 1: Bengaluru, India (Your Laptop)",
              timestamp: "Current Session",
              metaFields: [
                { label: "IP Address", value: "103.21.144.12 (Airtel Broadband, Bengaluru)" },
                { label: "Device", value: "MacBook Pro / Chrome 128" },
                { label: "Status", value: "TRUSTED / CURRENT" },
              ],
              text: "This is your active session in your Bengaluru office.",
            },
            {
              category: "ACTIVE CONCURRENT SESSIONS",
              title: "Session 2: Frankfurt, Germany (UNAUTHORIZED)",
              timestamp: "Logged in 4 mins ago",
              metaFields: [
                { label: "IP Address", value: "185.220.101.44 (Tor Exit Node, Germany)" },
                { label: "Device", value: "Linux CLI / Python-requests" },
                { label: "Status", value: "SUSPICIOUS / ACTIVE" },
              ],
              text: "ALERT: Unauthorized automated session spawned using valid master credentials.",
              highlightBox: {
                title: "ANOMALOUS CONCURRENT LOGIN",
                text: "Impossible travel velocity: Bengaluru to Frankfurt in 0 minutes.",
              },
            },
          ],
        },
        email: {
          items: [
            {
              category: "SECURITY INBOX",
              title: "Alert: New login from Linux / Germany",
              sender: "Account Security Team",
              timestamp: "02:10 AM",
              metaFields: [
                { label: "From", value: "no-reply@identity-service.test" },
                { label: "Subject", value: "Security Alert: New Sign-In from Germany" },
              ],
              text: "A new sign-in was detected on Linux Chrome from IP 185.220.101.44. If this wasn't you, revoke access immediately.",
            },
            {
              category: "SECURITY INBOX",
              title: "Alert: Recovery Email Change Pending",
              sender: "Account Security Team",
              timestamp: "02:12 AM",
              metaFields: [
                { label: "From", value: "no-reply@identity-service.test" },
                { label: "Subject", value: "Action Required: Verify New Recovery Email" },
              ],
              text: "A request was submitted to add 'backup-temp@mail-proxy.test' as your secondary recovery email. Disavow if unrequested.",
            },
          ],
        },
        settings: {
          items: [
            {
              category: "SECURITY CONTROLS",
              title: "Multi-Factor & Recovery Configuration",
              timestamp: "Configuration Status",
              metaFields: [
                { label: "Password Strength", value: "WEAK (Shared with breached service)" },
                { label: "Primary MFA", value: "SMS (+91 98765 XXXXX)" },
                { label: "Hardware Keys", value: "Disabled" },
                { label: "Pending Recovery Email", value: "backup-temp@mail-proxy.test" },
              ],
              text: "Current configuration leaves account susceptible to SIM-swap and persistent recovery hijacking.",
            },
          ],
        },
        notifications: {
          items: [
            {
              category: "LIVE PUSH ADVISORY",
              title: "Immediate Action Recommended",
              timestamp: "Just now",
              metaFields: [
                { label: "Threat Level", value: "CRITICAL" },
              ],
              text: "An adversary holds active session cookies on your cloud tenant. Perform session termination and credential rotation.",
            },
          ],
        },
      },
      availableActions: [
        {
          id: "act_full_takeover_remedy",
          label: "Revoke All Remote Sessions, Cancel Pending Recovery Email, Upgrade to 28-char Passphrase & Enable App MFA",
          variant: "primary",
          evaluationKey: "sim_full_remediation",
        },
        {
          id: "act_change_pass_only",
          label: "Change Password Only (Leave Active Sessions and Recovery Email As-Is)",
          variant: "secondary",
          evaluationKey: "sim_pass_only",
        },
        {
          id: "act_ignore_sim",
          label: "Approve the New Recovery Email to Restore Access Later",
          variant: "danger",
          evaluationKey: "sim_approve_rogue_recovery",
        },
      ],
    },
    evaluation: {
      sim_full_remediation: { outcome: "correct", score: 100, xp: 200, lifeLost: false, key: "sim_full_remediation" },
      sim_pass_only: { outcome: "partial", score: 50, xp: 70, lifeLost: false, key: "sim_pass_only" },
      sim_approve_rogue_recovery: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "sim_approve_rogue_recovery" },
    },
    feedback: {
      sim_full_remediation: {
        title: "ACCOUNT TAKEOVER SIMULATION: FULL ACCOUNT RESCUE",
        outcome: "correct",
        explanation:
          "Flawless incident triage! You recognized the impossible-travel concurrent login from Germany, revoked the attacker's active session, aborted the backdoor recovery email hijacking attempt, and hardened the account with a 28-character passphrase and authenticator MFA.",
        rule: "Full remediation requires clearing active sessions, cancelling unauthorized recovery methods, and upgrading authentication factors.",
        cluesUncovered: [
          "Terminated rogue Tor session from Germany",
          "Cancelled malicious recovery email backdoor",
          "Generated high-entropy master passphrase",
          "Upgraded MFA from SMS to Authenticator App",
        ],
      },
      sim_pass_only: {
        title: "PARTIAL CONTAINMENT: ATTACKER RETAINED BACKDOOR",
        outcome: "partial",
        explanation:
          "Changing the password was good, but the attacker's pending recovery email remained active, allowing them to reset your password 10 minutes later.",
        rule: "Always audit and purge secondary recovery emails and active sessions during an incident.",
        cluesUncovered: ["Overlooked rogue recovery email backdoor"],
      },
      sim_approve_rogue_recovery: {
        title: "ACCOUNT PERMANENTLY SURRENDERED!",
        outcome: "wrong",
        explanation:
          "You approved the attacker's recovery email! The attacker immediately changed the master credentials and locked you out permanently.",
        rule: "Never approve recovery modifications you did not personally trigger.",
        cluesUncovered: ["Handed permanent account ownership to adversary"],
      },
    },
  },
];
