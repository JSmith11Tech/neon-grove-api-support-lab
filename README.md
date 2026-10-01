# API Support Lab

An interactive, browser-based learning lab for practicing the API troubleshooting skills used in Technical Support, Product Support, Application Support, and Support Engineering roles.

**Live demo:** Add your GitHub Pages URL here after deployment.

## Why I built this

I wanted a hands-on way to learn APIs and Postman that focused on troubleshooting rather than passive course completion. The lab turns core API concepts into short lessons, practical challenges, quizzes, and support-ticket simulations.

The project is designed around a simple loop:

**Learn → see a complete example → try it → break it → diagnose it → explain the evidence**

## Skills covered

- API client/server and request/response mental models
- REST-style HTTP methods
- Endpoints, path parameters, and query parameters
- Headers
- JSON and request bodies
- HTTP responses and status codes
- Authentication vs. authorization
- API keys, Bearer tokens, Basic Auth, and OAuth concepts
- Postman variables and environments
- Collections and reusable workflows
- Post-response tests
- Evidence-based API troubleshooting
- Support-ticket investigation and escalation notes
- Capstone investigation

## Portfolio features

- Static HTML/CSS/JavaScript: easy to inspect and deploy
- Progress stored locally in the browser with `localStorage`
- XP and module completion
- Knowledge checks
- Troubleshooting scenarios
- Sanitized sample Postman collection and environment
- No real credentials or secrets

## Run locally

No build step is required.

1. Clone the repository.
2. Open `index.html` in a browser.

For a more realistic local web-server setup, you can run:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

In GitHub:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select your default branch and the root (`/`) folder.
4. Save.
5. Add the generated Pages URL to the **Live demo** line at the top of this README.

## Repository structure

```text
api-support-lab/
├─ index.html
├─ styles.css
├─ app.js
├─ data/
│  └─ lessons.js
├─ postman/
│  ├─ API-Support-Lab.postman_collection.json
│  └─ API-Support-Lab.postman_environment.json
├─ README.md
├─ LICENSE
└─ .gitignore
```

## Security rule

Never commit real API keys, passwords, access tokens, refresh tokens, session cookies, or customer data.

The included Postman environment contains placeholders only.

## Learning references

The explanations and exercises in this project are original. The curriculum is informed by official public technical documentation, including:

- Postman Docs — Send parameters and body data with API requests  
  https://learning.postman.com/docs/use/send-requests/create-requests/parameters/
- Postman Docs — Variables  
  https://learning.postman.com/latest-v-12/docs/use/send-requests/variables/variables
- Postman Docs — Environments  
  https://learning.postman.com/latest-v-12/docs/use/send-requests/variables/environment-variables
- Postman Docs — Authorization  
  https://learning.postman.com/docs/sending-requests/authorization/authorization/
- Postman Docs — Test scripts  
  https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/

This is an independent educational portfolio project. It is not affiliated with or endorsed by Postman.

## Next milestones

- Add sound effects and achievement unlocks
- Add a clickable troubleshooting terminal
- Add more realistic support tickets
- Add guided Postman exercises with expected outputs
- Add a status-code drill mode
- Add auth/OAuth visualizations
- Add an API log-reading module
- Add a final recruiter-friendly case study

## License

MIT
