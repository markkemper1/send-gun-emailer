# send-gun-emailer

Switches between Sendgrid &amp; Mailgun email services, if one of the services goes down, the service can quickly failover to a different provider


### Running Locally ###

I'll assumed you have cloned and cd'd into the directory for the repository. The project is broken into two parts. The api service and the ui front end. They could be moved into seperate repositories if necessary.

The api service must be running for the UI to work... The api service runs on port 3000 by default and the UI on port 4200.

### Prerequisite ###
* Better have at least node 6.9 installed, tested with 6.10 . npm > 3

#### Running the api service

 * change into the api subfolder

```
cd sendgun-api
```

  * create an .env file (`touch .env`) containing the secrets for accessing MailGun & SendGrid
    
```
SENDGRID_API_KEY=XXXXXX
MAILGUN_DOMAIN=mydomain.com
MAILGUN_API_KEY=XXXXXXX
```

  * install the dependencies, build and start the service
    
```
npm install
npm run build && npm start
```

  * service should be running on http://localhost:3000  (should return HTTP 200 / "PONG")

#### Running the UI

  * change into the UI subfolder
    
```
cd sendgun-ui
```

  * install the dependencies, build and start the service
    
```
npm install
npm start     # N.B runs ng serve with proxy config
```

  * service should be running on http://localhost:4200  (should return the ui!)

