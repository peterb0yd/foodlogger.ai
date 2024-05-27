## Why FoodLogger.ai? 🤔

The mission for this project is to build the easiest food-logging app with the help of AI services. The premise is using voice recognition for all food entries to reduce time and effort for the user. 

Originally it was meant to be a useful tool for myself to use. Then I had the idea to launch it as a paid product. Then I lost interest and moved onto greener pastures. Now I'm focused on climate-tech projects.

## Project Setup 🛠️

Use the Makefile!

### Prequisites

1. Install and run [Docker Desktop](https://www.docker.com/products/docker-desktop/) in order to run the project locally.

2. Create an [OpenAI Developer](https://platform.openai.com/docs/overview) account and add your API key to the `.env` file

3. Create a [DeepGram](https://deepgram.com/) account and add your API key to the `.env` file

4. Create a [Twilio](https://pages.twilio.com/twilio-brand-sales-namer-1?cq_plac=&cq_net=g&cq_pos=&cq_med=&cq_plt=gp) account and add your Auth token, Account ID and Verify Service token to the `.env` file

### Install Steps

3. Run `npm install`

4. Run `make setup`

5. Run `make start`

That's it! The app will now be running on `https://localhost:3000`

## Contribution ideas

1. Migrate to use only free open-source services

2. Analytics for weekly, monthly, and yearly macronutrient stats

3. Create a light-mode theme with a toggle to switch modes

4. Create a voice UI so users don't have to navigate or press anything (ex. "Today I ate two pieces of toast with peanut butter at 9am with a cup of coffee, then at 1pm I had a chicken salad sandwich with a side cup of sweet potato soup")