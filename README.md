# NodeJS Training Material

I conducted [NodeJS](https://nodejs.org/en/) training at my company [Cybrilla](http://cybrilla.com/).
This is my training material.

**Disclaimer:**

I am not a seasoned NodeJS developer. I learnt NodeJS while preparing for this training.
So there might be errors/inconsistencies here. Please feel free to reach out to me if you find any.

## MERN Training Demo App

Products portal where users can login, create products and filter them on price-range.

* Uses [Express framework](https://expressjs.com/) and [Mongoose](https://mongoosejs.com/).
* This is API-only app.
* Frontend which interacts with this can be found in [reactjs-training](https://github.com/tejasbubane/reactjs-training).

### Requirements:

1. Newer version of NodeJS installed. `v8+` should work.
1. MongoDB installed and running on port `27017`.


## Session Outline:

Each session of approx 2 hrs was conducted twice every week over the course of 2 weeks

### Node Express Basics - routes, controllers, params, callbacks

* ExpressJS hello world
* Parameters - routes - nesting of routes
* Connecting to mongo - get and store data
* Javascript event loop - callbacks

### Modelling and querying data with MongoDB

* Mongodb
* [Mongoose - the ODM](https://mongoosejs.com/)
* Schemas
* Validations
* Associations - one-to-many many-to-many

### Middlewares

* Express Middlewares
* Build simple logger middleware
* Exception handling middleware
* JWT auth middleware using Passport


## Resources

### Documentation

* [ExpressJS docs](http://expressjs.com/en/api.html)

* [Mongoose docs](http://mongoosejs.com/docs/guide.html)

* [MongoDB manual](https://docs.mongodb.com/manual/)

* [MongoDB aggregation operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#aggregation-expression-operators)

* [PassportJS](http://www.passportjs.org/docs/)

### Articles worth Reading

* [NodeJS eventloop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

### Video Courses

I could not find any good free ones. Here's one that lot of people recommend but I haven't looked at:

* [Learn Node](https://learnnode.com/)

### [Project Ideas](/project_ideas.md)
