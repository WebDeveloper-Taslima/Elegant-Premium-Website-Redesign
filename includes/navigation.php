<?php
/**
 * Navigation Bar Component
 */
if (!isset($activePage)) {
    $activePage = 'home';
}
?>
<!-- Persistent Preview Simulator Toolbar -->
<div class="preview-control-bar" role="toolbar" aria-label="Interactive Preview Bar">
  <div class="preview-bar-left">
    <span class="preview-tag">
      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10b981;"></span>
      PHP Architecture &bull; Live Interactive Redesign
    </span>
    <div class="preview-viewports" aria-label="Viewport Switcher">
      <button class="viewport-btn active" data-viewport="desktop" title="Preview Desktop Mode">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        Desktop
      </button>
      <button class="viewport-btn" data-viewport="tablet" title="Preview Tablet Mode (768px)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
        Tablet (768px)
      </button>
      <button class="viewport-btn" data-viewport="mobile" title="Preview Mobile Mode (390px)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
        Mobile (390px)
      </button>
    </div>
  </div>
  <div class="preview-bar-right">
    <a href="design-system.html" class="viewport-btn" style="color:var(--gold-primary); text-decoration:none;">Handover Specs</a>
    <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle Theme">
      <span>🌙</span> Dark Obsidian
    </button>
  </div>
</div>

<!-- Primary Site Header -->
<header class="site-nav">
  <div class="container container-wide">
    <div class="nav-wrapper">
      <a href="index.php" class="brand-logo" aria-label="Vanguard Atelier Home">
        <div class="brand-emblem">V</div>
        <div class="brand-text-block">
          <span class="brand-name">Vanguard</span>
          <span class="brand-sub">Atelier &bull; Digital</span>
        </div>
      </a>

      <nav>
        <ul class="nav-links">
          <li class="nav-item <?php echo ($activePage === 'home') ? 'active' : ''; ?>"><a href="index.php">Overview</a></li>
          <li class="nav-item <?php echo ($activePage === 'about') ? 'active' : ''; ?>"><a href="about.html">Heritage</a></li>
          <li class="nav-item <?php echo ($activePage === 'services') ? 'active' : ''; ?>"><a href="services.html">Capabilities</a></li>
          <li class="nav-item <?php echo ($activePage === 'portfolio') ? 'active' : ''; ?>"><a href="portfolio.html">Showcase</a></li>
          <li class="nav-item <?php echo ($activePage === 'design-system') ? 'active' : ''; ?>"><a href="design-system.html">Design System</a></li>
          <li class="nav-item <?php echo ($activePage === 'contact') ? 'active' : ''; ?>"><a href="contact.html">Private Booking</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <a href="contact.html" class="btn btn-primary btn-sm">Request Redesign</a>
        <button id="nav-hamburger-btn" class="nav-hamburger" aria-label="Open Navigation Menu">☰</button>
      </div>
    </div>
  </div>
</header>

<!-- Mobile Drawer Overlay -->
<div class="mobile-menu-overlay"></div>
<aside class="mobile-menu-drawer" aria-label="Mobile Navigation">
  <div>
    <div class="mobile-drawer-header">
      <div class="brand-logo">
        <div class="brand-emblem">V</div>
        <div class="brand-text-block">
          <span class="brand-name">Vanguard</span>
          <span class="brand-sub">Atelier &bull; Digital</span>
        </div>
      </div>
      <button id="mobile-drawer-close" class="mobile-close-btn" aria-label="Close Menu">&times;</button>
    </div>
    <ul class="mobile-nav-links">
      <li><a href="index.php">Overview</a></li>
      <li><a href="about.html">Heritage</a></li>
      <li><a href="services.html">Capabilities</a></li>
      <li><a href="portfolio.html">Showcase</a></li>
      <li><a href="design-system.html">Design System</a></li>
      <li><a href="contact.html">Private Booking</a></li>
    </ul>
  </div>
  <div>
    <a href="contact.html" class="btn btn-primary" style="width:100%; text-align:center;">Book Consultation</a>
  </div>
</aside>
