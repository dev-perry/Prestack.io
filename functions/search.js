const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const app = require('express')();

const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);


//Cors enable to allow client-side invocation
app.use(require('cors')({origin: true}));

//Firebase middelware, verifies request and adds 'user' field to request
//https://gist.github.com/abeisgoat/832d6f8665454d0cd99ef08c229afb42


function getFirebaseUser(req, res, next) {
  console.log("Check if request is authorized with Firebase ID token");

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>"
    );
    res.status(403).send("Unauthorized");
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    console.log("Found 'Authorization' header");
    idToken = req.headers.authorization.split("Bearer ")[1];
  }

  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
      console.log("ID Token correctly decoded", decodedIdToken);
      req.user = decodedIdToken;
      return next();
    })
    .catch(error => {
      console.error("Error while verifying Firebase ID token:", error);
      res.status(403).send("Unauthorized");
    });
}

app.use(getFirebaseUser);

app.get('/', (req,res) => {
  const params = {
    filters: `owner: ${req.user.user_id}`,
    //Proxy user_id as unique token for key
    userToken: req.user.user_id
  }

  const key = client.generateSecuredApiKey(ALGOLIA_SEARCH_KEY, params);

  res.json({key});
})

// Finally, pass our ExpressJS app to Cloud Functions as a function
// called 'getSearchKey';
exports.getSearchKey = functions.https.onRequest(app);
