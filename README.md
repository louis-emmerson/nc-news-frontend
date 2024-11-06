# NC News Frontend

[Deployed Version](https://nc-news.louis-emmerson.dev/)

Please note that the first API call my take a couple of minutes to load due to the render server spinning down :)

## General Information

NC News is a frontend project built with React to display and interact with news articles. It features various functionalities that allow users to browse, view, upvote, and downvote articles, as well as add and delete comments.

## Project Features

- View a list of articles.
- Filter articles by topic.
- Sort & order articles.
- View a specific article with full details.
- Upvote and downvote articles.
- Add new comments and delete your own comments.

## Getting Started

### Prerequisites

- Node.js (minimum version: **22.7.0**)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
2. **Navigate to the project directory:**
    ```bash
    cd nc-news-frontend
3. **Navigate to the project directory:**
    ```bash
    npm install
4. **Navigate to the project directory:**
     ```bash
    cd nc-news-frontend

5. **Run the app locally using:**
     ```bash
    npm run dev

## Usage

- Visit the homepage (`/`) to see the homepage with a selection or articles and topics.
- Navigate to `/articles` to explore a broader selection of articles.
- Go to `/topics` to view all available topics.
- Access individual article details via `/article/:articleID` (replace `:articleID` with the ID of the article you want to view).
- In case of invalid URLs, the app will redirect to a 404 Not Found page.

The app supports:
- **Upvoting and downvoting articles**: Use the buttons on each article to increase or decrease its score.
- **Adding new comments**: Submit comments on articles you’re reading.
- **Deleting your own comments**: Remove comments you’ve posted if needed.

## Backend Repo

Find the backend repository here: [NC News Backend Repo](https://github.com/louis-emmerson/nc-news-be)

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
