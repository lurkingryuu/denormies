# DBMS Mini Project

## Team Denormies

| Name                     | Roll No.  |
|--------------------------|-----------|
| Yelisetty Karthikeya S M | 21CS30060 |
| Vonteri Varshith Reddy   | 21CS10081 |
| Manaswi Raj              | 21CS10088 |
| Thota Kesava Chandra     | 21CS30056 |
| Parthiv Reddy            | 21CS10006 |

---

## Project details

### Statement

Design a web application for a web-based system for managing a university cultural festival. You may use the schema designed in Assignment 2. You may use additional relations and attributes. 

### Intended users 

1. External participant registrants 
2. Student registrants 
3. Volunteers 
4. Organizers of events 
5. Database Administrators: add/delete users 

### Functional Requirements

The system is required to support the following workflow:
1. External participants should be able to create an account and browse/search the events and schedules. They should also be able to register for particular events and know about the winners of the events in real-time. Access to logistics like accommodation and food should be provided through the same web application.
2. Students should be able to browse/search the event schedules and register for the events. They should also be able to register as volunteers.
3. Organizers should be able to create an account and browse the event details. They should also be able to view/search the volunteer and logistics details.
4. Database administration – should be able to add/delete new users (bonus point: implement data security policy with suitable access control)

### Technology Requirements:

1. Browser-based web interface with front-end form interfaces
2. Connectivity to the back-end database
3. Triggers and procedures to support the workflow
4. Postgresql or MySQL may be used as a backend database
5. Java/PHP/python or any other language may be used as frontend Deliverable:
6. A demonstration of the system in the lab
7. A report outlining the design including (a) schemas, (b) triggers, (c) queries, (d) forms. The assignment will be evaluated based on the number of functionalities implemented

---

## Plan Of Action (POA)

- [ ] Remake The ER Diagram for this Particular Use Case
    - [ ] Go through all of our assignment 2.
    - [ ] Must include:
        - [ ] External Participants
        - [ ] Student
        - [ ] Volunteers (Students can be volunteer)
        - [ ] Organizer (Who are they? student?)
        - [ ] Events
        - [ ] Event winners
        - [ ] Registration for events
        - [ ] Student as Participant or Volunteer
- [ ] Decide Tech Stack
    - [x] PostgreSQL
    - [ ] ?
    - [ ] ?
- [ ] Explore Triggers in Postgresql (in Parallel)
- [ ] Create Relational Schema
    - [ ] Properly deciding the Constraints
    - [ ] Note down each and every command in an SQL File, Need a final file to create the Database in One go
- [ ] Coding Phase
    - [ ] Frontend
        - [ ] Basic Frontend with full functionality
        - [ ] Design phase
    - [ ] Backend
        - [ ] Follow MVC Architecture
        - [ ] According to Requirements of Frontend, Create REST API
    - [ ] Database Triggers
- [ ] Report
    - [ ] Note each and every resource you are refering to when learning something
    - [ ] All the design decisions must be written down to include in report
- [ ] Hosting
    - [ ] This is a must, not that it will take much time, but we need to have a working model ready 1 day before
