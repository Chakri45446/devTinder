# Dev Tinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/forgotpassword

## connectionRequestRouter

- POST /request/send/:status/:userId {status: ignored , intersted}

- POST /request/review/:status/:requestId {status: accepted}

## userRouter

- GET /user/requests
- GET /user/connections

- GET /user/feed

status: ignored , interested , accepted , rejected
