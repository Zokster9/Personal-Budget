# Personal-Budget
This is a portfolio project for the Backend engineer Codecademy lifepath.

# What's it about
Project represents an API that will allow the user to create and manage their personal budget, through [Envelope budgeting](https://www.thebalancemoney.com/what-is-envelope-budgeting-1293682).

# Requirements
- Node
- ExpressJS
- cors
- morgan

# How To Use
API runs on your localhost at port number 4001. There will be predefined envelopes which you can retrieve, change, add and delete. You can test API calls in Postman for now. Frontend interface will be added later.

## API Endpoints
- ### **GET** ***api/envelopes/***
Retrieves all existent budget envelopes.
- ### **GET** ***api/envelopes/:envelopeId/***
Retrieves a budget envelope by ID.
- ### **POST** ***api/envelopes/***
Adds a budget envelope. 
Request accepts this body structure: {"name": *name*, "budget": *budget* } (e.g. {"name": "Car", "budget": 200})
- ### **POST** ***api/envelopes/:sourceEnvelopeId/:targetEnvelopeId/***
Transfers a certain amount of money from the source envelope to the target envelope. 
The amount of money is stated in the request body like this: {"amount": *amount*} (e.g. {"amount": 40})
- ### **PUT** ***api/envelopes/:envelopeId/***
Updates envelopes name and/or spends money from the envelope budget. 
Request accepts this body structure: {"name": *name*, "spendingAmount": *spendingAmount* } (e.g. {"name": "Car", "spendingAmount": 40})
- ### **PUT** ***api/envelopes/***
Adds money to all budget envelopes.
Request accepts this body structure: {"money": *money* } (e.g. {"money": 200})
- ### **DELETE** ***api/envelopes/:envelopeId/***
Deletes a budget envelope with the correct ID.
