# Neon Grove: API Support Lab

Neon Grove is a hands-on API support and troubleshooting project I built while developing practical REST API and Postman skills.

Instead of stopping at lessons or quizzes, I used the project to practice building requests, inspecting responses, reproducing failures, testing hypotheses, documenting evidence, and working through support-style scenarios.

> Independent educational portfolio project. Not affiliated with or endorsed by Postman.

## Recruiter View

The project includes a dedicated **Recruiter View** that removes the gamification and presents the technical work directly:

- completed hands-on exercises
- submitted investigation answers
- Postman screenshots
- troubleshooting evidence
- automated test results
- support-case reasoning
- capstone investigation
- technical project assets

Open:

`technical.html`

## What this project demonstrates

Through the completed lab, I practiced:

- API client/server and request/response concepts
- REST-style HTTP methods
- endpoints and URLs
- query parameters
- custom request headers
- JSON request bodies
- HTTP response inspection
- 2xx and 4xx status-code troubleshooting
- authentication vs. authorization concepts
- Bearer-token configuration
- Postman variables and environments
- reusable collections and folders
- automated Postman response tests
- deliberately failing a test to verify the assertion works
- reproducing a known failure
- comparing working and failing requests
- isolating a changed request element
- documenting root cause, correction, and verification
- support-ticket reasoning
- technical investigation summaries

This project does **not** represent production API engineering experience. It demonstrates that I have already worked hands-on with the core tools and concepts and can build on them in a Technical Support, Product Support, Application Support, or Support Engineering environment.

## Capstone investigation

The final capstone combines the skills practiced throughout the lab.

I:

1. started with a known-good POST request
2. sent a JSON payload using an environment variable
3. verified a successful `200 OK` response
4. added an automated Postman status test
5. introduced one controlled endpoint failure
6. observed the resulting `404 Not Found`
7. confirmed the automated test detected the unexpected response
8. compared the working and failing requests
9. identified the relevant change
10. corrected the request
11. verified the response returned to `200 OK`
12. confirmed the automated test passed again
13. documented the symptom, evidence, root cause, fix, and verification

The goal was not to invent an unfamiliar API architecture from scratch. It was to demonstrate a repeatable troubleshooting process using evidence.

## Support-style practice

The lab also includes support scenarios that require more than recognizing status codes.

Examples include:

- identifying a missing query filter from a customer's request
- comparing expected vs. actual request data
- reasoning about a `401` in the context of environment-specific authentication values
- documenting findings in concise support notes
- distinguishing transport success from correct application behavior

## Recruiter evidence

Completed work can be reviewed through the Recruiter View.

Published evidence is stored in:

~~~text
evidence/recruiter-evidence.json
~~~

The evidence includes submitted answers and sanitized screenshots from the hands-on exercises.

No real customer information, production credentials, passwords, or API secrets are used.

## Neon Grove learning system

The main interface turns the curriculum into a small progression system.

Features include:

- 13 API support modules
- guided Postman exercises
- module quizzes
- hands-on evidence submission
- screenshot evidence
- XP progression
- unlockable trees and wildlife
- a growing forest ecosystem
- separate recruiter-facing technical presentation

The gamification exists to make repeated technical practice more engaging. It is not required to understand the portfolio evidence.

## Learning flow

The project follows a consistent progression:

**Learn -> see an example -> perform the task -> inspect the result -> troubleshoot -> explain the evidence**

Later modules reduce the amount of guidance so that the technical reasoning comes from the learner rather than the tutorial.

## Technology

Neon Grove is intentionally lightweight:

- HTML
- CSS
- vanilla JavaScript
- browser `localStorage`
- Postman
- Postman Echo API
- static JSON evidence
- Git / GitHub

There is no framework or build system required.

## Run locally

Clone the repository and serve the project from its root directory.

~~~powershell
cd C:\Projects\api-support-lab
python -m http.server 8010
~~~

Then open:

~~~text
http://localhost:8010
~~~

Recruiter View:

~~~text
http://localhost:8010/technical.html
~~~

## Repository structure

~~~text
api-support-lab/
|-- index.html
|-- technical.html
|-- styles.css
|-- app.js
|-- forest.js
|-- speech.js
|
|-- data/
|   |-- lessons.js
|   |-- postman-tutorials.js
|   `-- module-quizzes.js
|
|-- evidence/
|   `-- recruiter-evidence.json
|
|-- postman/
|   |-- API-Support-Lab.postman_collection.json
|   `-- API-Support-Lab.postman_environment.json
|
|-- README.md
|-- LICENSE
`-- .gitignore
~~~

## Security

This project uses only safe practice data.

Public repository rules:

- no production API keys
- no passwords
- no access or refresh tokens
- no session cookies
- no customer data
- no private credentials

Postman environment exports contain safe practice values or placeholders only.

## Learning references

The explanations and exercises in this project are original. The curriculum was informed by official Postman documentation, including:

- Postman Docs - Parameters and request data
  https://learning.postman.com/docs/use/send-requests/create-requests/parameters/

- Postman Docs - Variables
  https://learning.postman.com/latest-v-12/docs/use/send-requests/variables/variables

- Postman Docs - Environments
  https://learning.postman.com/latest-v-12/docs/use/send-requests/variables/environment-variables

- Postman Docs - Authorization
  https://learning.postman.com/docs/sending-requests/authorization/authorization/

- Postman Docs - Test scripts
  https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/

## Project status

**Core curriculum: complete**

**Hands-on Postman lab: complete**

**Support simulations: complete**

**Capstone investigation: complete**

**Recruiter evidence: complete**

The remaining work is deployment and final public-repository presentation.

## License

MIT