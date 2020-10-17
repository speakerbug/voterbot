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
* Claudia.js installed (`npm install claudia -g`)

# Setup Facebook App
1. Create a new app on [Facebook Developers](https://developers.facebook.com/apps/) for your Messenger bot.
  1. Choose `Manage Business Integrations`.
  1. Give your app a display name and enter your email address.
  1. Click `Create App ID` and answer the CAPTCHA when it appears.
1. Find "Messenger" from the grid of products and click `Set Up`.
1. Scroll to the `Access Tokens` section and either connect an existing page on Facebook or create a new page. _NOTE: A Messenger bot must be assigned to a Facebook Page in order to work._
  ADD IMAGE HERE
