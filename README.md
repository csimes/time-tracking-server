# Digital Office 

Digital Office is currently in version 1.0.

Digital Office was created to help users manage their time spent working. Whether freelance or a regular W2 employee, a user is able to login, create a profile,
and do some simple time tracking, with the ability to view their entire history of timesheets and edit them as needed.

It was created using the PERN stack (PostgreSQL, Express, React, Node.js). An admin user is able see the timesheets for all users.

Future versions are planned to include featurs such as project and account tracking, time off requests, and a simple messaging system. Non-registered
users may be able to access some limited, but useful features, such as a pomodoro timer, and gross paycheck calculator. Features available to non-registered users
would be available to registered users as well.

The server side of this project used the following dependencies:

| Package       | Version  |
| ------------- | ---------|
| bcryptjs      | 2.4.3    |
| cors          | 2.8.5    |
| dotenv        | 10.0.0   |
| express       | 4.17.1   |
| jsonwebtoken  | 8.5.1    |
| pg            | 8.7.1    |
| pg-hstore     | 2.3.4    |
| sequelize     | 6.6.5    |

The client side of the project can be found here: https://github.com/csimes/time-tracking-client

The deployed version of the project can be found here: https://cs-timetrackerclient.herokuapp.com/
