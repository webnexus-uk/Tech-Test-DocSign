# TestApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## How to use

This is an example app and does not connect to an API to store or receive data.
The current build uses a service to hold the information, state management maybe added to store the information.

The routers in place will auto redirect you to the login page, this page will redirect you to the admin section.

Within the admin section you can view/edit/create documents to send to customer to sign.
At the bottom of each of the single document pages (after initial creation) the will be a URL that will be sent to the client.
To access the document as a customer see it and to sign it you can click on the actions in the dashboard and select 'View'

Once the document is signed you can click on the 'DocSign' logo in the top left, this will return you to the admin section where you will be able to see the updated information in each document.
