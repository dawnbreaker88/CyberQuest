/**
 * Phishing Quest Challenge Suite (10 Challenges)
 * Track: 01 — PHISHING
 * Difficulty progression: 01-03 (Intro/Recognition), 04-06 (Application), 07-09 (Ambiguous/Complex/Incident Response), 10 (Full Simulation)
 * Strictly fictional safe domains: .test, .example, .invalid
 */

export const phishingChallenges = [
  // ─── CHALLENGE 01: The Urgent IT Notice ──────────────────────────────────
  {
    id: "phishing_01",
    questId: "phishing",
    type: "email",
    title: "The Urgent IT Notice",
    difficulty: "easy",
    xp: 100,
    content: {
      clientMeta: {
        folder: "Inbox",
        accountEmail: "arjun.verma@bharat-techcorp.test",
      },
      sender: {
        name: "BharatTech IT Helpdesk",
        email: "security-alert@micros0ft-bharat.test",
        avatarText: "IT",
      },
      recipient: "arjun.verma@bharat-techcorp.test",
      subject: "URGENT: Corporate SSO Password Expiring in 2 Hours",
      timestamp: "Today at 09:14 AM",
      urgency: "Deadline: 2 Hours",
      bodyHtml: `
        <p>Namaste Arjun,</p>
        <p>Our centralized IT directory detected that your <strong>single sign-on (SSO) login expires today</strong>.</p>
        <p>If you do not renew your credentials within 2 hours, your access to internal Git repositories, VPN, and Bengaluru campus portal will be immediately locked.</p>
        <p>Validate your existing password immediately to prevent downtime:</p>
      `,
      links: [
        {
          id: "link_verify",
          label: "Verify Password & Keep Account Active",
          displayUrl: "https://sso.bharat-techcorp.com/verify-sso",
          actualDestination: "https://login-portal-micros0ft-bharat.test/harvest/token",
          suspicious: true,
        },
      ],
      inspectableElements: [
        {
          id: "inspect_sender",
          target: "sender",
          label: "Inspect Sender Security Headers",
          clue: "Sender address is 'security-alert@micros0ft-bharat.test' — contains digit '0' in place of 'o', and is not your company domain ('bharat-techcorp.test').",
        },
        {
          id: "inspect_link",
          target: "link_verify",
          label: "Inspect Link Destination",
          clue: "Link anchor text claims 'sso.bharat-techcorp.com', but points to rogue harvesting server 'login-portal-micros0ft-bharat.test'.",
        },
        {
          id: "inspect_urgency",
          target: "urgency",
          label: "Analyze Artificial Urgency",
          clue: "The 2-hour deadline creates psychological pressure so you react before checking the sender identity.",
        },
      ],
      availableActions: [
        {
          id: "action_reply",
          label: "Reply to sender asking for an extension before renewing",
          evaluationKey: "reply_sender",
        },
        {
          id: "action_preview",
          label: "Open the link in a private window to check if the login form is real",
          evaluationKey: "click_link",
        },
        {
          id: "action_report",
          label: "Report email as phishing incident and navigate to SSO via official bookmark",
          evaluationKey: "report_phishing",
        },
        {
          id: "action_delete",
          label: "Delete the notification from your inbox without reporting",
          evaluationKey: "delete_email",
        },
      ],
    },
    evaluation: {
      report_phishing: { outcome: "correct", score: 100, xp: 100, lifeLost: false, key: "report_phishing" },
      delete_email: { outcome: "partial", score: 50, xp: 50, lifeLost: false, key: "delete_email" },
      reply_sender: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "reply_sender" },
      click_link: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "click_link" },
    },
    feedback: {
      report_phishing: {
        title: "Threat Neutralized!",
        outcome: "correct",
        explanation: "Good instinct! You spotted the typosquatted sender domain ('micros0ft'), the deceptive link destination, and the artificial deadline.",
        rule: "Pause and inspect the actual root domain and sender headers before interacting with urgency notices.",
        cluesUncovered: ["Identified typosquatting: '0' in micros0ft", "Unmasked disguised hyperlink destination", "Flagged artificial urgency tactic"],
      },
      delete_email: {
        title: "Threat Avoided (Partial)",
        outcome: "partial",
        explanation: "Deleting keeps your inbox clean, but reporting allows your security team to block the attacker domain across all employees.",
        rule: "Always report phishing to security operations so colleagues are safeguarded.",
        cluesUncovered: ["Avoided malicious link", "Missed organizational alerting opportunity"],
      },
      reply_sender: {
        title: "In-Band Communication Trap",
        outcome: "wrong",
        explanation: "Replying to a spoofed address confirms your email is active and engages directly with the attacker.",
        rule: "Never reply to suspicious emails; communicate only through verified official channels.",
        cluesUncovered: ["Engaged directly with attacker inbox"],
      },
      click_link: {
        title: "Credentials Stolen!",
        outcome: "wrong",
        explanation: "You clicked the fake SSO portal link. Private windows protect cookies, but do not prevent credential harvesters from recording keystrokes.",
        rule: "Never click password renewal links sent via unexpected high-urgency emails.",
        cluesUncovered: ["Fell for 2-hour urgency lever", "Failed to inspect destination URL before clicking"],
      },
    },
  },

  // ─── CHALLENGE 02: The Cloned Cloud Login ─────────────────────────────────
  {
    id: "phishing_02",
    questId: "phishing",
    type: "browser",
    title: "The Cloned Cloud Login",
    difficulty: "easy",
    xp: 110,
    content: {
      browserChrome: {
        url: "https://accounts.google.com.storage-doc-share.test/signin/challenge",
        protocol: "https",
        domain: "accounts.google.com.storage-doc-share.test",
        realDomain: "storage-doc-share.test",
        subdomain: "accounts.google.com",
        sslValid: true,
        sslIssuer: "Let's Encrypt Authority",
        sslSubject: "storage-doc-share.test",
      },
      pageContent: {
        brandLogo: "Google Drive Workspace",
        headline: "Sign in to view shared document",
        subheadline: "Document: 'Bengaluru_Campus_CampusPlacement_Q3.pdf'",
        formFields: [
          { id: "email", type: "email", label: "Email Address", value: "arjun.verma@bharat-techcorp.test", readonly: true },
          { id: "password", type: "password", label: "Password", placeholder: "••••••••••••", readonly: true },
        ],
        notice: "Shared by external collaborator: placement-cell@delhi-colleges.test",
      },
      inspectableElements: [
        {
          id: "inspect_url",
          target: "addressBar",
          label: "Deconstruct URL Hostname",
          clue: "'accounts.google.com' is only a subdomain prefix. The actual root domain is 'storage-doc-share.test'!",
        },
        {
          id: "inspect_ssl",
          target: "ssl",
          label: "Inspect SSL Certificate",
          clue: "The HTTPS lock icon only proves encrypted connection to 'storage-doc-share.test', not that this page is Google.",
        },
        {
          id: "inspect_context",
          target: "page",
          label: "Inspect Authentication Context",
          clue: "Authentic Google Drive embeds document previews directly rather than demanding password re-entry on foreign domains.",
        },
      ],
      availableActions: [
        { id: "act_trust_ssl", label: "Verify HTTPS certificate lock and proceed to sign in", evaluationKey: "submit_creds" },
        { id: "act_report_url", label: "Close tab and report lookalike domain to security", evaluationKey: "close_report" },
        { id: "act_leave", label: "Close tab without submitting credentials or reporting", evaluationKey: "leave_site" },
        { id: "act_subdomain_trust", label: "Continue because the URL starts with accounts.google.com", evaluationKey: "subdomain_trust" },
      ],
    },
    evaluation: {
      close_report: { outcome: "correct", score: 100, xp: 110, lifeLost: false, key: "close_report" },
      leave_site: { outcome: "partial", score: 50, xp: 55, lifeLost: false, key: "leave_site" },
      submit_creds: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "submit_creds" },
      subdomain_trust: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "subdomain_trust" },
    },
    feedback: {
      close_report: {
        title: "Subdomain Deception Foiled!",
        outcome: "correct",
        explanation: "Sharp eye! Attackers prepend recognizable brand names as subdomains on rogue root domains. The HTTPS lock only means the connection is encrypted, not safe.",
        rule: "Read domains from right to left up to the first single slash to find the true root domain.",
        cluesUncovered: ["Identified rogue root domain: storage-doc-share.test", "Understood that HTTPS != Legitimacy"],
      },
      leave_site: {
        title: "Escaped Safely",
        outcome: "partial",
        explanation: "You preserved your credentials by exiting, though reporting the domain would have triggered browser blocklists.",
        rule: "Always report spoofed login portals to help protect other users.",
        cluesUncovered: ["Avoided credential entry"],
      },
      submit_creds: {
        title: "Account Takeover!",
        outcome: "wrong",
        explanation: "You submitted your password to a rogue server. The lock icon merely meant your password was encrypted while being stolen.",
        rule: "Never enter credentials into domains you haven't verified in the address bar.",
        cluesUncovered: ["Equated HTTPS lock with trustworthiness"],
      },
      subdomain_trust: {
        title: "Subdomain Trap Triggered!",
        outcome: "wrong",
        explanation: "Anyone can name their subdomain 'accounts.google.com' on their own domain. Only the registered root domain determines identity.",
        rule: "The root domain right before the first path slash is the real destination.",
        cluesUncovered: ["Fell for brand subdomain disguise"],
      },
    },
  },

  // ─── CHALLENGE 03: The Familiar Sender ────────────────────────────────────
  {
    id: "phishing_03",
    questId: "phishing",
    type: "email",
    title: "The Familiar Sender",
    difficulty: "medium",
    xp: 120,
    content: {
      clientMeta: {
        folder: "Inbox",
        accountEmail: "arjun.verma@bharat-techcorp.test",
      },
      sender: {
        name: "Rohan Sharma (Lead Engineer, Pune Hub)",
        email: "rohan.sharma@bharat-techcorp.test",
        avatarText: "RS",
        authenticated: true,
      },
      recipient: "arjun.verma@bharat-techcorp.test",
      subject: "Quick help on internal VPN credentials for prod debug",
      timestamp: "Today at 02:40 PM",
      bodyHtml: `
        <p>Hey Arjun,</p>
        <p>I'm stuck at the Pune client site and my hardware token is desynced. The client's production deployment is blocked.</p>
        <p>Could you quickly forward your temporary VPN access code or approve my push request from this portal link? Really need this in 10 mins before client escalation.</p>
      `,
      links: [
        {
          id: "link_vpn",
          label: "Approve Emergency VPN Bypass Token",
          displayUrl: "https://vpn-token-auth.bharat-internal.test/approve",
          actualDestination: "https://vpn-token-auth.bharat-internal.test/approve",
          suspicious: true,
        },
      ],
      inspectableElements: [
        {
          id: "inspect_sender",
          target: "sender",
          label: "Inspect Sender History & Context",
          clue: "The email is from Rohan's legitimate address, but asking for credentials/MFA bypass violates standard operating procedures. The account could be compromised.",
        },
        {
          id: "inspect_request",
          target: "body",
          label: "Analyze Request Policy Compliance",
          clue: "Company security policies strictly prohibit sharing VPN credentials or approving out-of-band bypass tokens for coworkers.",
        },
      ],
      availableActions: [
        {
          id: "act_reply_ticket",
          label: "Reply to email asking Rohan for the Jira incident ticket number",
          evaluationKey: "reply_deny",
        },
        {
          id: "act_call_verify",
          label: "Call Rohan via registered internal phone directory to verify out-of-band",
          evaluationKey: "call_verify",
        },
        {
          id: "act_preview_link",
          label: "Click link to preview what permissions the bypass token requires",
          evaluationKey: "approve_token",
        },
        {
          id: "act_slack_share",
          label: "Forward email to the team chat channel asking if someone else can authorize it",
          evaluationKey: "slack_share",
        },
      ],
    },
    evaluation: {
      call_verify: { outcome: "correct", score: 100, xp: 120, lifeLost: false, key: "call_verify" },
      reply_deny: { outcome: "partial", score: 50, xp: 60, lifeLost: false, key: "reply_deny" },
      approve_token: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "approve_token" },
      slack_share: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "slack_share" },
    },
    feedback: {
      call_verify: {
        title: "Account Compromise Identified!",
        outcome: "correct",
        explanation: "Outstanding diligence. Rohan's account was compromised via session hijacking. Calling him out-of-band revealed he never sent the email.",
        rule: "When a familiar colleague asks for credentials, tokens, or security policy bypasses, verify out-of-band via phone or in person.",
        cluesUncovered: ["Recognized policy violation despite legitimate sender", "Used out-of-band phone channel for verification"],
      },
      reply_deny: {
        title: "In-Band Rejection (Partial)",
        outcome: "partial",
        explanation: "Denying by email prevented immediate compromise, but emailing the hijacked inbox only communicates with the intruder.",
        rule: "Alert internal SOC when legitimate accounts show signs of unauthorized takeover.",
        cluesUncovered: ["Avoided sharing credentials", "Missed incident escalation"],
      },
      approve_token: {
        title: "Lateral Breach Triggered!",
        outcome: "wrong",
        explanation: "You approved a rogue session token! The attacker gained direct access into the internal network using your authorization.",
        rule: "Never share credentials or approve authentication prompts on behalf of others.",
        cluesUncovered: ["Blindly trusted familiar name", "Bypassed mandatory dual-factor policy"],
      },
      slack_share: {
        title: "Breach Amplified!",
        outcome: "wrong",
        explanation: "Forwarding the malicious authorization prompt to public channels increased the risk of another teammate clicking it.",
        rule: "Report suspicious requests directly to SOC instead of broadcasting them to coworkers.",
        cluesUncovered: ["Broadcasted unverified token request"],
      },
    },
  },

  // ─── CHALLENGE 04: The Attachment ─────────────────────────────────────────
  {
    id: "phishing_04",
    questId: "phishing",
    type: "email",
    title: "The Scholarship Document",
    difficulty: "medium",
    xp: 130,
    content: {
      clientMeta: {
        folder: "Inbox",
        accountEmail: "arjun.verma@bharat-techcorp.test",
      },
      sender: {
        name: "National Higher Education Grants Cell",
        email: "scholarship-grants@education-portal-india.test",
        avatarText: "GOV",
      },
      recipient: "arjun.verma@bharat-techcorp.test",
      subject: "Selected: National Technical Talent Merit Award (INR 50,000 Disbursement)",
      timestamp: "Today at 11:05 AM",
      bodyHtml: `
        <p>Dear Candidate,</p>
        <p>Congratulations! Your academic application for the 2026 Technical Talent Scholarship has been approved for a direct bank grant of <strong>INR 50,000</strong>.</p>
        <p>Please review the attached disbursement verification slip and run the embedded macro to authorize direct deposit into your bank account.</p>
      `,
      attachments: [
        {
          id: "att_doc",
          filename: "Disbursement_Grant_Details_2026.pdf.vbs",
          displayIcon: "file-warning",
          size: "42 KB",
          suspicious: true,
        },
      ],
      inspectableElements: [
        {
          id: "inspect_att",
          target: "attachment",
          label: "Inspect File Extension & Type",
          clue: "The file is named 'Disbursement_Grant_Details_2026.pdf.vbs' — double extension disguise! It is an executable Visual Basic Script, NOT a PDF!",
        },
        {
          id: "inspect_macro_text",
          target: "body",
          label: "Analyze Macro Instruction",
          clue: "Government scholarship grants never distribute automated scripts or request macro execution to disburse funds.",
        },
      ],
      availableActions: [
        { id: "act_open_pdf", label: "Open the file since it displays a PDF document title", evaluationKey: "run_file" },
        { id: "act_save_disk", label: "Download attachment to local drive and scan with antivirus", evaluationKey: "download_only" },
        { id: "act_sandbox_report", label: "Quarantine and report the suspicious executable script attachment", evaluationKey: "quarantine_report" },
        { id: "act_reply_text", label: "Reply requesting the grant details as inline plain text", evaluationKey: "reply_text" },
      ],
    },
    evaluation: {
      quarantine_report: { outcome: "correct", score: 100, xp: 130, lifeLost: false, key: "quarantine_report" },
      download_only: { outcome: "partial", score: 40, xp: 50, lifeLost: false, key: "download_only" },
      run_file: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "run_file" },
      reply_text: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "reply_text" },
    },
    feedback: {
      quarantine_report: {
        title: "Malware Dropper Intercepted!",
        outcome: "correct",
        explanation: "Masterful catch! The double extension '.pdf.vbs' is a classic Trojan technique to trick users into executing rogue scripts.",
        rule: "Always check the final file extension after the last period before opening any unsolicited document.",
        cluesUncovered: ["Identified double extension '.pdf.vbs'", "Recognized financial award bait pretext"],
      },
      download_only: {
        title: "Risky Handling",
        outcome: "partial",
        explanation: "Saving malware to disk leaves your workstation vulnerable to accidental double-clicking. Quarantine and reporting is required.",
        rule: "Do not download suspicious attachments to local storage.",
        cluesUncovered: ["Avoided immediate execution", "Kept malware on local filesystem"],
      },
      run_file: {
        title: "Trojan Executed!",
        outcome: "wrong",
        explanation: "The script executed and installed an encrypted backdoor info-stealer into your operating system.",
        rule: "Never open files with executable extensions (.vbs, .exe, .scr, .bat) sent via email.",
        cluesUncovered: ["Fooled by double extension illusion", "Executed malicious script payload"],
      },
      reply_text: {
        title: "Scam Confirmed (In-Band)",
        outcome: "wrong",
        explanation: "Replying engages with fraudsters who will send fake official letters to request bank account numbers directly.",
        rule: "Unsolicited award emails with attachments should be reported directly to security.",
        cluesUncovered: ["Engaged with scam operator"],
      },
    },
  },

  // ─── CHALLENGE 05: The Password Expiry ────────────────────────────────────
  {
    id: "phishing_05",
    questId: "phishing",
    type: "browser",
    title: "The SSO Portal Renewal",
    difficulty: "medium",
    xp: 140,
    content: {
      browserChrome: {
        url: "https://auth.bharat-techcorp.test.login-identity-access.invalid/sso/renew",
        protocol: "https",
        domain: "auth.bharat-techcorp.test.login-identity-access.invalid",
        realDomain: "login-identity-access.invalid",
        sslValid: true,
        sslIssuer: "ZeroSSL Domain Validator",
      },
      pageContent: {
        brandLogo: "BharatTech Employee Central",
        headline: "Mandatory Active Directory Password Sync",
        subheadline: "Enter current password and new password to synchronize across Hyderabad & Bengaluru clusters.",
        formFields: [
          { id: "curr_pass", type: "password", label: "Current Corporate Password", placeholder: "••••••••••••", readonly: true },
          { id: "new_pass", type: "password", label: "New Desired Password", placeholder: "••••••••••••", readonly: true },
        ],
        notice: "Failure to synchronize will disconnect Active Directory access within 45 minutes.",
      },
      inspectableElements: [
        {
          id: "inspect_domain_parts",
          target: "addressBar",
          label: "Analyze Full Domain Structure",
          clue: "'auth.bharat-techcorp.test' is only a subdomain prefix. The actual root domain is 'login-identity-access.invalid'.",
        },
        {
          id: "inspect_ssl_cert",
          target: "ssl",
          label: "Check Certificate Common Name",
          clue: "The certificate was issued for 'login-identity-access.invalid', not BharatTech Corporation.",
        },
      ],
      availableActions: [
        { id: "act_input_pass", label: "Enter current password because the portal displays official company branding", evaluationKey: "submit_creds" },
        { id: "act_test_dummy", label: "Enter a fake password first to test if the portal accepts invalid input", evaluationKey: "test_dummy" },
        { id: "act_block_report", label: "Close tab and access the official Active Directory portal via corporate intranet", evaluationKey: "block_report" },
        { id: "act_close_only", label: "Close browser tab without logging in or reporting", evaluationKey: "close_only" },
      ],
    },
    evaluation: {
      block_report: { outcome: "correct", score: 100, xp: 140, lifeLost: false, key: "block_report" },
      close_only: { outcome: "partial", score: 50, xp: 70, lifeLost: false, key: "close_only" },
      submit_creds: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "submit_creds" },
      test_dummy: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "test_dummy" },
    },
    feedback: {
      block_report: {
        title: "Credential Harvester Defeated!",
        outcome: "correct",
        explanation: "Excellent domain forensics. Attackers build convincing lookalike portals asking for 'Current Password' to capture your active secret.",
        rule: "To change corporate passwords, always navigate to your internal company portal via bookmarked links, never via unsolicited emails.",
        cluesUncovered: ["Identified rogue domain root", "Spotted harvesting of active passwords"],
      },
      close_only: {
        title: "Escaped Uncompromised",
        outcome: "partial",
        explanation: "You did not hand over your password, but alerting the SOC helps block the campaign for all employees.",
        rule: "Report credential harvesters immediately.",
        cluesUncovered: ["Avoided password disclosure"],
      },
      submit_creds: {
        title: "Active Password Harvested!",
        outcome: "wrong",
        explanation: "By typing your current password, you handed the attacker complete access to your account and enterprise directory.",
        rule: "Never type current passwords into unverified domains.",
        cluesUncovered: ["Disclosed active corporate credentials"],
      },
      test_dummy: {
        title: "Testing Phishing Sites is Risky!",
        outcome: "wrong",
        explanation: "Submitting dummy data often triggers redirect chains or malware downloads while confirming that a human is interacting with the page.",
        rule: "Do not probe or test phishing sites; navigate away and report.",
        cluesUncovered: ["Attempted active probing of malicious site"],
      },
    },
  },

  // ─── CHALLENGE 06: The Perfect Copy ───────────────────────────────────────
  {
    id: "phishing_06",
    questId: "phishing",
    type: "email",
    title: "The Perfect Copy",
    difficulty: "hard",
    xp: 150,
    content: {
      clientMeta: {
        folder: "Inbox",
        accountEmail: "arjun.verma@bharat-techcorp.test",
      },
      sender: {
        name: "Nexus Cloud Billing",
        email: "invoices@nexuscloud-services.co.in.test",
        avatarText: "NC",
        authenticated: true,
      },
      recipient: "arjun.verma@bharat-techcorp.test",
      subject: "Tax Invoice #NX-88901: AWS/Kubernetes Cluster Overage (Payment Due in 24h)",
      timestamp: "Today at 03:15 PM",
      urgency: "Service Suspension Notice",
      bodyHtml: `
        <p>Dear BharatTech Finance Team,</p>
        <p>Attached is Tax Invoice #NX-88901 for your Bengaluru development cluster computing overage of <strong>INR 1,42,800</strong>.</p>
        <p>Due to RBI reconciliation updates, our HDFC commercial settlement account has transitioned to our new virtual IFSC account. Please route payment to the updated account details specified in the portal below to avoid API suspension.</p>
      `,
      links: [
        {
          id: "link_billing",
          label: "View Tax Invoice & Updated Bank Beneficiary",
          displayUrl: "https://billing.nexuscloud-services.co.in/invoices/88901",
          actualDestination: "https://billing-portal-nexuscloud-services.co.in.test/invoices/88901",
          suspicious: true,
        },
      ],
      inspectableElements: [
        {
          id: "inspect_domain_subtle",
          target: "sender",
          label: "Inspect Sender Domain Suffix",
          clue: "Your real vendor uses 'nexuscloud.example.test', but this email comes from 'nexuscloud-services.co.in.test' with added hyphen and country code.",
        },
        {
          id: "inspect_banking_change",
          target: "body",
          label: "Analyze Bank Account Change Pretext",
          clue: "Requesting immediate payment to new bank account details under threat of 24h service suspension is a hallmark of Business Email Compromise (BEC).",
        },
      ],
      availableActions: [
        { id: "act_reply_confirm", label: "Reply directly to email asking for a stamped bank confirmation letter", evaluationKey: "reply_inband" },
        { id: "act_verify_procurement", label: "Hold payment and call vendor on file using master contract contact number", evaluationKey: "verify_procurement" },
        { id: "act_process_payment", label: "Forward to Accounts Payable to process payment before the 24h suspension", evaluationKey: "pay_invoice" },
        { id: "act_partial_payment", label: "Authorize 25% partial payment to keep cluster alive while checking bank details", evaluationKey: "partial_payment" },
      ],
    },
    evaluation: {
      verify_procurement: { outcome: "correct", score: 100, xp: 150, lifeLost: false, key: "verify_procurement" },
      reply_inband: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "reply_inband" },
      pay_invoice: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "pay_invoice" },
      partial_payment: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "partial_payment" },
    },
    feedback: {
      verify_procurement: {
        title: "BEC Invoice Fraud Intercepted!",
        outcome: "correct",
        explanation: "Masterful catch. The lookalike domain 'nexuscloud-services.co.in.test' was registered 3 days ago. You saved the company from a INR 1,42,800 fraudulent transfer.",
        rule: "All changes to supplier bank account or IFSC details must be verified via phone using the number in your existing master service agreement.",
        cluesUncovered: ["Caught lookalike domain variation with hyphen", "Flagged unverified bank details change"],
      },
      reply_inband: {
        title: "In-Band Confirmation Trap!",
        outcome: "wrong",
        explanation: "You emailed the attacker back! They promptly sent a fake stamped confirmation letter with the fraudulent bank details.",
        rule: "Never verify supplier bank details by replying to the same email chain.",
        cluesUncovered: ["Fell for in-band confirmation trap"],
      },
      pay_invoice: {
        title: "INR 1,42,800 Transferred to Mule Account!",
        outcome: "wrong",
        explanation: "You approved payment to an untraceable mule account. The funds cannot be recalled.",
        rule: "Never update vendor banking details without dual verification.",
        cluesUncovered: ["Transferred funds without out-of-band verification"],
      },
      partial_payment: {
        title: "Partial Transfer Lost!",
        outcome: "wrong",
        explanation: "Even partial payments to fraudulent accounts cause direct financial loss.",
        rule: "Never send any funds to unverified bank account changes.",
        cluesUncovered: ["Attempted partial payment without verification"],
      },
    },
  },

  // ─── CHALLENGE 07: The Mixed Signals ──────────────────────────────────────
  {
    id: "phishing_07",
    questId: "phishing",
    type: "multi_step",
    title: "The Mixed Signals Payroll Audit",
    difficulty: "hard",
    xp: 160,
    content: {
      scenarioBrief:
        "You receive an internal email from 'People Operations' claiming an annual salary revision audit discrepancy. Some elements appear genuine while others raise flags.",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Initial HR Communication",
          dialogue: [
            {
              sender: "Pooja Hegde (Head of HR Operations)",
              role: "vendor",
              timestamp: "11:30 AM",
              text: "Hi Arjun, during our Q3 payroll audit with State Bank of India, we found an IFSC routing discrepancy for your provident fund and salary direct deposit. Please review the payroll form attached in our employee portal.",
            },
          ],
          inspectableClues: [
            "Sender display name matches the real HR head Pooja Hegde.",
            "Email header passes SPF but fails DKIM alignment (sent via third-party mailer).",
            "Portal link points to 'people-hr-bharattech.test' instead of internal intranet 'intranet.bharat-techcorp.test'.",
          ],
          availableActions: [
            {
              id: "act_check_intranet",
              label: "Open Company Intranet Directly to Check Announcements",
              type: "advance",
              nextStep: "step_2_intranet",
            },
            {
              id: "act_click_portal",
              label: "Click Email Link to Enter Bank Account Details",
              type: "advance",
              nextStep: "step_2_leak",
            },
          ],
        },
        {
          id: "step_2_intranet",
          stepNumber: 2,
          contextTitle: "Internal Employee Portal Check",
          dialogue: [
            {
              sender: "BharatTech Intranet Notice Board",
              role: "system",
              timestamp: "11:35 AM",
              text: "SECURITY ALERT: Phishing emails impersonating HR regarding 'Salary Audit & Provident Fund' are circulating. HR never requests bank re-entry via external links.",
            },
          ],
          inspectableClues: [
            "Intranet explicitly warns about this active phishing campaign.",
            "Confirms that official HR communications only happen within ERP.",
          ],
          availableActions: [
            {
              id: "act_report_soc",
              label: "Report Email to Security Operations Center (SOC)",
              evaluationKey: "report_mixed_signals",
            },
            {
              id: "act_ignore",
              label: "Just Ignore and Take No Action",
              evaluationKey: "ignore_only",
            },
          ],
        },
        {
          id: "step_2_leak",
          stepNumber: 2,
          contextTitle: "External Form Submission",
          dialogue: [
            {
              sender: "Rogue Portal",
              role: "system",
              timestamp: "11:32 AM",
              text: "Thank you. Your NetBanking user ID and PAN card number have been submitted to 'people-hr-bharattech.test'.",
            },
          ],
          inspectableClues: [
            "Sensitive financial identifiers leaked to external criminal server.",
          ],
          availableActions: [
            {
              id: "act_fail_submit",
              label: "Complete Process",
              evaluationKey: "submitted_credentials",
            },
          ],
        },
      ],
    },
    evaluation: {
      report_mixed_signals: { outcome: "correct", score: 100, xp: 160, lifeLost: false, key: "report_mixed_signals" },
      ignore_only: { outcome: "partial", score: 50, xp: 80, lifeLost: false, key: "ignore_only" },
      submitted_credentials: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "submitted_credentials" },
    },
    feedback: {
      report_mixed_signals: {
        title: "Ambiguity Resolved with Ground Truth!",
        outcome: "correct",
        explanation: "Brilliant navigation. When signals conflict, checking the known trusted internal channel (intranet) immediately clarifies the truth.",
        rule: "Never resolve ambiguity through external email links; verify via authoritative internal portals.",
        cluesUncovered: ["Checked authoritative intranet bulletin", "Escalated active campaign to SOC"],
      },
      ignore_only: {
        title: "Threat Unreported",
        outcome: "partial",
        explanation: "You protected your own information, but failing to report left coworkers exposed to the salary audit spoof.",
        rule: "Report confirmed phishing campaigns promptly.",
        cluesUncovered: ["Avoided trap but omitted reporting"],
      },
      submitted_credentials: {
        title: "Financial Identity Leaked!",
        outcome: "wrong",
        explanation: "You submitted PAN and NetBanking identifiers to a spoofed HR portal.",
        rule: "Never provide financial or tax details on unverified third-party forms.",
        cluesUncovered: ["Fell for spoofed HR authority"],
      },
    },
  },

  // ─── CHALLENGE 08: The Follow-Up ──────────────────────────────────────────
  {
    id: "phishing_08",
    questId: "phishing",
    type: "multi_step",
    title: "The Urgent Escalation Follow-Up",
    difficulty: "hard",
    xp: 170,
    content: {
      scenarioBrief:
        "After ignoring an earlier email, you receive an aggressive follow-up message claiming executive visibility.",
      steps: [
        {
          id: "step_1",
          stepNumber: 1,
          contextTitle: "Aggressive Follow-Up Received",
          dialogue: [
            {
              sender: "Executive Incident Desk",
              role: "vendor",
              timestamp: "04:10 PM",
              text: "SECOND NOTICE: VP of Engineering Vikram Malhotra requested your immediate certificate authorization for the new cloud release. Your lack of response is holding up deployment. Submit confirmation now or face disciplinary review.",
            },
          ],
          inspectableClues: [
            "Uses executive name-dropping (Vikram Malhotra) to create social pressure.",
            "Escalates from mild request to intimidation and threat of disciplinary review.",
            "Demands immediate compliance without standard change-management ticket.",
          ],
          availableActions: [
            {
              id: "act_verify_teams",
              label: "Direct Message Vikram on Internal Chat to Verify",
              type: "advance",
              nextStep: "step_2_verify_vp",
            },
            {
              id: "act_panic_comply",
              label: "Comply Immediately to Avoid Disciplinary Action",
              type: "advance",
              nextStep: "step_2_comply",
            },
          ],
        },
        {
          id: "step_2_verify_vp",
          stepNumber: 2,
          contextTitle: "Direct Verification with VP",
          dialogue: [
            {
              sender: "Vikram Malhotra (VP Engineering)",
              role: "phone_call",
              timestamp: "04:14 PM",
              text: "Arjun, I never authorized any such request! That's a spear-phishing attack attempting to weaponize my name. Good job checking with me directly. Forward the email to security@bharat-techcorp.test immediately.",
            },
          ],
          inspectableClues: [
            "Executive explicitly repudiates the request.",
            "Identified targeted spear-phishing pretext.",
          ],
          availableActions: [
            {
              id: "act_forward_sec",
              label: "Forward Complete Email Headers to Security Team",
              evaluationKey: "forward_security",
            },
          ],
        },
        {
          id: "step_2_comply",
          stepNumber: 2,
          contextTitle: "Token Submission Under Duress",
          dialogue: [
            {
              sender: "Incident Logger",
              role: "system",
              timestamp: "04:12 PM",
              text: "Cloud infrastructure API tokens were dispatched to remote IP 198.51.100.44.",
            },
          ],
          inspectableClues: ["Production cloud keys surrendered to attacker."],
          availableActions: [
            {
              id: "act_fail_duress",
              label: "Acknowledge Breach",
              evaluationKey: "fail_duress",
            },
          ],
        },
      ],
    },
    evaluation: {
      forward_security: { outcome: "correct", score: 100, xp: 170, lifeLost: false, key: "forward_security" },
      fail_duress: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "fail_duress" },
    },
    feedback: {
      forward_security: {
        title: "Executive Pretexting Blocked!",
        outcome: "correct",
        explanation: "Exceptional resistance to intimidation. Attackers often follow up with harsh tone and authority figure references when initial lures fail.",
        rule: "The higher the pressure and more senior the alleged requester, the more vital it is to verify through verified direct channels.",
        cluesUncovered: ["Recognized executive name-dropping pressure", "Maintained composure under intimidation threat"],
      },
      fail_duress: {
        title: "Intimidation Trap Succeeded!",
        outcome: "wrong",
        explanation: "Fear of authority caused you to bypass standard security review and surrender cloud keys.",
        rule: "Legitimate leadership will never penalize you for verifying security requests through official channels.",
        cluesUncovered: ["Yielded to artificial disciplinary intimidation"],
      },
    },
  },

  // ─── CHALLENGE 09: The Incident ───────────────────────────────────────────
  {
    id: "phishing_09",
    questId: "phishing",
    type: "browser",
    title: "Post-Click Incident Containment",
    difficulty: "hard",
    xp: 180,
    content: {
      browserChrome: {
        url: "https://intranet-portal.bharat-techcorp.test/security/incident-response",
        protocol: "https",
        domain: "intranet-portal.bharat-techcorp.test",
        realDomain: "bharat-techcorp.test",
      },
      pageContent: {
        brandLogo: "BharatTech SOC Incident Response",
        headline: "Incident Protocol: Potential Credential Exposure",
        subheadline: "You inadvertently entered your corporate password on a suspicious external site 2 minutes ago. What is your immediate response sequence?",
        formFields: [],
        notice: "Seconds count during active credential compromise. Choose the safest tactical response.",
      },
      inspectableElements: [
        {
          id: "inspect_steps",
          target: "page",
          label: "Assess Containment Protocols",
          clue: "Effective response requires: 1. Immediately changing password from a clean system, 2. Revoking active sessions, 3. Notifying the internal SOC / CERT team.",
        },
      ],
      availableActions: [
        {
          id: "act_wait_see",
          label: "Monitor email and authentication logs over the next 24 hours for unauthorized access notices",
          evaluationKey: "wait_and_see",
        },
        {
          id: "act_contain_triage",
          label: "Change password immediately from an alternate system, terminate active sessions & notify SOC",
          evaluationKey: "contain_triage",
        },
        {
          id: "act_clear_cache",
          label: "Clear browser cookies and local cache to wipe stored credential tokens",
          evaluationKey: "clear_cache",
        },
        {
          id: "act_scan_antivirus",
          label: "Disconnect WiFi and run a local antivirus scan on the machine",
          evaluationKey: "shut_laptop",
        },
      ],
    },
    evaluation: {
      contain_triage: { outcome: "correct", score: 100, xp: 180, lifeLost: false, key: "contain_triage" },
      wait_and_see: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "wait_and_see" },
      clear_cache: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "clear_cache" },
      shut_laptop: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "shut_laptop" },
    },
    feedback: {
      contain_triage: {
        title: "Flawless Incident Response!",
        outcome: "correct",
        explanation: "Outstanding response mindset. When a mistake happens, calm and decisive containment (password reset + session revocation + SOC notification) neutralizes the attacker before they can pivot.",
        rule: "Cybersecurity is not just about prevention; rapid, transparent containment turns an incident into a non-event.",
        cluesUncovered: ["Executed immediate credential reset", "Revoked existing active session tokens", "Alerted SOC for monitoring"],
      },
      wait_and_see: {
        title: "Breach Escalated!",
        outcome: "wrong",
        explanation: "Automated attacker scripts use stolen credentials within seconds to dump enterprise directories.",
        rule: "Never wait after exposing credentials; assume compromise and reset immediately.",
        cluesUncovered: ["Allowed attacker persistence window"],
      },
      clear_cache: {
        title: "Credentials Remain Compromised!",
        outcome: "wrong",
        explanation: "Clearing local browser cache does nothing to protect credentials that have already been transmitted to the attacker's server.",
        rule: "Server-side password resets and session terminations are required after credential exposure.",
        cluesUncovered: ["Confused local browser cache with remote authentication tokens"],
      },
      shut_laptop: {
        title: "Misdirected Triage",
        outcome: "wrong",
        explanation: "Scanning for local viruses does not protect against credentials submitted to a remote harvester.",
        rule: "Focus first on account containment (password reset & session revocation).",
        cluesUncovered: ["Prioritized local scan over credential revocation"],
      },
    },
  },

  // ─── CHALLENGE 10: THE PHISHING SIMULATION ────────────────────────────────
  {
    id: "phishing_10",
    questId: "phishing",
    type: "simulation",
    title: "Morning Rush Phishing Simulation",
    difficulty: "hard",
    xp: 200,
    content: {
      simulationTitle: "THE 5-MINUTE MORNING STANDUP SIMULATION",
      missionObjective:
        "You have 5 minutes before your morning sprint standup at the Bengaluru tech hub. Cross-examine your Inbox, Teams Chat, and Browser tabs to identify the malicious campaign and execute the proper response.",
      timeRemaining: "04:32",
      totalCluesCount: 5,
      environments: ["email", "messages", "browser", "notifications"],
      initialEnvironment: "email",
      environmentMeta: {
        email: { label: "Webmail", badge: "3 Unread" },
        messages: { label: "Teams Chat", badge: "1 New" },
        browser: { label: "Intranet Tabs" },
        notifications: { label: "Alerts", badge: "2" },
      },
      inspectableElements: [
        {
          id: "clue_msg_c_sender",
          label: "Inspect Message C Sender",
          clue: "Email from 'payroll-benefits@bharat-techcorp.co.in.test' uses an external lookalike domain instead of company domain 'bharat-techcorp.test'.",
        },
        {
          id: "clue_chat_ananya",
          label: "Inspect Ananya's Chat Warning",
          clue: "Ananya warns: 'Did you get that weird bonus link? IT confirmed someone is spoofing the payroll address!'",
        },
        {
          id: "clue_browser_directory",
          label: "Cross-Reference Corporate Directory",
          clue: "The real company domain registered in internal browser bookmarks is 'bharat-techcorp.test'.",
        },
        {
          id: "clue_link_destination",
          label: "Inspect Message C Hyperlink",
          clue: "Link destination points to 'festival-bonus-claim.test/harvest' — an active credential phishing server.",
        },
        {
          id: "clue_notification_sec",
          label: "Inspect SOC Security Notification",
          clue: "SOC alert: 'Be on the lookout for Diwali festive bonus lures asking for NetBanking logins.'",
        },
      ],
      environmentData: {
        email: {
          items: [
            {
              category: "EMAIL INBOX",
              title: "Message A: Daily Standup Reminder",
              sender: "Scrum Master (Vikram)",
              timestamp: "09:00 AM",
              metaFields: [
                { label: "From", value: "vikram.scrum@bharat-techcorp.test" },
                { label: "Subject", value: "Daily Sprint Standup @ 09:30 AM" },
              ],
              text: "Hi team, please update Jira tickets before our 9:30 AM sync today. See you in Meeting Room 3.",
            },
            {
              category: "EMAIL INBOX",
              title: "Message B: Weekly Security Digest",
              sender: "SOC Team",
              timestamp: "09:05 AM",
              metaFields: [
                { label: "From", value: "soc-digest@bharat-techcorp.test" },
                { label: "Subject", value: "Security Hygiene Reminder" },
              ],
              text: "Reminder to all employees: Always verify links and report suspicious external domain variations.",
            },
            {
              category: "EMAIL INBOX",
              title: "Message C: Festive Performance Bonus Disbursement",
              sender: "Corporate Payroll Desk",
              timestamp: "09:12 AM",
              metaFields: [
                { label: "From", value: "payroll-benefits@bharat-techcorp.co.in.test" },
                { label: "Subject", value: "ACTION REQUIRED: Claim Festive Bonus (INR 25,000)" },
              ],
              bodyHtml: `
                <p>Dear Employee,</p>
                <p>Management has authorized a festive performance bonus of <strong>INR 25,000</strong> for all active developers.</p>
                <p>Click below to link your salary account before the 10:00 AM accounting cutoff:</p>
                <p><a href="#" style="color:#39C6E8; text-decoration:underline;">https://portal.bharat-techcorp.co.in.test/claim-bonus</a></p>
              `,
              highlightBox: {
                title: "POTENTIAL THREAT INDICATOR",
                text: "Domain suffix contains unexpected .co.in.test variation. Short deadline attached.",
              },
            },
          ],
        },
        messages: {
          items: [
            {
              category: "TEAMS CHAT",
              title: "Chat with Ananya (Colleague)",
              sender: "Ananya Roy",
              timestamp: "09:18 AM",
              metaFields: [
                { label: "Contact", value: "Ananya Roy (Frontend Dev)" },
                { label: "Channel", value: "Direct Message" },
              ],
              text: "Hey Arjun! Did you get that weird festive bonus email? Pooja from HR said in the general channel that someone is spoofing the payroll domain! Don't click it!",
            },
          ],
        },
        browser: {
          items: [
            {
              category: "BROWSER TABS",
              title: "Tab 1: Internal Employee Directory",
              timestamp: "Active Tab",
              metaFields: [
                { label: "URL", value: "https://directory.bharat-techcorp.test/internal" },
                { label: "Official Root", value: "bharat-techcorp.test" },
              ],
              text: "Official Domain Directory: All authentic company services exclusively use the root 'bharat-techcorp.test'. Any domains with extra hyphens or secondary country codes are unapproved.",
            },
          ],
        },
        notifications: {
          items: [
            {
              category: "SYSTEM ALERTS",
              title: "SOC Threat Advisory #2026-09",
              timestamp: "09:10 AM",
              metaFields: [
                { label: "Severity", value: "HIGH" },
                { label: "Target", value: "All Bengaluru Developers" },
              ],
              text: "Threat Intelligence indicates an ongoing credential harvesting campaign using festive bonus pretexts. Exercise caution with unexpected disbursement links.",
            },
          ],
        },
      },
      availableActions: [
        {
          id: "act_sim_test_bonus",
          label: "Click bonus link in Message C to inspect if it requires bank credentials",
          evaluationKey: "sim_click_trap",
        },
        {
          id: "act_sim_report_c",
          label: "Isolate & Report Message C as Spear-Phishing Campaign to SOC",
          evaluationKey: "sim_report_phishing",
        },
        {
          id: "act_sim_forward_team",
          label: "Forward Message C to teammates to check if their bonus amounts match",
          evaluationKey: "sim_forward_team",
        },
        {
          id: "act_sim_delete_all",
          label: "Delete All 3 Emails and Ignore Standup Notice",
          evaluationKey: "sim_delete_all",
        },
      ],
    },
    evaluation: {
      sim_report_phishing: { outcome: "correct", score: 100, xp: 200, lifeLost: false, key: "sim_report_phishing" },
      sim_click_trap: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "sim_click_trap" },
      sim_forward_team: { outcome: "wrong", score: 0, xp: 0, lifeLost: true, key: "sim_forward_team" },
      sim_delete_all: { outcome: "partial", score: 40, xp: 50, lifeLost: false, key: "sim_delete_all" },
    },
    feedback: {
      sim_report_phishing: {
        title: "PHISHING SIMULATION COMPLETE: FLAWLESS TRIAGE",
        outcome: "correct",
        explanation:
          "Outstanding multi-channel investigation! You correlated Ananya's chat message, the SOC threat advisory, the internal directory domain record, and the spoofed email headers in Message C to neutralize the attack.",
        rule: "In real-world incidents, threat verification comes from connecting clues across chat, email, and internal security advisories.",
        cluesUncovered: [
          "Cross-referenced sender domain against official directory",
          "Validated intelligence with colleague chat warning",
          "Correlated SOC threat advisory with incoming email lure",
          "Reported spear-phishing campaign to defend organization",
        ],
      },
      sim_click_trap: {
        title: "SIMULATION BREACH: CREDENTIALS COMPROMISED",
        outcome: "wrong",
        explanation:
          "You fell for the festive bonus lure right before standup. The attacker captured your SSO password and corporate VPN access.",
        rule: "Cross-check unexpected financial lures with official internal channels before clicking.",
        cluesUncovered: ["Ignored warnings from colleague and SOC alert"],
      },
      sim_forward_team: {
        title: "THREAT SPREAD INTERNALLY",
        outcome: "wrong",
        explanation:
          "Forwarding malicious emails to coworkers spreads the attack surface internally.",
        rule: "When you suspect phishing, report it directly to the SOC without forwarding to team channels.",
        cluesUncovered: ["Amplified phishing link to teammates"],
      },
      sim_delete_all: {
        title: "SIMULATION INCOMPLETE",
        outcome: "partial",
        explanation:
          "You deleted legitimate operational emails (Message A & B) while failing to alert SOC to the malicious campaign in Message C.",
        rule: "Distinguish benign operational messages from threats and report attacks.",
        cluesUncovered: ["Deleted legitimate communications alongside threat"],
      },
    },
  },
];
