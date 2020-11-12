# TakeOff Labs Backend Technical Test

## Prerequisites

- [Install Docker](https://docs.docker.com/get-started/)
- Clone this repository

```
git clone https://github.com/xpcapital/backend-takehome.git
```

## Introduction

As you probably heard during you first interview, takeoff labs produces social consumer apps.
Among other things, it means that we have a lot of users spreaded accross the world.

We often want to send our users notifications, emails etc.<br/>
Most of the time in real time, a new message notification for example, and sometimes with some delay, like when we want the user to receive a notification at a particular time of the day.

Also most of our users are overseas. It means that they live in various timezones, and we often have to take it into account when scheduling tasks.

## Instructions

In this test you will be asked to implement a solution for the latter, simplified as a task scheduling problem.

Your task will be to code a very simple REST API with a unique endpoint that listens on `localhost:3001`.

This endpoint should be `POST /user` (body described below).

```Typescript
{
	"uid": string,
	"timeZone": string
}
```

For each request it receives on this endpoint, the API should send a few requests to our app listening on `localhost:8080` on the `POST /` endpoint:

- One in 2 minutes after receiving the request.
- Two the same day. Each at a random time between 7:00 PM and 9:00 PM in the received `timeZone` (They are skipped if we are currently past the timeframe)
- Two the next day. Each at a random time between 8:00 AM and 12:00 PM in the received `timeZone`

You don't have to check if timeZone is valid as we only send valid ones.

Each request to our app should contain the data your API received + the random time you computed (body described below).

```Typescript
{
	"uid": string,
	"timeZone": string,
	"sendDate": string
}
```

## Rules

- You are free to use whatever you need as long as you respect our instructions and other rules. It means languages, libraries, services etc. The most important thing is to build an efficient and reliable solution.
- Your code must be resilient to downtimes. We will start the project then stop and restart your API to see if the tasks are still handled.
- We should only have to run `docker compose build` and `docker compose up` to see the whole code running successfully. You will find an incomplete `docker-compose.yml` at project's root.
- We will test your solution with various number of requests, so keep in mind that it should handle a heavy load with the least possible performance issues.
- You have 3 hours to complete and send us the test.

## Setup

You'll find our code under the `takeoff` directory.
It contains :

- The script sending requests to your API. As you can see, it will keep sending you requests until it receives a valid answer from your server.
- The app that will receive your request. It basically just log what you sent.

If you want to run the app or the script outside of a docker container you would typically use the following commands :

```bash
yarn install
yarn build
yarn start:app  # Starts the app
yarn send:tasks # Run the script
```

At the root of the project you will also find a `docker-compose.yml` file.
<br/>
As of now, it only starts our app and script, it is yours to complete it so it also launches your API.<br/>
Feel free to update it as long as you respect the rules.<br/>
You can even modify our Docker architecture if you think it would make it better, but please notify us and keep in mind the time limit.
