/*
 * Triggered when the accepts the the sign in, cancels, or closes the
 * authorization dialog.
 */

function loginFinishedCallback(authResult) {
    if (authResult) {
        if (authResult['error'] === undefined) {
            gapi.auth.setToken(authResult); // Store the returned token.
            toggleElement('signin-button'); // Hide the sign in upon successful sign in.
            getEmail();                     // Trigger request to get the email address.
        } else {
            console.log('An error occurred');
        }
    } else {
        console.log('Empty authResult');  // Something went wrong
    }
}

/*
 * Initiates the request to the userinfo endpoint to get the user's email
 * address. This function relies on the gapi.auth.setToken containing a valid
 * OAuth access token.
 *
 * When the request completes, the getEmailCallback is triggered and passed
 * the result of the request.
 */
function getEmail() {
    // Load the oauth2 libraries to enable the userinfo methods.
    gapi.client.load('oauth2', 'v2', function() {
        var request = gapi.client.oauth2.userinfo.get();
        /*
         * This sentence call to the getEmailCallBack funtion in order to
         * process the response
         */
        request.execute(getEmailCallback);
    });
}

function getEmailCallback(obj) {
    var el = document.getElementById('email');
    var email = '';

    if (obj['email']) {
        email = 'Email: ' + obj['email'];
    }

    el.innerHTML = email;
    toggleElement('email');
}

/*
 * This method, show the parameter tag, that is an id of an html element
 */
function toggleElement(id) {
    var el = document.getElementById(id);
    
    if (el.getAttribute('class') === 'hide') {
        el.setAttribute('class', 'show');
    } else {
        el.setAttribute('class', 'hide');
    }
}