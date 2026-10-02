window.NEON_GROVE_POSTMAN_TUTORIALS = {

  bootcamp: {

    title:
      "Postman Bootcamp: Your First API Request",

    intro:
      "This assumes you have never used Postman before. Follow every step exactly. Nothing here is a test yet.",

    steps: [

      {
        title: "Open Postman",
        body: `
          Open the <strong>Postman desktop app</strong>.

          <br><br>

          If Postman opens into an existing workspace, that is fine.
          You do not need to understand workspaces yet.
        `
      },

      {
        title: "Create a new HTTP request",
        body: `
          Look for the <strong>+</strong> or <strong>Add</strong> control
          in the Postman workbench.

          <br><br>

          Create a new <strong>HTTP request</strong>.

          <br><br>

          You should now see a request builder with a method selector,
          a URL field, and a <strong>Send</strong> button.
        `
      },

      {
        title: "Check the HTTP method",
        body: `
          Look immediately to the left of the URL box.

          <br><br>

          Make sure the method says:

          <br><br>

          <code>GET</code>

          <br><br>

          GET is commonly used when a client wants to retrieve data.
        `
      },

      {
        title: "Enter your first API endpoint",
        body: `
          Click inside the URL field and enter:

          <br><br>

          <code>https://postman-echo.com/get</code>

          <br><br>

          The first part identifies the server.
          <code>/get</code> is the endpoint path.
        `
      },

      {
        title: "Send the request",
        body: `
          Click the blue <strong>Send</strong> button.

          <br><br>

          Postman sends your GET request to the Postman Echo API.

          <br><br>

          Wait for a response to appear in the lower response pane.
        `
      },

      {
        title: "Find the status code",
        body: `
          Look near the top of the response area.

          <br><br>

          Find the HTTP status.

          <br><br>

          A successful request should show:

          <br><br>

          <code>200 OK</code>

          <br><br>

          The number <strong>200</strong> is the important part for this exercise.
        `
      },

      {
        title: "Inspect the response body",
        body: `
          In the response area, open or inspect the
          <strong>Body</strong> tab.

          <br><br>

          You should see JSON returned by Postman Echo.

          <br><br>

          Do not worry about understanding every field yet.
          For now, notice that your client sent a request and the
          server returned structured data.
        `
      },

      {
        title: "Inspect the response headers",
        body: `
          In the response area, select
          <strong>Headers</strong>.

          <br><br>

          These are metadata returned with the response.

          <br><br>

          We will study headers properly in a later module.
        `
      },

      {
        title: "Save the request",
        body: `
          Click <strong>Save</strong>.

          <br><br>

          If you do not already have one, create a collection named:

          <br><br>

          <code>Neon Grove API Practice</code>

          <br><br>

          Name this request:

          <br><br>

          <code>01 - First GET Request</code>

          <br><br>

          Save it inside that collection.
        `
      }

    ],

    evidence: [

      {
        id: "method",
        label: "What HTTP method did you use?",
        expected: ["GET"],
        placeholder: "GET"
      },

      {
        id: "status",
        label: "What status code did Postman return?",
        expected: ["200", "200 OK"],
        placeholder: "200"
      },

      {
        id: "observation",
        label: "In one sentence, what happened when you clicked Send?",
        minLength: 12,
        placeholder: "Postman sent..."
      }

    ],

    screenshotRecommended: true

  },


  "Postman Platform & Workspaces": {

    title:
      "Guided Lab: Learn Where Things Live",

    intro:
      "You are not expected to memorize Postman's interface yet. This exercise is just about learning where the major controls are.",

    steps: [

      {
        title: "Open Neon Grove API Practice",
        body: `
          In Postman's left sidebar, locate
          <strong>Collections</strong>.

          <br><br>

          Open your collection:

          <br><br>

          <code>Neon Grove API Practice</code>
        `
      },

      {
        title: "Open your first saved request",
        body: `
          Select:

          <br><br>

          <code>01 - First GET Request</code>

          <br><br>

          The request should open in the workbench.
        `
      },

      {
        title: "Locate the request controls",
        body: `
          Without changing anything yet, find:

          <br><br>

          <strong>Method</strong><br>
          <strong>URL</strong><br>
          <strong>Params</strong><br>
          <strong>Authorization</strong><br>
          <strong>Headers</strong><br>
          <strong>Body</strong><br>
          <strong>Scripts</strong><br>
          <strong>Send</strong>
        `
      },

      {
        title: "Locate the response controls",
        body: `
          Click <strong>Send</strong> again.

          <br><br>

          In the response pane locate:

          <br><br>

          <strong>Status</strong><br>
          <strong>Body</strong><br>
          <strong>Headers</strong><br>
          <strong>Response time</strong>
        `
      }

    ],

    evidence: [

      {
        id: "requestTab",
        label: "Name one request tab you located.",
        acceptedContains: [
          "params",
          "authorization",
          "headers",
          "body",
          "scripts"
        ],
        placeholder: "Example: Headers"
      },

      {
        id: "responseItem",
        label: "Name one thing you located in the response pane.",
        acceptedContains: [
          "status",
          "body",
          "headers",
          "time"
        ],
        placeholder: "Example: Status"
      }

    ]

  },


  "Discover, Fork & Try APIs": {

    title:
      "Guided Lab: Work From an Existing API",

    intro:
      "Professional API work often begins with documentation or an existing collection rather than an empty request.",

    steps: [

      {
        title: "Open Explore",
        body: `
          In Postman, locate the area used to
          <strong>Explore</strong> public API resources.

          <br><br>

          Search for:

          <br><br>

          <code>Postman Echo</code>
        `
      },

      {
        title: "Inspect before changing anything",
        body: `
          Open the Echo API resources or collection.

          <br><br>

          Look through a few request names and notice that the
          collection already contains configured examples.
        `
      },

      {
        title: "Find a GET example",
        body: `
          Locate an example that sends a
          <strong>GET</strong> request.

          <br><br>

          Inspect its method and URL before sending it.
        `
      },

      {
        title: "Send a known-good request",
        body: `
          Send the GET request.

          <br><br>

          Compare its response to the request you created manually
          during Bootcamp.
        `
      }

    ],

    evidence: [

      {
        id: "method",
        label: "What method did the example use?",
        expected: ["GET"]
      },

      {
        id: "comparison",
        label: "What was one similarity between the example and your Bootcamp request?",
        minLength: 12
      }

    ]

  },


  "API Mental Model": {

    title:
      "Guided Lab: See Client → Request → Server → Response",

    intro:
      "Now you will connect the API mental model to something you can actually see in Postman.",

    steps: [

      {
        title: "Open your first GET request",
        body: `
          Open:

          <br><br>

          <code>01 - First GET Request</code>

          <br><br>

          Postman is acting as the <strong>client</strong>.
        `
      },

      {
        title: "Identify the request",
        body: `
          Before sending, identify:

          <br><br>

          Method: <code>GET</code><br>
          URL: <code>https://postman-echo.com/get</code>
        `
      },

      {
        title: "Send it",
        body: `
          Click <strong>Send</strong>.

          <br><br>

          The Echo service acts as the API/server.
        `
      },

      {
        title: "Identify the response",
        body: `
          In the response pane locate:

          <br><br>

          status code<br>
          response headers<br>
          response body
        `
      }

    ],

    evidence: [

      {
        id: "client",
        label: "What application is acting as the client?",
        expected: ["Postman"]
      },

      {
        id: "status",
        label: "What response status did you receive?",
        expected: ["200", "200 OK"]
      },

      {
        id: "mentalModel",
        label: "Write the four-part flow you just observed.",
        acceptedContains: ["client", "request", "server", "response"],
        placeholder: "Client → ..."
      }

    ]

  },


  "HTTP Methods": {

    title:
      "Guided Lab: Send GET and POST Requests",

    intro:
      "First I will walk you through both requests. Then you will identify the business intent of several HTTP methods.",

    steps: [

      {
        title: "Send a GET request",
        body: `
          Create a new request in your
          <strong>Neon Grove API Practice</strong> collection.

          <br><br>

          Method:

          <br>

          <code>GET</code>

          <br><br>

          URL:

          <br>

          <code>https://postman-echo.com/get?item=neon-pine</code>

          <br><br>

          Click <strong>Send</strong>.
        `
      },

      {
        title: "Inspect the GET result",
        body: `
          Confirm the response status is
          <strong>200</strong>.

          <br><br>

          In the JSON response, find the value you sent for
          <code>item</code>.
        `
      },

      {
        title: "Create a POST request",
        body: `
          Create another request.

          <br><br>

          Change the method dropdown to:

          <br>

          <code>POST</code>

          <br><br>

          Use:

          <br>

          <code>https://postman-echo.com/post</code>
        `
      },

      {
        title: "Add a JSON body",
        body: `
          Select <strong>Body</strong>.

          <br><br>

          Choose <strong>raw</strong> and then select
          <strong>JSON</strong> as the body type.

          <br><br>

          Paste:

          <br><br>

          <code>{"tree":"neon-pine","action":"plant"}</code>
        `
      },

      {
        title: "Send the POST request",
        body: `
          Click <strong>Send</strong>.

          <br><br>

          Confirm the response is successful and inspect the returned JSON.
        `
      },

      {
        title: "Save both",
        body: `
          Save the requests as:

          <br><br>

          <code>02 - GET Tree</code><br>
          <code>03 - POST Tree</code>
        `
      }

    ],

    evidence: [

      {
        id: "getStatus",
        label: "GET response status",
        expected: ["200", "200 OK"]
      },

      {
        id: "postStatus",
        label: "POST response status",
        expected: ["200", "200 OK"]
      },

      {
        id: "methodMeaning",
        label: "In your own words, what was the difference between what GET and POST were trying to do?",
        minLength: 20
      }

    ],

    screenshotRecommended: true

  },


  "URLs & Parameters": {

    title:
      "Guided Lab: Build Query Parameters",

    intro:
      "You will add parameters using Postman's Params interface and watch Postman build the URL for you.",

    steps: [

      {
        title: "Create a GET request",
        body: `
          Create a GET request with:

          <br><br>

          <code>https://postman-echo.com/get</code>
        `
      },

      {
        title: "Open Params",
        body: `
          Select the <strong>Params</strong> tab beneath the URL.

          <br><br>

          Find the Query Params table.
        `
      },

      {
        title: "Add customer_id",
        body: `
          Add:

          <br><br>

          Key: <code>customer_id</code><br>
          Value: <code>42</code>
        `
      },

      {
        title: "Add status",
        body: `
          Add another parameter:

          <br><br>

          Key: <code>status</code><br>
          Value: <code>open</code>
        `
      },

      {
        title: "Watch the URL change",
        body: `
          Look back at the URL.

          <br><br>

          Postman should now represent the query parameters in the URL.
        `
      },

      {
        title: "Send and inspect args",
        body: `
          Click <strong>Send</strong>.

          <br><br>

          In the JSON response, locate the
          <code>args</code> object.

          <br><br>

          Confirm that both values came back.
        `
      }

    ],

    evidence: [

      {
        id: "customer",
        label: "What value came back for customer_id?",
        expected: ["42"]
      },

      {
        id: "statusParam",
        label: "What value came back for status?",
        expected: ["open"]
      }

    ]

  },


  "Headers": {

    title:
      "Guided Lab: Send and Inspect a Header",

    intro:
      "Headers are metadata. You will add one yourself and then inspect what was transmitted.",

    steps: [

      {
        title: "Create a GET request",
        body: `
          Use:

          <br><br>

          <code>GET https://postman-echo.com/get</code>
        `
      },

      {
        title: "Open Headers",
        body: `
          Select the request's
          <strong>Headers</strong> tab.
        `
      },

      {
        title: "Add a custom header",
        body: `
          Add:

          <br><br>

          Key: <code>X-Neon-Grove</code><br>
          Value: <code>explorer</code>
        `
      },

      {
        title: "Send the request",
        body: `
          Click <strong>Send</strong>.

          <br><br>

          Inspect the returned JSON.

          <br><br>

          Postman Echo returns information about the request it received,
          including headers.
        `
      },

      {
        title: "Find your custom value",
        body: `
          Find the echoed request headers and confirm that
          <code>explorer</code> was transmitted.
        `
      }

    ],

    evidence: [

      {
        id: "headerName",
        label: "What custom header name did you send?",
        expected: ["X-Neon-Grove", "x-neon-grove"]
      },

      {
        id: "headerValue",
        label: "What value did you send?",
        expected: ["explorer"]
      }

    ]

  },


  "Request Bodies & JSON": {

    title:
      "Guided Lab: Send JSON in a Request Body",

    intro:
      "This time the data goes in the request body instead of the URL.",

    steps: [

      {
        title: "Create a POST request",
        body: `
          Create:

          <br><br>

          <code>POST https://postman-echo.com/post</code>
        `
      },

      {
        title: "Open Body",
        body: `
          Select <strong>Body</strong>.

          <br><br>

          Choose <strong>raw</strong>.

          <br><br>

          Change the raw format selector to
          <strong>JSON</strong>.
        `
      },

      {
        title: "Enter valid JSON",
        body: `
          Paste exactly:

          <br><br>

          <code>{"name":"Titan Sequoia","stage":"seed","quantity":1}</code>
        `
      },

      {
        title: "Notice Content-Type",
        body: `
          Open <strong>Headers</strong>.

          <br><br>

          Notice that Postman can add an
          <code>application/json</code>
          Content-Type when JSON is selected.
        `
      },

      {
        title: "Send and inspect",
        body: `
          Click <strong>Send</strong>.

          <br><br>

          Find your JSON values in the echoed response.
        `
      }

    ],

    evidence: [

      {
        id: "treeName",
        label: "What name value came back in the JSON?",
        expected: ["Titan Sequoia"]
      },

      {
        id: "contentType",
        label: "What Content-Type were you using?",
        expected: ["application/json", "application/json; charset=utf-8"]
      }

    ],

    screenshotRecommended: true

  },


  "Responses & Status Codes": {

    title:
      "Guided Lab: Compare Success and Failure",

    intro:
      "A status code is evidence. You will intentionally compare a successful endpoint with one that does not exist.",

    steps: [

      {
        title: "Send a successful request",
        body: `
          Send:

          <br><br>

          <code>GET https://postman-echo.com/get</code>

          <br><br>

          Record the response status.
        `
      },

      {
        title: "Send a request to a missing endpoint",
        body: `
          Change the URL to:

          <br><br>

          <code>https://postman-echo.com/test</code>

          <br><br>

          Keep the method as GET.

          <br><br>

          Click <strong>Send</strong>.
        `
      },

      {
        title: "Compare the evidence",
        body: `
          Compare the two status codes.

          <br><br>

          The second endpoint intentionally gives you a useful example
          of a resource that cannot be found.
        `
      }

    ],

    evidence: [

      {
        id: "goodStatus",
        label: "Successful request status",
        expected: ["200", "200 OK"]
      },

      {
        id: "missingStatus",
        label: "Missing endpoint status",
        expected: ["404", "404 Not Found"]
      },

      {
        id: "meaning",
        label: "What does 404 tell you in this example?",
        minLength: 15
      }

    ]

  },


  "Authentication & Authorization": {

    title:
      "Guided Lab: See How Authorization Is Sent",

    intro:
      "This exercise teaches where authentication data lives in Postman. Postman Echo will reflect the header; it is not validating you as a real application user.",

    steps: [

      {
        title: "Create a GET request",
        body: `
          Create:

          <br><br>

          <code>GET https://postman-echo.com/get</code>
        `
      },

      {
        title: "Open Authorization",
        body: `
          Select the request's
          <strong>Authorization</strong> tab.
        `
      },

      {
        title: "Select Bearer Token",
        body: `
          Set the authorization type to
          <strong>Bearer Token</strong>.
        `
      },

      {
        title: "Use a fake training token",
        body: `
          Enter:

          <br><br>

          <code>neon-grove-training-token</code>

          <br><br>

          This is intentionally fake.
          Never paste a real secret into a training exercise.
        `
      },

      {
        title: "Send and inspect",
        body: `
          Click <strong>Send</strong>.

          <br><br>

          Inspect the echoed headers.

          <br><br>

          Look for the Authorization header Postman generated.
        `
      }

    ],

    evidence: [

      {
        id: "authHeader",
        label: "What HTTP header carries the Bearer token?",
        expected: ["Authorization", "authorization"]
      },

      {
        id: "difference",
        label: "In one sentence: authentication vs authorization?",
        minLength: 20
      }

    ]

  },


  "Variables & Environments": {

    title:
      "Guided Lab: Replace a Hard-Coded URL With a Variable",

    intro:
      "Environments let the same request use different context-specific values without rewriting the request.",

    steps: [

      {
        title: "Open Environments",
        body: `
          In Postman, open the
          <strong>Environments</strong> area.

          <br><br>

          Create a new environment named:

          <br><br>

          <code>Neon Grove Local Practice</code>
        `
      },

      {
        title: "Create base_url",
        body: `
          Add a variable named:

          <br><br>

          <code>base_url</code>

          <br><br>

          Give it this value:

          <br><br>

          <code>https://postman-echo.com</code>
        `
      },

      {
        title: "Select the environment",
        body: `
          Make sure
          <strong>Neon Grove Local Practice</strong>
          is the active environment.
        `
      },

      {
        title: "Create a variable-based request",
        body: `
          Create:

          <br><br>

          <code>GET {{base_url}}/get</code>

          <br><br>

          Postman should resolve the variable using the active environment.
        `
      },

      {
        title: "Send it",
        body: `
          Click <strong>Send</strong>.

          <br><br>

          Confirm you still receive a successful response.
        `
      }

    ],

    evidence: [

      {
        id: "variable",
        label: "What variable name did you create?",
        expected: ["base_url"]
      },

      {
        id: "value",
        label: "What value did base_url contain?",
        expected: [
          "https://postman-echo.com",
          "https://postman-echo.com/"
        ]
      },

      {
        id: "status",
        label: "What status did the variable-based request return?",
        expected: ["200", "200 OK"]
      }

    ]

  },


  "Collections & Workflows": {

    title:
      "Guided Lab: Turn Requests Into a Repeatable Workflow",

    intro:
      "A useful support collection should make your investigation repeatable instead of leaving requests scattered across temporary tabs.",

    steps: [

      {
        title: "Open Neon Grove API Practice",
        body: `
          Open your existing collection.

          <br><br>

          You should already have several saved requests by now.
        `
      },

      {
        title: "Create a folder",
        body: `
          Inside the collection, create a folder named:

          <br><br>

          <code>Core Diagnostics</code>
        `
      },

      {
        title: "Organize known-good requests",
        body: `
          Put at least two useful requests into the folder.

          <br><br>

          Good candidates are your working GET request and your JSON POST request.
        `
      },

      {
        title: "Give them meaningful names",
        body: `
          Request names should describe what they do.

          <br><br>

          Avoid names such as:

          <br>

          <code>Request 1</code>
        `
      },

      {
        title: "Run them again",
        body: `
          Open each saved request and send it again.

          <br><br>

          Confirm that the collection gives you a reproducible baseline.
        `
      }

    ],

    evidence: [

      {
        id: "folder",
        label: "What did you name the folder?",
        expected: ["Core Diagnostics"]
      },

      {
        id: "requests",
        label: "Name two requests you organized into it.",
        minLength: 15
      }

    ]

  },


  "Postman Tests": {

    title:
      "Guided Lab: Write Your First Automated Test",

    intro:
      "You do not need to know JavaScript yet. Use the complete example first, run it, and see what the test does.",

    steps: [

      {
        title: "Open a working GET request",
        body: `
          Open a request that sends:

          <br><br>

          <code>GET https://postman-echo.com/get</code>
        `
      },

      {
        title: "Open Scripts",
        body: `
          Select <strong>Scripts</strong>.

          <br><br>

          Then select:

          <br><br>

          <strong>Post-response</strong>
        `
      },

      {
        title: "Add your first test",
        body: `
          Paste:

          <br><br>

          <code>pm.test("Status code is 200", function () {<br>
          &nbsp;&nbsp;pm.response.to.have.status(200);<br>
          });</code>
        `
      },

      {
        title: "Send the request",
        body: `
          Click <strong>Send</strong>.

          <br><br>

          The request runs first.

          <br><br>

          Then your post-response test checks the response.
        `
      },

      {
        title: "Open Test Results",
        body: `
          In the response section, open
          <strong>Test Results</strong>.

          <br><br>

          Your status-code test should pass.
        `
      },

      {
        title: "Break the test on purpose",
        body: `
          Temporarily change:

          <br><br>

          <code>status(200)</code>

          <br><br>

          to:

          <br><br>

          <code>status(201)</code>

          <br><br>

          Send again and observe the failed test.

          <br><br>

          Then restore it to 200.
        `
      }

    ],

    evidence: [

      {
        id: "correctResult",
        label: "What happened when the test expected 200?",
        expected: ["pass", "passed", "PASS", "Passed"]
      },

      {
        id: "wrongResult",
        label: "What happened when you deliberately expected 201?",
        expected: ["fail", "failed", "FAIL", "Failed"]
      },

      {
        id: "lesson",
        label: "Why was deliberately breaking the test useful?",
        minLength: 20
      }

    ],

    screenshotRecommended: true

  },


  "API Troubleshooting": {

    title:
      "Guided Investigation: Reproduce → Compare → Fix",

    intro:
      "Now we start removing the training wheels. You already know enough Postman to investigate a controlled failure.",

    steps: [

      {
        title: "Reproduce the failure",
        body: `
          Send:

          <br><br>

          <code>GET https://postman-echo.com/test</code>

          <br><br>

          Record what happens.
        `
      },

      {
        title: "Read the evidence",
        body: `
          Inspect the status code.

          <br><br>

          Do not change anything until you can describe the failure.
        `
      },

      {
        title: "Form a hypothesis",
        body: `
          Compare the URL with the known-good endpoint:

          <br><br>

          <code>https://postman-echo.com/get</code>

          <br><br>

          Ask what changed.
        `
      },

      {
        title: "Test one change",
        body: `
          Change only the endpoint path from:

          <br><br>

          <code>/test</code>

          <br><br>

          to:

          <br><br>

          <code>/get</code>

          <br><br>

          Send again.
        `
      },

      {
        title: "Document the result",
        body: `
          Record the failing status, successful status,
          root cause, and correction.
        `
      }

    ],

    evidence: [

      {
        id: "before",
        label: "Status before the fix",
        expected: ["404", "404 Not Found"]
      },

      {
        id: "after",
        label: "Status after the fix",
        expected: ["200", "200 OK"]
      },

      {
        id: "rootCause",
        label: "What was the root cause?",
        acceptedContains: [
          "url",
          "endpoint",
          "path"
        ]
      },

      {
        id: "fix",
        label: "What did you change?",
        minLength: 12
      }

    ],

    screenshotRecommended: true

  },


  "Support Ticket Simulations": {

    title:
      "Support Case: Customer Filter Is Missing",

    intro:
      "Treat this like a small support ticket. You have a customer symptom and must reproduce what their client should send.",

    steps: [

      {
        title: "Read the ticket",
        body: `
          Customer report:

          <br><br>

          <em>
          "Our integration is supposed to request only open tickets
          for customer 42, but we are getting the wrong result."
          </em>
        `
      },

      {
        title: "Build the expected request",
        body: `
          In Postman create:

          <br><br>

          <code>GET https://postman-echo.com/get</code>
        `
      },

      {
        title: "Add the required query parameters",
        body: `
          In Params add:

          <br><br>

          <code>customer_id = 42</code><br>
          <code>status = open</code>
        `
      },

      {
        title: "Send and verify",
        body: `
          Send the request.

          <br><br>

          Verify both values appear in the response's
          <code>args</code>.
        `
      },

      {
        title: "Write a support note",
        body: `
          Document what the correctly formed request contains
          so another support engineer could reproduce it.
        `
      }

    ],

    evidence: [

      {
        id: "customer",
        label: "Expected customer_id",
        expected: ["42"]
      },

      {
        id: "statusFilter",
        label: "Expected status filter",
        expected: ["open"]
      },

      {
        id: "supportNote",
        label: "Write your short support investigation note.",
        minLength: 35
      }

    ],

    screenshotRecommended: true

  },


  "Capstone Investigation": {

    title:
      "Capstone: Build and Explain a Complete API Investigation",

    intro:
      "This is where the training wheels come off. Use everything you have learned instead of following a single recipe.",

    steps: [

      {
        title: "Choose a known-good Echo endpoint",
        body: `
          Start with a request to the Postman Echo API.

          <br><br>

          Decide what method and endpoint make sense for the data you want to send.
        `
      },

      {
        title: "Use at least one input",
        body: `
          Include at least one of:

          <br><br>

          query parameter<br>
          custom header<br>
          JSON request body
        `
      },

      {
        title: "Use your environment",
        body: `
          Use:

          <br><br>

          <code>{{base_url}}</code>

          <br><br>

          instead of hard-coding the Postman Echo host.
        `
      },

      {
        title: "Add a Post-response test",
        body: `
          Add at least one automated test that checks something
          you genuinely expect from the response.
        `
      },

      {
        title: "Break something",
        body: `
          Deliberately introduce one mistake.

          <br><br>

          Examples:

          <br><br>

          wrong endpoint<br>
          missing parameter<br>
          wrong expected test status<br>
          incorrect body value
        `
      },

      {
        title: "Diagnose and fix it",
        body: `
          Reproduce the failure, identify the evidence,
          make one controlled correction, and verify the result.
        `
      },

      {
        title: "Document the investigation",
        body: `
          Write a concise technical summary containing:

          <br><br>

          symptom<br>
          reproduction<br>
          evidence<br>
          root cause<br>
          fix<br>
          verification
        `
      }

    ],

    evidence: [

      {
        id: "method",
        label: "HTTP method used",
        minLength: 3
      },

      {
        id: "successStatus",
        label: "Final successful status code",
        expected: ["200", "200 OK", "201", "201 Created"]
      },

      {
        id: "summary",
        label: "Your investigation summary",
        minLength: 80
      }

    ],

    screenshotRecommended: true

  }

};