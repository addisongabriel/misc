function createCookiePopup(backgroundColor = '#fff', roundedCorners = 'rounded', boxShadow = 'shadow') {
        // Check if the user has already accepted the cookies
        if (!localStorage.getItem('cookieConsent')) {
            // Create the cookie popup element
            var cookiePopup = document.createElement('div');
            cookiePopup.className = 'cookie-popup';

            // Create the message div
            var messageDiv = document.createElement('div');
            messageDiv.innerHTML = 'This website uses cookies to ensure you get the best experience on our website.';
            cookiePopup.appendChild(messageDiv);

            // Create the links container
            var linksContainer = document.createElement('div');
            linksContainer.style.display = 'flex';
            linksContainer.style.flexDirection = 'row'; // Change to row
            linksContainer.style.columnGap = '.5rem';
            messageDiv.appendChild(linksContainer);

            // Create the "Cookie Policy" link
            var cookiePolicyLink = document.createElement('a');
            cookiePolicyLink.href = '/cookie-policy';
            cookiePolicyLink.textContent = 'Cookie Policy';
            linksContainer.appendChild(cookiePolicyLink);

            // Create the "Privacy Policy" link
            var privacyPolicyLink = document.createElement('a');
            privacyPolicyLink.href = '/privacy-policy';
            privacyPolicyLink.textContent = 'Privacy Policy';
            linksContainer.appendChild(privacyPolicyLink);

            // Create the "Got it" button element
            var gotItButton = document.createElement('button');
            gotItButton.className = 'button is-small'; // Adding the .is-small class
            gotItButton.textContent = 'Got it';

            // Append the "Got it" button to the popup
            cookiePopup.appendChild(gotItButton);

            // Add the popup to the body
            document.body.appendChild(cookiePopup);

            // Apply CSS styles to the popup
            cookiePopup.style.position = 'fixed';
            cookiePopup.style.bottom = '20px';
            cookiePopup.style.left = '20px';
            cookiePopup.style.background = backgroundColor;

            // Set text color based on background brightness
            var brightness = (parseInt(backgroundColor.substring(1, 3), 16) * 299 +
                parseInt(backgroundColor.substring(3, 5), 16) * 587 +
                parseInt(backgroundColor.substring(5, 7), 16) * 114) / 1000;

            if (brightness > 128) {
                cookiePopup.style.color = '#000';
                linksContainer.style.color = 'rgba(0, 0, 0, 0.75)'; // Set color for links container
            } else {
                cookiePopup.style.color = '#fff';
                linksContainer.style.color = 'rgba(255, 255, 255, 0.75)'; // Set color for links container
            }

            if (roundedCorners === 'rounded') {
                cookiePopup.style.borderRadius = '10px';
            } else if (roundedCorners === 'sharp') {
                cookiePopup.style.borderRadius = '0';
            }

            if (boxShadow === 'shadow') {
                cookiePopup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
            } else if (boxShadow === 'no-shadow') {
                cookiePopup.style.boxShadow = 'none';
            }

            cookiePopup.style.padding = '1.5rem';
            cookiePopup.style.display = 'flex';
            cookiePopup.style.flexDirection = 'column';
            cookiePopup.style.rowGap = '1rem';
            cookiePopup.style.maxWidth = '400px';
            cookiePopup.style.zIndex = '9999';

            // Style the links
            var links = cookiePopup.querySelectorAll('a');
            links.forEach(function(link) {
                link.style.transition = 'opacity 0.3s';
                link.style.color = 'inherit';
                link.addEventListener('mouseover', function() {
                    link.style.opacity = '1';
                });
                link.addEventListener('mouseout', function() {
                    link.style.opacity = '0.75';
                });
            });

            // Handle the "Got it" button click
            gotItButton.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'true');
                cookiePopup.style.display = 'none';
            });
        }
    }
