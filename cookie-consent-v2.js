// cookie-consent-v2.js
(function(window, document){
  function createCookiePopup() {
    if (localStorage.getItem('cookieConsent')) return;

    const popup = document.createElement('div');
    popup.className = 'cookie-consent';
    popup.innerHTML = `
      <div>This website uses cookies to ensure you get the best experience on our website.</div>
      <div class="button-group">
        <a href="/privacy-policy" class="cookie-consent_link">Privacy Policy</a>
        <a href="/cookie-policy" class="cookie-consent_link">Cookie Policy</a>
      </div>
      <a href="#" class="cookie-consent_button w-button">Agree&nbsp;&amp;&nbsp;Close</a>
    `;
    document.body.appendChild(popup);

    popup.querySelector('.cookie-consent_button')
      .addEventListener('click', e => {
        e.preventDefault();
        localStorage.setItem('cookieConsent', 'true');
        popup.style.display = 'none';
      });
  }

  // expose globally
  window.createCookiePopup = createCookiePopup;
})(window, document);
