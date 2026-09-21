// VR Care — shared behaviour (mobile nav toggle + strategy call modal)
document.addEventListener('DOMContentLoaded', function () {
  injectModal();
  wireModalTriggers();

  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.innerHTML = isOpen ? closeIcon() : menuIcon();
    });

    // close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.innerHTML = menuIcon();
      });
    });
  }

  function menuIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }
  function closeIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }

  function injectModal() {
    var wrap = document.createElement('div');
    wrap.className = 'modal-overlay';
    wrap.id = 'strategyModal';
    wrap.innerHTML =
      '<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">' +
        '<button type="button" class="modal-close" aria-label="Close">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
        '<h3 id="modalTitle">Book a Free Strategy Call</h3>' +
        '<p>Tell us a bit about your institution and we\'ll schedule a 30-minute consultation with our operations experts.</p>' +
        '<form class="modal-form">' +
          '<div class="form-field"><label>Full Name</label><input type="text" placeholder="Your name" required></div>' +
          '<div class="form-field"><label>Phone Number</label><input type="tel" placeholder="+91 00000 00000" required></div>' +
          '<div class="form-field"><label>Work Email</label><input type="email" placeholder="you@hospital.com" required></div>' +
          '<div class="form-field"><label>Hospital / Clinic Name</label><input type="text" placeholder="Institution name" required></div>' +
          '<div class="form-field"><label>How can we help? (Optional)</label><textarea placeholder="Brief note about your requirement"></textarea></div>' +
          '<button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">Request Call Back</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(wrap);

    wrap.addEventListener('click', function (e) {
      if (e.target === wrap) closeModal();
    });
    wrap.querySelector('.modal-close').addEventListener('click', closeModal);
    wrap.querySelector('.modal-form').addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thanks! This form is not yet connected to a backend — hook it up to your email or CRM.');
      closeModal();
    });
  }

  function wireModalTriggers() {
    document.querySelectorAll('.js-open-modal').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });
  }

  function openModal() {
    var m = document.getElementById('strategyModal');
    if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  function closeModal() {
    var m = document.getElementById('strategyModal');
    if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
});
