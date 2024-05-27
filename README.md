## Why FoodLogger.ai? 🤔

The mission for this project is to build the easiest food-logging app with the help of AI services. The premise is using voice recognition for all food entries to reduce time and effort for the user.

## Project Setup 🛠️

Use the Makefile!

### Prequisites

1. Install and run [Docker Desktop](https://www.docker.com/products/docker-desktop/) in order to run the project locally.

2. Create an OpenAI account and add your API key to the `.env` file

3. Create a DeepGram account and add your API key to the `.env` file

4. Create a Twilio account and add your Auth token, Account ID and Verify Service token to the `.env` file

### Install Steps

3. Run `npm install`

4. Run `make setup`

5. Run `make start`

That's it! The app will now be running on `https://localhost:3000`
