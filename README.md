![enter image description here](https://i.imgur.com/06Dhh2R.png)

# Welcome to SCREENSCORE™!

> Being a movie critique is a hard job in itself, so I have made this simple website to keep track of all the movies.

## Features
The application lets users **add**, **edit**, **list** and **remove** movies from it's own database. Users can basically add an infinite number of movies which makes it hard to navigate after a while. To solve this problem, I have implemented search functionality and pagination to help the user manage the database much more easily. If the critique comes from a different country, let's say 🇭🇺 Hungary, they have the ability to translate the application via a simple click.

## Using the application
The system consists of two parts, the front end, which is written in **Angular**, and the back end, which is *due to time constraint* a **Node.JS/Express** combination.

#### To fire up the back end:
 1. Clone the GitHub repository.
 2. Head into the **/application/backend** folder.
 3. Open a terminal and run **npm install**, or simply **npm i**.
 4. Start the application with **npm run start**.
 5. In case of success, you should be greeted with a huge SCREENSCORE logo.
 6. You can test out the back end at **http://localhost:3000/api/movie** for example.

#### To start the front end

 1. Open a different terminal.
 2. Move into **/application/frontend/ScreenScore**
 3. Run **npm install**.
 4. Start the website with **ng serve -o**.
 5. After it boots up, the application should be running in your default browser.

-----

Original README:

# Salarify Movie Rater

### Summary

You have been approached by a movie critique, who were using his notepad until now, to create a browser based tool for him to add,
review and rate movies. Since you are running low on coins, and you are hungry as hell (might die in 3 days from now) you are really keen to finish
the job as soon as possible. His requirements are quite simple, he wants to add new movies, browse already added movies and change their ratings or reviews or delete entire movies.
Luckily, one of your friends created a wireframe for you to help.

### Requirements

- __Fork this repository into your own GitHub account, DO NOT try to push commits into this repository__
- __Create a Restful API (technology of your choice, since our stack is Typescript we would prefer that) with the following requirements:__
  - you find a JSON file containing the dummy data in the _data_ folder
  - DB should be in memory
  - create an endpoint to query movies, a narrowed list should be available by the partial name of the movie, this endpoint should only return the name, year, image and the average rating of the movie
  - create an endpoint to fetch details by movie
  - create an endpoint to add movies, input data should be validated backend side!
  - create and endpoint to update movies
  - delete movies
- __Create a webpage / web application (technology of your choice, since our stack is Angular we would prefer that) with the following requirements:__
  - create a 3x2 grid view for movies, movies should be paginated
  - by clicking on the add nav menu, a user should be able to add new movies in a form
  - by clicking on the card a modal should appear with the details of the movie
  - in the card a user should be able to edit / delete the given record
  - always try to follow the guidelines in the _wireframes_ folder
- __Create a readme / documentation about your solution, please give us instructions on how to start your program, it should be easy since we are only movie critiques__
- __You have 3 days to finish__
- __Commit your work frequently, so we can track your progress if you cannot finish everything, don't worry, just push every bit of code you finished__
- __It's far more important to create a precise and clean job, than to finish every sub-task in time!__
- __If you are not familiar with Typescript or Angular, don't worry just use frameworks and languages you are confident with__

### If you feel it's too easy, and you are bored

- use SQLite or other SQL database instead of in memory solution
- create Open API documentation
- if the pagination is only happening in the UI, paginate the data in the backend
- create a basic auth login solution
- create test cases where you feel necessary
- make the page available in english and hungarian as well
