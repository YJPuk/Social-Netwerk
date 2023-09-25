# Social Netwerk API

<hr>

## Description

As coding student I'm trying to create a simple Social Network API that uses the NoSQL database to match the Acceptance Criteria listed in the task below. 

This was built using Javascript, Express.js, MongoDB, Mongoose, Dayjs and love.

## Deployed on
Walkthrough Video: https://drive.google.com/file/d/1s4M3devKcT36hpAASss-GfXiwfXx9NwQ/view?usp=sharing

Repository: https://github.com/YJPuk/Social-Netwerk

<hr>

## Screenshots
![Users](https://github.com/YJPuk/Social-Netwerk/assets/133621780/36416ad4-d21d-4a11-b3bb-2f088dcac626)
![Thoughts](https://github.com/YJPuk/Social-Netwerk/assets/133621780/968b2a75-177f-48e2-9485-76fd94d8c8f0)
![Friends](https://github.com/YJPuk/Social-Netwerk/assets/133621780/2590bdcb-e409-4f41-b294-0dee0c85810d)
![Reactions](https://github.com/YJPuk/Social-Netwerk/assets/133621780/4075dd11-ea03-4ce8-807f-6830c1f0b1da)
![User Deleted](https://github.com/YJPuk/Social-Netwerk/assets/133621780/2ef156e7-316a-48a2-a5b3-81d92876ba1a)


## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Routes
Get All Users / Create a User
`http://localhost:3001/api/users`
Get Individual User by ID / Update User by ID / Delete User by ID
`http://localhost:3001/api/users/:userid`
Add Friend by User / Delete Friend by User 
`http://localhost:3001/api/users/:userid/friends/:friendid`

Get All Thoughts / Create New Thought
`http://localhost:3001/api/thoughts`
Get Individual Thought by ID / Update Thought by ID / Delete Thought by ID
`http://localhost:3001/api/thoughts/:thoughtid`
Create Reaction by Thought 
`http://localhost:3001/api/thoughts/:thoughtid/reactions`
Delete Reaction by Thought 
`http://localhost:3001/api/thoughts/:thoughtid/reactions/:reactionid`

---
© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
