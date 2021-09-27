# TakeOff Labs Backend Technical Test

## Prerequisites

- [Install Docker](https://docs.docker.com/get-started/)
- Clone this repository

```
git clone https://github.com/xpcapital/backend-takehome.git
```

## Introduction

As you probably heard during your first interview, Takeoff Labs builds social consumer apps.
Among other things, it means that we have a lot of users spreaded arround the world.

We often want to send our users notifications, emails etc.<br/>
Most of the time in real time (e.g. a new message notification) but also sometimes with a delay (e.g. when we want to reengage our users with push notifications received at a given date and time). 

Moreover since most users are abroad, they might have different timezones which we may want to consider when scheduling particular tasks. 

## Instructions

In this test you will be asked to implement a solution for the second type of notification: namely those that are scheduled.

Your task will be to implemented a very simple REST API with a unique endpoint that listens on `localhost:3001`.

This endpoint should be `POST /user` (body described below).

```Typescript
{
	"uid": string,
	"timeZone": string
}
```

For each request received on this endpoint, the API should send a couple of requests (which we will call *notification*) to the client app which is listening on `localhost:8080` on the `POST /` endpoint. 

Suppose you receive a request `R` at time `T` on the `POST /user` endpoint. Here is the list of *notifications* that should be triggered:   
- One scheduled at `T + 2 min`
- Two scheduled on the same Day than `Day(T)`, sent each at random times picked between 7 and 9PM in the user's `timeZone` (those are skipped if this timeframe is already past). 
- Two at Day `Day(T) + 1`, sent each at random times picked between 8AM and 12PM.  

You don't have to check if timeZone is valid as we only send valid ones.

Each notification sent to our mobile app should contain the data your API received + the random time you computed (body described below).

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
- The app that will receive your request. It basically just logs what you sent.

If you want to run the app or the script outside of a docker container you would typically use the following commands :

```bash
yarn install
yarn build
yarn start:app  # Starts the app
yarn send:tasks # Run the script
```

At the root of the project you will also find a `docker-compose.yml` file.
<br/>
As of now, it only starts our app and script, it's your responsability to modify it such that it also launches the API you built.<br/>
Feel free to update it as long as you respect the rules.<br/>
You can even modify our Docker architecture if you think it would make it better, but please notify us and keep in mind that you have a deadline.
