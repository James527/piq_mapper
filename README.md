# piq_mapper
Social-emotion tracking, with colors.

pi·quan·cy (noun):

1. a pleasantly sharp and appetizing flavor.

2. the quality of being pleasantly stimulating or exciting.

PiqMapper is a social platform designed for color lovers and kindered spirits and those looking to track their sentiments. With PiqMapper users create piquants, or piqs (peeks) - little bubbles of color that represent emotion. Express yourself without words. Was it an orange week? Did you have a purple year? Log your emotions over time and see what kind of palatte you're working with.


# Technologies Used:

Node.js + Express + MongoDB + Mongoose + AJAX + jQuery


# Installation Instructions:

1. Be a wizard

2. Install everything


# User Stores:

- As an END USER I want to REGISTER so I can be a USER
- As a USER I want to LOGIN so I can ACCESS STUFF
- As a USER I want to LOGOUT so I can GO OUTSIDE
- As a USER I want to CHANGE MY PASSWORD so I can HAVE A NEW PASSWORD
- As a USER I want to POST A PIQ so I can REGULATE MY EMOTIONS
- As a USER I want to EDIT MY PIQ so I can EXPRESS ACCURATELY
- As a USER I want to DELETE MY PIQ so I can HIDE MY EMOITIONS
- As a USER I want to VIEW MY PIQ's so I can UNDERSTAND MY EMOTIONS
- As a USER I want to VIEW SOCIAL PIQ's so I can GAUGE SOCIAL MORALE
- As a USER I want to DELETE MY ACCOUNT so I can BECOME A MORMAN

# Planning & Wireframes:

- Concept design: http://i.imgur.com/7kJcAZq.jpg
- ERD: http://i.imgur.com/vELlDRB.jpg
- Routes: http://i.imgur.com/G3swY8y.jpg
- Schedule: http://i.imgur.com/CGTA0Mq.jpg


# Issues:
- Keep an eye out for this error: Can't set headers after they are sent.

# TODO:

### TODO for DEPLOYMENT: ###
- Resolve Node Modules recursive dependency-chain errors
- DEPLOYMENT!!!

### TODO for MVP: ###
- CRUD functionality for Users
	* Update: User accounts & password reset
	* Delete: User accounts

### TODO extras: ###
- Serve public JS files through routes
- Omit password where needed
- Login submission redirect to profile
- Add timestamps to 'users' & 'piqs' collections
	* Sort users piquancy over time
- CSS Animations
- Password reset
- User stats page
- Add 'friends' collection
	* Seed the db w/ friends
	* Make friends model & Schema
	* Make friend routes
	* Make friends view?
	* Set friend permissions
- Facebook API (user passport)
- GitHub API
