# Pdc API

## Prospects

### structure in database:
prospect:
```
{
  "_id": String,
  "email": String,
  "firstname": String,
  "lastname": String,
  "gender": String,
  "adress": String,
  "postcode": Number,
  "city": String,
  "phone": String,
  "study_level": String,
  "asked_class": String,
  "current_class": String,
  "campaigns" : Array
}
```

### create prospect:

Add one prospect to database

url: /prospect

```
method: POST
body: {
  email :         { type: String, required: true },
  firstname :     { type: String, required: true },
  lastname :      { type: String, required: true },
  gender :        { type: String, required: true },
  adress :        { type: String, required: true },
  postcode :      { type: Number, required: true },
  city:           { type: String, required: true },
  phone:          { type: String, required: true },
  study_level:    { type: String, required: true },
  asked_class:    { type: String, required: true },
  current_class:  { type: String, required: true }
}
```

### update prospect:

Edit one or more properties of one prospect

url: /prospect/:\_id

```
method: PUT
body: {
  email :        { type: String, required: false },
  firstname :    { type: String, required: false },
  lastname :     { type: String, required: false },
  gender :       { type: String, required: false },
  adress :       { type: String, required: false },
  postcode :     { type: Number, required: false },
  city:          { type: String, required: false },
  phone:         { type: String, required: false },
  study_level:   { type: String, required: false },
  asked_class:   { type: String, required: false },
  current_class  { type: String, required: false }
}
```

### remove prospect:
Remove one prospect

url: /prospect/:\_id

```
method: DELETE
```

### find all prospects:

Get all prospects from database

url: /prospect

```
method: GET
```

### find prospect:
Get one prospects from database

url: /prospect/:\_id

```
method: GET
```


## Admins

### structure in database:
admin:
```
{
  "_id": String,
  "login": String,
  "password": String
}
```

### create admin:

Add one admin to database

url: /admin

```
method: POST
body: {
  login:     { type: String, required: true },
  password:  { type: String, required: true }
}
```
### login admin:

Check if login/password couple is in database

url: /admin/login

```
method: POST
body: {
  login:     { type: String, required: false }
  password:  { type: String, required: false }
}
```

### update admin:
Edit one or more properties of one admin

url: /admin/:\_id

```
method: PUT
body: {
  login:     { type: String, required: false }
  password:  { type: String, required: false }
}
```

### remove admin:

Remove one admin

url: /admin/:\_id

```
method: DELETE
```

### find all admins:

Get all admins from database

url: /admin

```
method: GET
```

### find admin:

Get one admins from database

url: /admin/:\_id

```
method: GET
```


## Campaigns

### structure in database:
prospect:
```
{
  "_id": String,
  "name": String,
  "type": String,
  "date": String,
  "outro_text": String,
  "prospects": Array 
}
```

### create campaign:

Add one campaign to database

url: /campaign

```
method: POST
body: {
  name:        { type: String, required: true },
  type:        { type: String, required: true },
  date:        { type: String, required: true },
  outro_text:  { type: String, required: true }
}
```

### update campaign:

Edit one or more properties of one campain

url: /campaign/:\_id

```
method: PUT
body: {
  name:        { type: String, required: false },
  type:        { type: String, required: false },
  date:        { type: String, required: false },
  outro_text:  { type: String, required: false }
}
```

### remove campaign:

Remove one campaign

url: /campaign/:\_id

```
method: DELETE
```

### find all campaigns:

Get all campaigns from database

url: /campaign

```
method: GET
```

### find campaign:

Get one campaigns from database

url: /campaign/:\_id

```
method: GET
```

### find campaign prospects:

Get all prospects of specific campaign

url: /campaign/:id/prospect

```
method: GET
```