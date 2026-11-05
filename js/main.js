/**
 * ELEGANT PREMIUM REDESIGN - INTERACTIVE CORE JS
 * Features: Before/After Slider, Viewport Simulator, Theme Switcher,
 * Portfolio Filter, Consultation Wizard, Case Study Modal, and Design Tokens Copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initViewportSimulator();
  initBeforeAfterSlider();
  initPortfolioFilter();
  initScopeEstimator();
  initHandoverTabs();
  initColorCopy();
  initConsultationWizard();
  initCaseStudyModal();
  initMobileDrawer();
  initSmoothScroll();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark Obsidian & Light Alabaster)
   ========================================================================== */
function initThemeSwitcher() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('site-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeBtnLabel(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('site-theme', newTheme);
    updateThemeBtnLabel(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Royal Obsidian' : 'Alabaster Gold'} theme`);
  });
}

function updateThemeBtnLabel(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  if (theme === 'light') {
    btn.innerHTML = `<span>☀️</span> Light Alabaster`;
  } else {
    btn.innerHTML = `<span>🌙</span> Dark Obsidian`;
  }
}

/* ==========================================================================
   2. VIEWPORT SIMULATOR (Desktop, Tablet, Mobile)
   ========================================================================== */
function initViewportSimulator() {
  const stage = document.getElementById('viewport-stage');
  const buttons = document.querySelectorAll('.viewport-btn');
  if (!stage || !buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.viewport;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      stage.classList.remove('view-tablet', 'view-mobile');
      if (mode === 'tablet') {
        stage.classList.add('view-tablet');
        showToast('Viewing in Tablet Mode (768px)');
      } else if (mode === 'mobile') {
        stage.classList.add('view-mobile');
        showToast('Viewing in Mobile Mode (390px)');
      } else {
        showToast('Viewing in Desktop Mode (100% Full Width)');
      }
    });
  });
}

/* ==========================================================================
   3. BEFORE & AFTER INTERACTIVE SPLIT SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('comparison-slider');
  const afterLayer = document.getElementById('slider-after-layer');
  const handle = document.getElementById('slider-handle');
  if (!container || !afterLayer || !handle) return;

  let isDragging = false;

  const setSliderPos = (xPos) => {
    const rect = container.getBoundingClientRect();
    let offsetX = xPos - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    const percentage = (offsetX / rect.width) * 100;

    afterLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clientX !== undefined) {
      setSliderPos(clientX);
    }
  };

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPos(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', onPointerMove);

  // Touch Support for mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches && e.touches[0]) {
      setSliderPos(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      setSliderPos(e.touches[0].clientX);
    }
  }, { passive: true });
}

/* ==========================================================================
   4. PORTFOLIO CATEGORY FILTER
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        const cat = item.dataset.category;
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE SCOPE ESTIMATOR
   ========================================================================== */
function initScopeEstimator() {
  const cards = document.querySelectorAll('.calc-pill-label');
  const timelineEl = document.getElementById('calc-timeline');
  const deliverablesEl = document.getElementById('calc-deliverables');
  const liftEl = document.getElementById('calc-lift');
  if (!cards.length) return;

  const data = {
    standard: {
      timeline: '2 - 3 Weeks',
      deliverables: '8 Core Pages + Mobile UX',
      lift: '+185% Engagement'
    },
    flagship: {
      timeline: '4 - 5 Weeks',
      deliverables: 'Complete Redesign + Design System + Motion',
      lift: '+320% Conversion'
    },
    bespoke: {
      timeline: '6 - 8 Weeks',
      deliverables: 'Full Enterprise Redesign + Custom PHP/Dev + Handover',
      lift: '+480% Brand Equity'
    }
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const tier = card.dataset.tier;
      if (data[tier]) {
        if (timelineEl) timelineEl.textContent = data[tier].timeline;
        if (deliverablesEl) deliverablesEl.textContent = data[tier].deliverables;
        if (liftEl) liftEl.textContent = data[tier].lift;
      }
    });
  });
}

/* ==========================================================================
   6. HANDOVER GUIDE TABS (Design Tokens & Specs)
   ========================================================================== */
function initHandoverTabs() {
  const tabs = document.querySelectorAll('.handover-tab-btn');
  const panes = document.querySelectorAll('.handover-tab-pane');
  if (!tabs.length || !panes.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(tab.dataset.target);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. COLOR TOKEN ONE-CLICK CLIPBOARD COPY
   ========================================================================== */
function initColorCopy() {
  const swatches = document.querySelectorAll('.color-swatch-card');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.dataset.hex;
      if (hex) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Copied token ${hex} to clipboard!`);
        }).catch(() => {
          showToast(`Hex code: ${hex}`);
        });
      }
    });
  });
}

/* ==========================================================================
   8. CONSULTATION MULTI-STEP WIZARD
   ========================================================================== */
function initConsultationWizard() {
  const panes = document.querySelectorAll('.wizard-step-pane');
  const nodes = document.querySelectorAll('.step-node');
  const nextBtns = document.querySelectorAll('.btn-wizard-next');
  const prevBtns = document.querySelectorAll('.btn-wizard-prev');
  const radioCards = document.querySelectorAll('.radio-card');
  const form = document.getElementById('consultation-form');
  if (!panes.length) return;

  let currentStep = 1;

  radioCards.forEach(card => {
    card.addEventListener('click', () => {
      const parent = card.closest('.radio-cards-grid');
      parent.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  const goToStep = (step) => {
    currentStep = step;
    panes.forEach(p => p.classList.remove('active'));
    nodes.forEach(n => {
      const s = parseInt(n.dataset.step, 10);
      n.classList.remove('active', 'completed');
      if (s === currentStep) n.classList.add('active');
      else if (s < currentStep) n.classList.add('completed');
    });

    const activePane = document.getElementById(`step-pane-${currentStep}`);
    if (activePane) activePane.classList.add('active');
  };

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < 3) goToStep(currentStep + 1);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) goToStep(currentStep - 1);
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✓ Project brief submitted! We will respond within 4 hours.');
      goToStep(1);
      form.reset();
    });
  }
}

/* ==========================================================================
   9. CASE STUDY MODAL DIALOG
   ========================================================================== */
const caseStudiesData = {
  1: {
    title: 'Maison de Haute Horlogerie',
    category: 'Haute Horlogerie & Luxury Commerce',
    impact: '+340% Private Viewing Inquiries',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    overview: 'A complete overhaul of an 80-year-old Swiss watchmakers digital presence, replacing a dated static catalog with a fluid editorial experience that doubled average time on site.',
    deliverables: ['Responsive Web Experience', 'Figma Component System', 'Interactive 3D Complications Explorer', 'Design Handover Guide']
  },
  2: {
    title: 'Aura Private Wealth Management',
    category: 'Fintech & Executive Advisory',
    impact: '$120M+ Capital Onboarded',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    overview: 'Architected an understated, high-trust portal for ultra-high-net-worth investors with real-time portfolio health metrics and bespoke editorial typography.',
    deliverables: ['Custom PHP Theme Engine', 'Client Portal Interface', 'Executive Color Tokens', 'Typography Scale']
  },
  3: {
    title: 'Sovereign Architectural Studio',
    category: 'Contemporary Architecture & Living',
    impact: '+215% International Project Briefs',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    overview: 'Transformed an architectural firm’s online monograph with minimalist framing, seamless project transitions, and full tablet/mobile spatial alignment.',
    deliverables: ['Full Redesign', 'Interactive Blueprint Drawer', 'Responsive Layout System', 'Complete Asset Library']
  },
  4: {
    title: 'Kaelen Bespoke Cashmere',
    category: 'Luxury Fashion & Direct-to-Consumer',
    impact: '+82% Average Order Value',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    overview: 'Elevated an artisan knitwear label into an internationally coveted digital showroom featuring sensory fabric zooms and friction-free mobile checkout.',
    deliverables: ['Shopify/PHP Custom Templates', 'Design Handover Guide', 'Micro-interactions Suite', 'Editorial Layouts']
  }
};

function initCaseStudyModal() {
  const overlay = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  if (!overlay) return;

  const titleEl = document.getElementById('modal-title');
  const catEl = document.getElementById('modal-category');
  const impactEl = document.getElementById('modal-impact');
  const imgEl = document.getElementById('modal-img');
  const descEl = document.getElementById('modal-desc');
  const delivsEl = document.getElementById('modal-deliverables');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const data = caseStudiesData[id];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (catEl) catEl.textContent = data.category;
      if (impactEl) impactEl.textContent = data.impact;
      if (imgEl) imgEl.src = data.image;
      if (descEl) descEl.textContent = data.overview;

      if (delivsEl) {
        delivsEl.innerHTML = '';
        data.deliverables.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          delivsEl.appendChild(li);
        });
      }

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   10. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const hamburger = document.getElementById('nav-hamburger-btn');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const links = document.querySelectorAll('.mobile-nav-links a');

  if (!hamburger) return;

  const openDrawer = () => document.body.classList.add('mobile-menu-open');
  const closeDrawer = () => document.body.classList.remove('mobile-menu-open');

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  links.forEach(l => l.addEventListener('click', closeDrawer));
}

/* ==========================================================================
   11. SMOOTH SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   TOAST HELPER NOTIFICATION
   ========================================================================== */
function showToast(msg) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✨</span> <div>${msg}</div>`;
  toast.classList.add('show');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
