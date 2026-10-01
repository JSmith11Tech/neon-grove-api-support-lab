window.LAB_MODULES = [
{
  id:"mental-model",
  title:"API Mental Model",
  subtitle:"Understand what is actually happening when an app talks to a service.",
  tags:["API","client/server","request/response"],
  xp:100,
  lesson:[
    ["The core idea",`An <strong>API</strong> is a defined way for one piece of software to interact with another. In a web API flow, a <strong>client</strong> sends a request to an endpoint exposed by a <strong>server</strong>. The server processes that request and returns a response.`],
    ["Think like support",`When something fails, do not treat "the API" as one mysterious box. Ask: <em>Was the request formed correctly? Did it reach the expected endpoint? Did authentication succeed? Did the server accept the input? What exactly came back?</em>`]
  ],
  example:{title:"Complete example",body:`A support tool sends <code>GET https://api.example.com/customers/42</code>. The URL identifies the resource. <code>GET</code> expresses the intended action. The server replies with a status code, headers, and usually a response body.`},
  challenge:"For every API problem today, identify four pieces first: method, URL, request data/auth, and response.",
  quiz:{q:"A customer says “the API is broken.” What is the best first technical move?",choices:["Restart everything","Break the interaction into request and response components","Assume the API server is down","Regenerate every credential"],answer:1,explain:"API troubleshooting gets much easier when you inspect the concrete request and response instead of treating the API as a single black box."}
},
{
  id:"http-methods",
  title:"HTTP Methods",
  subtitle:"Know what GET, POST, PUT, PATCH, and DELETE communicate.",
  tags:["GET","POST","PATCH","DELETE"],
  xp:100,
  lesson:[
    ["Methods are intent",`The HTTP method tells the server what kind of operation the client is attempting. Common REST-style usage is <code>GET</code> to retrieve, <code>POST</code> to create or trigger, <code>PUT</code> to replace, <code>PATCH</code> to partially update, and <code>DELETE</code> to remove.`],
    ["Do not memorize blindly",`An API's own documentation is authoritative. A service can expose actions differently, so always verify the documented method for that endpoint.`]
  ],
  example:{title:"Complete example",body:`If <code>GET /users/8</code> retrieves user 8, <code>PATCH /users/8</code> might update only the submitted fields. Sending <code>POST</code> to the same route may fail if the API does not define that operation.`},
  challenge:"Open a Postman collection and label each request with the business action its method represents.",
  quiz:{q:"You need to change only a customer's display name. Which method is commonly used for a partial update?",choices:["GET","PATCH","DELETE","HEAD"],answer:1,explain:"PATCH commonly represents a partial update, though the API documentation always wins."}
},
{
  id:"urls-parameters",
  title:"URLs & Parameters",
  subtitle:"Separate base URLs, resources, path parameters, and query parameters.",
  tags:["endpoint","path params","query params"],
  xp:120,
  lesson:[
    ["Endpoint anatomy",`A URL can contain a scheme, host, resource path, path values, and query parameters. Example: <code>https://api.example.com/v1/orders/928?include=items</code>.`],
    ["Path vs query",`A path value usually helps identify a resource such as <code>/orders/928</code>. Query parameters follow <code>?</code> and modify/filter the request, such as <code>?status=open&limit=25</code>.`]
  ],
  example:{title:"Complete example",body:`<code>GET /customers/42/tickets?status=open</code><br><br><strong>42</strong> identifies the customer in the path. <strong>status=open</strong> filters the tickets returned.`},
  challenge:"In Postman, create the same query parameter once through the Params UI and once directly in the URL. Confirm the resulting request is equivalent.",
  quiz:{q:"Which part of this URL is a query parameter? /orders/928?include=items",choices:["orders","928","include=items","/orders/928"],answer:2,explain:"Everything after the ? is the query string. Here, include is the key and items is its value."}
},
{
  id:"headers",
  title:"Headers",
  subtitle:"Understand metadata that changes how requests and responses are interpreted.",
  tags:["Content-Type","Accept","Authorization"],
  xp:120,
  lesson:[
    ["What headers do",`Headers carry metadata about a request or response. They can describe the content format, authentication information, caching behavior, accepted formats, client details, and more.`],
    ["Common support clues",`<code>Content-Type: application/json</code> tells the recipient the body is JSON. <code>Accept: application/json</code> expresses the response format the client can accept. Authorization information is often carried in an <code>Authorization</code> header.`]
  ],
  example:{title:"Complete example",body:`A POST request contains valid-looking JSON but the API interprets it incorrectly. One thing to inspect is whether the request's <code>Content-Type</code> accurately describes the body.`},
  challenge:"Send a JSON request in Postman. Inspect the generated headers, then explain which headers Postman supplied automatically and why.",
  quiz:{q:"Which header most directly tells a server the media type of the request body?",choices:["Accept","Content-Type","User-Agent","Cache-Control"],answer:1,explain:"Content-Type describes the representation used in the message body."}
},
{
  id:"json-bodies",
  title:"Request Bodies & JSON",
  subtitle:"Build, read, and debug structured request payloads.",
  tags:["JSON","payload","request body"],
  xp:140,
  lesson:[
    ["JSON basics",`JSON represents data with objects, arrays, strings, numbers, booleans, and null. Property names and string values use double quotes. Syntax errors such as missing commas or unmatched braces can make a request invalid.`],
    ["Body format matters",`APIs may accept raw JSON, form data, URL-encoded data, files, or other formats. Sending correct data in the wrong representation can still fail.`]
  ],
  example:{title:"Complete example",body:`<pre>{
  "customerId": 42,
  "priority": "high",
  "notify": true,
  "tags": ["billing", "renewal"]
}</pre>`},
  challenge:"Intentionally break a JSON payload three ways: remove a comma, remove a quote, and change a required field name. Observe how syntax failures differ from API validation failures.",
  quiz:{q:"Which is valid JSON?",choices:[`{'name':'Jay'}`,`{"name":"Jay"}`,`{name:"Jay"}`,`("name":"Jay")`],answer:1,explain:"JSON object keys and string values use double quotes."}
},
{
  id:"responses-status",
  title:"Responses & Status Codes",
  subtitle:"Read the evidence the server gives you.",
  tags:["2xx","4xx","5xx","response body"],
  xp:160,
  lesson:[
    ["Status families",`<strong>2xx</strong> generally means the request succeeded. <strong>4xx</strong> means the server is reporting a problem with the client's request or authorization context. <strong>5xx</strong> means the server encountered a failure while trying to handle the request.`],
    ["Codes worth knowing",`Support work frequently encounters 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 409 Conflict, 422 Unprocessable Content, 429 Too Many Requests, and 500/502/503 server-side failures.`],
    ["Never stop at the code",`Status codes narrow the search. The response body and headers often contain the useful error message, request ID, retry information, or validation detail.`]
  ],
  example:{title:"Complete example",body:`A request gets <code>401</code>. That points you toward missing/invalid authentication. A <code>403</code> often means the server understood the identity but is refusing the requested action. Exact semantics still depend on the API.`},
  challenge:"Build a one-page support cheat sheet that maps 400, 401, 403, 404, 409, 429, and 500 to your first investigation step.",
  quiz:{q:"A request is syntactically valid, but the authenticated user lacks permission for the operation. Which response is commonly associated with this?",choices:["201","301","403","503"],answer:2,explain:"403 Forbidden commonly indicates the server is refusing the operation for the current authorization context."}
},
{
  id:"auth",
  title:"Authentication & Authorization",
  subtitle:"Know who the client is—and what that identity is allowed to do.",
  tags:["API key","Bearer","Basic","OAuth"],
  xp:180,
  lesson:[
    ["Two different questions",`<strong>Authentication</strong> establishes identity or proves possession of a credential. <strong>Authorization</strong> determines what that identity may access or do.`],
    ["Common patterns",`APIs may use API keys, Basic Authentication, Bearer tokens, OAuth 2.0 flows, signed requests, or other schemes. Postman can configure authorization at request, folder, and collection levels.`],
    ["Security habit",`Never commit real secrets, passwords, API keys, or production tokens to a public GitHub repository. Use environment variables or secret storage and commit only safe placeholders.`]
  ],
  example:{title:"Complete example",body:`A token can be perfectly valid yet still return <code>403</code> if it does not have the role/scope required by the endpoint. That is why “the token works elsewhere” does not prove authorization is correct here.`},
  challenge:"Create a Postman environment with a placeholder token variable and reference it from an Authorization configuration. Keep the actual secret out of exported public files.",
  quiz:{q:"A valid token can access /profile but receives 403 on /admin/reports. What should you investigate first?",choices:["JSON syntax","Permissions/scopes/roles","DNS","Response time"],answer:1,explain:"Because the credential works on another protected endpoint, authorization for the specific operation becomes a strong next lead."}
},
{
  id:"variables-env",
  title:"Variables & Environments",
  subtitle:"Stop hardcoding values and switch contexts safely.",
  tags:["{{base_url}}","environments","scope"],
  xp:160,
  lesson:[
    ["Reusable values",`Postman variables let you replace repeated values with references such as <code>{{base_url}}</code> or <code>{{customer_id}}</code>.`],
    ["Environment thinking",`An environment groups variables for a context such as development, staging, or production. The same request can point to another system by switching the active environment instead of editing every URL.`],
    ["Support payoff",`This reduces accidental cross-environment testing and makes it easier to reproduce customer issues with controlled values.`]
  ],
  example:{title:"Complete example",body:`Request URL: <code>{{base_url}}/v1/orders/{{order_id}}</code><br><br>Dev environment can resolve <code>base_url</code> to a test host while Production resolves it to the production host.`},
  challenge:"Create Dev and QA environments with different base_url values, then run the same request against both without editing the request URL.",
  quiz:{q:"Why use {{base_url}} instead of hardcoding a hostname into every request?",choices:["It encrypts traffic","It lets reusable requests switch contexts cleanly","It changes GET into POST","It prevents all 4xx errors"],answer:1,explain:"Variables make requests reusable and environments let the same request resolve to different contextual values."}
},
{
  id:"collections",
  title:"Collections & Workflows",
  subtitle:"Turn loose requests into a repeatable troubleshooting toolkit.",
  tags:["collections","folders","documentation"],
  xp:140,
  lesson:[
    ["Organize intentionally",`A collection groups related requests. Folders can represent resources, workflows, product areas, or troubleshooting stages.`],
    ["Portfolio value",`A well-documented collection demonstrates that you can make investigation reproducible for someone else—an important support-engineering skill.`]
  ],
  example:{title:"Complete example",body:`Collection: <strong>Acme Support API</strong><br>Folders: Authentication → Customers → Orders → Failure Reproduction → Health Checks.`},
  challenge:"Create a collection with at least two folders and write descriptions explaining what each request proves.",
  quiz:{q:"What makes a Postman collection especially useful in support work?",choices:["It replaces API documentation entirely","It makes related requests repeatable and shareable","It guarantees production access","It automatically fixes server errors"],answer:1,explain:"Collections help make known-good and diagnostic requests repeatable and easier to share."}
},
{
  id:"tests",
  title:"Postman Tests",
  subtitle:"Turn expected behavior into executable checks.",
  tags:["pm.test","assertions","automation"],
  xp:180,
  lesson:[
    ["Tests as evidence",`Post-response scripts can make assertions about a response. Instead of visually checking the same thing every time, you can verify expected status codes, data types, fields, headers, and values.`],
    ["Support use",`A small diagnostic collection with assertions can quickly show where an integration begins deviating from expected behavior.`]
  ],
  example:{title:"Complete example",body:`<pre>pm.test("status is 200", function () {
  pm.response.to.have.status(200);
});</pre>`},
  challenge:"Add one status-code test and one response-body assertion to a request you already understand. Make each test fail on purpose once.",
  quiz:{q:"Why deliberately make a new test fail once?",choices:["To damage the API","To verify the assertion can actually detect the wrong condition","To increase response time","To refresh a token"],answer:1,explain:"A test that has never been observed failing can give false confidence if the assertion is incorrect."}
},
{
  id:"troubleshooting",
  title:"API Troubleshooting",
  subtitle:"Use a repeatable diagnostic sequence instead of guessing.",
  tags:["reproduce","isolate","evidence"],
  xp:220,
  lesson:[
    ["The investigation loop",`Start with the exact failing request. Capture method, URL, parameters, headers, authentication type, body, environment, status code, response headers/body, and timing. Then compare against a known-good request or documentation.`],
    ["Change one thing",`Avoid random edits. Form a hypothesis, change one meaningful variable, run again, and record the result. This preserves evidence and tells you which change mattered.`],
    ["Useful question",`Ask: <strong>What is the earliest point at which actual behavior differs from expected behavior?</strong> That usually tells you where to investigate next.`]
  ],
  example:{title:"Complete example",body:`Customer: “POST works in sandbox but fails in production.” Compare the two resolved URLs, credentials/scopes, headers, payloads, environment variables, API versions, and returned error details. Do not assume production is broken merely because sandbox succeeds.`},
  challenge:"Take one working request, introduce one hidden defect, and write a ticket-style investigation note: symptom → evidence → hypothesis → test → result → conclusion.",
  quiz:{q:"What is the safest debugging habit when several causes are possible?",choices:["Change multiple settings at once","Change one meaningful variable and compare the result","Ignore the response body","Immediately escalate"],answer:1,explain:"Controlled changes preserve causality and make your evidence useful."}
},
{
  id:"support-tickets",
  title:"Support Ticket Simulations",
  subtitle:"Practice the kinds of API cases you may actually get paid to solve.",
  tags:["401","403","400","429","5xx"],
  xp:260,
  lesson:[
    ["Ticket mindset",`Your job is not merely to name a status code. Build a defensible explanation from evidence and identify the next useful action for the customer or engineering team.`]
  ],
  example:{title:"Ticket 001 — Permission mismatch",body:`A customer's Bearer token returns 200 from <code>/v1/me</code> and 403 from <code>/v1/reports/export</code>. The failure started immediately after the customer changed roles. Your strongest initial investigation area is endpoint authorization—role, scope, or policy—not whether the token string exists.`},
  challenge:"Write your response to Ticket 001 in five lines: observation, evidence, likely layer, next check, and what would confirm/refute the hypothesis.",
  quiz:{q:"Which note is strongest for escalation?",choices:["API broken. Please fix.","Customer says it does not work.","POST /v1/orders returns 403 at 18:42Z; same Bearer token returns 200 from /v1/me; reproduced twice; request ID abc123.","I think permissions are weird."],answer:2,explain:"A useful escalation includes reproducible facts, timestamps/IDs, comparison evidence, and the exact operation that failed."},
  ticket:{
    id:"TICKET-002",
    title:"Works in Dev, Fails in Production",
    body:"A customer uses the same Postman collection in Dev and Production. Dev returns 201. Production returns 401. They insist the request is identical.",
    clues:["The collection uses {{base_url}} and {{api_token}}.","The active environment changes between Dev and Production.","The Production token variable has a value, but you have not yet verified what credential is actually resolved at send time."],
    ask:"What do you inspect before blaming the Production API?"
  }
},
{
  id:"capstone",
  title:"Capstone Investigation",
  subtitle:"Put the whole stack together like a Technical Support Engineer.",
  tags:["capstone","portfolio","incident analysis"],
  xp:350,
  lesson:[
    ["Your deliverable",`Given unfamiliar API documentation, build a clean Postman collection, configure environments, make successful requests, add basic tests, reproduce at least three failures, and document how you diagnosed them.`],
    ["Portfolio proof",`The finished repo should show your collection exports, sanitized environment examples, troubleshooting write-ups, screenshots, and a short explanation of what each failure taught you.`]
  ],
  example:{title:"Capstone case",body:`A SaaS customer reports that an integration which creates orders has stopped working. Some attempts return 401, others 400. Your task is to determine whether these failures have the same root cause, collect evidence, and document the investigation so another support engineer could reproduce it.`},
  challenge:"Do not mark this complete until you can explain every request, variable, test, and diagnostic decision in your own words.",
  quiz:{q:"Two requests fail with different status codes. What should you assume?",choices:["They must share one root cause","They must have unrelated causes","Nothing yet—compare the concrete evidence for each request","Both are server outages"],answer:2,explain:"Different symptoms can share a cause or have separate causes. The evidence decides."}
}
];