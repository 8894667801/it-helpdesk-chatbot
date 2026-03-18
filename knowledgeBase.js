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
                id: "outlook-not-opening",
                title: "Outlook Not Opening",
                keywords: ["outlook", "not opening", "won't open", "doesn't open", "can't open", "cannot open", "outlook crash", "not starting", "won't start", "not launching"],
                symptoms: "Outlook fails to launch, shows an error, or closes immediately after opening.",
                steps: [
                    {
                        text: "Close any running instances of Outlook.",
                        detail: "Press <code>Ctrl + Shift + Esc</code> to open Task Manager. Look for <strong>Microsoft Outlook</strong> under Processes tab. Right-click it and select <strong>End Task</strong>."
                    },
                    {
                        text: "Try opening Outlook in Safe Mode.",
                        detail: "Press <code>Win + R</code>, type <code>outlook.exe /safe</code> and press Enter. Safe Mode disables add-ins that might be causing the crash."
                    },
                    {
                        text: "If Outlook opens in Safe Mode, disable problematic add-ins.",
                        detail: "Inside Outlook, go to <strong>File → Options → Add-ins</strong>. At the bottom, select <strong>COM Add-ins</strong> and click <strong>Go</strong>. Uncheck all add-ins and click OK. Restart Outlook normally."
                    },
                    {
                        text: "Repair Microsoft Office installation.",
                        detail: "Go to <strong>Settings → Apps → Installed Apps</strong>. Find <strong>Microsoft 365</strong> or <strong>Office</strong>, click the three dots (⋯), then <strong>Modify</strong>. Select <strong>Quick Repair</strong> first. If that doesn't work, try <strong>Online Repair</strong>."
                    },
                    {
                        text: "Check for Windows updates.",
                        detail: "Go to <strong>Settings → Windows Update</strong> and click <strong>Check for updates</strong>. Install any pending updates and restart your PC."
                    }
                ],
                warnings: ["If you choose Online Repair, you'll need an internet connection and it may take 15-30 minutes."],
                verification: "After following these steps, try opening Outlook normally (not in Safe Mode). It should launch without errors.",
                escalation: "If Outlook still does not open after repairing Office, contact your IT Admin. They may need to check your mailbox configuration or reinstall Office."
            },
            {
                id: "outlook-stuck-loading",
                title: "Outlook Stuck on Loading/Processing",
                keywords: ["outlook stuck", "loading", "processing", "not responding", "frozen", "freezing", "hang", "hanging", "spinning", "loading profile"],
                symptoms: "Outlook shows 'Loading Profile', 'Processing', or becomes unresponsive after launch.",
                steps: [
                    {
                        text: "Wait for 2-3 minutes.",
                        detail: "Sometimes Outlook takes extra time to sync if you have a large mailbox or slow connection. Wait a couple of minutes before taking action."
                    },
                    {
                        text: "Force close and restart Outlook.",
                        detail: "Press <code>Ctrl + Shift + Esc</code> to open Task Manager. End the Outlook process. Wait 10 seconds, then reopen Outlook."
                    },
                    {
                        text: "Open Outlook in Safe Mode.",
                        detail: "Press <code>Win + R</code>, type <code>outlook.exe /safe</code> and press Enter. If it loads fine, an add-in may be the cause."
                    },
                    {
                        text: "Disable Hardware Graphics Acceleration.",
                        detail: "In Outlook, go to <strong>File → Options → Advanced</strong>. Check the box <strong>Disable hardware graphics acceleration</strong>. Click OK and restart Outlook."
                    },
                    {
                        text: "Reset the Navigation Pane.",
                        detail: "Press <code>Win + R</code>, type <code>outlook.exe /resetnavpane</code> and press Enter. This resets the navigation pane to default settings."
                    }
                ],
                warnings: ["Do NOT force-shutdown your PC while Outlook is stuck — this can corrupt your data file."],
                verification: "Outlook should open normally within 30 seconds and show your inbox without freezing.",
                escalation: "If Outlook remains stuck even in Safe Mode, contact IT Admin. Your OST file may be too large or corrupted and may need to be recreated."
            },
            {
                id: "outlook-profile-corrupted",
                title: "Outlook Profile Corrupted",
                keywords: ["outlook profile", "profile corrupted", "corrupt profile", "profile error", "profile damaged", "profile repair", "create new profile", "repair profile"],
                symptoms: "Outlook shows errors about profile configuration, asks to choose a profile repeatedly, or behaves erratically.",
                steps: [
                    {
                        text: "Open the Mail settings in Control Panel.",
                        detail: "Press <code>Win + R</code>, type <code>control</code> and press Enter. In Control Panel, search for <strong>Mail</strong> (or <strong>Mail (Microsoft Outlook)</strong>) and open it."
                    },
                    {
                        text: "Click 'Show Profiles'.",
                        detail: "In the Mail Setup window, click the <strong>Show Profiles</strong> button to see all existing Outlook profiles."
                    },
                    {
                        text: "Create a new profile.",
                        detail: "Click <strong>Add</strong>, give the profile a name (e.g., 'New Outlook Profile'), and click OK. Follow the wizard to add your email account."
                    },
                    {
                        text: "Set the new profile as default.",
                        detail: "Select the new profile and choose <strong>Always use this profile</strong>. Select your new profile from the dropdown."
                    },
                    {
                        text: "Delete the old corrupted profile (optional).",
                        detail: "Once everything works with the new profile, you can select the old profile and click <strong>Remove</strong> to delete it."
                    }
                ],
                warnings: ["Creating a new profile means Outlook will re-download your emails from the server. This may take time depending on mailbox size.", "Do NOT delete the old profile until you confirm the new one works properly."],
                verification: "Open Outlook — it should use the new profile and load your mailbox. Verify that emails, calendar, and contacts are accessible.",
                escalation: "If you can't create a new profile or the wizard fails, contact IT Admin. There may be an issue with your email account configuration on the server."
            },
            {
                id: "outlook-ost-pst",
                title: "OST/PST File Issues",
                keywords: ["ost", "pst", "data file", "outlook data", "ost file", "pst file", "scanpst", "repair data", "data file error", "cannot open data file"],
                symptoms: "Outlook shows errors about data files, cannot open default folders, or shows 'data file cannot be accessed'.",
                steps: [
                    {
                        text: "Close Outlook completely.",
                        detail: "Make sure Outlook is fully closed. Check Task Manager (<code>Ctrl + Shift + Esc</code>) and end any Outlook processes."
                    },
                    {
                        text: "Locate the Inbox Repair Tool (SCANPST.EXE).",
                        detail: "For Microsoft 365: navigate to <code>C:\\Program Files\\Microsoft Office\\root\\Office16\\</code> and find <strong>SCANPST.EXE</strong>. For older Office versions, the path may vary."
                    },
                    {
                        text: "Run SCANPST.EXE.",
                        detail: "Double-click SCANPST.EXE. Click <strong>Browse</strong> and navigate to your data file location. Default OST location: <code>C:\\Users\\YourName\\AppData\\Local\\Microsoft\\Outlook\\</code>"
                    },
                    {
                        text: "Start the scan and repair.",
                        detail: "Click <strong>Start</strong>. The tool will scan for errors. If errors are found, check <strong>Make backup of scanned file before repairing</strong>, then click <strong>Repair</strong>."
                    },
                    {
                        text: "Open Outlook and verify.",
                        detail: "After the repair completes, open Outlook. Check that your emails and folders are intact."
                    }
                ],
                warnings: ["Always back up your data file before running the repair tool.", "SCANPST may need to be run multiple times if there are many errors.", "For OST files — if repair doesn't work, you may need to delete the OST and let Outlook recreate it from the server."],
                verification: "Outlook should open without data file errors. All folders and emails should be accessible.",
                escalation: "If the repair tool cannot fix the data file, or if data is missing after repair, contact IT Admin immediately."
            },
            {
                id: "outlook-safe-mode",
                title: "How to Use Outlook Safe Mode",
                keywords: ["safe mode", "outlook safe mode", "outlook /safe", "start outlook safe", "disable addins"],
                symptoms: "You need to troubleshoot Outlook by starting it without add-ins and customizations.",
                steps: [
                    {
                        text: "Press Win + R to open Run dialog.",
                        detail: "Hold down the <strong>Windows key</strong> and press <strong>R</strong> to open the Run dialog box."
                    },
                    {
                        text: "Type the Safe Mode command.",
                        detail: "Type <code>outlook.exe /safe</code> and press <strong>Enter</strong>."
                    },
                    {
                        text: "Select your profile if prompted.",
                        detail: "If you have multiple profiles, select the one you want to use and click OK."
                    },
                    {
                        text: "Outlook will open in Safe Mode.",
                        detail: "You'll see <strong>[Safe Mode]</strong> in the title bar. All add-ins are disabled, and the reading pane may be turned off."
                    },
                    {
                        text: "Disable problematic add-ins.",
                        detail: "Go to <strong>File → Options → Add-ins</strong>. At the bottom, click <strong>Go</strong> next to COM Add-ins. Uncheck suspicious add-ins and click OK."
                    }
                ],
                warnings: ["Safe Mode is for troubleshooting only. Some features may not work in Safe Mode."],
                verification: "If Outlook works fine in Safe Mode but crashes normally, the issue is caused by an add-in. Re-enable add-ins one by one to find the culprit.",
                escalation: "If Outlook crashes even in Safe Mode, the issue is deeper than add-ins. Contact IT Admin for further investigation."
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
    }
};
