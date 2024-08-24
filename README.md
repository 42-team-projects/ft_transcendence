# ft_transcendence


to install the requirements run: `pip install -r requirements.txt`

<pre>
/ft_transcendence/
├── backend/
│   ├── project/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
├── .gitignore
├── requirements.txt
└── README.md
</pre>


### APIs:

Serializers: are used to convert complex data types, such as Django model instances, into Python data types that can be easily rendered into JSON

Endpoints: is the URL of the API you can call to get the data you want e.g
`https://www.mysite.com/api/users` # GET returns all users (collection)
`https://www.mysite.com/api/users/<id>` # GET returns a single user

### Notes:
> Authorization is asking for permission to do stuff. Authentication is about proving you are the correct person because you know things.

> The bare bones is the absolute minimum, the plain essential elements or facts, or the most basic framework of something. Bare often means uncovered, but in this case it means unadorned, plain, or scarcely or just sufficient.

### django orm:
+ Tables / Fields
+ QuerySets
+ Managers
+ Backends (Databases Systems)

<model>.<manager>.<method>() # manager is an object that is used to query the database for the model
Student.objects.all() # SELECT * FROM student
