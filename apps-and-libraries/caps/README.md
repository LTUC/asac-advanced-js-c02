# Code Academy Parcel Service (CAPS)

A real-time service that allows for vendors, such as flower shops or restaurants, to alert a system of a package needing to be delivered, for drivers to instantly see what's in their pickup queue, and then to alert the vendors as to the state of the deliveries (in transit, and then delivered).

## Business Requirements

As a business, our primary goal is to increase the visibility on the state of packages in the delivery process.

We have 2 major clients for this service: Vendors and Drivers. Each need to have full and live visibility into the state of a package as it's being delivered to a customer.

### From the Vendor (store owner) perspective

- As products are sold that need to be delivered, we need to alert the drivers that a package is ready for pickup/delivery.
- As a driver picks up a package, the store owner should know that the package is now "in transit".
- Once the driver delivers a package, the store owner should know that the package has been delivered.

Ideally, these notifications should be visible in real time on any device (screen, app, browser, etc).

### From the Driver's perspective

- As stores sell product and need a package delivered, Drivers need an instant notification to pick the package up.
- Drivers need a way to scan a package and alert the vendors that the package is in transit.
- Drivers need a way to scan a package and alert the vendors that the package has been delivered.

### From the perspective of our company

Essential to this system working is that we have to operate in real time. As things happen with the packages, everyone needs to know at that moment, with a guarantee that every state change is visible even if they are not online.

- We don't want our clients having to refresh their browser to get the latest status updates.
- We also are aware that they will not always have their browser open ...
  - So, if they leave & come back, it's imperative that they can the state of things since they last logged in.

## Technical Requirements

The application will be created with the following overall architecture and methodologies.

1. Node.js
1. Socket.io for realtime event management
1. ES6 Classes and best practices
1. ExpressJS Web Server
   - For simulating pickup requests
   - For simulating delivery scans
1. In-Memory messaging queue
1. Test Driven Development, using Jest
   - Tests will be runnable locally
   - Tests will auto-execute (CI) in your repo using GitHub actions
   - Tests will use a 3rd party library called `supergoose` to:
     - "mock" the mongo running database
     - "mock" the running Express server
1. Deployment to Heroku

### Data Models

There will be no data persistence. However, because one of our requirements is to ensure that clients that are subscribed to events can "catch up" on missed notifications, we will need to maintain and manage the messages and delivery statuses themselves.  This is going to require a structure of some kind to assist.

A suggestion is to have a map, keyed by the customer id, and then within that, a set of messages, keyed by the event. For Example:

```javascript
messageQueue: {
  'Flower Shop': {
    'in-transit': {
      1: {orderId:4},
      2: {orderId:6},
      ...
    },
    'delivered': { ... }
  },
  'Widgets R Us': { ... }
}
```

### Realtime Queues

In order to both deliver messages in real time and support the ability to "catch up" on any messages that may have been delivered when the client was not online, we need a means of tracking how messages are delivered.

A Proposed Workflow (for any event):

1. Event + Payload is emitted to the Hub.
1. The hub creates a message ID and puts that message into the queue.
1. The hub broadcasts the messages to the correct targets.
1. When a client hears/handles the message, it emits a "received" event back to the hub, with the message ID.
1. The hub responds to the 'received' event by deleting that message from the queue.

That all works great if the clients are always connected. But if they disconnect and miss-out on steps 4/5, we need a way to "catch up".

In this case, a client should be able to request every message in their queue -- all messages that they must not have received because they didn't get them the first time. The hub would then loop the messages in the queue and re-send them, waiting for the 'received' event to come back so that they can then be deleted.

### Application Structure (proposed)

HUB Server

> `hub.js` manages the event queue and live handling of all inbound events. Clients (stores and drivers) never talk to each other directly, they work through the hub, like a switchboard

```text
├── .gitignore
├── .eslintrc.json
├── hub.js
└── package.json
```

Vendor and Driver Apps

> For these, the `client.js` will be the app that runs constantly, monitoring and handling events. They'll use the `queue.js` to subscribe to the hub server using a common library

Client applications will "subscribe" to the hub server's queue for a given event. Subscribing means that the client intends for the hub server to save all messages until the client confirms receipt. Subscribing through the queue library should look like this:

```javascript
  queue.connect();
  queue.subscribe('delivered', (payload) => {
    // do something with the returned data (payload)
  })
```

```text
├── .gitignore
├── .eslintrc.json
├── lib
│   ├── queue.js
├── client.js
└── package.json
```

## Development Process, Milestones

1. **Phase 1: Event Driven Applications**
   - Using built-in Node.js events to simulate realtime package delivery changes.
1. **Phase 2: Socket.io**
   - Replace Node Event Pool with `socket.io`.
   - Cleaner event handling.
   - Allows web connectivity.
1. **Phase 3: Queues**
   - Adding in the delivery queue logic.
   - Storage of all inbound events.
   - Receipt confirmation.
   - Fetching of all payloads for a given Vendor.
