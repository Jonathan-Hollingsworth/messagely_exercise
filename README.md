# messagely_exercise

> Please create a `.env` file and export `SECRET_KEY` before trying to run the application

After registering or logging in (`POST /auth/register` or `POST /auth/login`)(be sure to add the returned "_token" object to request body) you are able to send messages to other users (`POST /messages`) or read messages sent to you (`POST /messages/:id/read`)  
You can also look at your data and all messages you've sent or recieved (`GET /users/:username`,`GET /users/:username/from`,`GET /users/:username/to`)
