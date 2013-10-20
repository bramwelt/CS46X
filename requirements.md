CS 461/462/463
==============
Client Requirements Document Outline

Project Name: PGP for the web
Team Name: [Everyone gets an A]? [(P)retty (G)ood (P)roject]?
Team Members: 
 * Daniel Reichert [email]
 * Trevor Bramwell [email]
 * Geoffery Corey [email]

Client:
 * Sean McGregor, Privly Foundation. [phone] [email]

Introduction to the problem
---------------------------

Any background necessary to understand why the client wants you to work
on this project.  I.e., what’s driving the need for it?  What’s been
done so far?

Privly is designed to allow anyone to share their content anywhere on
the web with strong privacy guarantees. 

Project Description
-------------------

Specifically, what problem are you trying to solve?  What functionality
will you be creating?  How will the Client and the rest of us know if
this project is a success?

We are trying to solve the problem that every time you visit a website
you're running someone elses code.  To use this in a secure, private
context is a non-starter.  

Requirements
------------

What has the client told you are the requirements for this
project?  Treat the project itself as a Black Box – what are the inputs
and what are the outputs?  Do not yet include anything about specific
implementation details, unless the client has made that one of the
requirements. (E.g., some clients might require that a project be
written in a specific language so that it interfaces with the rest of an
existing system.)

Versions
--------

One way to mitigate risk is by releasing your software in different
versions. What functionality will be grouped into what version numbers?

Design
------

Give me some sense of how your software will flow.  What will be the
major components?  A block diagram here works as well or better than
words.

The project will be a privly application that supports PGP.  The
application will be a wrapper that provides PGP for other privly
applications.  For example, the existing plain post application could be
wrapped in the PGP app and now support encryption and signing of
messages. The largest peices of functionality are symmetric and
asymmetric encryption, hashing, and interfacing with the established
public key infrastructure.

Specific tasks to be undertaken
-------------------------------

What steps will be necessary – give detail. This is often best done as
an outline, showing major tasks, sub-tasks, sub-sub-tasks, etc.

Risk Assessment 
---------------

If there were _two things_ that are most likely to go wrong and wreck your
project, what would they be?  How will you build preparations for them
into your plans? How will you be watching out for them?  How will you
know if one of them is happening? What would you do if one of them
happened?

Failing to come up with a way to manage private keys that requires no
user action.  Using a model similar to mozilla persona and the BrowserID
protocol may mitigate some issues that could crop up.

Testing
-------

How will you know if your software works?  Note: layered testing is far
better than big-bang testing.

Unit tests and integration tests will be written with the goal of full
test coverage.

Preliminary Timetable
---------------------

Include a Gantt chart which has the tasks listed
on it. Your Gantt chart must be produced from some piece of software
that includes durations and dependencies. Any task longer than 2 weeks
needs to be broken into more refined pieces. Show your version numbers
as milestones.

Roles of the different team members
-----------------------------------

How will you divide the workload?

Integration Plan
----------------

How do you bring those divisions back together?

Dataflow sequence diagram
-------------------------

If useful.

User interface requirements
---------------------------

If applicable.

References
----------

If useful.

Are there papers, books, web sites, etc. that help explain the project’s
background?  List them so that anyone reading this document can come up
to speed.

Glossary
--------

If useful.

Are there terms that are used in this Project Description that are not
generally known?

Signatures
----------

All team members and the Client/Sponsor/Mentor
