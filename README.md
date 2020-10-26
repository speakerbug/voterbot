# voterbot
A tutorial on how to use Wit.ai with a Messenger bot to help voters get information on how and when to vote.

# Overview
This is a tutorial on how to build a simple Messenger bot that utilizes Wit.ai to provide information to voters. The backend is deployed on AWS with API Gateway and Lambda.

# Prerequisites
* A Facebook Developer account
* A Wit.ai account
* An AWS account (Must be able to create Lambda functions, API Gateway end-points, and IAM roles)
* Node.js installed
* NPM installed
* [Claudia.js](https://claudiajs.com/) installed (`npm install claudia -g`)
* AWS CLI installed

# Getting Started

## Setup Wit.ai
1. Create a new app on the [apps page](https://wit.ai/apps) of Wit.ai.
1. Create a new intent:
    1. Type `Where can I vote?` as an **utterance** and assign it an **intent** of `findPollingPlace`. Click **Train and Validate**.
    1. Type `When is the next election?` as an **utterance** and assign it an **intent** of `nextElection`. Click **Train and Validate**.
1. This is the minimum setup required to get started, but you can continue to add utterances for each of the intents to help improve the accuracy of the bot. (Ex: `Where is my polling place?` or `When can I next vote?`)

## Setup Facebook App
1. Create a new app on [Facebook Developers](https://developers.facebook.com/apps/) for your Messenger bot.
    1. Choose **Manage Business Integrations**.
    1. Give your app a display name and enter your email address.
    1. Click **Create App ID** and answer the CAPTCHA when it appears.
1. Find **Messenger** from the grid of products and click **Set Up**.
1. Scroll to the **Access Tokens** section and either connect an existing page on Facebook or create a new page. *NOTE: A Messenger bot must be assigned to a Facebook Page in order to work.*
  ![Screenshot of assigning a page to an app](https://speakerbug.github.io/voterbot/images-for-readme/assign_page_to_app.png)

## Setup AWS
1. Click **Users** from the [Identity and Access Management (IAM)](https://console.aws.amazon.com/iam/) Dashboard.
1. Click **Add user**.
  ![Screenshot of add user button](https://speakerbug.github.io/voterbot/images-for-readme/iam-dashboard.png)
1. Create a new *Programmatic access* user with the username `claudia`. *This IAM user will be used by Claudia.js to create the necessary resources for your bot on AWS automatically.*
  ![Screenshot of claudia user](https://speakerbug.github.io/voterbot/images-for-readme/create-user.png)
1. Attach the following **existing policies directly** to the user `claudia`.
    * `AWSLambdaFullAccess`
    * `AmazonAPIGatewayAdministrator`
    * `IAMFullAccess`
1. You can leave the remaining settings set to whatever the defaults are. Once your user is created, make sure to take note of the Access Key ID and Access Key Secret (you can't view the secret again after you leave the confirmation page).
1. Add this newly created IAM user to your `~/.aws/credentials` file. This is the file the AWS CLI uses for authentication to AWS.
    1. You can create a new profile for `claudia` as to not interfere with any other credentials you have setup already.
    1. Copy the following code snippet and add it to `~/.aws/credentials` replacing _YOUR_ID_ and _YOUR_SECRET_ with your Access Key ID and Access Key Secret from the confirmation screen.
    ```
    [claudia]
    aws_access_key_id = _YOUR_ID_
    aws_secret_access_key = _YOUR_SECRET_
    ```
1. Run the command `export AWS_PROFILE=claudia` to set the `claudia` as the default profile for the AWS CLI to use.

## Setup codebase
1. Make a new directory to place your code in. For the purposes of this tutorial we'll use 'voterbot'.
1. Make a new file called `bot.js` and paste the code found in [bot.js](https://github.com/speakerbug/voterbot/blob/main/bot.js) in this repo.
1. In the directory run the following commands to install dependencies:
    1. `npm init` _You can use all default values_
    1. `npm install claudia-bot-builder`
1. Now use Claudia.js to push the code to Lambda and create endpoints automatically in the API Gateway.
    1. `claudia create --region us-east-1 --api-module bot --configure-fb-bot` _This can take a while to run so be patient_
1. You will now need to link the bot with your Facebook app.

## Configure Facebook app
1. From the `claudia create` command you should get an output similar to the one below:
  ![claudia create output](https://speakerbug.github.io/voterbot/images-for-readme/claudia-create-output.png)
1. Back in the Facebook Developer app dashboard under **Webhooks**, click **Add Callback URL**.
  ![Add webhook](https://speakerbug.github.io/voterbot/images-for-readme/add-webhook.png)
1. Use the values from terminal and enter them in as the callback URL like below and click **Verify and Save**.
  ![Add callback url](https://speakerbug.github.io/voterbot/images-for-readme/add-url.png)
1. Click **Edit** on the page the callback URL you just added and subscribe it to the following actions:
    1. `messages`
    1. `messaging_postbacks`
    1. `message_deliveries`
    1. `message_reads`
    ![Subscriptions for callback url](https://speakerbug.github.io/voterbot/images-for-readme/subscriptions.png)
1. Next, generate a token for your page to be accessed by the app. Under **Access Tokens** click **Generate Token** for your page.
  ![Generate token](https://speakerbug.github.io/voterbot/images-for-readme/generate-token.png)
1. Copy the token that was generated and paste it back in the terminal and hit enter. You should then be prompted for your **Facebook App Secret**. You can get this by clicking _Settings_ > _Basic_.
  ![Settings menu](https://speakerbug.github.io/voterbot/images-for-readme/settings.png)

## Link Wit.ai to Facebook app
1. Under **Built-In NLP**, choose the page your bot is linked to and click the switch to turn it on.
  ![NLP settings](https://speakerbug.github.io/voterbot/images-for-readme/nlp-settings.png)
1. Choose **Custom Model** from **Default Language Model**.
1. Click **Link to existing Wit app**.
1. Enter the **Wit app Server Access Token** which can be found on Wit.ai under the **Settings** page for your app under the **Management** section.

# Test it out
You should now be able to message your page and your bot will respond!

# Additional resources
[Facebook NPL Information](https://developers.facebook.com/docs/messenger-platform/built-in-nlp/)
