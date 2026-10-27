/**
 * ============================================================================
 * ROHAN V. S. — DEVELOPER PORTFOLIO SCRIPT
 * Functionality:
 *  - Typewriter cycling role animation
 *  - Interactive ambient background particle canvas
 *  - Sticky navigation & scroll progress indicator
 *  - Mobile menu toggle & keyboard accessibility
 *  - Section highlight via IntersectionObserver
 *  - Technical skills category filtering
 *  - EyeDR AI demo placeholder modal
 *  - Configurable resume download handler & fallback modal
 *  - Copy email to clipboard with toast notification
 *  - Contact form validation & email client dispatch modal
 *  - Reduced motion preference support
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Configuration Settings (Easily Editable)
  // --------------------------------------------------------------------------
  const PORTFOLIO_CONFIG = {
    developerName: "Rohan V S",
    email: "vsrohan09@gmail.com",
    academicEmail: "rohan.240114@vlsi.ritchennai.edu",
    phone: "+91 6380707703",
    githubUrl: "https://github.com/vsrohan",
    linkedinUrl: "https://www.linkedin.com/in/rohan-v-s-768969327",
    resume: {
      filePath: "assets/Rohan_VS_Resume.pdf",
      fileName: "Rohan_VS_Resume.pdf"
    },
    roles: [
      "Full Stack Developer",
      "AI Engineer",
      "Computer Vision Enthusiast",
      "Data Science Practitioner"
    ],
    typingSpeed: 75,
    erasingSpeed: 45,
    pauseBetweenRoles: 2000
  };

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // DOM Elements
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const typewriterElement = document.getElementById('typewriter-role');
  const ambientCanvas = document.getElementById('ambient-canvas');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const backToTopBtn = document.getElementById('back-to-top');
  const currentYearSpan = document.getElementById('current-year');

  // Modals
  const resumeModal = document.getElementById('resume-modal');
  const resumeModalBody = document.getElementById('resume-modal-body');
  const resumeModalFooter = document.getElementById('resume-modal-footer');
  const resumeModalClose = document.getElementById('resume-modal-close');
  const resumeModalDismiss = document.getElementById('resume-modal-dismiss');
  const resumeTriggers = document.querySelectorAll('.resume-trigger');

  const demoModal = document.getElementById('demo-modal');
  const demoModalClose = document.getElementById('demo-modal-close');
  const demoModalDismiss = document.getElementById('demo-modal-dismiss');
  const eyedrDemoBtn = document.getElementById('eyedr-demo-btn');

  const eyeqModal = document.getElementById('eyeq-modal');
  const eyeqModalClose = document.getElementById('eyeq-modal-close');
  const eyeqModalDismiss = document.getElementById('eyeq-modal-dismiss');
  const eyeqExploreBtn = document.getElementById('eyeq-explore-btn');
  const eyeqModalContactBtn = document.getElementById('eyeq-modal-contact-btn');

  const contactFeedbackModal = document.getElementById('contact-feedback-modal');
  const contactFeedbackBody = document.getElementById('feedback-modal-body');
  const contactFeedbackFooter = document.getElementById('feedback-modal-footer');
  const feedbackModalClose = document.getElementById('feedback-modal-close');
  const contactForm = document.getElementById('contact-form');

  // Filter tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  // --------------------------------------------------------------------------
  // Update Current Year
  // --------------------------------------------------------------------------
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // Typewriter Animation
  // --------------------------------------------------------------------------
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeRole() {
    if (!typewriterElement) return;

    if (prefersReducedMotion) {
      typewriterElement.textContent = PORTFOLIO_CONFIG.roles[0];
      return;
    }

    const currentRole = PORTFOLIO_CONFIG.roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? PORTFOLIO_CONFIG.erasingSpeed : PORTFOLIO_CONFIG.typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      // Finished typing current role, pause
      delay = PORTFOLIO_CONFIG.pauseBetweenRoles;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished erasing, move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % PORTFOLIO_CONFIG.roles.length;
      delay = 400;
    }

    setTimeout(typeRole, delay);
  }

  // Start typewriter on load
  typeRole();

  // --------------------------------------------------------------------------
  // Ambient Particle Canvas (Constellation & Light Drift)
  // --------------------------------------------------------------------------
  function initAmbientCanvas() {
    if (!ambientCanvas || prefersReducedMotion) return;

    const ctx = ambientCanvas.getContext('2d');
    let width = (ambientCanvas.width = window.innerWidth);
    let height = (ambientCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.8,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        alpha: Math.random() * 0.5 + 0.2,
        color: i % 2 === 0 ? '0, 242, 254' : '139, 92, 246' // Cyan and Purple
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Draw and move particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles with subtle lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderCanvas);
    }

    requestAnimationFrame(renderCanvas);
  }

  initAmbientCanvas();

  // --------------------------------------------------------------------------
  // Scroll Progress & Sticky Header
  // --------------------------------------------------------------------------
  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    if (header) {
      if (scrollTop > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // Mobile Navigation Drawer Toggle
  // --------------------------------------------------------------------------
  function toggleMobileMenu(forceClose = false) {
    if (!mobileToggle || !mobileMenu) return;

    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    const shouldOpen = forceClose ? false : !isExpanded;

    mobileToggle.setAttribute('aria-expanded', String(shouldOpen));
    mobileMenu.setAttribute('aria-hidden', String(!shouldOpen));

    if (shouldOpen) {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }

  // Close mobile drawer when a nav link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  // Close drawer on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleMobileMenu(true);
      closeAllModals();
    }
  });

  // --------------------------------------------------------------------------
  // Active Navigation Link Highlighting (IntersectionObserver)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // --------------------------------------------------------------------------
  // Skills Filtering Tabs
  // --------------------------------------------------------------------------
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');
      const filterAlt = tab.getAttribute('data-filter-alt');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || (filterAlt && category === filterAlt)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // Toast Notification Helper
  // --------------------------------------------------------------------------
  let toastTimeout;
  function showToast(message, duration = 3000) {
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // --------------------------------------------------------------------------
  // Copy Email to Clipboard
  // --------------------------------------------------------------------------
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailToCopy = copyEmailBtn.getAttribute('data-clipboard') || PORTFOLIO_CONFIG.email;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback for non-https or older browser contexts
          const textArea = document.createElement('textarea');
          textArea.value = emailToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast('Email address copied to clipboard!');
      } catch (err) {
        showToast('Failed to copy. Email: ' + emailToCopy);
      }
    });
  }

  // --------------------------------------------------------------------------
  // Modal Management Helpers
  // --------------------------------------------------------------------------
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    [resumeModal, demoModal, eyeqModal, contactFeedbackModal].forEach((m) => {
      if (m && m.classList.contains('active')) {
        closeModal(m);
      }
    });
  }

  // Close modals on clicking overlay backdrop
  [resumeModal, demoModal, eyeqModal, contactFeedbackModal].forEach((modalEl) => {
    if (modalEl) {
      modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) {
          closeModal(modalEl);
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // Resume Download Handler
  // --------------------------------------------------------------------------
  async function handleResumeRequest() {
    toggleMobileMenu(true);

    // Check if the resume PDF exists on the server/path
    try {
      const response = await fetch(PORTFOLIO_CONFIG.resume.filePath, { method: 'HEAD' });

      if (response.ok) {
        // File exists! Trigger direct download
        const downloadLink = document.createElement('a');
        downloadLink.href = PORTFOLIO_CONFIG.resume.filePath;
        downloadLink.download = PORTFOLIO_CONFIG.resume.fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        showToast('Downloading resume...');
        return;
      }
    } catch (e) {
      // Fetch error or 404 in static hosting before file upload
    }

    // If PDF is not yet placed in assets directory, display informative fallback modal
    if (resumeModalBody && resumeModalFooter) {
      resumeModalBody.innerHTML = `
        <p><strong>Rohan's Resume</strong> is ready to be linked directly to this portfolio.</p>
        <p class="modal-subtext">To activate direct PDF download, place your compiled PDF inside the <code>assets/</code> folder named <code>${PORTFOLIO_CONFIG.resume.fileName}</code>.</p>
        <div class="modal-highlight-box font-mono">
          Email: ${PORTFOLIO_CONFIG.email}<br>
          Phone: ${PORTFOLIO_CONFIG.phone}
        </div>
        <p class="modal-subtext">In the meantime, you can request an updated copy of Rohan's resume directly via email:</p>
      `;

      resumeModalFooter.innerHTML = `
        <a href="mailto:${PORTFOLIO_CONFIG.email}?subject=Requesting%20Resume%20for%20Software%20Engineering%20Role&body=Hi%20Rohan,%0A%0AI%20reviewed%20your%20portfolio%20and%20would%20like%20to%20request%20a%20copy%20of%20your%20latest%20resume.%0A%0AThanks!" class="btn btn-primary">
          <span>Request Resume via Email</span>
        </a>
        <button class="btn btn-ghost" id="resume-modal-fallback-close">Close</button>
      `;

      const fallbackClose = document.getElementById('resume-modal-fallback-close');
      if (fallbackClose) {
        fallbackClose.addEventListener('click', () => closeModal(resumeModal));
      }

      openModal(resumeModal);
    }
  }

  resumeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      handleResumeRequest();
    });
  });

  if (resumeModalClose) resumeModalClose.addEventListener('click', () => closeModal(resumeModal));
  if (resumeModalDismiss) resumeModalDismiss.addEventListener('click', () => closeModal(resumeModal));

  // --------------------------------------------------------------------------
  // EyeDR AI Demo Placeholder Modal (if present)
  // --------------------------------------------------------------------------
  if (eyedrDemoBtn) {
    eyedrDemoBtn.addEventListener('click', () => {
      openModal(demoModal);
    });
  }

  if (demoModalClose) demoModalClose.addEventListener('click', () => closeModal(demoModal));
  if (demoModalDismiss) demoModalDismiss.addEventListener('click', () => closeModal(demoModal));

  // --------------------------------------------------------------------------
  // EyeQ AI Startup Idea Modal Handler
  // --------------------------------------------------------------------------
  if (eyeqExploreBtn && eyeqModal) {
    eyeqExploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(eyeqModal);
    });
  }

  if (eyeqModalClose) eyeqModalClose.addEventListener('click', () => closeModal(eyeqModal));
  if (eyeqModalDismiss) eyeqModalDismiss.addEventListener('click', () => closeModal(eyeqModal));

  if (eyeqModalContactBtn) {
    eyeqModalContactBtn.addEventListener('click', () => {
      closeModal(eyeqModal);
    });
  }

  // --------------------------------------------------------------------------
  // Contact Form Validation & Submission Handler
  // --------------------------------------------------------------------------
  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        nameInput.classList.add('error');
        isValid = false;
      } else {
        nameError.textContent = '';
        nameInput.classList.remove('error');
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        emailInput.classList.add('error');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('error');
        isValid = false;
      } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter your message.';
        messageInput.classList.add('error');
        isValid = false;
      } else {
        messageError.textContent = '';
        messageInput.classList.remove('error');
      }

      if (!isValid) return;

      const senderName = nameInput.value.trim();
      const senderEmail = emailInput.value.trim();
      const senderSubject = subjectInput.value.trim() || 'Software Engineering Inquiry / Portfolio Contact';
      const senderMessage = messageInput.value.trim();

      // Formatted mailto link for direct submission dispatch
      const mailtoUrl = `mailto:${encodeURIComponent(PORTFOLIO_CONFIG.email)}?subject=${encodeURIComponent(senderSubject)}&body=${encodeURIComponent(
        `From: ${senderName} (${senderEmail})\n\nMessage:\n${senderMessage}`
      )}`;

      // Display feedback modal
      if (contactFeedbackBody && contactFeedbackFooter) {
        contactFeedbackBody.innerHTML = `
          <p>Thank you, <strong>${escapeHtml(senderName)}</strong>!</p>
          <p>As this portfolio is hosted as a static client website, your message has been formatted for 1-click dispatch directly to Rohan's email address:</p>
          <div class="modal-highlight-box font-mono">
            To: ${PORTFOLIO_CONFIG.email}<br>
            Subject: ${escapeHtml(senderSubject)}
          </div>
          <p class="modal-subtext">Click the button below to send this directly via your default email client (Outlook, Gmail, Apple Mail, etc.):</p>
        `;

        contactFeedbackFooter.innerHTML = `
          <a href="${mailtoUrl}" class="btn btn-primary" id="open-mail-client-btn">
            <span>Send via Email Client</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </a>
          <button class="btn btn-ghost" id="feedback-modal-close-btn">Done</button>
        `;

        const feedbackCloseBtn = document.getElementById('feedback-modal-close-btn');
        if (feedbackCloseBtn) {
          feedbackCloseBtn.addEventListener('click', () => closeModal(contactFeedbackModal));
        }

        const openMailClientBtn = document.getElementById('open-mail-client-btn');
        if (openMailClientBtn) {
          openMailClientBtn.addEventListener('click', () => {
            setTimeout(() => closeModal(contactFeedbackModal), 600);
          });
        }

        openModal(contactFeedbackModal);

        // Reset form inputs
        contactForm.reset();
      }
    });

    // Clear error on input
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('error');
          const errEl = document.getElementById(`${input.id.replace('contact-', '')}-error`);
          if (errEl) errEl.textContent = '';
        });
      }
    });
  }

  if (feedbackModalClose) {
    feedbackModalClose.addEventListener('click', () => closeModal(contactFeedbackModal));
  }

  // --------------------------------------------------------------------------
  // Back to Top Button
  // --------------------------------------------------------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // Gentle Scroll Observation (Non-Destructive)
  // --------------------------------------------------------------------------
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observedCards = document.querySelectorAll(
      '.glass-panel, .highlight-card, .skill-category-card, .project-card, .achievement-card'
    );

    const cardObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '100px 0px'
      }
    );

    observedCards.forEach((el) => cardObserver.observe(el));
  }

  // --------------------------------------------------------------------------
  // Helper: Escape HTML to prevent injection
  // --------------------------------------------------------------------------
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Log portfolio initialization
  console.log('Portfolio loaded successfully for Rohan V. S. (B.E. Electronics & VLSI, RIT Chennai).');
})();
