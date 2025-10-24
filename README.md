# UniCircle

This is UniCircle, the project of **41026 Advanced Software Development**.

## Project Structure

### Frontend
- **Framework:** React  
- **Main Folders:**
  - `components/` – Reusable UI components
  - `pages/` – Page-level components (e.g., Login, Profile, Clubs)
  - `contexts/` – Global state management with React Context
  - `router/` – Handles page routing and navigation
  - `utils/` – Helper functions

### Backend
- **Framework:** Spring Boot  
- **Main Layers:**
  - `Configuration/` – Bean configuration and application settings
  - `Controller/` – REST API controllers handling HTTP requests
  - `Service/` – Business logic layer
  - `Repository/` – Data persistence layer using Spring Data JPA
  - `Utils/` – Utility classes and helpers
  - **Database:** SQLite

## Feature Allocation

| **ID**  | **Feature**           | **Description**                                                                 | **Owner** |
|---------|------------------------|---------------------------------------------------------------------------------|-----------------|
| F101    | Login & Register       | Students can register and login to UniCircle with their student email.          | Zizhu Zhao      |
| F102    | Search                 | Search feature to find posts on the discussion board.                           | Bilal           |
| F103    | Discussion Boards      | People can post and leave comments.                                             | Bilal           |
| F104    | Club Management        | Students can see interested clubs on their profile page, and join or leave the club. | Susana       |
| F105    | Review/Rate            | Review and rate subjects and lecturers.                                         | Zizhu Zhao      |
| F106    | Student Profile        | Displays student interests, subjects, clubs, and academic records.              | Yunseo Park     |
| F107    | Timetable              | Students can view their subjects and club events for the current semester, as well as add, edit and remove items from the timetable. | Gurpreet Kaur |
| F108    | Friends                | Students can add and remove people from their friends list. They can then see various information about their friends such as what clubs they are in and common subjects they are taking. | Gurpreet Kaur |
| F109    | Shortcuts              | Display all links on one page so students don’t have to manually search one by one. Such as a student admin page, Academic Calendar, library booking page, activateUTS … etc. | Yunseo Park |
| F110    | Appointment            | Make an appointment with the university clinic.                                 | Susana          |

This project is successfully deployed in Azure, below is the accessable url: https://unicircle-ambkgabdh3g4a0fr.australiaeast-01.azurewebsites.net/
Since we are using free 30 day tier, this website could not be accessed after **11th November**

Note: If accessing the Timetable and Friends features through deployment, it is best to use existing accounts since they are already enrolled in subjects and clubs. Some accounts include: liam.smith2@uni.edu, olivia.brown3@uni.edu, mia.wilson5@uni.edu, giulia.rossi40@uni.edu (password is '123456789' for all of them). 
