function generateCopyright(companyName) {
    const currentYear = new Date().getFullYear();
    const copyrightText = `© ${currentYear} ${companyName} • All rights reserved`;

    const footerElement = document.getElementById('modiphy-footer');
    footerElement.textContent = copyrightText;
}
