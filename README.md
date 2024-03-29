
# Bookworm - Book App

Bookworm is a full-stack web application that helps users manage their books. It was inspired by my passion for reading and my desire to help others build good reading habits. With Bookworm, you can browse a vast collection of books through Google's Book API, save them to your reading list, and track your progress. To encourage reading habits, I developed a daily reading streak and a monthly book count stat, aiming to gamify the reading experience. Most of the components in the app were custom-built to add a touch of cohesiveness and ensure a seamless experience throughout the app.

## Features
- New user registration
- Search for books
- Save books to personal reading list
- Add and edit notes for each book
- Track progress for each book
- View reading streak and monthly book count
- Responsive design
- Login and logout

## Tech stack
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.10.

- ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


## Installation
To run this app locally, you'll need to have Node.js installed on your machine. You will also need to obtain a Google Books API key. More information on how can be found on [Google Books API Guide](https://developers.google.com/books/docs/v1/getting_started). 

Clone or fork this repo:
```bash
  git clone https://github.com/itannady/bookworm-app.git
```

Install dependencies
```bash
  npm install
```

Create a `.env` file in the root directory of the project. Add the following variables, replacing the value with your own:

```bash
API_KEY=<YOUR GOOGLE BOOK API KEY>
MONGODB_URL=<YOUR MONGODB CONNECTION STRING>
API_URL=<YOUR LOCAL DEVELOPMENT SERVER>
JWT_SECRET=<YOUR SECRET KEY>
```

Update the `API_URL` variable in the `environment.ts` file located in `src/enviornments/` directory to match the URL of your development server. 

To run the backend server:
```bash
  npm run dev
```
To run the front-end server:
```bash
  ng serve
```
Navigate to `http://localhost:4200/`.
    
    
    
## Using Bookworm

**1. Register as a new user or login to your account**

![sign-in_AdobeExpress](https://github.com/itannady/bookworm-app/assets/93556334/5517bffd-69ab-449d-968b-6287552eae0e)

**2. Browse and add books to your reading list**

![browse-books_AdobeExpress](https://github.com/itannady/bookworm-app/assets/93556334/01dc82ab-2978-4b1b-b021-b0c0d927d150)


**3. View and manage all your books in one place**

![view-books_12_51_33_PM_AdobeExpress (1)](https://github.com/itannady/bookworm-app/assets/93556334/3a35868a-1cdb-4ab4-a442-a61b75aca8fa)


**4. Track your reading progress and take notes for each book**

![track-books_AdobeExpress](https://github.com/itannady/bookworm-app/assets/93556334/054e3a01-c62a-41a7-bd54-46f3c467b416)



## Author

Isabella Tannady

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)]()
