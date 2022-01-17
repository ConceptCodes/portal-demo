# Portal-Demo
This is a demo candidate selection portal. You can view applicants, leave reviews and generate reports. The frontend was built with Vue.js + Vuetify and the rest api is built with express. For the database i used Postgresql to mimic your internal DD :). Hope you  enjoy

> [Preview Link](https://portal-332919.ue.r.appspot.com)

![](./demo.png)

## Overview of API
| Request | Endpoint                     | Description
|---------|------------------------------|--------------------------------
| *POST*    |  `/api/proctor/login`	     |  login the Proctor
| *POST*    |  `/api/proctor/register`	     |  register a new Proctor
| *GET*     |  `/api/proctor`               |  get all Proctors
| *GET*     |  `/api/proctor/:id`           |  get a Proctor by id
| *GET*     |  `/api/applicant`             |  get all Applicants
| *GET*     |  `/api/applicant/:id`         |  get an Applicant by id
| *PUT*     |  `/api/applicant/:id`         |  update Applicants reviewed status
| *PUT*     |  `/api/applicant/:id/review`  |  add review to Applicant by id
| *GET*     |  `/api/applicant/:id/comment` |  get reviews for Applicant by id
| *DELETE*  |  `/api/applicant/:id`         |  remove Applicant by id


## Project setup
```
git clone https://github.com/ConceptCodes/portal-demo.git
cd portal-demo
yarn install
```

## Run 
```
yarn dev
```
