# URL-Shortener-Microservice

User Stories
I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response. Example : {"original_url":"www.google.com","short_url":1}
If I pass an invalid URL that doesn't follow the valid http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}. HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
When I visit the shortened URL, it will redirect me to my original link.
Creation Example:

POST [project_url]/api/shorturl/new - body (urlencoded) : url=https://www.google.com

Usage:
[this_project_url]/api/shorturl/3

Will redirect to:
http://forum.freecodecamp.com
