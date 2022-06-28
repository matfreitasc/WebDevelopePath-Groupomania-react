# groupomania-react

Welcome to my final project of the Web Developer Path.

In this project you will find all the following features listed below

- [x] Login and Sign-up page with validation and error messages.
  > Sign-up page includes a simple profile creation.
- [x] Main page, users have the ability of creating a new post, like posts, easily view how many viewes the post has and also view how many comments the post has
- [x] In the post page user can comment the post and like the post
- [x] Post Owners can edit and delete their post
- [x] The blog contains a profile page where displays all the user posts
- [x] There is a settings page where user can edit their profile information, update their password and delete their account.
- [x] Implementation of a bio in the user profile.
- [x] Cascade delete on user delete

---

Future features

- [ ] Ability to edit the user banner in the user profile

---

Backend uses a .env file to store sensetive data.

Please create a .env with this following code

Access token and refresh token need to be generated. You can use the terminal to generate using node

type: node (enter)

> require('crypto').randomBytes(64).toString('hex')

Please generate one for Access Token and One for Refresh Token

```
ACCESS_TOKEN=
REFRESH_TOKEN=
PORT=3001
DB_IP=(Your Mysql Database IP)
```
