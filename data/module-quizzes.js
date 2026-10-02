window.NEON_GROVE_MODULE_QUIZZES = {

  "API Origins & Roles": [
    {
      q:"What is the core purpose of an API?",
      choices:[
        "To force applications to share the same source code",
        "To provide a defined interface for systems to interact",
        "To replace all databases",
        "To eliminate networks"
      ],
      answer:1,
      explain:"An API defines how one system can request data or capabilities from another."
    },
    {
      q:"Which system is the API consumer?",
      choices:[
        "The system making the API request",
        "Only the database",
        "The system physically hosting the network",
        "Only the API documentation"
      ],
      answer:0,
      explain:"The consumer calls the API. The provider exposes the API."
    },
    {
      q:"Why did HTTP-based APIs become especially useful?",
      choices:[
        "HTTP only works with one programming language",
        "HTTP gives different platforms a widely understood communication standard",
        "HTTP prevents systems from exchanging data",
        "HTTP requires applications to share a database"
      ],
      answer:1,
      explain:"HTTP gives otherwise different systems a common protocol for communication."
    },
    {
      q:"Which role might reproduce a customer's failing API request and inspect the response?",
      choices:[
        "Technical support engineer",
        "Only a graphic designer",
        "Only an accountant",
        "No human role"
      ],
      answer:0,
      explain:"API troubleshooting is a common part of technical and product support work."
    },
    {
      q:"A customer says 'the sync stopped working.' What is a useful support mindset?",
      choices:[
        "Assume the server is broken",
        "Translate the symptom into observable API interactions",
        "Immediately regenerate every credential",
        "Ignore the request and response"
      ],
      answer:1,
      explain:"The vague symptom becomes actionable when you identify and inspect the relevant requests and responses."
    }
  ],

  "API Categories & API-First Thinking": [
    {
      q:"An employee-only inventory API is best described as what by audience?",
      choices:[
        "Public",
        "Internal or private",
        "Partner",
        "GraphQL"
      ],
      answer:1,
      explain:"Internal/private describes the intended audience."
    },
    {
      q:"An API available only to approved external retailers is best described as:",
      choices:[
        "Partner API",
        "Private employee API",
        "Public API",
        "Localhost API"
      ],
      answer:0,
      explain:"Partner APIs are exposed to selected external organizations."
    },
    {
      q:"REST, SOAP, GraphQL, and gRPC primarily describe:",
      choices:[
        "Who is allowed to access the API",
        "Technical API styles or technologies",
        "Employee job titles",
        "Cloud billing models"
      ],
      answer:1,
      explain:"Audience and technical style are separate ways to categorize APIs."
    },
    {
      q:"What does API-first thinking emphasize?",
      choices:[
        "Treating the API contract as an intentional design concern",
        "Designing the API only after every client is complete",
        "Making every API public",
        "Avoiding documentation"
      ],
      answer:0,
      explain:"API-first means deliberately designing the interface consumers will rely upon."
    },
    {
      q:"Why is an API contract useful during troubleshooting?",
      choices:[
        "It provides expected behavior to compare against actual behavior",
        "It guarantees the server can never fail",
        "It removes authentication",
        "It hides request details"
      ],
      answer:0,
      explain:"Documentation and specifications describe expected behavior; requests and responses show actual behavior."
    }
  ],

  "Postman Platform & Workspaces": [
    {
      q:"What is a Postman collection?",
      choices:[
        "An organized group of requests",
        "A physical server",
        "A status code",
        "An encryption algorithm"
      ],
      answer:0,
      explain:"Collections organize related requests and can also share configuration and tests."
    },
    {
      q:"What is a Postman environment mainly used for?",
      choices:[
        "Storing variable values for a particular context",
        "Compiling Java",
        "Replacing HTTP",
        "Creating operating-system accounts"
      ],
      answer:0,
      explain:"Environment variables commonly hold values such as base URLs, tokens, and IDs."
    },
    {
      q:"What is a Postman workspace?",
      choices:[
        "An organizational area for related API resources and collaboration",
        "A single response body",
        "An authentication header",
        "A web browser cache"
      ],
      answer:0,
      explain:"Workspaces provide context and organization for collections, environments, and collaborators."
    },
    {
      q:"Where would you inspect how a request authenticates in Postman?",
      choices:[
        "Authorization",
        "Response timing",
        "History only",
        "Console title bar"
      ],
      answer:0,
      explain:"The Authorization area is one of the main places to inspect and configure request authentication."
    },
    {
      q:"Why can a shared known-good collection help a support team?",
      choices:[
        "It gives the team repeatable diagnostic requests",
        "It prevents all API errors",
        "It removes the need to understand HTTP",
        "It automatically fixes customer applications"
      ],
      answer:0,
      explain:"Known-good requests provide a reproducible baseline for comparison."
    }
  ],

  "Discover, Fork & Try APIs": [
    {
      q:"Why explore an existing public API collection before building requests from scratch?",
      choices:[
        "It may contain authoritative documentation and known-good examples",
        "It bypasses authentication",
        "It changes the publisher's server",
        "It guarantees every request will succeed"
      ],
      answer:0,
      explain:"Published collections and documentation can give you a reliable starting point."
    },
    {
      q:"What does forking a Postman collection give you?",
      choices:[
        "Your own editable copy with a relationship to the parent",
        "Permanent control over the publisher's original",
        "Automatic administrator rights",
        "A database backup"
      ],
      answer:0,
      explain:"A fork lets you experiment separately while retaining its relationship with the parent."
    },
    {
      q:"If the parent collection later changes, what can you do?",
      choices:[
        "Compare or pull appropriate changes into your fork",
        "Nothing—the relationship disappears immediately",
        "Only delete both collections",
        "Automatically overwrite the publisher's collection"
      ],
      answer:0,
      explain:"Fork workflows let you compare and incorporate upstream changes."
    },
    {
      q:"Why should you verify the selected environment before sending a request?",
      choices:[
        "Variables may resolve to different URLs, credentials, or values",
        "It changes your keyboard layout",
        "It controls monitor brightness",
        "It determines the HTTP specification version globally"
      ],
      answer:0,
      explain:"Identical-looking requests can behave differently when variables resolve differently."
    },
    {
      q:"What is a generated code snippet most useful for?",
      choices:[
        "Seeing how a known-good request can be represented in another language or tool",
        "Replacing all understanding of the request",
        "Bypassing authorization",
        "Changing the API documentation"
      ],
      answer:0,
      explain:"Code snippets are useful translations of configured requests, but you should still understand the HTTP details."
    }
  ],

  "API Mental Model": [
    {
      q:"What begins a typical web API interaction?",
      choices:[
        "A client sends a request",
        "The response sends a client",
        "The database calls the user",
        "The status code sends a server"
      ],
      answer:0,
      explain:"The client initiates the interaction by sending a request."
    },
    {
      q:"Which request component expresses the intended operation?",
      choices:[
        "HTTP method",
        "Response body",
        "Status code",
        "Server timing"
      ],
      answer:0,
      explain:"Methods such as GET, POST, PATCH, and DELETE communicate the intended operation."
    },
    {
      q:"Which request component identifies where the client is sending the request?",
      choices:[
        "URL",
        "Response status",
        "Response timing",
        "Server log level"
      ],
      answer:0,
      explain:"The URL identifies the target location/resource."
    },
    {
      q:"Which items can be part of a request?",
      choices:[
        "Headers, authentication, parameters, and body",
        "Only a status code",
        "Only response timing",
        "Only server logs"
      ],
      answer:0,
      explain:"Requests can contain multiple pieces of data and metadata."
    },
    {
      q:"Which three items are especially important when inspecting a response?",
      choices:[
        "Status code, headers, and body",
        "Keyboard, mouse, and monitor",
        "Method, URL, and client name only",
        "Username, password, and source code"
      ],
      answer:0,
      explain:"Status, headers, and body provide major pieces of response evidence."
    }
  ],

  "HTTP Methods": [
    {
      q:"Which method is commonly used to retrieve data?",
      choices:["GET","POST","PATCH","DELETE"],
      answer:0,
      explain:"GET commonly retrieves a resource or representation."
    },
    {
      q:"Which method is commonly used to create a new resource?",
      choices:["POST","GET","HEAD","OPTIONS"],
      answer:0,
      explain:"POST is commonly used to create resources or trigger operations."
    },
    {
      q:"Which method is commonly associated with a partial update?",
      choices:["PATCH","GET","DELETE","HEAD"],
      answer:0,
      explain:"PATCH commonly represents a partial modification."
    },
    {
      q:"Which method is commonly associated with removing a resource?",
      choices:["DELETE","GET","PATCH","OPTIONS"],
      answer:0,
      explain:"DELETE commonly requests removal of a resource."
    },
    {
      q:"If an API documents POST where you expected PATCH, what should you use?",
      choices:[
        "The method documented by that API",
        "Always PATCH",
        "Always GET",
        "Whichever method is shortest to type"
      ],
      answer:0,
      explain:"The API's own contract is authoritative."
    }
  ],

  "URLs & Parameters": [
    {
      q:"In /customers/42, what does 42 commonly represent?",
      choices:[
        "A path value identifying a resource",
        "A status code",
        "A header",
        "A request method"
      ],
      answer:0,
      explain:"Values embedded in a resource path commonly identify a specific resource."
    },
    {
      q:"In /tickets?status=open, what is status=open?",
      choices:[
        "A query parameter",
        "A path parameter",
        "A response header",
        "A method"
      ],
      answer:0,
      explain:"The query string begins after the question mark."
    },
    {
      q:"What does the host portion of https://api.example.com/v1/users identify?",
      choices:[
        "The server/domain being addressed",
        "The HTTP method",
        "The response status",
        "The JSON type"
      ],
      answer:0,
      explain:"The host identifies the network destination/domain."
    },
    {
      q:"What character normally begins the query string in a URL?",
      choices:["?","!","#","@"],
      answer:0,
      explain:"The question mark separates the path from the query string."
    },
    {
      q:"Why can a wrong base URL cause an API failure?",
      choices:[
        "The request may be sent to the wrong environment or service",
        "It changes GET into POST",
        "It converts JSON into XML",
        "It disables all headers"
      ],
      answer:0,
      explain:"A wrong base URL can send an otherwise valid request to the wrong destination."
    }
  ],

  "Headers": [
    {
      q:"Which header describes the media type of the request body?",
      choices:["Content-Type","Accept","Host","Date"],
      answer:0,
      explain:"Content-Type describes how the message body is represented."
    },
    {
      q:"Which header can express the response format a client prefers?",
      choices:["Accept","Content-Type","Authorization","Location"],
      answer:0,
      explain:"Accept communicates representations the client can accept."
    },
    {
      q:"Where are Bearer tokens commonly sent?",
      choices:[
        "Authorization header",
        "Status code",
        "URL scheme",
        "Response timing field"
      ],
      answer:0,
      explain:"Bearer tokens commonly appear in the Authorization header."
    },
    {
      q:"What are HTTP headers primarily?",
      choices:[
        "Metadata associated with requests or responses",
        "Database rows",
        "Operating systems",
        "HTTP methods"
      ],
      answer:0,
      explain:"Headers carry metadata about the HTTP message."
    },
    {
      q:"Valid JSON is being misinterpreted by an API. What should you inspect?",
      choices:[
        "Content-Type",
        "Only the monitor resolution",
        "Only DNS cache age",
        "The user's desktop wallpaper"
      ],
      answer:0,
      explain:"A missing or incorrect Content-Type can cause the receiver to interpret the body incorrectly."
    }
  ],

  "Request Bodies & JSON": [
    {
      q:"Which methods commonly carry a request body when creating or updating data?",
      choices:[
        "POST, PUT, or PATCH",
        "Only GET",
        "Only HEAD",
        "Only OPTIONS"
      ],
      answer:0,
      explain:"POST, PUT, and PATCH commonly send data in request bodies."
    },
    {
      q:"Which is valid JSON?",
      choices:[
        '{"name":"Jay"}',
        "{name:Jay}",
        "name = Jay",
        "<name>Jay"
      ],
      answer:0,
      explain:"JSON object keys and string values are normally enclosed in double quotes."
    },
    {
      q:"What might malformed JSON cause?",
      choices:[
        "A client-side request error such as 400",
        "A guaranteed 200 response",
        "Automatic authentication",
        "A DNS record update"
      ],
      answer:0,
      explain:"Invalid request syntax commonly results in a 4xx response."
    },
    {
      q:"If the body contains JSON, which Content-Type is commonly appropriate?",
      choices:[
        "application/json",
        "text/coffee",
        "image/png",
        "audio/wav"
      ],
      answer:0,
      explain:"application/json identifies a JSON representation."
    },
    {
      q:"Why should you inspect the exact body actually sent?",
      choices:[
        "A field may be missing, mistyped, incorrectly formatted, or contain the wrong value",
        "The body can never affect the response",
        "Bodies exist only for browsers",
        "Postman does not send bodies"
      ],
      answer:0,
      explain:"Payload differences are a common source of API failures."
    }
  ],

  "Responses & Status Codes": [
    {
      q:"What does the 2xx status-code family generally indicate?",
      choices:[
        "Successful processing",
        "Authentication only",
        "Client error",
        "Server error"
      ],
      answer:0,
      explain:"2xx codes generally indicate successful handling of the request."
    },
    {
      q:"What does a 400 response usually indicate?",
      choices:[
        "The server considered the request invalid or malformed",
        "The resource was definitely created",
        "The network cable is unplugged",
        "Authentication always succeeded"
      ],
      answer:0,
      explain:"400 Bad Request indicates the server could not accept the request as sent."
    },
    {
      q:"Which code commonly means authentication credentials are missing or invalid?",
      choices:["401","200","404","503"],
      answer:0,
      explain:"401 commonly represents an authentication problem."
    },
    {
      q:"Which code commonly means the server understood the identity but access is forbidden?",
      choices:["403","201","301","500"],
      answer:0,
      explain:"403 commonly represents an authorization or permission problem."
    },
    {
      q:"What does the 5xx family generally indicate?",
      choices:[
        "A server-side failure",
        "A successful client request only",
        "A query parameter",
        "A request method"
      ],
      answer:0,
      explain:"5xx responses indicate the server failed while handling the request."
    }
  ],

  "Authentication & Authorization": [
    {
      q:"What question does authentication answer?",
      choices:[
        "Who are you?",
        "What URL is this?",
        "What is JSON?",
        "How fast is DNS?"
      ],
      answer:0,
      explain:"Authentication establishes identity."
    },
    {
      q:"What question does authorization answer?",
      choices:[
        "What are you allowed to do?",
        "Who owns the monitor?",
        "Which HTTP method exists?",
        "What is the server hostname?"
      ],
      answer:0,
      explain:"Authorization determines permissions after identity is known."
    },
    {
      q:"A Bearer token is commonly sent in which header?",
      choices:[
        "Authorization",
        "Accept-Language",
        "Content-Length",
        "Date"
      ],
      answer:0,
      explain:"Bearer authentication commonly uses the Authorization header."
    },
    {
      q:"A valid user receives 403 on an admin-only endpoint. What is the likely category?",
      choices:[
        "Authorization/permissions",
        "JSON syntax only",
        "DNS only",
        "HTTP method does not exist"
      ],
      answer:0,
      explain:"403 commonly points to insufficient permission rather than unknown identity."
    },
    {
      q:"How should API credentials be treated?",
      choices:[
        "As secrets that should not be casually exposed",
        "As public documentation",
        "As harmless sample text",
        "As CSS"
      ],
      answer:0,
      explain:"Tokens, API keys, and passwords should be handled securely."
    }
  ],

  "Variables & Environments": [
    {
      q:"What does {{base_url}} represent in Postman?",
      choices:[
        "A variable reference",
        "A status code",
        "An HTTP method",
        "A JSON array"
      ],
      answer:0,
      explain:"Double curly braces reference a Postman variable."
    },
    {
      q:"Why use environments?",
      choices:[
        "To reuse requests with different context-specific values",
        "To disable HTTP",
        "To convert every request into SOAP",
        "To remove authentication"
      ],
      answer:0,
      explain:"Environments help switch values such as URLs and credentials without rewriting requests."
    },
    {
      q:"A request works in Dev but fails in Prod. What should you compare?",
      choices:[
        "Resolved environment variables",
        "Only screen resolution",
        "Only browser bookmarks",
        "Only collection folder colors"
      ],
      answer:0,
      explain:"Different environment values can change destination, credentials, IDs, and behavior."
    },
    {
      q:"What matters most when troubleshooting a variable?",
      choices:[
        "The value that actually resolves at send time",
        "Only the variable's color",
        "Only the variable name",
        "The order of browser tabs"
      ],
      answer:0,
      explain:"The transmitted value—not merely the placeholder—is what affects the request."
    },
    {
      q:"What can happen if the wrong environment is selected?",
      choices:[
        "A correct-looking request may go to the wrong system or use wrong credentials",
        "HTTP becomes FTP",
        "JSON automatically becomes CSV",
        "GET automatically becomes DELETE"
      ],
      answer:0,
      explain:"Environment mismatch is a common and very real API troubleshooting issue."
    }
  ],

  "Collections & Workflows": [
    {
      q:"What is a major benefit of saving requests in collections?",
      choices:[
        "Repeatability and organization",
        "Removing all status codes",
        "Eliminating APIs",
        "Changing HTTP specifications"
      ],
      answer:0,
      explain:"Collections make useful requests reproducible and organized."
    },
    {
      q:"Why organize a collection into folders?",
      choices:[
        "To group related requests and workflows",
        "To change the server's operating system",
        "To hide all headers",
        "To disable variables"
      ],
      answer:0,
      explain:"Folders help structure related operations or workflows."
    },
    {
      q:"What can sometimes be configured at collection level?",
      choices:[
        "Shared authorization or scripts",
        "The customer's physical router",
        "The server's CPU architecture",
        "DNS ownership"
      ],
      answer:0,
      explain:"Collections can share settings such as authorization and scripts."
    },
    {
      q:"Why is a known-good workflow useful?",
      choices:[
        "It gives you a reproducible baseline for troubleshooting",
        "It guarantees third-party applications are correct",
        "It prevents all errors",
        "It replaces documentation"
      ],
      answer:0,
      explain:"Known-good workflows let you compare successful and failing behavior."
    },
    {
      q:"What is better support evidence?",
      choices:[
        "A saved reproducible request",
        "Saying 'it seems broken'",
        "A guess without testing",
        "A screenshot with no context"
      ],
      answer:0,
      explain:"Reproducibility makes technical evidence much more useful."
    }
  ],

  "Postman Tests": [
    {
      q:"What is a Postman test?",
      choices:[
        "An automated assertion about a response or behavior",
        "A new HTTP protocol",
        "A database table",
        "A DNS record"
      ],
      answer:0,
      explain:"Tests automatically check expected conditions."
    },
    {
      q:"What can a status-code assertion verify?",
      choices:[
        "That the API returned the expected HTTP status",
        "That the monitor is connected",
        "That DNS is globally healthy",
        "That every API endpoint exists"
      ],
      answer:0,
      explain:"A test can compare the returned status with the expected value."
    },
    {
      q:"What can a response-body assertion check?",
      choices:[
        "Whether expected fields or values are present",
        "Only the URL scheme",
        "Only the HTTP method",
        "Only network latency"
      ],
      answer:0,
      explain:"Body assertions can validate structure and data."
    },
    {
      q:"When do Postman response tests evaluate?",
      choices:[
        "After a response is received",
        "Before the request exists",
        "Only when the computer reboots",
        "Only when DNS fails"
      ],
      answer:0,
      explain:"Response tests evaluate the actual returned result."
    },
    {
      q:"Why are tests useful in support engineering?",
      choices:[
        "They can quickly verify known expectations and reveal regressions",
        "They replace troubleshooting entirely",
        "They make every request succeed",
        "They remove permissions"
      ],
      answer:0,
      explain:"Automated checks make repeat investigations faster and more consistent."
    }
  ],

  "API Troubleshooting": [
    {
      q:"What should you do first with a reported API failure?",
      choices:[
        "Reproduce the exact interaction when possible",
        "Assume the server is down",
        "Change five variables at once",
        "Delete the collection"
      ],
      answer:0,
      explain:"Reliable reproduction gives you concrete evidence."
    },
    {
      q:"Why compare expected and actual behavior?",
      choices:[
        "The difference helps isolate the fault",
        "They should never be compared",
        "It removes the need for logs",
        "It automatically repairs the API"
      ],
      answer:0,
      explain:"Troubleshooting often begins with identifying where reality differs from the contract."
    },
    {
      q:"Why change one thing at a time during troubleshooting?",
      choices:[
        "So you can tell which change affected the result",
        "Because HTTP allows only one header",
        "Because APIs reject multiple tests",
        "Because Postman cannot save requests"
      ],
      answer:0,
      explain:"Controlled experiments preserve cause-and-effect evidence."
    },
    {
      q:"What makes an escalation more useful?",
      choices:[
        "Exact request, response, reproduction steps, observations, and tests already performed",
        "Only the words 'API broken'",
        "A guess with no evidence",
        "Removing the status code"
      ],
      answer:0,
      explain:"Evidence-rich escalation reduces duplicate work and helps the next engineer investigate."
    },
    {
      q:"A known-good Postman request succeeds but customer code fails. What should you do?",
      choices:[
        "Compare the two requests field by field",
        "Assume Postman is wrong",
        "Ignore the successful request",
        "Immediately rebuild the API"
      ],
      answer:0,
      explain:"The differences between a working and failing request are powerful troubleshooting evidence."
    }
  ],

  "Support Ticket Simulations": [
    {
      q:"A ticket says 'API doesn't work.' What information is most useful next?",
      choices:[
        "The actual request and response details",
        "The customer's favorite browser color",
        "The employee directory",
        "A random status code"
      ],
      answer:0,
      explain:"Concrete technical evidence turns vague tickets into diagnosable problems."
    },
    {
      q:"A customer receives 401. What should you investigate first?",
      choices:[
        "Authentication credentials and how they are being sent",
        "Screen resolution",
        "CSS styling",
        "Collection folder names"
      ],
      answer:0,
      explain:"401 commonly points toward missing, invalid, or expired authentication."
    },
    {
      q:"A customer receives 403 with a valid identity. What should you investigate?",
      choices:[
        "Permissions, roles, or scopes",
        "JSON indentation only",
        "Monitor brightness",
        "Local file names"
      ],
      answer:0,
      explain:"403 commonly points toward authorization."
    },
    {
      q:"A request succeeds in Test but not Production. What is a strong comparison point?",
      choices:[
        "Environment values and configuration",
        "Only the user's wallpaper",
        "Only the collection title",
        "Only response font size"
      ],
      answer:0,
      explain:"Environment-specific configuration is a natural investigation target."
    },
    {
      q:"What belongs in a strong technical escalation?",
      choices:[
        "Symptoms, reproduction, evidence, expected vs actual behavior, and troubleshooting already performed",
        "Only a severity label",
        "Only the customer's name",
        "No response details"
      ],
      answer:0,
      explain:"A complete escalation gives engineering enough context to continue the investigation efficiently."
    }
  ],

  "Capstone Investigation": [
    {
      q:"What is the strongest starting point for a capstone API investigation?",
      choices:[
        "A reproducible failing request",
        "A guess about the root cause",
        "Changing multiple settings",
        "Deleting evidence"
      ],
      answer:0,
      explain:"Reproducibility anchors the rest of the investigation."
    },
    {
      q:"What should you inspect on the request side?",
      choices:[
        "Method, URL, parameters, headers, auth, and body",
        "Only the response status",
        "Only the collection name",
        "Only response timing"
      ],
      answer:0,
      explain:"Those components collectively describe what the client actually sent."
    },
    {
      q:"What should you inspect on the response side?",
      choices:[
        "Status, headers, and body",
        "Only the request URL",
        "Only authentication",
        "Only the client's source code"
      ],
      answer:0,
      explain:"The response provides evidence about how the server handled the request."
    },
    {
      q:"After identifying one likely cause, what should you do?",
      choices:[
        "Test that hypothesis with a controlled change",
        "Change everything",
        "Skip validation",
        "Immediately close the case"
      ],
      answer:0,
      explain:"A controlled test helps confirm or reject the hypothesis."
    },
    {
      q:"If the problem requires engineering escalation, what is your goal?",
      choices:[
        "Provide enough reproducible evidence that investigation can continue without starting over",
        "Provide no technical detail",
        "Hide failed troubleshooting",
        "Remove the request and response"
      ],
      answer:0,
      explain:"Good escalation preserves evidence and reduces repeated investigative work."
    }
  ]

};