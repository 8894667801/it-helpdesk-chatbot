/* ==========================================
   IT Helpdesk Chatbot — Core Application Logic
   ========================================== */

(function () {
    'use strict';

    // ---------- DOM Elements ----------
    const messagesContainer = document.getElementById('messagesContainer');
    const messagesInner = document.getElementById('messagesInner');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const themeToggle = document.getElementById('themeToggle');
    const clearChat = document.getElementById('clearChat');
    const newChatBtn = document.getElementById('newChatBtn');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    // ---------- State ----------
    let conversationState = 'welcome'; // welcome | category | issues | solution
    let currentCategory = null;
    let currentIssue = null;
    let messageHistory = [];

    // ---------- Helpers ----------
    function getTimestamp() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ---------- Message Rendering ----------
    function addMessage(type, content, extras = {}) {
        const msg = document.createElement('div');
        msg.className = `message ${type}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = type === 'bot' ? '🤖' : '👤';

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = content;

        contentWrapper.appendChild(bubble);

        // Quick replies
        if (extras.quickReplies) {
            const qr = document.createElement('div');
            qr.className = 'quick-replies';
            extras.quickReplies.forEach(reply => {
                const btn = document.createElement('button');
                btn.className = 'quick-reply-btn';
                btn.textContent = reply.label;
                btn.addEventListener('click', () => {
                    disableAllButtons();
                    addMessage('user', escapeHtml(reply.label));
                    reply.action();
                });
                qr.appendChild(btn);
            });
            contentWrapper.appendChild(qr);
        }

        // Category cards
        if (extras.categoryCards) {
            const grid = document.createElement('div');
            grid.className = 'category-cards';
            extras.categoryCards.forEach(cat => {
                const card = document.createElement('button');
                card.className = 'category-card';
                card.innerHTML = `
                    <span class="card-icon">${cat.icon}</span>
                    <div>
                        <div class="card-label">${cat.title}</div>
                        <div class="card-desc">${cat.description}</div>
                    </div>
                `;
                card.addEventListener('click', () => {
                    disableAllButtons();
                    addMessage('user', escapeHtml(cat.title));
                    showCategory(cat.id);
                });
                grid.appendChild(card);
            });
            contentWrapper.appendChild(grid);
        }

        // Issue list
        if (extras.issueList) {
            const list = document.createElement('div');
            list.className = 'issue-list';
            extras.issueList.forEach((issue, index) => {
                const btn = document.createElement('button');
                btn.className = 'issue-btn';
                btn.innerHTML = `
                    <span class="issue-num">${index + 1}</span>
                    <span>${issue.title}</span>
                `;
                btn.addEventListener('click', () => {
                    disableAllButtons();
                    addMessage('user', escapeHtml(issue.title));
                    showSolution(issue);
                });
                list.appendChild(btn);
            });
            contentWrapper.appendChild(list);
        }

        // Nav buttons
        if (extras.navButtons) {
            const nav = document.createElement('div');
            nav.className = 'nav-buttons';
            extras.navButtons.forEach(btn => {
                const button = document.createElement('button');
                button.className = btn.type === 'back' ? 'back-btn' : 'start-over-btn';
                button.textContent = btn.label;
                button.addEventListener('click', () => {
                    disableAllButtons();
                    addMessage('user', escapeHtml(btn.label));
                    btn.action();
                });
                nav.appendChild(button);
            });
            contentWrapper.appendChild(nav);
        }

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = getTimestamp();
        contentWrapper.appendChild(time);

        msg.appendChild(avatar);
        msg.appendChild(contentWrapper);
        messagesInner.appendChild(msg);

        messageHistory.push({ type, content });
        scrollToBottom();
    }

    function disableAllButtons() {
        document.querySelectorAll('.quick-reply-btn, .category-card, .issue-btn, .back-btn, .start-over-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.pointerEvents = 'none';
        });
    }

    // ---------- Typing Indicator ----------
    function showTyping() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.id = 'typingIndicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.style.background = 'var(--accent-gradient)';
        avatar.style.color = 'white';
        avatar.textContent = '🤖';

        const dots = document.createElement('div');
        dots.className = 'typing-dots';
        dots.innerHTML = '<span></span><span></span><span></span>';

        typing.appendChild(avatar);
        typing.appendChild(dots);
        messagesInner.appendChild(typing);
        scrollToBottom();
    }

    function hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    function botReply(content, extras = {}, delay = 800) {
        showTyping();
        setTimeout(() => {
            hideTyping();
            addMessage('bot', content, extras);
        }, delay);
    }

    // ---------- Conversation Flows ----------
    function showWelcome() {
        conversationState = 'welcome';
        currentCategory = null;
        currentIssue = null;

        const welcomeHtml = `
            <div class="welcome-section">
                <div class="welcome-icon">🛠️</div>
                <h2>Hello! I'm your IT Support Assistant</h2>
                <p>I can help you troubleshoot common IT issues with Windows, Outlook, Microsoft 365, and more. Choose a topic below or describe your problem!</p>
            </div>
        `;

        const categories = Object.values(KNOWLEDGE_BASE).map(cat => ({
            id: cat.id,
            icon: cat.icon,
            title: cat.title,
            description: cat.description
        }));

        addMessage('bot', welcomeHtml, { categoryCards: categories });
    }

    function showCategory(categoryId) {
        const category = KNOWLEDGE_BASE[categoryId];
        if (!category) {
            botReply("I'm sorry, I couldn't find that category. Let me show you the main menu.", {}, 600);
            setTimeout(() => showWelcome(), 1500);
            return;
        }

        conversationState = 'issues';
        currentCategory = category;

        const content = `
            <h3>${category.icon} ${category.title}</h3>
            <p>Here are the common issues I can help you with. Select one:</p>
        `;

        const navButtons = [
            { label: '← Back to Menu', type: 'back', action: () => showWelcome() }
        ];

        botReply(content, {
            issueList: category.issues,
            navButtons: navButtons
        });
    }

    function showSolution(issue) {
        conversationState = 'solution';
        currentIssue = issue;

        // Build steps HTML
        let stepsHtml = '';
        issue.steps.forEach((step, i) => {
            stepsHtml += `
                <div class="step">
                    <span class="step-number">${i + 1}</span>
                    <div class="step-text">
                        <strong>${step.text}</strong><br>
                        <span style="color: var(--text-secondary)">${step.detail}</span>
                    </div>
                </div>
            `;
        });

        // Warnings
        let warningsHtml = '';
        if (issue.warnings && issue.warnings.length > 0) {
            issue.warnings.forEach(w => {
                warningsHtml += `
                    <div class="warning-box">
                        <span class="warning-icon">⚠️</span>
                        <span>${w}</span>
                    </div>
                `;
            });
        }

        // Verification
        let verificationHtml = '';
        if (issue.verification) {
            verificationHtml = `
                <div class="success-box">
                    <span>✅</span>
                    <span><strong>Verification:</strong> ${issue.verification}</span>
                </div>
            `;
        }

        // Escalation
        let escalationHtml = '';
        if (issue.escalation) {
            escalationHtml = `
                <div class="escalation-box">
                    <span>🔺</span>
                    <span><strong>Escalation:</strong> ${issue.escalation}</span>
                </div>
            `;
        }

        const content = `
            <h3>🔧 ${issue.title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 8px;"><em>${issue.symptoms}</em></p>
            ${stepsHtml}
            ${warningsHtml}
            ${verificationHtml}
            ${escalationHtml}
        `;

        const navButtons = [
            {
                label: '← Back to Issues',
                type: 'back',
                action: () => {
                    if (currentCategory) showCategory(currentCategory.id);
                    else showWelcome();
                }
            },
            { label: '🏠 Start Over', type: 'start-over', action: () => showWelcome() }
        ];

        const quickReplies = [
            { label: '👍 This helped!', action: () => botReply("Glad I could help! 🎉 Feel free to ask if you have any other questions.", { quickReplies: [{ label: '🏠 Main Menu', action: () => showWelcome() }] }) },
            { label: '👎 Still not working', action: () => botReply(`I'm sorry the steps didn't fully resolve your issue.<br><br><div class="escalation-box"><span>📞</span><span><strong>Please contact your IT Admin</strong> and share:<br>• Issue: ${issue.title}<br>• Steps you've already tried<br>• Any error messages you see</span></div>`, { quickReplies: [{ label: '🏠 Main Menu', action: () => showWelcome() }] }) }
        ];

        botReply(content, { navButtons, quickReplies }, 1000);
    }

    // ---------- NLP-lite Matching ----------
    function findMatchingIssue(query) {
        const normalizedQuery = query.toLowerCase().trim();
        let bestMatch = null;
        let bestScore = 0;

        for (const category of Object.values(KNOWLEDGE_BASE)) {
            for (const issue of category.issues) {
                let score = 0;

                // Check keyword matches
                for (const keyword of issue.keywords) {
                    if (normalizedQuery.includes(keyword.toLowerCase())) {
                        score += keyword.split(' ').length * 2; // multi-word keywords score higher
                    }
                }

                // Check title words
                const titleWords = issue.title.toLowerCase().split(/\s+/);
                for (const word of titleWords) {
                    if (word.length > 3 && normalizedQuery.includes(word)) {
                        score += 1;
                    }
                }

                // Check symptoms
                if (issue.symptoms) {
                    const symptomsWords = issue.symptoms.toLowerCase().split(/\s+/);
                    for (const word of symptomsWords) {
                        if (word.length > 4 && normalizedQuery.includes(word)) {
                            score += 0.5;
                        }
                    }
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = { issue, category, score };
                }
            }
        }

        return bestScore >= 2 ? bestMatch : null;
    }

    function findMatchingCategory(query) {
        const normalizedQuery = query.toLowerCase().trim();
        const categoryKeywords = {
            outlook: ['outlook', 'email', 'mail', 'inbox', 'ost', 'pst', 'calendar'],
            windows: ['windows', 'temp', 'cache', 'profile', 'user profile', 'prefetch'],
            updates: ['update', 'driver', 'restart', 'reboot', 'maintenance', 'windows update'],
            m365: ['365', 'microsoft 365', 'password', 'mfa', 'login', 'sign in', 'license', 'office'],
            health: ['slow', 'disk', 'cleanup', 'performance', 'speed', 'storage', 'health'],
            aws: ['aws', 'server', 'login', 'godaddy', 'jackson', 'lincoln', 'stage', 'uat', 'vpn', 'openvpn', 'prod', 'non-prod'],
            linux: ['linux', 'bash', 'chmod', 'chown', 'grep', 'awk', 'sed', 'systemctl', 'journalctl', 'crontab', 'apt', 'yum', 'dnf', 'tar', 'rsync', 'ubuntu', 'centos', 'redhat', 'fedora', 'debian', 'terminal', 'shell', 'nano', 'vim', 'ps aux', 'kill process', 'mount', 'unmount', 'df', 'du', 'ping', 'traceroute', 'nslookup', 'dig', 'scp', 'curl', 'wget', 'top', 'htop', 'mpstat', 'vmstat', 'sar', 'free', 'meminfo', 'lsblk', 'iostat', 'dstat', 'ip addr', 'ss', 'netstat', 'iftop', 'nload', 'tcpdump', 'dmesg', 'sensors', 'hostnamectl'],
            docker: ['docker', 'docker-compose', 'container', 'image', 'pull', 'run', 'ps', 'exec', 'logs', 'volume', 'Dockerfile', 'build', 'yaml', 'cgroups', 'oom', 'oomkilled', 'l1', 'l2', 'l3', 'engine', 'cache', 'compose', 'prune']
        };

        for (const [catId, keywords] of Object.entries(categoryKeywords)) {
            for (const kw of keywords) {
                if (normalizedQuery.includes(kw)) {
                    return KNOWLEDGE_BASE[catId];
                }
            }
        }
        return null;
    }

    function handleUserInput(text) {
        if (!text.trim()) return;

        addMessage('user', escapeHtml(text));
        userInput.value = '';

        // Try to find a direct issue match
        const match = findMatchingIssue(text);
        if (match && match.score >= 3) {
            botReply(
                `I found a solution that might help! Let me show you the troubleshooting steps for <strong>${match.issue.title}</strong> under <strong>${match.category.icon} ${match.category.title}</strong>.`,
                {},
                600
            );
            setTimeout(() => {
                currentCategory = match.category;
                showSolution(match.issue);
            }, 1500);
            return;
        }

        // Try to match a category
        const catMatch = findMatchingCategory(text);
        if (catMatch) {
            botReply(
                `It sounds like you need help with <strong>${catMatch.icon} ${catMatch.title}</strong>. Let me show you the common issues:`,
                {},
                600
            );
            setTimeout(() => showCategory(catMatch.id), 1500);
            return;
        }

        // Fuzzy match with lower threshold
        if (match && match.score >= 1) {
            botReply(
                `I think you might be looking for help with <strong>${match.issue.title}</strong>. Is this correct?`,
                {
                    quickReplies: [
                        { label: '✅ Yes, show me', action: () => { currentCategory = match.category; showSolution(match.issue); }},
                        { label: '❌ No, show menu', action: () => showWelcome() }
                    ]
                },
                700
            );
            return;
        }

        // No match — offer help
        botReply(
            `I'm not sure I understood your issue. Could you try describing it differently, or choose a topic from the menu?<br><br>You can say things like:<br>• <em>"Outlook is not opening"</em><br>• <em>"My PC is running slow"</em><br>• <em>"How to reset my password"</em><br>• <em>"Clear temp files"</em>`,
            {
                quickReplies: [
                    { label: '🏠 Show Main Menu', action: () => showWelcome() }
                ]
            },
            700
        );
    }

    // ---------- Event Listeners ----------
    sendBtn.addEventListener('click', () => {
        handleUserInput(userInput.value);
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput(userInput.value);
        }
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        html.setAttribute('data-theme', current === 'light' ? '' : 'light');
        if (current === 'light') {
            html.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', html.getAttribute('data-theme') || 'dark');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Clear chat
    clearChat.addEventListener('click', () => {
        messagesInner.innerHTML = '';
        messageHistory = [];
        showWelcome();
    });

    // New chat
    newChatBtn.addEventListener('click', () => {
        messagesInner.innerHTML = '';
        messageHistory = [];
        conversationState = 'welcome';
        currentCategory = null;
        currentIssue = null;
        showWelcome();
        // Close sidebar on mobile
        sidebar.classList.remove('open');
        removeOverlay();
    });

    // Mobile sidebar
    let overlay = null;
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay active';
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            removeOverlay();
        });
        document.body.appendChild(overlay);
    }

    function removeOverlay() {
        if (overlay) {
            overlay.remove();
            overlay = null;
        }
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('open');
        if (isOpen) {
            createOverlay();
        } else {
            removeOverlay();
        }
    });

    // Sidebar nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const categoryId = item.getAttribute('data-category');
            disableAllButtons();
            const cat = KNOWLEDGE_BASE[categoryId];
            if (cat) {
                addMessage('user', escapeHtml(cat.title));
                showCategory(categoryId);
            }
            // Close sidebar on mobile
            sidebar.classList.remove('open');
            removeOverlay();
        });
    });

    // ---------- Initialize ----------
    showWelcome();
    userInput.focus();

})();
