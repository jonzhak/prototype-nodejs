# avalanche-tutorial

## you can also whatsapp our customer support team +7 776 125 06 28 link: wa.me/77761250628 - response is usually immediate before 10A PST and after 4P PST

## Overview

There are 3 main parts to avalanche code you need to install:
<br />

### 1) Security

### 2) UI components (via iframe for web or webview for mobile)

### 3) Tracking (grab referral code, track when they sign up, and track when they convert to money making customer)

<br />
<br />
<br />
<br />
<br />
<br />

# (1) Security

With any interaction you have with Avalanche API, you need to also give us the TOKEN.
This token must be generated by using your client_id and client_secret and the following code:

##getApiToken()

This can be placed on backend (safest) or frontend (easiest).

### If you place it in the frontend:

with all of the calls you make (2-UI components and 3-Tracking), also give the token, which you can get by directly calling getApi token

### If you place it in the backend:

make the method avaialble to your froend by creating an endpoint, like app.get('/get-auth-token',...). Then from your frontend, when you need the token to make a call to avalanche-api, make a get request to your backend to /get-auth-token

```
app.get('/refer-api-auth', async (_, res) => {
  const data = await getApiToken();
  console.log('token is', data);
  res.json({
    token: data
  })
});

```

<br />
<br />
<br />
<br />
<br />
<br />

# (2) UI compponents

For Web
step 1) 'invite your friends' screen:
see iframes.js

step 2) 'here is friends you invited and here is how much you earned' screen:
see iframes.js but iframe1url replace with iframe2url

For Web
step 1) 'invite your friends' screen:
see webview.js

step 2) 'here is friends you invited and here is how much you earned' screen:
see webview.js but webview1url replace with webview2url

note - authToken is an async function, so you need to wait for it to return before showing the iframe/webview.
if you're getting ....token= ..&.. (empty token) then this is your issue - you are trying to show the iframe/webview before you get token from getApiToken

for example in react you can use a hook for this
const [showIframe, setShowIframe] = useState(false);
and set ShowIframe(true) once your token is returned

### HINT: if you can't figure out the tokens at all, but you want to test the functionality without doing the fancy tokens thing, you can also

### just specify &client_id=${your-client-id}&client_secre${your-client-secret} instead of token=${authToken} - we don't recommend this long term, but for the start this is OK

<br />
<br />
<br />

# (3) tracking functionality - see avalanche.js

### Our tracking functionality consists of 3 functions (signUp, premiumEvent, giveReward) + 1 helper function (that turns refAPI_ref_code in url params to cookie)

## Helper function - retrieving the referral code from URL search parameters -

when someone clicks on share via or email...we will send their friend a a link, which will have at the end amazingstartup.com?refAPI_ref_code=xyz... and this ref_api_code is their referral code which is used to track who invited them

For web, install this on your landing page

```
const searchParams = new URLSearchParams(window.location.search);
if(searchParams.get('refAPI_ref_code')){
		localStorage.setItem('refAPI_ref_code', searchParams.get('refAPI_ref_code')); //important to keep key as refAPI_ref_code
		document.cookie = `refAPI_ref_code=${searchParams.get('refAPI_ref_code')}`;
}
```

<br />
<br />
<br />

## Sign Up

Do all of your users need to sign in before making a purchase or getting a loan etc etc?

## If YES => call this Sign Up method right after sign up

If the answer is Yes, all my users need to be signed in - then you should call signUPAvalanche(emailer,referral_code,token) right after sign up is done, with the arguents/parameters being email of the NEW user and the referral-code which you previously got from the url and saved into a cookie/loccalstorage
And token is the security token that you get fro getApiToken

### NO, not all, some can buy etc without signing in =>

then call this Sign Up method together with your premiummEvent (described below) - specifically, right before your premiumEvent call, in a series like this: signUpAvalanche THEN premiumEventAvalanche. Code is the same as above

But if you're ecommerce etc (anything where not ALL your users are signed in neccesarily) then you can combine

<br />
<br />
<br />

## Premium event

- this is the event that is your 'conversion' event - "if the referred user reaches this point, I want this to be considered a sucesful referral and I want this event to mean that this user or whoever referred them deserves a reward!"

when this event is triggered sucesffuly, do premiuEventAvalanche(email,token)
where email is NEW user's email
where token is token from the Security section getApiToken()

## Give reward

-give reward should be called right after premium event function is called. preium event creates a reward, and give_reward consumes that reward. So premium event is like saying "okay this person/whoever referred them deserves the reward" and give reward is like "okay this person/whoever referred them was just given the reward" (or you're telling avalanche to trigger give reward integrations) so that we don't end up giving the same reward twice.

# ..and you;re all set!
