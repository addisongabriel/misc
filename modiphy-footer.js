function generateCopyright(companyName, textColor) {
    const currentYear = new Date().getFullYear();
    const copyrightText = `© ${currentYear} ${companyName} • All rights reserved | Built by <a href="https://www.modiphy.com/">Modiphy</a>`;
    const style = `color: ${textColor};`;

    const footerElement = document.getElementById('modiphy-footer');
    footerElement.innerHTML = `<span style="${style}">${copyrightText}</span>`;
}
