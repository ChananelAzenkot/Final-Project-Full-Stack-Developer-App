# ⚡️DataInsight

# Front-End

Welcome to DataInsight, your premier solution for effortlessly organizing and maximizing employee productivity metrics. Our platform offers unparalleled granularity, empowering leaders with detailed daily and monthly insights. From team leaders to center managers, gain visibility and make informed decisions to optimize efficiency. Unlock the potential of your workforce with DataInsight – the indispensable tool for achieving organizational success.

## Getting Started

MongoDB: The data of the users and cumulative operations and sales are in the json-import-MongoDB folder, it is necessary after running the server side to import the files in order to access the Users&Passwords.txt file for the users. In addition, the users' data is in json files. They also need to import according to the Collection. It is very important to do this only for the Collection with the name matching the json file. There are 3 json files.

## MongoDB Atlas
all so we add the env file the locally or mongo atlas what you prefer you just in to put the mongo link and click on Connect 
and you well see the 4 Collection.
1. is for dailyoperations - is well remove when the day is over at 21:00
2. all so for the dailyoperationsales - is well remove when the day is over at 21:00
3. all data and days saved is well have the - incremental operations is Saved all the accumulated data, in a good way so that the days can be tracked in terms of date, day and month later.
4. all so for the incrementaloperationsales - Follow up the sales of the representatives with those sold to the services and know the sales force of the representative or the team.


- 1. BackHand-FullStack122.users.json - for users Collection.
- 2. BackHand-FullStack122.incrementaloperations.json - for incrementaloperations Collection.
- 3. BackHand-FullStack122.incrementaloperationsales.json - for incrementaloperationsales Collection.

After the files are imported, it will be possible to use the users and see the operations and the sales according to the representative and according to the team manager and according to the call center manager repeats it again: a file of the passwords is in initial-data under the name: Users&Passwords.txt.

Joying experience !

To get started with this project, clone the repository and install dependencies:

```bash
git clone [repository-url]
cd [project-directory]
npm install
```

Ensure you have a MongoDB instance running and configure your `.env` file with the appropriate environment variables.

## Usage

Start the server:

```bash
npm run start
```

Start the Vite

```bash
npm run dev
```

## Technology Stack

- **React**: The project is built using React, providing a modern and efficient user interface.
- **Joi**: Utilizing Joi for data validation, ensuring the accuracy and integrity of your user information.
- **React Router**: Employing React Router for smooth and dynamic navigation within the application.
- **Fetch**: Integrating for seamless API requests and interactions with the server.
- **Material-UI**: Enhancing the user experience with the sleek and customizable Material-UI components.

## Key Features

## Landing Page

where you can read about the product and, of course, contact us if you have any questions or follow us on social media

### Create Operation

**Imported-For-Create-Operation**
just for type of user in the system can create all so to deleted or edit a Operation that includes all the parameter description.
**
the team leader and center manger can edit or delete but not to create is not the role so Their role is only to monitor the agents and not to perform these actions if it is an extreme case that needs to be edited or deleted there will be involvement on their part
**

- **the-Operation**:
  It is very important to know that an operation can only be sent in 24 hours per user, in order to avoid wrong operations for that day, only an agent or representative creates one operation - for testing purposes, you can open an additional 2 or 3 pages - and connect to a team manager or center manager to get a full impression!

### Team Leader

A team manager monitors the activity of the representatives who create operations in this way can see how the performance of that one was that day and that month.

### Manger Center

The Manager Center provides a platform for team managers to monitor the performance of representatives. It allows managers to track daily and monthly activity, providing insights into the performance of individual team members. This feature empowers managers to make informed decisions and optimize efficiency within their teams. Additionally, managers have the ability to edit user information, allowing them to update user details as needed.

### Technician Panel:

At the beginning, he presented updating the data, and then the team manager sees the data, so he can monitor the operation itself, and the call center manager also sees all the teams.

### Admin Panel

Admin side can edit users and track teams if they have sent data or track the day that was and move delegates between teams as well

## How It Works

1. **Register and Log In**

   - Sign up for a free account using your email and a secure password.
   - Log in to access the full range of features our application has to offer.

2. **Create Your Operation**

- To create an operation, provide details such as type, description, and parameters. This will allow you to track and monitor the performance of your team members.

3. **Manage Operation**

   - After a representative has typed the operation of the operation the manager can immediately see the behavior so that he can follow others

4. **Manage Users/Operation**
   - The administrator, if necessary, can also view all Operations and manage them in the same way as they manage users—deleting, changing permissions, and modifying their details. Regarding tickets, the administrator has the ability to delete them only.

# Back-End

## Technology Stack

- **MongoDB**: For storing data.
- **Express.js**: Web server framework.
- **Mongoose**: MongoDB object modeling.
- **Bcryptjs**: Password hashing.
- **Joi**: Data validation.
- **JsonWebToken**: Secure authentication.
- **Config**: Configuration management.
- **Morgan**: Request logging.
- **Cors**: Cross-Origin Resource Sharing.
- **Chalk**: Console output styling.
- **Moment**: Date formatting
