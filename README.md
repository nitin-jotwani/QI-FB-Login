# QI FB Login
1. Create an application in facebook.
2. Enter valid Valid OAuth redirect URIs in Client OAuth Settings under Facebook Login Settings.
3. Edit clientId, clientSecret and redirectURI accordingly in html, js file provided.
4. Run html file, which contains Login Link for FB.

After the successful login user will be redirected to localhost/fb which is monitored by backend nodeJS (app.js).

From here, everything is processed in backend only (Retrieving accessToken, verifying accessToken, retrieving userInfo) and details are logged in terminal.
