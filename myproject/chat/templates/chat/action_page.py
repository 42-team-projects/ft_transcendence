#!/usr/bin/env python3

import cgi
import cgitb

# Enable CGI error reporting
cgitb.enable()

# Create an instance of FieldStorage
form = cgi.FieldStorage()

# Get the query string from the environment variable
query_string = os.environ.get('QUERY_STRING', '')

# Print HTTP headers
print("Content-Type: text/html")
print()  # End of headers

# Print the HTML content
print(f"<html><head><title>Query String</title></head>")
print(f"<body><h1>Query String</h1>")
print(f"<p>Query string: {cgi.escape(query_string)}</p>")
print(f"</body></html>")
