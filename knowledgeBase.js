/* ==========================================
   IT Helpdesk Knowledge Base
   Comprehensive troubleshooting decision trees
   ========================================== */

const KNOWLEDGE_BASE = {
    outlook: {
        id: "outlook",
        title: "Outlook Issues",
        icon: "📧",
        description: "Email, calendar, and Outlook application problems",
        issues: [
            {
                id: "outlook-l3-issue-1",
                title: "Outlook Stuck on Loading Profile",
                keywords: ["stuck", "loading profile", "hang", "freezing", "startup"],
                symptoms: "<strong>Symptoms:</strong> Outlook hangs indefinitely at the splash screen showing 'Loading Profile'.<br><strong>Root Cause:</strong> Corrupt profile registry keys, hung Outlook process, or incompatible add-in.",
                steps: [
                    {
                        text: "Kill hung processes",
                        detail: "Open Task Manager and end any running <code>OUTLOOK.EXE</code> processes."
                    },
                    {
                        text: "Start in Safe Mode",
                        detail: "Run <code>outlook.exe /safe</code>. If it loads, disable all COM Add-ins and re-enable one by one."
                    },
                    {
                        text: "Reset Navigation Pane",
                        detail: "Run <code>outlook.exe /resetnavpane</code>."
                    },
                    {
                        text: "Disable Hardware Acceleration",
                        detail: "If able to load, disable hardware graphics acceleration in Options > Advanced."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Recreate the Outlook Mail profile via Control Panel > Mail if Safe Mode fails to resolve the stuck screen.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-2",
                title: "Outlook Application Crashing on Launch",
                keywords: ["crash", "crashing", "close immediately", "wont open", "fails to open"],
                symptoms: "<strong>Symptoms:</strong> Outlook opens briefly and closes immediately or throws a 'Microsoft Outlook has stopped working' error.<br><strong>Root Cause:</strong> Corrupted OST file, conflicting third-party antispam/antivirus add-ins, or corrupted Office installation.",
                steps: [
                    {
                        text: "Event Viewer Check",
                        detail: "Check Application event logs for Event ID 1000 pointing to the faulting module (e.g., <code>ucrtbase.dll</code> or add-in DLL)."
                    },
                    {
                        text: "Safe Mode Test",
                        detail: "Launch holding CTRL to enter Safe Mode. If successful, remove faulting add-in."
                    },
                    {
                        text: "Rename OST File",
                        detail: "Navigate to <code>%localappdata%\Microsoft\Outlook</code> and rename the OST file to <code>.old</code> to force recreation."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Perform an Online Repair of Microsoft 365 Apps or run Microsoft Support and Recovery Assistant (SaRA).",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-3",
                title: "Continuous Modern Auth / Password Prompts",
                keywords: ["password prompt", "keeps asking password", "credentials", "modern auth", "mfa prompt"],
                symptoms: "<strong>Symptoms:</strong> User is constantly prompted for credentials or MFA, even after checking 'Remember my credentials'.<br><strong>Root Cause:</strong> Cached credentials conflicting in Windows Credential Manager, Modern Authentication disabled, or Primary Refresh Token (PRT) expiration.",
                steps: [
                    {
                        text: "Clear Credential Manager",
                        detail: "Open Windows Credential Manager and clear all Windows Credentials starting with <code>MicrosoftOffice</code>."
                    },
                    {
                        text: "Clear Identity Cache",
                        detail: "Delete keys under <code>HKCU\Software\Microsoft\Office\16.0\Common\Identity\Identities</code>."
                    },
                    {
                        text: "Disconnect Work/School Account",
                        detail: "Go to Settings > Accounts > Access Work or School, disconnect the M365 account, and reconnect."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Force re-authentication by running <code>dsregcmd /status</code>, clearing cache, and signing back into Office apps.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-4",
                title: "OST File Reach Maximum Size Limit",
                keywords: ["ost size", "maximum size", "mailbox full", "cannot expand folder", "large ost"],
                symptoms: "<strong>Symptoms:</strong> Errors stating 'The Outlook data file has reached the maximum size' or 'Cannot expand the folder'.<br><strong>Root Cause:</strong> The OST file has exceeded the default 50GB limit set by Outlook.",
                steps: [
                    {
                        text: "Check Mailbox Size",
                        detail: "Verify mailbox size in Exchange Online to see if the user is over their 50GB/100GB limit."
                    },
                    {
                        text: "Adjust Cached Exchange Mode",
                        detail: "Go to Account Settings and change the 'Keep mail offline for' slider from 'All' to '1 Year' or less."
                    },
                    {
                        text: "Compact OST",
                        detail: "Go to Data Files > Settings > Advanced > Outlook Data File Settings > Compact Now."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Reduce cache slider duration, compact the OST file, or increase the MaxLargeFileSize registry key if absolutely necessary.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-5",
                title: "Search Returning No Results / Incomplete Results",
                keywords: ["search not working", "no results", "indexing", "search broken", "can't find email"],
                symptoms: "<strong>Symptoms:</strong> Searching in Outlook returns 'No results found' or only shows emails older than a specific date.<br><strong>Root Cause:</strong> Windows Search Index is corrupted or Outlook is unselected in Indexing Options.",
                steps: [
                    {
                        text: "Check Indexing Status",
                        detail: "Click Search > Search Tools > Indexing Status. Check if items are remaining to be indexed."
                    },
                    {
                        text: "Verify Outlook is Indexed",
                        detail: "Open Windows Indexing Options and ensure 'Microsoft Outlook' is checked."
                    },
                    {
                        text: "Rebuild Index",
                        detail: "In Indexing Options > Advanced, click 'Rebuild' (this may take several hours)."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> If rebuilding fails, repair the Office installation or switch off 'Improve search speed by limiting the number of results shown'.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-6",
                title: "Shared Mailbox Not Updating",
                keywords: ["shared mailbox", "not updating", "not syncing", "stuck updating", "delay"],
                symptoms: "<strong>Symptoms:</strong> Emails sent to a shared mailbox do not appear, or folders show outdated content compared to Outlook Web (OWA).<br><strong>Root Cause:</strong> Folders within the shared mailbox have hit the 500-folder limit, or the OST file is too large to sync changes efficiently.",
                steps: [
                    {
                        text: "Compare OWA",
                        detail: "Verify if the missing emails appear in OWA. If yes, it's a client sync issue."
                    },
                    {
                        text: "Disable Download Shared Folders",
                        detail: "Go to Account Settings > More Settings > Advanced. Uncheck 'Download shared folders'."
                    },
                    {
                        text: "Update Folder Manually",
                        detail: "Go to the Send/Receive tab and click 'Update Folder'."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Unchecking 'Download shared folders' forces Outlook to read the shared mailbox directly from Exchange Online, resolving the sync issue.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-7",
                title: "Cannot Open Shared Calendar or Permissions Error",
                keywords: ["shared calendar", "no permission", "cannot open calendar", "delegation"],
                symptoms: "<strong>Symptoms:</strong> Unable to view a colleague's calendar, or receiving 'You do not have permission to view this calendar' despite being given access.<br><strong>Root Cause:</strong> Calendar permissions not fully replicated in Exchange Online, or corruption in the local Free/Busy cache.",
                steps: [
                    {
                        text: "Verify OWA Access",
                        detail: "Check if the user can open the shared calendar in Outlook Web App."
                    },
                    {
                        text: "Remove and Re-add",
                        detail: "Right-click the calendar, select 'Delete Calendar', and re-add it from the Global Address List."
                    },
                    {
                        text: "Check Exchange Permissions",
                        detail: "Verify via Exchange Admin Center or PowerShell (<code>Get-MailboxFolderPermission</code>) that the user has Reviewer access or higher."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Remove the calendar from the client. Enable 'Turn on shared calendar improvements' in Account Settings > Advanced, and re-add.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-8",
                title: "Outlook Disconnected from Exchange",
                keywords: ["disconnected", "trying to connect", "offline", "not connected"],
                symptoms: "<strong>Symptoms:</strong> Status bar shows 'Disconnected' or 'Trying to connect...' continuously.<br><strong>Root Cause:</strong> Network DNS failure, proxy interfering with Autodiscover/MAPI, or stale network adapter configurations.",
                steps: [
                    {
                        text: "Check Toggle Status",
                        detail: "Ensure 'Work Offline' is not toggled ON in the Send/Receive ribbon."
                    },
                    {
                        text: "Ping M365 Endpoints",
                        detail: "Ping <code>outlook.office365.com</code> to verify DNS resolution."
                    },
                    {
                        text: "Flush DNS",
                        detail: "Run <code>ipconfig /flushdns</code> from Command Prompt."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Re-authenticate using Modern Auth (clear credentials if needed) or switch networks (e.g., disconnect from VPN) to restore connection.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-9",
                title: "Autodiscover Failing During Profile Setup",
                keywords: ["setup profile", "autodiscover", "cannot setup email", "cannot connect exchange"],
                symptoms: "<strong>Symptoms:</strong> When adding a new account, Outlook fails to find the server settings automatically and errors out.<br><strong>Root Cause:</strong> Local AD SCP lookup failing in hybrid environments, or DNS CNAME for Autodiscover is misconfigured.",
                steps: [
                    {
                        text: "Bypass SCP Lookup",
                        detail: "Add Registry Key <code>ExcludeScpLookup</code> under <code>HKCU\Software\Microsoft\Office\16.0\Outlook\AutoDiscover</code> and set to 1."
                    },
                    {
                        text: "Use Microsoft Remote Connectivity Analyzer",
                        detail: "Run the Outlook Connectivity test at testconnectivity.microsoft.com to pinpoint DNS/Auth failures."
                    },
                    {
                        text: "Create Profile via Mail Applet",
                        detail: "Use Control Panel > Mail instead of the Outlook startup wizard."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Bypass local AD SCP lookups via Registry or fix the external DNS Autodiscover CNAME pointing to <code>autodiscover.outlook.com</code>.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-10",
                title: "Send/Receive Error 0x8004010F",
                keywords: ["0x8004010F", "send receive error", "cannot access data file", "data file cannot be accessed"],
                symptoms: "<strong>Symptoms:</strong> Sending/receiving emails fails with error '0x8004010F: Outlook data file cannot be accessed'.<br><strong>Root Cause:</strong> Corrupted Outlook profile or the OST/PST file is no longer accessible/linked correctly.",
                steps: [
                    {
                        text: "Locate Data File",
                        detail: "Go to Account Settings > Data Files. Check the exact path of the default delivery location."
                    },
                    {
                        text: "Re-link Data File",
                        detail: "Click 'Change Folder' on the Email tab, select a temporary folder, then change it back to the correct Inbox."
                    },
                    {
                        text: "Run SCANPST",
                        detail: "If the file is a PST, run SCANPST.EXE to repair file structure."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Create a completely new Outlook Mail Profile and let Exchange recreate the fresh OST file to permanently fix the link.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-11",
                title: "Missing Folders / Folders Not Visible",
                keywords: ["missing folder", "folder disappeared", "cant find folder", "subfolders missing"],
                symptoms: "<strong>Symptoms:</strong> User creates a folder in OWA or another device, but it does not appear in the Outlook Desktop client.<br><strong>Root Cause:</strong> Folder hierarchy sync failure or 'Folder View' is filtered.",
                steps: [
                    {
                        text: "Check Folder List Mode",
                        detail: "Press <code>CTRL + 6</code> to switch to 'Folder List' view to see if it's hidden under a different parent."
                    },
                    {
                        text: "Reset View",
                        detail: "Run <code>outlook.exe /cleanviews</code> to reset all custom folder views."
                    },
                    {
                        text: "Clear Offline Items",
                        detail: "Right-click the Inbox or parent folder > Properties > General > click 'Clear Offline Items', then Update Folder."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Clear Offline Items on the parent folder to force Outlook to re-download the folder hierarchy from Exchange.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-12",
                title: "Out of Office (OOF) Not Saving / Server Unreachable",
                keywords: ["out of office", "automatic replies", "server unavailable", "cannot be displayed"],
                symptoms: "<strong>Symptoms:</strong> Clicking Automatic Replies shows 'Your automatic reply settings cannot be displayed because the server is currently unavailable'.<br><strong>Root Cause:</strong> EWS (Exchange Web Services) is blocked or the primary SMTP address does not match the UPN in a hybrid setup.",
                steps: [
                    {
                        text: "Check via OWA",
                        detail: "Verify if OOF can be set via Outlook Web App. If yes, the issue is client-side EWS connection."
                    },
                    {
                        text: "Check Connection Status",
                        detail: "CTRL + Right-click Outlook icon in system tray > Connection Status. Check for EWS connection failures."
                    },
                    {
                        text: "Verify Autodiscover",
                        detail: "Run 'Test E-mail AutoConfiguration' (CTRL + Right-click tray icon) and check the OOF URL."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Correct UPN/Primary SMTP mismatch in Active Directory, or bypass proxy servers blocking EWS endpoints.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-13",
                title: "Outlook Rules Not Firing / Corrupted",
                keywords: ["rules not working", "rules broken", "inbox rules", "client-only rule"],
                symptoms: "<strong>Symptoms:</strong> Emails are not being moved to folders automatically, or opening Rules gives an error about space limitations.<br><strong>Root Cause:</strong> Exceeded the 256KB rules quota limit in Exchange, or rules contain corrupted 'client-only' actions.",
                steps: [
                    {
                        text: "Check Rules Quota",
                        detail: "Increase rules limit via PowerShell: <code>Set-Mailbox -RulesQuota 256KB</code> (if at 64KB)."
                    },
                    {
                        text: "Export and Delete",
                        detail: "Export rules to an .rwz file as a backup, then run <code>outlook.exe /cleanrules</code> to wipe all local/server rules."
                    },
                    {
                        text: "Recreate Rules from OWA",
                        detail: "Recreate critical server-side rules in OWA to ensure they run even when Outlook is closed."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Wipe corrupted rules using `/cleanrules` and recreate them, preferably Server-side via OWA, keeping under the quote limit.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-14",
                title: "Address Book (OAB) Not Updating",
                keywords: ["offline address book", "oab", "global address list", "gal", "new user not showing"],
                symptoms: "<strong>Symptoms:</strong> New hires do not show up in the Outlook Address Book, or user details (phone/title) are outdated.<br><strong>Root Cause:</strong> Offline Address Book (OAB) is out of sync or failed to download from the Exchange server.",
                steps: [
                    {
                        text: "Force Download",
                        detail: "Go to Send/Receive > Send/Receive Groups > Download Address Book. Uncheck 'Download changes since last Send/Receive'."
                    },
                    {
                        text: "Delete Local OAB files",
                        detail: "Navigate to <code>%localappdata%\Microsoft\Outlook\Offline Address Books</code> and delete the folder contents."
                    },
                    {
                        text: "Check OWA",
                        detail: "Verify the Global Address List in OWA. If correct there, the client needs fresh OAB generation."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Deleting the local OAB files and forcing a full manually download forces Outlook to rebuild the address list from scratch.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-15",
                title: "Freezing When Typing or Switching Folders",
                keywords: ["freezing", "laggy", "typing delay", "slow to switch folders", "not responding"],
                symptoms: "<strong>Symptoms:</strong> Outlook frequently shows 'Not Responding' for a few seconds when switching folders or composing emails.<br><strong>Root Cause:</strong> Large OST file, high folder count, or aggressive antivirus scanning of OST files in real-time.",
                steps: [
                    {
                        text: "Exclude OST from AV",
                        detail: "Ensure anti-virus is configured to exclude <code>*.ost</code> and <code>*.pst</code> files from real-time scanning."
                    },
                    {
                        text: "Reduce Cached Time",
                        detail: "Slider to 6 months or 1 year in Cached Exchange Mode settings."
                    },
                    {
                        text: "Check Add-ins",
                        detail: "Disable CRM, PDF, or dictation add-ins temporarily to see if performance improves."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Reduce OST size and add AV exclusions for Outlook data files.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-16",
                title: "Third-Party Add-in Disabling Repeatedly",
                keywords: ["add-in disabled", "crm add-in", "teams addin", "plugin missing"],
                symptoms: "<strong>Symptoms:</strong> A required add-in (like Salesforce, Zoom, or Teams) gets disabled every time Outlook restarts.<br><strong>Root Cause:</strong> Outlook detects the add-in slowing down startup by more than 1000ms and hard-disables it.",
                steps: [
                    {
                        text: "Force Enable in Outlook",
                        detail: "Go to File > Slow and Disabled COM Add-ins. Select 'Always enable this add-in'."
                    },
                    {
                        text: "Modify Registry Resiliency",
                        detail: "Navigate to <code>HKCU\Software\Policies\Microsoft\Office\16.0\Outlook\Resiliency\AddinList</code>. Add a String value with the Add-in ProgID and set it to '1' (Always Enabled)."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Deploy the 'Always Enable' registry key via Group Policy/Intune to prevent Outlook from auto-disabling critical business add-ins.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-17",
                title: "Licensing Errors / Unlicensed Product",
                keywords: ["unlicensed product", "activation", "license missing", "deactivated"],
                symptoms: "<strong>Symptoms:</strong> Title bar says '(Unlicensed Product)' and functionality is restricted to Read-Only mode.<br><strong>Root Cause:</strong> Cached activation tokens are invalid, or computer has lost trust with Azure AD.",
                steps: [
                    {
                        text: "Sign out of Office",
                        detail: "In Word/Outlook, go to File > Account > Sign Out, and close all Office apps."
                    },
                    {
                        text: "Run OSPP.vbs script",
                        detail: "Run <code>cscript ospp.vbs /dstatus</code> to find the 5-digit product key and use <code>/unpkey:XXXXX</code> to remove stale keys."
                    },
                    {
                        text: "Clear BrokerPlugin Data",
                        detail: "Rename the identity folder in <code>%localappdata%\Packages\Microsoft.AAD.BrokerPlugin...</code>"
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Clear old licenses using OSPP.vbs, clear Windows Credentials, and sign back in to force a fresh activation token from M365.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-18",
                title: "Attachments Blocked or Cannot Open",
                keywords: ["blocked attachment", "unsafe file", "cannot open attachment", "pdf opening error"],
                symptoms: "<strong>Symptoms:</strong> Replaces attachments with 'Outlook blocked access to the following potentially unsafe attachments'.<br><strong>Root Cause:</strong> File type is restricted (e.g. .exe, .js, .mde), or temporary internet files folder is full/corrupt.",
                steps: [
                    {
                        text: "Clear OutlookSecureTempFolder",
                        detail: "Lookup <code>OutlookSecureTempFolder</code> in Registry, navigate to that path, and delete all contents."
                    },
                    {
                        text: "Zip the File",
                        detail: "Instruct sender to compress restricted extensions into a .zip file."
                    },
                    {
                        text: "Unblock Level 1 Files",
                        detail: "If business-critical, modify <code>Level1Remove</code> registry key to allow specific extensions (Not recommended for security)."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Clear the SecureTempFolder registry path contents if attachments give 'Cannot create file' errors. Otherwise, zip restricted files.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-19",
                title: "Reminders Not Popping Up",
                keywords: ["reminders missing", "no notifications", "meeting missed", "calendar popups"],
                symptoms: "<strong>Symptoms:</strong> Meeting reminders fail to pop up, causing users to miss scheduled meetings.<br><strong>Root Cause:</strong> Corrupted reminders folder or Windows Focus Assist blocking notifications.",
                steps: [
                    {
                        text: "Clean Reminders",
                        detail: "Close Outlook and run <code>outlook.exe /cleanreminders</code>."
                    },
                    {
                        text: "Check Windows Notifications",
                        detail: "Go to Windows Settings > System > Notifications. Ensure Outlook notifications are ON and Focus Assist/Do Not Disturb is OFF."
                    },
                    {
                        text: "Verify Outlook Setting",
                        detail: "File > Options > Advanced. Ensure 'Show reminders' is checked."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Running `/cleanreminders` recreates the internal reminders queue and usually restores proper popup functionality.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-20",
                title: "Sent Items Not Saving in Shared Mailboxes",
                keywords: ["sent item missing", "shared mailbox sent", "copy of sent item"],
                symptoms: "<strong>Symptoms:</strong> When sending 'As' a shared mailbox, the sent email goes to the User's primary Sent Items, not the Shared Mailbox Sent Items.<br><strong>Root Cause:</strong> By default, Outlook saves items sent as a delegate to the primary mailbox.",
                steps: [
                    {
                        text: "Registry Fix for Sent Items",
                        detail: "Add DWORD <code>DelegateSentItemsStyle</code> = 1 in <code>HKCU\Software\Microsoft\Office\16.0\Outlook\Preferences</code>."
                    },
                    {
                        text: "Exchange PowerShell Fix",
                        detail: "Run <code>Set-Mailbox -Identity shared@domain.com -MessageCopyForSentAsEnabled $true</code> as Admin."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Use the Exchange PowerShell command (preferred enterprise method) to automatically copy sent items into the Shared Mailbox Sent folder.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-21",
                title: "Recovering Deleted Items Fails",
                keywords: ["recover deleted", "missing email", "permanent delete", "dumpster"],
                symptoms: "<strong>Symptoms:</strong> User accidentally shift-deleted an email and it cannot be found in the Deleted Items folder.<br><strong>Root Cause:</strong> Item has moved to the Recoverable Items (Dumpster) partition.",
                steps: [
                    {
                        text: "Open Recover Deleted Items",
                        detail: "Go to Folder tab > click 'Recover Deleted Items'."
                    },
                    {
                        text: "Search via OWA",
                        detail: "Sometimes OWA's Recover Deleted Items interface is more reliable than the Outlook client."
                    },
                    {
                        text: "Admin eDiscovery",
                        detail: "If past the 14-day default window, an Admin must perform an eDiscovery search (if Litigation Hold is enabled)."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Select the item in the 'Recover Deleted Items' dialog and choose 'Restore Selected Items'. It goes back to the original folder.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-22",
                title: "Teams Meeting Add-in Missing",
                keywords: ["teams addin", "no teams button", "missing meeting link", "skype addin"],
                symptoms: "<strong>Symptoms:</strong> The 'New Teams Meeting' button disappears from the Outlook Calendar ribbon.<br><strong>Root Cause:</strong> Add-in was disabled by Outlook for load times, or Teams was installed without Admin privileges.",
                steps: [
                    {
                        text: "Re-enable in Add-ins",
                        detail: "File > Options > Add-ins. Change Manage drop-down to Disabled Items, click Go. Re-enable Teams Add-in."
                    },
                    {
                        text: "Re-register DLL",
                        detail: "Close Outlook. Re-register <code>Microsoft.Teams.AddinLoader.dll</code> using <code>regsvr32</code>."
                    },
                    {
                        text: "Restart Teams",
                        detail: "Fully quit Teams from system tray, restart Teams, then restart Outlook."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Go to Disabled Items, re-enable the Microsoft Teams Meeting Add-in, and check the COM Add-ins list to ensure it is checked.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-23",
                title: "Signatures Missing After Upgrading",
                keywords: ["missing signature", "signature blank", "roaming signatures"],
                symptoms: "<strong>Symptoms:</strong> Clicking the Signature button does nothing, or all previous signatures are gone.<br><strong>Root Cause:</strong> Microsoft's new 'Cloud Roaming Signatures' feature conflicts with locally stored `%appdata%\Microsoft\Signatures`.",
                steps: [
                    {
                        text: "Check Local Path",
                        detail: "Verify if the `.htm` and `.rtf` signature files still exist in the AppData pathway."
                    },
                    {
                        text: "Disable Roaming Signatures",
                        detail: "Set Registry DWORD <code>DisableRoamingSignaturesTemporaryToggle</code> = 1 under <code>HKCU\Software\Microsoft\Office\16.0\Outlook\Setup</code>."
                    },
                    {
                        text: "Recreate Signatures",
                        detail: "If missing completely, the user must recreate them via File > Options > Mail > Signatures."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Add the Registry key to disable Cloud Signatures if enterprise local-signature scripts are failing to apply.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-24",
                title: "Mail Stuck in Outbox",
                keywords: ["stuck in outbox", "not sending", "email pending", "large attachment"],
                symptoms: "<strong>Symptoms:</strong> Emails sit in the Outbox and show a status of transmitting but never leave.<br><strong>Root Cause:</strong> An email with a huge attachment is choking the queue, or the OST file is corrupted.",
                steps: [
                    {
                        text: "Work Offline",
                        detail: "Go to Send/Receive tab, click 'Work Offline'. Restart Outlook."
                    },
                    {
                        text: "Move/Delete Stuck Email",
                        detail: "While offline, open the Outbox, move the stuck email to Drafts or delete it. Turn off 'Work Offline'."
                    },
                    {
                        text: "Check Attachment Size",
                        detail: "Ensure attachments do not exceed the 35MB standard Exchange limit."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Toggle to Work Offline mode to release the lock on the Outbox, delete the large email, and reconnect to clear the queue.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-25",
                title: "VPN / Proxy Blocking Connection",
                keywords: ["vpn issue", "proxy error", "network block", "no connection offsite"],
                symptoms: "<strong>Symptoms:</strong> Outlook is disconnected when working remotely on VPN, but works fine on the corporate network.<br><strong>Root Cause:</strong> Split-tunneling is misconfigured, or MTU size over VPN truncates Outlook RPC/MAPI packets.",
                steps: [
                    {
                        text: "Test Off-VPN",
                        detail: "Disconnect from VPN. If it connects, the VPN firewall is blocking M365 IPs."
                    },
                    {
                        text: "M365 Network Connectivity Test",
                        detail: "Run <code>connectivity.office.com</code> to verify proxy bypass rules are active for <code>Optimize</code> category endpoints."
                    },
                    {
                        text: "Check Proxy Settings",
                        detail: "Ensure 'Bypass proxy server for local addresses' is set in Internet Options."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Work with the Network team to bypass all Microsoft 365 <code>Optimize</code> endpoints from VPN forced-tunneling and SSL Inspection.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-26",
                title: "New Outlook Toggle Reverting to Classic",
                keywords: ["new outlook", "toggle missing", "reverts classic", "new outlook beta"],
                symptoms: "<strong>Symptoms:</strong> User tries to toggle 'Try the New Outlook', but it immediately flips back or fails to install.<br><strong>Root Cause:</strong> The New Outlook installation is blocked by Group Policy, AppLocker, or the mailbox is hosted on an unsupported On-Premise Exchange.",
                steps: [
                    {
                        text: "Verify Exchange Hosting",
                        detail: "Ensure the mailbox is fully migrated to Exchange Online (M365). New Outlook does not support legacy on-prem servers yet."
                    },
                    {
                        text: "Check GPO",
                        detail: "Verify if the registry key <code>HideNewOutlookToggle</code> is set to 1."
                    },
                    {
                        text: "Manual Install",
                        detail: "Install 'Outlook for Windows' manually from the Microsoft Store."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Ensure mailbox is M365-hosted and manually install the UWP Outlook app from the Store if the toggle is broken.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-27",
                title: "Images Not Downloading in Emails",
                keywords: ["red x", "images missing", "pictures not downloading", "blocked content"],
                symptoms: "<strong>Symptoms:</strong> Emails display red 'X' icons instead of pictures. Clicking 'Download Pictures' does nothing.<br><strong>Root Cause:</strong> Trust Center settings restrict auto-download, or the IE/Edge temporary internet cache path is invalid.",
                steps: [
                    {
                        text: "Trust Center Check",
                        detail: "File > Options > Trust Center > Trust Center Settings > Automatic Download. Uncheck 'Don't download pictures automatically'."
                    },
                    {
                        text: "Check IE Cache",
                        detail: "In Internet Options > General > Browsing history settings, check if the Current location path is valid. Move the folder to Default if necessary."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Fix the corrupted Internet Temporary Files folder path in Windows Internet Options, which Outlook uses to process downloaded images.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-28",
                title: "Font Size Changes Suddenly / Zoom Issue",
                keywords: ["font too small", "zoom out", "text tiny", "huge font", "reading pane text"],
                symptoms: "<strong>Symptoms:</strong> The text in the Reading Pane or composed emails is extremely tiny or huge.<br><strong>Root Cause:</strong> The Zoom level in the reading pane was accidentally changed with CTRL + Mouse Wheel.",
                steps: [
                    {
                        text: "Reset Zoom via Ribbon",
                        detail: "Open an email, go to the Message/Format Text tab, click Zoom, and select 100%."
                    },
                    {
                        text: "Mouse Wheel Fix",
                        detail: "Click inside the Reading Pane, hold CTRL, and spin the mouse wheel to resize text dynamically."
                    },
                    {
                        text: "Zoom Slider",
                        detail: "Check the bottom right corner of the Outlook window for the Zoom slider."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Set Zoom back to 100% and tick 'Remember my preference' so it applies to all future emails.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-29",
                title: "Delegation: 'Cannot open the folders' Error",
                keywords: ["delegate error", "boss calendar", "assistant permissions", "cannot open"],
                symptoms: "<strong>Symptoms:</strong> An assistant (Delegate) gets 'Cannot open the folders' when trying to manage their manager's Inbox.<br><strong>Root Cause:</strong> Delegate given access to Inbox, but NOT given 'Folder Visible' permission on the Root Mailbox folder.",
                steps: [
                    {
                        text: "Set Root Permissions",
                        detail: "Manager must right-click their main email address at the top of the folder list > Properties > Permissions > Add Delegate > assign 'Folder visible' only."
                    },
                    {
                        text: "Verify Inbox Permissions",
                        detail: "Ensure the actual Inbox folder has Editor access assigned."
                    },
                    {
                        text: "Restart Client",
                        detail: "Delegate restarts Outlook to pull updated ACLs."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Assign 'Folder Visible' permission on the 'Top of Information Store' (Root folder) to allow the delegate to map the subfolders correctly.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            },
            {
                id: "outlook-l3-issue-30",
                title: "PST Password Lost or Forgotten",
                keywords: ["pst password", "forgot password", "unlock pst", "archive password"],
                symptoms: "<strong>Symptoms:</strong> User opens an Archive .pst file but doesn't know the password locking it.<br><strong>Root Cause:</strong> User set a password on their personal local archive and forgot it.",
                steps: [
                    {
                        text: "Third-Party Tools",
                        detail: "Microsoft does NOT provide a native PST password recovery tool. A third-party tool like 'NirSoft PstPassword' is required to strip the hashing."
                    },
                    {
                        text: "Compliance Check",
                        detail: "Verify enterprise security policy before running password-cracking tools on PST files."
                    },
                    {
                        text: "Restore from Backup",
                        detail: "If cracking fails, check Volume Shadow Copies (Previous Versions) prior to the password being set."
                    }
                ],
                warnings: ["For L3 Administrators / Senior Support context."],
                verification: "<strong>Resolution:</strong> Use authorized third-party recovery utilities to strip the weak CRC32 hash from the PST file if corporate policy permits.",
                escalation: "Escalate to Microsoft Premier Support or Exchange Engineering if the resolution fails."
            }
        ]
    },

    windows: {
        id: "windows",
        title: "Windows Profile & Cache",
        icon: "🪟",
        description: "Temp files, cache cleanup, and user profile problems",
        issues: [
            {
                id: "clear-temp-files",
                title: "Removing Temporary Files",
                keywords: ["temp", "temporary files", "temp files", "%temp%", "prefetch", "clear temp", "delete temp", "temp folder"],
                symptoms: "Your system is running slow or low on disk space due to accumulated temporary files.",
                steps: [
                    {
                        text: "Clean the user Temp folder.",
                        detail: "Press <code>Win + R</code>, type <code>%temp%</code> and press Enter. Select all files (<code>Ctrl + A</code>), then press <code>Delete</code>. Skip any files that are in use."
                    },
                    {
                        text: "Clean the system Temp folder.",
                        detail: "Press <code>Win + R</code>, type <code>temp</code> and press Enter. If prompted for admin access, click Yes. Select all and delete. Skip files in use."
                    },
                    {
                        text: "Clean Prefetch files.",
                        detail: "Press <code>Win + R</code>, type <code>prefetch</code> and press Enter. If prompted for admin access, click Yes. Select all and delete."
                    },
                    {
                        text: "Empty the Recycle Bin.",
                        detail: "Right-click the <strong>Recycle Bin</strong> on your desktop and select <strong>Empty Recycle Bin</strong>."
                    },
                    {
                        text: "Use Disk Cleanup (optional for deeper clean).",
                        detail: "Press <code>Win + R</code>, type <code>cleanmgr</code> and press Enter. Select your C: drive. Check all categories and click OK."
                    }
                ],
                warnings: ["Some temp files may be in use by running programs — just skip those, it's normal.", "Do NOT delete files from folders you don't recognize."],
                verification: "Check your available disk space: go to File Explorer → This PC. The C: drive should show more free space.",
                escalation: "If disk space is still critically low after cleanup, contact IT Admin. There may be large log files or other issues that need attention."
            },
            {
                id: "clear-cache",
                title: "Clearing System & App Cache",
                keywords: ["cache", "clear cache", "browser cache", "dns cache", "app cache", "system cache", "flush cache", "flush dns"],
                symptoms: "Apps behaving strangely, websites not loading correctly, or general slowness that might be caused by cached data.",
                steps: [
                    {
                        text: "Flush DNS cache.",
                        detail: "Open <strong>Command Prompt as Admin</strong>: press <code>Win + R</code>, type <code>cmd</code>, then press <code>Ctrl + Shift + Enter</code>. Type <code>ipconfig /flushdns</code> and press Enter."
                    },
                    {
                        text: "Clear Windows Store cache.",
                        detail: "Press <code>Win + R</code>, type <code>wsreset.exe</code> and press Enter. Wait for the process to complete — the Store will open when done."
                    },
                    {
                        text: "Clear browser cache (Edge).",
                        detail: "Open Edge → press <code>Ctrl + Shift + Delete</code>. Select <strong>Cached images and files</strong>. Set time range to <strong>All time</strong>. Click <strong>Clear now</strong>."
                    },
                    {
                        text: "Clear browser cache (Chrome).",
                        detail: "Open Chrome → press <code>Ctrl + Shift + Delete</code>. Select <strong>Cached images and files</strong>. Set time range to <strong>All time</strong>. Click <strong>Clear data</strong>."
                    },
                    {
                        text: "Restart your computer.",
                        detail: "After clearing caches, <strong>restart</strong> your computer to ensure all changes take effect."
                    }
                ],
                warnings: ["Clearing browser cache will log you out of some websites. Make sure you know your passwords.", "Flushing DNS cache is safe but may cause a brief delay when loading websites for the first time."],
                verification: "After restart, apps and websites should load fresh. Any previous caching issues should be resolved.",
                escalation: "If clearing cache doesn't resolve your issue, it may be a network or configuration problem. Contact IT Admin."
            },
            {
                id: "temp-user-profile",
                title: "Temporary User Profile Fix",
                keywords: ["temporary profile", "temp profile", "logged in temporary", "user profile missing", "profile not loading", "wrong profile"],
                symptoms: "Windows logs you in with a temporary profile. You see a notification saying 'You've been signed in with a temporary profile.' Your files and settings are missing.",
                steps: [
                    {
                        text: "Restart your computer first.",
                        detail: "Sometimes this happens due to a one-time glitch. Click <strong>Start → Power → Restart</strong>. Wait for the PC to fully restart and log in again."
                    },
                    {
                        text: "If the issue persists, check the Windows Event Viewer.",
                        detail: "Press <code>Win + R</code>, type <code>eventvwr.msc</code> and press Enter. Go to <strong>Windows Logs → Application</strong>. Look for errors related to User Profile Service."
                    },
                    {
                        text: "Make sure your disk has enough space.",
                        detail: "Go to <strong>This PC</strong> and check the C: drive. If it's almost full, Windows can't load your profile. Free up space by clearing temp files."
                    },
                    {
                        text: "Sign out and sign back in.",
                        detail: "Click <strong>Start → your profile icon → Sign out</strong>. Wait 30 seconds, then sign back in."
                    }
                ],
                warnings: ["Do NOT attempt to edit the Windows Registry to fix this unless directed by IT Admin.", "Files saved in a temporary profile are deleted when you sign out."],
                verification: "After restarting, verify that your desktop icons, files, and settings are back to normal.",
                escalation: "If you keep getting a temporary profile, contact IT Admin immediately. This likely requires a registry fix or profile rebuild that must be done by an administrator."
            },
            {
                id: "recreate-user-profile",
                title: "Recreating Windows User Profile",
                keywords: ["recreate profile", "new profile", "create new user", "user profile corrupted", "profile broken", "windows profile"],
                symptoms: "Your Windows user profile is corrupted — settings are lost, apps won't work properly, or you keep getting temporary profile errors.",
                steps: [
                    {
                        text: "Create a new local admin account.",
                        detail: "Go to <strong>Settings → Accounts → Other users</strong>. Click <strong>Add account</strong> → <strong>I don't have this person's sign-in information</strong> → <strong>Add a user without a Microsoft account</strong>. Create a username and password."
                    },
                    {
                        text: "Make the new account an administrator.",
                        detail: "Under Other users, click the new account → <strong>Change account type</strong> → select <strong>Administrator</strong> → OK."
                    },
                    {
                        text: "Sign out and sign into the new account.",
                        detail: "Click <strong>Start → Sign out</strong>. Sign in with the new account credentials."
                    },
                    {
                        text: "Copy your files from the old profile.",
                        detail: "Open File Explorer and navigate to <code>C:\\Users\\OldUsername\\</code>. Copy your important files (Documents, Desktop, Downloads, Pictures) to the same folders in the new profile."
                    },
                    {
                        text: "Reconfigure your apps.",
                        detail: "Sign into your Microsoft account, reinstall or reconfigure necessary applications. Some apps may need to be set up again."
                    }
                ],
                warnings: ["This is an advanced procedure. Make sure to back up all important data before starting.", "You'll need to reconfigure app settings and preferences in the new profile.", "Do NOT delete the old profile until you've verified all files have been copied."],
                verification: "Sign into the new profile and verify that all your files are present and apps work correctly.",
                escalation: "Contact IT Admin before performing this procedure in a corporate environment. They may need to join the new profile to the domain."
            }
        ]
    },

    updates: {
        id: "updates",
        title: "System Updates & Maintenance",
        icon: "🔄",
        description: "Windows updates, drivers, and restart best practices",
        issues: [
            {
                id: "check-windows-updates",
                title: "How to Check Windows Updates",
                keywords: ["windows update", "check update", "check for updates", "install update", "update windows", "pending update", "system update"],
                symptoms: "You want to ensure your system is up to date with the latest security patches and features.",
                steps: [
                    {
                        text: "Open Windows Settings.",
                        detail: "Press <code>Win + I</code> or click <strong>Start → Settings</strong> (the gear icon)."
                    },
                    {
                        text: "Go to Windows Update.",
                        detail: "Click <strong>Windows Update</strong> in the left sidebar (Windows 11) or <strong>Update & Security → Windows Update</strong> (Windows 10)."
                    },
                    {
                        text: "Click 'Check for updates'.",
                        detail: "Click the <strong>Check for updates</strong> button. Windows will search for available updates."
                    },
                    {
                        text: "Download and install updates.",
                        detail: "If updates are found, click <strong>Download & install</strong>. Some updates download automatically."
                    },
                    {
                        text: "Restart when prompted.",
                        detail: "Many updates require a restart. Save your work and click <strong>Restart now</strong>, or schedule it for later using <strong>Schedule the restart</strong>."
                    }
                ],
                warnings: ["Do NOT shut down your PC while updates are installing — this can corrupt your system.", "Some updates may take 15-30 minutes to install. Plan accordingly."],
                verification: "After restart, go back to Windows Update. It should show 'You're up to date' with the latest check time.",
                escalation: "If updates fail repeatedly with an error code, note the error code and contact IT Admin."
            },
            {
                id: "optional-updates",
                title: "How to Install Optional Updates",
                keywords: ["optional update", "driver update", "firmware update", "optional", "advanced options", "feature update"],
                symptoms: "You need to install optional updates, driver updates, or feature updates that are not installed automatically.",
                steps: [
                    {
                        text: "Open Windows Update settings.",
                        detail: "Press <code>Win + I</code>, then go to <strong>Windows Update</strong>."
                    },
                    {
                        text: "Click 'Advanced options'.",
                        detail: "Scroll down and click <strong>Advanced options</strong>."
                    },
                    {
                        text: "Click 'Optional updates'.",
                        detail: "Under Additional options, click <strong>Optional updates</strong>."
                    },
                    {
                        text: "Expand and select updates.",
                        detail: "You'll see categories like <strong>Driver updates</strong> and <strong>Other updates</strong>. Expand each category and check the updates you want to install."
                    },
                    {
                        text: "Click 'Download & install'.",
                        detail: "Click the <strong>Download & install</strong> button. Restart your PC if prompted."
                    }
                ],
                warnings: ["Only install driver updates if you're experiencing issues with specific hardware.", "Feature updates may change your system significantly — ensure you have a recent backup."],
                verification: "After installation, verify that the hardware or feature you updated is working correctly.",
                escalation: "If optional updates cause issues (like hardware not working), contact IT Admin. You may need to roll back the driver."
            },
            {
                id: "driver-updates",
                title: "Driver Update Guidance",
                keywords: ["driver", "driver update", "device driver", "hardware driver", "update driver", "device manager", "graphics driver", "printer driver"],
                symptoms: "A hardware device isn't working properly, or you need to update drivers for better performance.",
                steps: [
                    {
                        text: "Open Device Manager.",
                        detail: "Press <code>Win + R</code>, type <code>devmgmt.msc</code> and press Enter. Or right-click the <strong>Start</strong> button and select <strong>Device Manager</strong>."
                    },
                    {
                        text: "Find the device that needs updating.",
                        detail: "Expand the relevant category (e.g., Display adapters, Network adapters, Printers). Devices with issues will have a yellow triangle ⚠️ icon."
                    },
                    {
                        text: "Update the driver.",
                        detail: "Right-click the device and select <strong>Update driver</strong>. Choose <strong>Search automatically for drivers</strong>."
                    },
                    {
                        text: "Alternatively, check Windows Update for drivers.",
                        detail: "Go to <strong>Settings → Windows Update → Advanced options → Optional updates → Driver updates</strong>."
                    },
                    {
                        text: "Restart your computer.",
                        detail: "After the driver installation, restart your PC to apply the changes."
                    }
                ],
                warnings: ["Do NOT download drivers from unknown websites — always use Windows Update or the manufacturer's official website.", "If a driver update causes issues, you can roll back: go to Device Manager → right-click device → Properties → Driver tab → Roll Back Driver."],
                verification: "After updating, verify the device works correctly. In Device Manager, the device should show no warning icons.",
                escalation: "If you can't find the correct driver or the device still doesn't work, contact IT Admin with the device name and any error codes."
            },
            {
                id: "restart-best-practices",
                title: "Restart vs. Shutdown — Best Practices",
                keywords: ["restart", "reboot", "shutdown", "shut down", "restart vs shutdown", "when to restart", "power off", "fast startup"],
                symptoms: "Understanding when to restart vs shut down, and how to properly manage your PC's power state.",
                steps: [
                    {
                        text: "Know the difference between Restart and Shutdown.",
                        detail: "<strong>Restart</strong> fully reinitializes Windows, clearing all memory and restarting services. <strong>Shutdown</strong> (with Fast Startup enabled) actually hibernates the kernel — it's faster but doesn't fully clear everything."
                    },
                    {
                        text: "Use Restart for troubleshooting.",
                        detail: "When fixing IT issues, always use <strong>Restart</strong> instead of Shutdown + Power On. Go to <strong>Start → Power → Restart</strong>."
                    },
                    {
                        text: "Full shutdown (when needed).",
                        detail: "For a true full shutdown, hold <code>Shift</code> and click <strong>Shut down</strong>. This bypasses Fast Startup and fully powers down."
                    },
                    {
                        text: "Restart regularly.",
                        detail: "Best practice: restart your PC at least once a week. This clears memory leaks, applies pending updates, and refreshes system services."
                    },
                    {
                        text: "After updates, always restart.",
                        detail: "When Windows Update prompts you to restart, do it as soon as possible. Delaying restarts can leave your system in an incomplete state."
                    }
                ],
                warnings: ["Save all your work before restarting or shutting down.", "If your PC is unresponsive, hold the physical power button for 10 seconds to force shutdown — but only as a last resort."],
                verification: "After a restart, your PC should boot fresh with all services running properly.",
                escalation: "If your PC won't restart properly, gets stuck on restart, or takes an unusually long time, contact IT Admin."
            }
        ]
    },

    m365: {
        id: "m365",
        title: "Microsoft 365 Basics",
        icon: "☁️",
        description: "Password, MFA, sign-in, and license issues",
        issues: [
            {
                id: "password-reset",
                title: "Password Reset Guidance",
                keywords: ["password", "reset password", "change password", "forgot password", "password expired", "password change", "can't login", "wrong password"],
                symptoms: "You need to reset or change your Microsoft 365 / work account password.",
                steps: [
                    {
                        text: "Try Self-Service Password Reset (SSPR).",
                        detail: "Go to <a href='https://aka.ms/sspr' target='_blank'>https://aka.ms/sspr</a> in your browser. Enter your email address and complete the CAPTCHA. Follow the verification steps (text, email, or authenticator app)."
                    },
                    {
                        text: "For password change (if you know your current password).",
                        detail: "Sign in to <a href='https://myaccount.microsoft.com' target='_blank'>https://myaccount.microsoft.com</a>. Go to <strong>Security info</strong> or press <code>Ctrl + Alt + Delete</code> on your PC and select <strong>Change a password</strong>."
                    },
                    {
                        text: "Choose a strong password.",
                        detail: "Use at least 12 characters, mixing uppercase, lowercase, numbers, and symbols. Avoid using your name, birthday, or common words."
                    },
                    {
                        text: "Update saved passwords.",
                        detail: "After changing your password, update it on your phone (Outlook mobile, Teams), any other signed-in devices, and your browser's saved passwords."
                    }
                ],
                warnings: ["If your account is locked, you MUST wait for the lockout period to end (usually 15-30 minutes) or contact IT Admin.", "Never share your password with anyone, including IT support."],
                verification: "Test your new password by signing into Microsoft 365 portal: https://portal.office.com",
                escalation: "If Self-Service Password Reset is not available or you're locked out, contact IT Admin to reset your password manually."
            },
            {
                id: "mfa-issues",
                title: "MFA (Multi-Factor Authentication) Issues",
                keywords: ["mfa", "multi-factor", "two-factor", "2fa", "authenticator", "verification code", "mfa not working", "can't verify", "authentication", "approve sign in"],
                symptoms: "You're unable to complete MFA verification — authenticator app not sending codes, phone not receiving texts, or MFA keeps failing.",
                steps: [
                    {
                        text: "Check your phone has internet/signal.",
                        detail: "MFA codes via authenticator app need internet. SMS codes need cell signal. Make sure your phone isn't in airplane mode."
                    },
                    {
                        text: "Open Microsoft Authenticator manually.",
                        detail: "If push notification isn't showing, open the <strong>Microsoft Authenticator</strong> app directly. You should see a one-time code for your account. Enter that code on the sign-in page."
                    },
                    {
                        text: "Check the time on your phone.",
                        detail: "MFA codes are time-based. If your phone's clock is wrong, codes won't work. Go to <strong>Settings → Date & Time → Set automatically</strong>."
                    },
                    {
                        text: "Try an alternative MFA method.",
                        detail: "On the sign-in page, click <strong>I can't use my Microsoft Authenticator app right now</strong> or <strong>Sign in another way</strong>. Choose text message or phone call instead."
                    },
                    {
                        text: "Re-register MFA if needed.",
                        detail: "Go to <a href='https://aka.ms/mfasetup' target='_blank'>https://aka.ms/mfasetup</a>. Remove your old authentication method and re-add the Authenticator app by scanning the QR code."
                    }
                ],
                warnings: ["Do NOT uninstall the Authenticator app unless instructed — you may lose your registered methods.", "If you've changed phones, you need to transfer or re-register MFA."],
                verification: "After fixing MFA, try signing into https://portal.office.com to verify that the authentication completes successfully.",
                escalation: "If you've lost access to all MFA methods (lost phone, changed number), contact IT Admin. They can temporarily reset your MFA methods."
            },
            {
                id: "signin-troubleshoot",
                title: "Sign-In Troubleshooting",
                keywords: ["sign in", "login", "can't sign in", "login error", "access denied", "account locked", "sign in failed", "login failed", "authentication error"],
                symptoms: "You're unable to sign into Microsoft 365, your work email, or other company services.",
                steps: [
                    {
                        text: "Verify your username.",
                        detail: "Make sure you're using the correct email address (usually <code>yourname@company.com</code>). Check for typos."
                    },
                    {
                        text: "Try signing in via a private/incognito window.",
                        detail: "Open a private window (<code>Ctrl + Shift + N</code> in Chrome, <code>Ctrl + Shift + P</code> in Edge). Go to <a href='https://portal.office.com' target='_blank'>portal.office.com</a> and try signing in."
                    },
                    {
                        text: "Clear your browser cache.",
                        detail: "Press <code>Ctrl + Shift + Delete</code>. Clear cookies and cached files. Try signing in again."
                    },
                    {
                        text: "Check if your account is locked.",
                        detail: "If you see a message about account lockout, wait 15-30 minutes and try again. Too many wrong password attempts trigger lockout."
                    },
                    {
                        text: "Reset your password.",
                        detail: "Go to <a href='https://aka.ms/sspr' target='_blank'>https://aka.ms/sspr</a> and follow the password reset process."
                    }
                ],
                warnings: ["Do NOT keep trying to sign in with the wrong password — this will lock your account.", "If you see 'Your account has been blocked', contact IT Admin immediately."],
                verification: "After resolving the issue, sign into portal.office.com and verify you can access your email, Teams, and other services.",
                escalation: "If sign-in fails after clearing cache, resetting password, and waiting for lockout, contact IT Admin. Your account may need to be unlocked or there may be a conditional access policy issue."
            },
            {
                id: "license-issues",
                title: "License-Related Issues",
                keywords: ["license", "no license", "product deactivated", "unlicensed", "subscription", "expired license", "activate", "product activation"],
                symptoms: "You see messages like 'Product Deactivated', 'No License Found', or apps show limited functionality.",
                steps: [
                    {
                        text: "Sign out and sign back in.",
                        detail: "Open any Office app (Word, Excel). Go to <strong>File → Account</strong>. Click <strong>Sign Out</strong>, wait 10 seconds, then <strong>Sign In</strong> again with your work email."
                    },
                    {
                        text: "Check your license status online.",
                        detail: "Go to <a href='https://portal.office.com' target='_blank'>portal.office.com</a>. Click <strong>Install Office</strong> in the top right. If you don't see this option, your account may not have a license assigned."
                    },
                    {
                        text: "Clear Office credentials.",
                        detail: "Open <strong>Control Panel → Credential Manager → Windows Credentials</strong>. Remove any entries containing <strong>Microsoft Office</strong> or <strong>MicrosoftOffice</strong>. Restart Office apps."
                    },
                    {
                        text: "Run a license repair.",
                        detail: "Open Command Prompt as Admin. Navigate to your Office folder and run: <code>cscript ospp.vbs /act</code>. This forces a license reactivation."
                    }
                ],
                warnings: ["Do NOT try to use product keys or activation cracks — these are against company policy.", "License issues are often server-side and may need IT Admin intervention."],
                verification: "Open Word or Excel. Go to File → Account. It should show your account name and 'Product Activated'.",
                escalation: "If you still see deactivated or unlicensed errors, contact IT Admin. They need to verify your license assignment in the Microsoft 365 Admin Center."
            }
        ]
    },

    health: {
        id: "health",
        title: "Device Health",
        icon: "💻",
        description: "Disk cleanup, performance, and safe troubleshooting",
        issues: [
            {
                id: "disk-cleanup",
                title: "Disk Cleanup",
                keywords: ["disk cleanup", "disk space", "low disk", "free space", "storage", "disk full", "c drive full", "low storage", "clean disk"],
                symptoms: "Your C: drive is running low on space, or you see 'Low Disk Space' warnings.",
                steps: [
                    {
                        text: "Run Disk Cleanup utility.",
                        detail: "Press <code>Win + R</code>, type <code>cleanmgr</code> and press Enter. Select your C: drive and click OK."
                    },
                    {
                        text: "Select file types to clean.",
                        detail: "Check all categories: Temporary files, Recycle Bin, Thumbnails, etc. Click <strong>Clean up system files</strong> for more options (previous Windows installations, update cleanup)."
                    },
                    {
                        text: "Clear user temp files.",
                        detail: "Press <code>Win + R</code>, type <code>%temp%</code> and press Enter. Select all (<code>Ctrl + A</code>) and delete. Skip files in use."
                    },
                    {
                        text: "Check Storage Sense settings.",
                        detail: "Go to <strong>Settings → System → Storage</strong>. Turn on <strong>Storage Sense</strong> to automatically clean temp files. Click <strong>Configure Storage Sense</strong> to customize."
                    },
                    {
                        text: "Check large files.",
                        detail: "In <strong>Settings → System → Storage</strong>, click on different categories to see what's using space. Look for large files in Downloads or other folders."
                    }
                ],
                warnings: ["Do NOT clean system files unless you're sure you don't need to roll back to a previous Windows version.", "Be careful when deleting files from Downloads — make sure you don't need them."],
                verification: "Check your C: drive in File Explorer → This PC. You should see more free space. Aim for at least 10-15% free on your system drive.",
                escalation: "If you can't free enough space or the system drive keeps filling up, contact IT Admin. There may be large log files, OS images, or other issues."
            },
            {
                id: "performance-issues",
                title: "Performance Issues / Slow PC",
                keywords: ["slow", "slow pc", "slow computer", "performance", "lag", "lagging", "freezing", "slow performance", "computer slow", "sluggish", "hanging"],
                symptoms: "Your computer is running slowly — apps take long to open, mouse lags, or the system is generally unresponsive.",
                steps: [
                    {
                        text: "Check what's using resources.",
                        detail: "Press <code>Ctrl + Shift + Esc</code> to open Task Manager. Click <strong>More details</strong> if needed. Sort by <strong>CPU</strong> or <strong>Memory</strong> to see which apps use the most."
                    },
                    {
                        text: "Close unnecessary applications.",
                        detail: "Close apps you're not actively using, especially web browsers with many tabs. Right-click high-usage apps in Task Manager and select <strong>End task</strong> if they're not responding."
                    },
                    {
                        text: "Reduce startup programs.",
                        detail: "In Task Manager, go to the <strong>Startup</strong> tab (or <strong>Startup Apps</strong> in Settings). Disable apps you don't need at startup by right-clicking → <strong>Disable</strong>."
                    },
                    {
                        text: "Clear temporary files.",
                        detail: "Press <code>Win + R</code>, type <code>%temp%</code>, press Enter. Delete all files. Also run <code>cleanmgr</code> for a deeper clean."
                    },
                    {
                        text: "Restart your computer.",
                        detail: "A restart clears memory and resets all processes. Go to <strong>Start → Power → Restart</strong> (not Shut Down)."
                    },
                    {
                        text: "Check for Windows updates.",
                        detail: "Go to <strong>Settings → Windows Update</strong>. Pending updates (especially quality updates) can cause slowdowns."
                    }
                ],
                warnings: ["Do NOT end system processes (like svchost.exe, csrss.exe) — these are critical Windows processes.", "If your disk usage shows 100% constantly, it might indicate a hardware issue (failing drive)."],
                verification: "After following these steps, your PC should feel more responsive. Check Task Manager — CPU and Memory usage should be below 80% at idle.",
                escalation: "If your PC is still slow after these steps, contact IT Admin. You may need a hardware upgrade (more RAM, SSD), or there could be malware or deeper system issues."
            },
            {
                id: "safe-troubleshooting",
                title: "Safe Troubleshooting Steps",
                keywords: ["troubleshoot", "troubleshooting", "basic troubleshoot", "first steps", "general fix", "common fix", "where to start", "basic fix"],
                symptoms: "You're experiencing a general computer issue and need a safe starting point for troubleshooting.",
                steps: [
                    {
                        text: "Restart your computer.",
                        detail: "This is always the first step. Go to <strong>Start → Power → Restart</strong>. A restart fixes many temporary issues."
                    },
                    {
                        text: "Check your internet connection.",
                        detail: "Look at the network icon in the taskbar. If there's a yellow triangle, click it and run <strong>Network troubleshooter</strong>. Try opening a website to test."
                    },
                    {
                        text: "Check for error messages.",
                        detail: "Write down any error messages or error codes you see. These are crucial for diagnosing the issue."
                    },
                    {
                        text: "Run Windows Troubleshooter.",
                        detail: "Go to <strong>Settings → System → Troubleshoot → Other troubleshooters</strong>. Run the relevant troubleshooter for your issue (Network, Audio, Printer, etc.)."
                    },
                    {
                        text: "Check if others have the same issue.",
                        detail: "Ask a colleague if they're experiencing the same problem. If multiple people are affected, it might be a server or network issue."
                    },
                    {
                        text: "Document what happened.",
                        detail: "Note when the issue started, what you were doing, any recent changes (software installed, updates). This helps IT Admin diagnose faster."
                    }
                ],
                warnings: ["Do NOT try to fix registry issues yourself.", "Do NOT download 'fix' tools from the internet — they can be malware."],
                verification: "After basic troubleshooting, check if the issue is resolved. If not, you have useful information to share with IT Admin.",
                escalation: "If basic troubleshooting doesn't resolve the issue, contact IT Admin with: the error message, when it started, what you've tried, and whether others are affected."
            },
            {
                id: "restart-vs-shutdown",
                title: "When to Restart vs. Shutdown",
                keywords: ["restart or shutdown", "restart vs shutdown", "when to restart", "when to shutdown", "power options", "shut down or restart"],
                symptoms: "You're unsure whether to restart or shut down your PC for troubleshooting or daily use.",
                steps: [
                    {
                        text: "Use Restart for IT troubleshooting.",
                        detail: "<strong>Restart</strong> fully clears memory and reinitializes all drivers and services. It's the better choice when troubleshooting any issue."
                    },
                    {
                        text: "Use Shutdown for overnight or weekends.",
                        detail: "If you're done for the day, <strong>Shut Down</strong> saves power. But remember, default shutdown uses Fast Startup which doesn't fully clear everything."
                    },
                    {
                        text: "For a true full shutdown.",
                        detail: "Hold <code>Shift</code> while clicking <strong>Shut Down</strong>. This performs a full shutdown without Fast Startup, fully powering down all components."
                    },
                    {
                        text: "Restart at least once per week.",
                        detail: "Even if your PC seems fine, restart weekly. This clears memory leaks, applies pending updates, and keeps your system healthy."
                    },
                    {
                        text: "After installing updates — always Restart.",
                        detail: "Windows updates require a restart to complete installation. After updates, always use <strong>Start → Power → Restart</strong>."
                    }
                ],
                warnings: ["Always save your work before restarting or shutting down.", "If a forced shutdown is needed (system frozen), hold the power button for 10 seconds — but only as a last resort."],
                verification: "Your PC should boot cleanly after a restart or shutdown. If it takes unusually long (more than 5 minutes), there may be pending updates installing.",
                escalation: "If your PC won't shut down or restart properly, or gets stuck during the process, contact IT Admin."
            }
        ]
    },

    aws: {
        id: "aws",
        title: "AWS Access",
        icon: "☁️",
        description: "AWS server login, VPN, and domain instructions",
        issues: [
            {
                id: "aws-server-access",
                title: "AWS Server Access & Login Rules",
                keywords: ["aws", "server", "login", "godaddy", "jackson", "lincoln", "stage", "uat", "vpn", "openvpn", "prod", "non-prod", "production", "non-production", "credentials"],
                symptoms: "Guidance on how to correctly log in to AWS environments (Jackson, Stage, UAT, Lincoln) using the correct domains and passwords.",
                steps: [
                    {
                        text: "1. Mandatory: Connect to OpenVPN",
                        detail: "You must FIRST connect to OpenVPN before attempting to log in to any AWS server."
                    },
                    {
                        text: "2. Non-Production Servers (Jackson, Stage, UAT)",
                        detail: "Authenticate using your <strong>Non-Production credentials</strong>.<br>Login format: <code>godaddy.dev\\username</code> (Example: <code>godaddy.dev\\sharma</code>).<br>Password: Use your Non-Production domain password (this is the same password used for OpenVPN)."
                    },
                    {
                        text: "3. Production Server (Lincoln)",
                        detail: "Authenticate using your <strong>Production domain credentials</strong>.<br>Login format: <code>prod.corp.godaddy.com\\username</code> (Example: <code>prod.corp.godaddy.com\\sharma</code>).<br>Password: Use your Production domain password (this is DIFFERENT from Non-Production)."
                    }
                ],
                warnings: ["Non-Production credentials will NOT work in Production.", "Production credentials will NOT work in Non-Production.", "OpenVPN is mandatory for ALL server access.", "Incorrect domain or password will result in login failure."],
                verification: "Following these steps exactly ensures you are connecting securely and logging into the correct AWS environment.",
                escalation: "If you receive 'Access Denied' after following these domain guidelines, contact IT Admin to verify your Active Directory account status or VPN tunnel."
            }
        ]
    },

    linux: {
        id: "linux",
        title: "Linux Administration",
        icon: "🐧",
        description: "Linux commands, troubleshooting, automation, and projects",
        issues: [
            {
                id: "linux-file-dir",
                title: "File & Directory Management",
                keywords: ["ls", "cd", "pwd", "cp", "mv", "rm", "mkdir", "rmdir", "find", "stat", "list files", "copy file", "move file", "delete file", "create directory", "remove directory", "search file", "linux files"],
                symptoms: "<strong>Purpose:</strong> Manage files and directories — list, create, copy, move, delete, and search.<br><strong>When to use:</strong> Everyday file operations on any Linux system.",
                steps: [
                    {
                        text: "ls — List files and directories",
                        detail: "<code>ls</code> — basic listing<br><code>ls -la</code> — long format with hidden files<br><code>ls -lh</code> — human-readable sizes<br><code>ls -lt</code> — sort by modification time<br><strong>Example output:</strong> <code>drwxr-xr-x 2 user group 4096 Mar 24 file.txt</code>"
                    },
                    {
                        text: "cd & pwd — Navigate directories",
                        detail: "<code>cd /var/log</code> — go to a directory<br><code>cd ..</code> — go up one level<br><code>cd ~</code> — go to home directory<br><code>pwd</code> — print current working directory"
                    },
                    {
                        text: "cp & mv — Copy and move files",
                        detail: "<code>cp file.txt /backup/</code> — copy file<br><code>cp -r /src/ /dst/</code> — copy directory recursively<br><code>mv old.txt new.txt</code> — rename file<br><code>mv file.txt /archive/</code> — move file to another directory"
                    },
                    {
                        text: "rm & mkdir — Delete and create",
                        detail: "<code>rm file.txt</code> — delete file<br><code>rm -rf /tmp/old/</code> — delete directory recursively (⚠️ use carefully)<br><code>mkdir -p /opt/app/data</code> — create nested directories<br><code>rmdir emptydir</code> — remove empty directory only"
                    },
                    {
                        text: "find — Search files",
                        detail: "<code>find / -name '*.log'</code> — find by name<br><code>find /var -size +100M</code> — find files larger than 100MB<br><code>find /home -mtime -7</code> — modified in last 7 days<br><code>find / -type f -perm 777</code> — find world-writable files (security audit)"
                    }
                ],
                warnings: ["<code>rm -rf</code> is irreversible — always double-check the path before executing.", "Use <code>find</code> with <code>-maxdepth</code> to limit search scope on large filesystems."],
                verification: "Run <code>ls -la</code> to confirm file operations completed successfully. Use <code>stat filename</code> to inspect detailed file metadata.",
                escalation: "If files are missing or permissions prevent access, check filesystem mounts with <code>df -h</code> and ownership with <code>ls -la</code>."
            },
            {
                id: "linux-file-viewing",
                title: "File Viewing & Editing",
                keywords: ["cat", "less", "more", "head", "tail", "nano", "vi", "vim", "wc", "view file", "edit file", "read file", "file content", "text editor"],
                symptoms: "<strong>Purpose:</strong> View, read, and edit file contents from the terminal.<br><strong>When to use:</strong> Reading logs, editing configs, inspecting files.",
                steps: [
                    {
                        text: "cat — View entire file content",
                        detail: "<code>cat /etc/hostname</code> — display file<br><code>cat file1.txt file2.txt</code> — concatenate multiple files<br><code>cat -n file.txt</code> — show with line numbers"
                    },
                    {
                        text: "less & more — Paginated viewing",
                        detail: "<code>less /var/log/syslog</code> — scroll up/down with arrow keys, press <code>q</code> to quit<br><code>more file.txt</code> — forward-only paging<br>💡 <strong>Tip:</strong> <code>less</code> is preferred over <code>more</code> for better navigation."
                    },
                    {
                        text: "head & tail — View beginning or end",
                        detail: "<code>head -20 file.txt</code> — first 20 lines<br><code>tail -50 /var/log/syslog</code> — last 50 lines<br><code>tail -f /var/log/syslog</code> — live follow (watch new lines as they appear) — great for monitoring logs in real-time"
                    },
                    {
                        text: "nano & vi — Text editors",
                        detail: "<strong>nano</strong> (beginner-friendly):<br><code>nano /etc/hosts</code> — open file, edit, <code>Ctrl+O</code> to save, <code>Ctrl+X</code> to exit<br><br><strong>vi/vim</strong> (advanced):<br><code>vi /etc/hosts</code> — press <code>i</code> for insert mode, <code>Esc</code> then <code>:wq</code> to save & quit, <code>:q!</code> to quit without saving"
                    },
                    {
                        text: "wc — Count words, lines, characters",
                        detail: "<code>wc -l file.txt</code> — count lines<br><code>wc -w file.txt</code> — count words<br><code>wc -c file.txt</code> — count bytes<br><strong>Example:</strong> <code>cat /var/log/auth.log | wc -l</code> → count login attempts"
                    }
                ],
                warnings: ["In <code>vi</code>, always press <code>Esc</code> before typing commands like <code>:wq</code>.", "Use <code>tail -f</code> for live log monitoring — press <code>Ctrl+C</code> to stop."],
                verification: "After editing, verify changes with <code>cat filename</code> or <code>head filename</code>.",
                escalation: "If config file edits break a service, check syntax with the service's validation tool (e.g., <code>nginx -t</code>, <code>sshd -t</code>)."
            },
            {
                id: "linux-permissions",
                title: "Permissions & Ownership",
                keywords: ["chmod", "chown", "chgrp", "umask", "permissions", "rwx", "owner", "group", "777", "755", "644", "permission denied", "access denied"],
                symptoms: "<strong>Purpose:</strong> Control who can read, write, and execute files.<br><strong>When to use:</strong> Fixing 'Permission denied' errors, securing files, setting up shared directories.",
                steps: [
                    {
                        text: "Understanding permission format",
                        detail: "<code>-rwxr-xr--</code> breaks down as:<br>• <strong>Owner:</strong> rwx (read+write+execute)<br>• <strong>Group:</strong> r-x (read+execute)<br>• <strong>Others:</strong> r-- (read only)<br><br>Numeric: <code>754</code> → Owner=7(rwx), Group=5(r-x), Others=4(r--)"
                    },
                    {
                        text: "chmod — Change permissions",
                        detail: "<code>chmod 755 script.sh</code> — owner full, group/others read+execute<br><code>chmod 644 config.txt</code> — owner read+write, others read only<br><code>chmod +x script.sh</code> — add execute permission<br><code>chmod -R 750 /opt/app/</code> — apply recursively to directory"
                    },
                    {
                        text: "chown — Change owner",
                        detail: "<code>chown user:group file.txt</code> — change owner and group<br><code>chown -R www-data:www-data /var/www/</code> — recursive ownership for web server<br><code>chown root file.txt</code> — change owner only"
                    },
                    {
                        text: "chgrp — Change group",
                        detail: "<code>chgrp developers project/</code> — change group ownership<br><code>chgrp -R devteam /shared/code/</code> — recursive group change"
                    },
                    {
                        text: "umask — Default permissions",
                        detail: "<code>umask</code> — show current default (e.g., 0022)<br><code>umask 027</code> — new files: 750 for dirs, 640 for files<br>💡 <strong>Tip:</strong> Set in <code>~/.bashrc</code> for persistence."
                    }
                ],
                warnings: ["Never use <code>chmod 777</code> in production — it's a security risk.", "Changing ownership of system files can break services. Use <code>sudo</code> carefully."],
                verification: "Run <code>ls -la filename</code> to verify permissions after changes. Use <code>stat filename</code> for detailed info.",
                escalation: "If 'Permission denied' persists after chmod, check SELinux (<code>getenforce</code>) or ACLs (<code>getfacl filename</code>)."
            },
            {
                id: "linux-user-management",
                title: "User & Group Management",
                keywords: ["useradd", "userdel", "usermod", "groupadd", "groupdel", "passwd", "id", "whoami", "su", "sudo", "add user", "delete user", "create user", "linux user", "linux group"],
                symptoms: "<strong>Purpose:</strong> Create, modify, and manage Linux user accounts and groups.<br><strong>When to use:</strong> Onboarding new users, managing access, troubleshooting login issues.",
                steps: [
                    {
                        text: "useradd — Create a new user",
                        detail: "<code>sudo useradd -m -s /bin/bash john</code><br>• <code>-m</code> creates home directory<br>• <code>-s</code> sets default shell<br><code>sudo passwd john</code> — set the password"
                    },
                    {
                        text: "usermod — Modify a user",
                        detail: "<code>sudo usermod -aG sudo john</code> — add user to sudo group<br><code>sudo usermod -aG docker,developers john</code> — add to multiple groups<br><code>sudo usermod -L john</code> — lock account<br><code>sudo usermod -U john</code> — unlock account"
                    },
                    {
                        text: "userdel — Delete a user",
                        detail: "<code>sudo userdel john</code> — remove user (keeps home dir)<br><code>sudo userdel -r john</code> — remove user + home directory<br>⚠️ Always back up data before deleting users."
                    },
                    {
                        text: "Group management",
                        detail: "<code>sudo groupadd developers</code> — create group<br><code>sudo groupdel developers</code> — delete group<br><code>groups john</code> — show user's groups<br><code>cat /etc/group | grep developers</code> — list group members"
                    },
                    {
                        text: "Identity & switching users",
                        detail: "<code>whoami</code> — show current username<br><code>id john</code> — show UID, GID, and groups<br><code>su - john</code> — switch to user john<br><code>sudo command</code> — run as root<br><code>sudo -u www-data command</code> — run as specific user"
                    }
                ],
                warnings: ["Always use <code>-aG</code> (append) with usermod, not just <code>-G</code>, or you'll remove existing groups.", "Deleting a user with <code>-r</code> permanently removes their home directory."],
                verification: "Run <code>id username</code> to verify user exists and group memberships. Check <code>/etc/passwd</code> and <code>/etc/group</code>.",
                escalation: "If users can't log in, check <code>/var/log/auth.log</code> for authentication errors. Verify account isn't locked with <code>passwd -S username</code>."
            },
            {
                id: "linux-process-monitoring",
                title: "Process & System Monitoring",
                keywords: ["ps", "top", "htop", "uptime", "kill", "killall", "free", "vmstat", "iostat", "process", "cpu", "memory", "ram", "load average", "linux slow", "high cpu"],
                symptoms: "<strong>Purpose:</strong> Monitor system resources, manage processes, and diagnose performance issues.<br><strong>When to use:</strong> High CPU/memory usage, unresponsive system, killing hung processes.",
                steps: [
                    {
                        text: "ps — View running processes",
                        detail: "<code>ps aux</code> — all processes with details<br><code>ps aux | grep nginx</code> — find specific process<br><code>ps -ef --forest</code> — show process tree<br>Columns: USER, PID, %CPU, %MEM, COMMAND"
                    },
                    {
                        text: "top / htop — Real-time monitoring",
                        detail: "<code>top</code> — built-in real-time monitor<br>• Press <code>M</code> to sort by memory, <code>P</code> by CPU, <code>q</code> to quit<br><code>htop</code> — enhanced interactive viewer (install: <code>sudo apt install htop</code>)<br>• Shows CPU bars, memory bars, and process tree"
                    },
                    {
                        text: "free — Memory usage",
                        detail: "<code>free -h</code> — human-readable RAM usage<br><strong>Example output:</strong><br><code>              total   used   free   available</code><br><code>Mem:           16Gi   8.2Gi  2.1Gi  7.4Gi</code><br>💡 <strong>Tip:</strong> 'available' is what matters, not 'free' (Linux uses free RAM for cache)."
                    },
                    {
                        text: "kill — Terminate processes",
                        detail: "<code>kill PID</code> — graceful stop (SIGTERM)<br><code>kill -9 PID</code> — force kill (SIGKILL)<br><code>killall nginx</code> — kill all processes by name<br><code>pkill -u john</code> — kill all processes by user"
                    },
                    {
                        text: "uptime & load average",
                        detail: "<code>uptime</code> — shows system uptime and load averages<br><strong>Example:</strong> <code>load average: 2.50, 1.80, 1.20</code> (1min, 5min, 15min)<br>💡 Load average should be less than the number of CPU cores. Check cores: <code>nproc</code>"
                    }
                ],
                warnings: ["<code>kill -9</code> doesn't allow graceful shutdown — data may be lost. Try <code>kill PID</code> first.", "High load average doesn't always mean high CPU — could be I/O wait. Check with <code>iostat</code>."],
                verification: "After killing a process, verify with <code>ps aux | grep processname</code>. Monitor system health with <code>htop</code>.",
                escalation: "If system is unresponsive with high load, check <code>dmesg</code> for OOM killer events and <code>journalctl -xe</code> for service failures."
            },
            {
                id: "linux-disk-management",
                title: "Disk & Filesystem Management",
                keywords: ["df", "du", "lsblk", "mount", "umount", "fdisk", "fsck", "disk space", "disk full", "disk usage", "partition", "filesystem", "linux storage"],
                symptoms: "<strong>Purpose:</strong> Monitor disk usage, manage partitions, and troubleshoot storage issues.<br><strong>When to use:</strong> Disk full errors, adding new storage, checking filesystem health.",
                steps: [
                    {
                        text: "df — Disk free space",
                        detail: "<code>df -h</code> — human-readable disk usage for all mounts<br><code>df -h /</code> — check root partition specifically<br><code>df -i</code> — check inode usage (can run out even with free space!)"
                    },
                    {
                        text: "du — Directory size",
                        detail: "<code>du -sh /var/log/</code> — total size of a directory<br><code>du -h --max-depth=1 /</code> — size of each top-level directory<br><code>du -sh * | sort -rh | head -10</code> — top 10 largest items in current dir"
                    },
                    {
                        text: "lsblk — Block devices",
                        detail: "<code>lsblk</code> — show all block devices (disks and partitions)<br><code>lsblk -f</code> — show filesystem type and mount points<br>Great for seeing new disks that haven't been mounted yet."
                    },
                    {
                        text: "mount / umount — Mount filesystems",
                        detail: "<code>sudo mount /dev/sdb1 /mnt/data</code> — mount a partition<br><code>sudo umount /mnt/data</code> — unmount<br><code>cat /etc/fstab</code> — view persistent mounts<br>Add to <code>/etc/fstab</code> for automatic mount on boot."
                    },
                    {
                        text: "Finding large files",
                        detail: "<code>find / -type f -size +100M -exec ls -lh {} \\;</code> — find files over 100MB<br><code>sudo journalctl --vacuum-size=500M</code> — trim journal logs<br><code>sudo apt clean</code> (Debian/Ubuntu) — clear package cache"
                    }
                ],
                warnings: ["Never run <code>fsck</code> on a mounted filesystem — unmount first or boot into recovery.", "Always verify the correct device name with <code>lsblk</code> before formatting or mounting."],
                verification: "After cleanup, run <code>df -h</code> to confirm free space increased. Use <code>lsblk -f</code> to verify mounts.",
                escalation: "If disk is 100% full and system is unresponsive, boot into recovery mode. Check for large log files in <code>/var/log/</code>."
            },
            {
                id: "linux-networking",
                title: "Networking Commands",
                keywords: ["ip addr", "ip route", "ss", "netstat", "ping", "traceroute", "nslookup", "dig", "curl", "wget", "scp", "rsync", "tcpdump", "network", "dns", "linux network", "port", "connection"],
                symptoms: "<strong>Purpose:</strong> Configure networks, diagnose connectivity, transfer files, and inspect traffic.<br><strong>When to use:</strong> Network issues, DNS problems, checking open ports, transferring files.",
                steps: [
                    {
                        text: "ip addr / ip route — Network configuration",
                        detail: "<code>ip addr show</code> — show all interfaces and IPs<br><code>ip route show</code> — show routing table<br><code>ip link set eth0 up</code> — bring interface up<br><code>ip addr add 192.168.1.10/24 dev eth0</code> — assign IP"
                    },
                    {
                        text: "ping & traceroute — Connectivity testing",
                        detail: "<code>ping -c 4 google.com</code> — send 4 ICMP packets<br><code>traceroute google.com</code> — show network path (hop by hop)<br>💡 If ping fails but traceroute works, ICMP may be blocked."
                    },
                    {
                        text: "ss / netstat — Check ports & connections",
                        detail: "<code>ss -tulnp</code> — show all listening ports with PID<br><code>ss -s</code> — connection summary statistics<br><code>netstat -tulnp</code> — legacy alternative<br>💡 <code>ss</code> is faster and preferred over <code>netstat</code>."
                    },
                    {
                        text: "DNS: nslookup & dig",
                        detail: "<code>nslookup google.com</code> — simple DNS lookup<br><code>dig google.com +short</code> — authoritative DNS query<br><code>dig @8.8.8.8 example.com</code> — query specific DNS server<br><code>cat /etc/resolv.conf</code> — check configured DNS servers"
                    },
                    {
                        text: "curl, wget, scp, rsync — Transfer tools",
                        detail: "<code>curl -I https://example.com</code> — check HTTP headers<br><code>wget https://example.com/file.zip</code> — download file<br><code>scp file.txt user@server:/path/</code> — secure copy to remote<br><code>rsync -avz /src/ user@server:/dst/</code> — efficient sync with progress"
                    }
                ],
                warnings: ["<code>tcpdump</code> captures raw traffic — use with sudo and be mindful of privacy.", "Always use <code>-c</code> with ping to limit packets, otherwise it runs forever."],
                verification: "Test connectivity with <code>ping</code>, verify DNS with <code>dig</code>, check open ports with <code>ss -tulnp</code>.",
                escalation: "For persistent network issues, check firewall rules (<code>iptables -L</code> or <code>ufw status</code>), verify routing (<code>ip route</code>), and check <code>/etc/resolv.conf</code> for DNS."
            },
            {
                id: "linux-services-logs",
                title: "Service & Log Management",
                keywords: ["systemctl", "service", "journalctl", "dmesg", "crontab", "at", "start service", "stop service", "restart service", "enable service", "linux service", "linux logs", "cron", "cron job", "scheduled task"],
                symptoms: "<strong>Purpose:</strong> Manage system services, view logs, and schedule recurring tasks.<br><strong>When to use:</strong> Starting/stopping services, debugging service failures, setting up cron jobs.",
                steps: [
                    {
                        text: "systemctl — Service management",
                        detail: "<code>sudo systemctl start nginx</code> — start service<br><code>sudo systemctl stop nginx</code> — stop service<br><code>sudo systemctl restart nginx</code> — restart<br><code>sudo systemctl enable nginx</code> — start on boot<br><code>systemctl status nginx</code> — check status & recent logs<br><code>systemctl list-units --failed</code> — list failed services"
                    },
                    {
                        text: "journalctl — System logs",
                        detail: "<code>journalctl -u nginx</code> — logs for specific service<br><code>journalctl -u nginx --since '1 hour ago'</code> — recent logs<br><code>journalctl -xe</code> — last errors with context<br><code>journalctl -f</code> — follow logs in real-time (like tail -f)"
                    },
                    {
                        text: "dmesg — Kernel messages",
                        detail: "<code>dmesg | tail -30</code> — recent kernel messages<br><code>dmesg | grep -i error</code> — filter errors<br><code>dmesg -T</code> — human-readable timestamps<br>Great for hardware issues, USB detection, disk errors."
                    },
                    {
                        text: "crontab — Schedule recurring tasks",
                        detail: "<code>crontab -e</code> — edit your cron jobs<br><code>crontab -l</code> — list your cron jobs<br><br><strong>Format:</strong> <code>MIN HOUR DOM MON DOW COMMAND</code><br><strong>Examples:</strong><br><code>0 2 * * * /backup/run.sh</code> — daily at 2 AM<br><code>*/5 * * * * /scripts/health.sh</code> — every 5 minutes<br><code>0 0 * * 0 /scripts/weekly.sh</code> — every Sunday midnight"
                    },
                    {
                        text: "Common log file locations",
                        detail: "<code>/var/log/syslog</code> — general system log<br><code>/var/log/auth.log</code> — authentication/login attempts<br><code>/var/log/nginx/</code> — web server logs<br><code>/var/log/dmesg</code> — boot messages<br><code>/var/log/kern.log</code> — kernel logs"
                    }
                ],
                warnings: ["Always check <code>systemctl status</code> before and after making service changes.", "Cron job errors go to syslog by default — redirect output: <code>command >> /var/log/myjob.log 2>&1</code>"],
                verification: "Run <code>systemctl status servicename</code> to verify service state. Check <code>journalctl -u servicename</code> for errors.",
                escalation: "If a service won't start, check <code>journalctl -xe</code> for detailed errors, verify config syntax, and check port conflicts with <code>ss -tulnp</code>."
            },
            {
                id: "linux-package-management",
                title: "Package Management",
                keywords: ["apt", "apt-get", "yum", "dnf", "rpm", "tar", "zip", "unzip", "install package", "update system", "linux install", "linux update", "package", "software"],
                symptoms: "<strong>Purpose:</strong> Install, update, and manage software packages.<br><strong>When to use:</strong> Installing new software, updating the system, managing dependencies.",
                steps: [
                    {
                        text: "APT — Debian/Ubuntu",
                        detail: "<code>sudo apt update</code> — refresh package index<br><code>sudo apt upgrade</code> — upgrade all packages<br><code>sudo apt install nginx</code> — install package<br><code>sudo apt remove nginx</code> — remove package<br><code>sudo apt autoremove</code> — clean unused dependencies<br><code>apt search keyword</code> — search for packages"
                    },
                    {
                        text: "YUM/DNF — RHEL/CentOS/Fedora",
                        detail: "<code>sudo yum update</code> or <code>sudo dnf update</code> — update system<br><code>sudo yum install httpd</code> — install package<br><code>sudo yum remove httpd</code> — remove package<br><code>yum list installed</code> — list all installed packages<br><code>yum info package</code> — package details"
                    },
                    {
                        text: "RPM — Low-level package management",
                        detail: "<code>rpm -qa</code> — list all installed RPM packages<br><code>rpm -qi package</code> — package info<br><code>rpm -ivh package.rpm</code> — install from file<br><code>rpm -e package</code> — remove package"
                    },
                    {
                        text: "tar — Archive management",
                        detail: "<strong>Create:</strong> <code>tar -czvf archive.tar.gz /path/</code><br><strong>Extract:</strong> <code>tar -xzvf archive.tar.gz</code><br><strong>List:</strong> <code>tar -tzvf archive.tar.gz</code><br>Flags: <code>c</code>=create, <code>x</code>=extract, <code>z</code>=gzip, <code>v</code>=verbose, <code>f</code>=file"
                    },
                    {
                        text: "zip / unzip",
                        detail: "<code>zip -r archive.zip folder/</code> — create zip<br><code>unzip archive.zip</code> — extract zip<br><code>unzip -l archive.zip</code> — list contents without extracting"
                    }
                ],
                warnings: ["Always run <code>apt update</code> before <code>apt install</code> to get the latest package info.", "On production servers, test updates in staging first. Use <code>apt upgrade --dry-run</code> to preview changes."],
                verification: "After installing, verify with <code>which command</code> or <code>command --version</code>. Check service is running with <code>systemctl status</code>.",
                escalation: "If package installation fails with dependency errors, try <code>sudo apt --fix-broken install</code> or check for repository issues in <code>/etc/apt/sources.list</code>."
            },
            {
                id: "linux-text-processing",
                title: "Text Processing (grep, awk, sed)",
                keywords: ["grep", "awk", "sed", "sort", "uniq", "cut", "search text", "filter", "text processing", "regex", "pattern", "log analysis", "linux grep", "linux awk"],
                symptoms: "<strong>Purpose:</strong> Search, filter, transform, and analyze text data in files and command output.<br><strong>When to use:</strong> Log analysis, data extraction, config file parsing, filtering output.",
                steps: [
                    {
                        text: "grep — Search for patterns",
                        detail: "<code>grep 'error' /var/log/syslog</code> — find lines with 'error'<br><code>grep -i 'warning' file.txt</code> — case-insensitive<br><code>grep -r 'TODO' /src/</code> — recursive search in directory<br><code>grep -c 'failed' auth.log</code> — count matches<br><code>grep -v 'debug' app.log</code> — exclude lines matching pattern"
                    },
                    {
                        text: "awk — Column extraction & processing",
                        detail: "<code>awk '{print $1, $4}' access.log</code> — print 1st and 4th columns<br><code>df -h | awk '{print $1, $5}'</code> — extract filesystem and usage%<br><code>awk -F: '{print $1}' /etc/passwd</code> — use ':' as delimiter to list usernames<br><code>awk '$3 > 80 {print $0}' data.txt</code> — print lines where 3rd column > 80"
                    },
                    {
                        text: "sed — Stream editor (find & replace)",
                        detail: "<code>sed 's/old/new/g' file.txt</code> — replace all 'old' with 'new' (display only)<br><code>sed -i 's/old/new/g' file.txt</code> — in-place edit<br><code>sed -n '10,20p' file.txt</code> — print lines 10-20<br><code>sed '/^#/d' config.conf</code> — remove comment lines"
                    },
                    {
                        text: "sort, uniq, cut — Data shaping",
                        detail: "<code>sort file.txt</code> — sort alphabetically<br><code>sort -n file.txt</code> — sort numerically<br><code>sort file.txt | uniq -c</code> — count unique occurrences<br><code>cut -d: -f1 /etc/passwd</code> — extract first field with ':' delimiter"
                    },
                    {
                        text: "Practical examples — Chaining commands",
                        detail: "<strong>Top 10 IPs in access log:</strong><br><code>awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10</code><br><br><strong>Failed SSH logins:</strong><br><code>grep 'Failed password' /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn</code><br><br><strong>Find errors in last hour:</strong><br><code>journalctl --since '1 hour ago' | grep -i error</code>"
                    }
                ],
                warnings: ["<code>sed -i</code> modifies files in-place — always backup first: <code>sed -i.bak 's/old/new/g' file</code>.", "Complex regex patterns should be tested with <code>grep</code> before using in <code>sed</code> or <code>awk</code>."],
                verification: "Pipe output through <code>less</code> to review results, or redirect to file: <code>command > output.txt</code>.",
                escalation: "For complex log analysis needs, consider tools like <code>logrotate</code> for management and ELK Stack for centralized logging."
            },
            {
                id: "linux-shell-scripting",
                title: "Shell Scripting & Automation",
                keywords: ["bash", "shell script", "automation", "environment variables", "cron", "scripting", "bash script", "linux script", "automate", "shebang"],
                symptoms: "<strong>Purpose:</strong> Write bash scripts to automate repetitive tasks.<br><strong>When to use:</strong> Automating backups, health checks, deployments, and system maintenance.",
                steps: [
                    {
                        text: "Script basics — Creating your first script",
                        detail: "<code>#!/bin/bash</code> — shebang (must be first line)<br><br>Create: <code>nano myscript.sh</code><br>Make executable: <code>chmod +x myscript.sh</code><br>Run: <code>./myscript.sh</code> or <code>bash myscript.sh</code>"
                    },
                    {
                        text: "Variables & environment",
                        detail: "<code>NAME=\"Linux\"</code> — set variable (no spaces around =)<br><code>echo $NAME</code> — use variable<br><code>export PATH=$PATH:/opt/bin</code> — add to PATH<br><code>env</code> — list all environment variables<br><code>echo $HOME $USER $SHELL</code> — common built-in variables"
                    },
                    {
                        text: "Conditionals & loops",
                        detail: "<strong>If/else:</strong><br><code>if [ -f /tmp/file.txt ]; then</code><br><code>  echo \"File exists\"</code><br><code>else</code><br><code>  echo \"File not found\"</code><br><code>fi</code><br><br><strong>For loop:</strong><br><code>for server in web1 web2 web3; do</code><br><code>  ping -c 1 $server</code><br><code>done</code>"
                    },
                    {
                        text: "Useful test operators",
                        detail: "<code>-f file</code> — file exists<br><code>-d dir</code> — directory exists<br><code>-z string</code> — string is empty<br><code>-eq, -ne, -gt, -lt</code> — numeric comparisons<br><code>$?</code> — exit code of last command (0=success)"
                    },
                    {
                        text: "Example: System health check script",
                        detail: "<code>#!/bin/bash</code><br><code>echo \"=== System Health ===\"</code><br><code>echo \"Hostname: $(hostname)\"</code><br><code>echo \"Uptime: $(uptime -p)\"</code><br><code>echo \"CPU Load: $(cat /proc/loadavg | awk '{print $1, $2, $3}')\"</code><br><code>echo \"Memory: $(free -h | awk '/Mem/{print $3\"/\"$2}')\"</code><br><code>echo \"Disk: $(df -h / | awk 'NR==2{print $5\" used\"}')\"</code><br><code>echo \"Logged Users: $(who | wc -l)\"</code>"
                    }
                ],
                warnings: ["Always test scripts in a safe environment before running on production servers.", "Use <code>set -e</code> at the top of scripts to exit on any error. Add <code>set -x</code> for debug output."],
                verification: "Run with <code>bash -x script.sh</code> for debug mode. Check exit code with <code>echo $?</code> (0 = success).",
                escalation: "For complex automation needs, consider Ansible, Terraform, or Python scripts instead of bash."
            },
            {
                id: "linux-project-health-monitor",
                title: "🛠️ Project: System Health Monitoring Script",
                keywords: ["linux project", "health monitor", "monitoring script", "system check", "health check", "server monitoring", "beginner project"],
                symptoms: "<strong>Project Objective:</strong> Create a bash script that monitors system health (CPU, memory, disk, services) and sends alerts.<br><strong>Prerequisites:</strong> Basic Linux CLI knowledge, SSH access to a Linux server.",
                steps: [
                    {
                        text: "Step 1: Create the script file",
                        detail: "<code>mkdir -p ~/scripts</code><br><code>nano ~/scripts/health_monitor.sh</code><br><br>Add the shebang: <code>#!/bin/bash</code>"
                    },
                    {
                        text: "Step 2: Add system checks",
                        detail: "Add these checks to the script:<br><code>#!/bin/bash</code><br><code>THRESHOLD=80</code><br><code>LOG=/var/log/health_monitor.log</code><br><code>DATE=$(date '+%Y-%m-%d %H:%M:%S')</code><br><br><code># CPU Load</code><br><code>LOAD=$(cat /proc/loadavg | awk '{print $1}')</code><br><br><code># Memory Usage %</code><br><code>MEM=$(free | awk '/Mem/{printf \"%.0f\", $3/$2*100}')</code><br><br><code># Disk Usage %</code><br><code>DISK=$(df / | awk 'NR==2{gsub(/%/,\"\"); print $5}')</code>"
                    },
                    {
                        text: "Step 3: Add alerting logic",
                        detail: "<code># Alert if thresholds exceeded</code><br><code>if [ $MEM -gt $THRESHOLD ]; then</code><br><code>  echo \"$DATE [ALERT] Memory at ${MEM}%\" >> $LOG</code><br><code>fi</code><br><code>if [ $DISK -gt $THRESHOLD ]; then</code><br><code>  echo \"$DATE [ALERT] Disk at ${DISK}%\" >> $LOG</code><br><code>fi</code><br><code>echo \"$DATE [OK] CPU=$LOAD MEM=${MEM}% DISK=${DISK}%\" >> $LOG</code>"
                    },
                    {
                        text: "Step 4: Make executable and test",
                        detail: "<code>chmod +x ~/scripts/health_monitor.sh</code><br><code>./scripts/health_monitor.sh</code><br><code>cat /var/log/health_monitor.log</code> — verify output"
                    },
                    {
                        text: "Step 5: Schedule with cron (every 5 min)",
                        detail: "<code>crontab -e</code><br>Add: <code>*/5 * * * * /root/scripts/health_monitor.sh</code><br><br>This runs the health check every 5 minutes automatically.<br>💡 <strong>Enhancement:</strong> Add email alerts with <code>mail -s 'Alert' admin@company.com < /var/log/health_monitor.log</code>"
                    }
                ],
                warnings: ["Ensure the log directory exists and has write permissions.", "Test cron jobs by checking <code>grep CRON /var/log/syslog</code>."],
                verification: "Wait 10 minutes and check <code>cat /var/log/health_monitor.log</code> for entries. Verify cron is running with <code>crontab -l</code>.",
                escalation: "If the script doesn't run via cron, check syslog for cron errors. Ensure full paths are used in the script (cron has limited PATH)."
            },
            {
                id: "linux-project-backup",
                title: "🛠️ Project: Automated Backup Script",
                keywords: ["backup script", "backup automation", "tar backup", "rsync backup", "linux backup", "automated backup", "cron backup"],
                symptoms: "<strong>Project Objective:</strong> Create an automated backup script that compresses and archives important directories with rotation.<br><strong>Prerequisites:</strong> Basic Linux CLI, storage for backups.",
                steps: [
                    {
                        text: "Step 1: Create backup script",
                        detail: "<code>nano ~/scripts/backup.sh</code><br><br><code>#!/bin/bash</code><br><code>BACKUP_SRC=\"/var/www /etc /home\"</code><br><code>BACKUP_DST=\"/backup\"</code><br><code>DATE=$(date +%Y%m%d_%H%M%S)</code><br><code>ARCHIVE=\"$BACKUP_DST/backup_$DATE.tar.gz\"</code><br><code>RETENTION=7  # days to keep</code>"
                    },
                    {
                        text: "Step 2: Add backup logic",
                        detail: "<code># Create backup directory</code><br><code>mkdir -p $BACKUP_DST</code><br><br><code># Create compressed archive</code><br><code>tar -czvf $ARCHIVE $BACKUP_SRC 2>/dev/null</code><br><br><code># Check if backup succeeded</code><br><code>if [ $? -eq 0 ]; then</code><br><code>  echo \"[$DATE] Backup SUCCESS: $ARCHIVE ($(du -sh $ARCHIVE | awk '{print $1}'))\" >> $BACKUP_DST/backup.log</code><br><code>else</code><br><code>  echo \"[$DATE] Backup FAILED!\" >> $BACKUP_DST/backup.log</code><br><code>fi</code>"
                    },
                    {
                        text: "Step 3: Add old backup cleanup",
                        detail: "<code># Delete backups older than RETENTION days</code><br><code>find $BACKUP_DST -name 'backup_*.tar.gz' -mtime +$RETENTION -delete</code><br><code>echo \"[$DATE] Cleanup: Removed backups older than $RETENTION days\" >> $BACKUP_DST/backup.log</code>"
                    },
                    {
                        text: "Step 4: Make executable and test",
                        detail: "<code>chmod +x ~/scripts/backup.sh</code><br><code>sudo ./scripts/backup.sh</code><br><code>ls -lh /backup/</code> — verify archive created<br><code>cat /backup/backup.log</code> — check log"
                    },
                    {
                        text: "Step 5: Schedule daily at 2 AM",
                        detail: "<code>sudo crontab -e</code><br>Add: <code>0 2 * * * /root/scripts/backup.sh</code><br><br>💡 <strong>Enhancement:</strong> Use <code>rsync</code> for remote backups:<br><code>rsync -avz /backup/ user@remote:/offsite-backup/</code>"
                    }
                ],
                warnings: ["Always test backup restoration! A backup you can't restore is useless.", "Monitor backup sizes — unexpected growth may indicate issues."],
                verification: "Test restore: <code>tar -xzvf /backup/backup_LATEST.tar.gz -C /tmp/test_restore/</code>. Verify files are intact.",
                escalation: "If backups fail, check disk space (<code>df -h</code>), permissions, and verify source directories exist."
            }
        ]
    }
};
