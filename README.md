# Massdrop URL Job Queue API

## General

Users are able to send a URL to the server and retrieve the HTML for it.

1.  Users send the server a URL, they receive a job ID
2.  Using that ID, they can check on the status and/or retrieve the HTML
3.  A service worker goes through the URLs and retrieves their HTML at a set interval (initialized to 2000ms)

## Routes:

* **POST /jobs** - Post a URL, returns the jobID.
  * Request body should be { url: "url_string_here" }.
  * Format should be `http://www.______.com` or `www._____.com`.
* **GET /jobs:id** - Returns an object containing id, url, status, and html.

## Use

1.  Clone the repo locally
2.  `cd` to the root directory, run `npm install`
3.  Create a .env in the root directory, configure the following variables:

* `PG_DATABASE=`postgres_database
* `PG_HOST=`postgres_host (ie. localhost)
* `PG_USER=`postgres_user

4.  Run `npm run start` from terminal at the root directory

## Future to-do

* **User Input Sanitation** - Especially related to the db
* **URL normalization** - Create a standard format for URLs to avoid duplicate posting
* **Service worker control** - More control on starting / stopping the service worker
