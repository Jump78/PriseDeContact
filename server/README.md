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

request
```
method: POST
body: {
  email:          { type: String, required: true },
  firstname:      { type: String, required: true },
  lastname:       { type: String, required: true },
  gender:         { type: String, required: true },
  adress:         { type: String, required: true },
  postcode:       { type: Number, required: true },
  city:           { type: String, required: true },
  phone:          { type: String, required: true },
  study_level:    { type: String, required: true },
  asked_class:    { type: String, required: true },
  current_class:  { type: String, required: true },
  campaign_id:    { type: ObjectId, required: false}
}
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'prospect add' },
  content : { type: Object, description: prospect just add in database }
}
```

### update prospect:

Edit one or more properties of one prospect

url: /prospect/:\_id

request
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

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'prospect udated' },
  content : { type: Object, description: prospect just edited in database }
}
```

### remove prospect:
Remove one prospect

url: /prospect/:\_id

request
```
method: DELETE
```

success response
```
{
  status :  { type: Number, description: value = 204 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'prospect deleted' }
}
```

### find all prospects:

Get all prospects from database

url: /prospect

request
```
method: GET
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'all prospects found' },
  content : { type: Array, description: array of prospect schema }
}
```

### find prospect:
Get one prospects from database

url: /prospect/:\_id

request
```
method: GET
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'prospect found' },
  content : { type: Object, description: prospect schema }
}
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

request
```
method: POST
body: {
  login:     { type: String, required: true },
  password:  { type: String, required: true }
}
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'new admin account !' },
  content : { type: Object, description: admin schema without password }
}
```

### login admin:

Check if login/password couple is in database

url: /admin/login

request
```
method: POST
body: {
  login:     { type: String, required: false }
  password:  { type: String, required: false }
}
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'admin account found' },
  content : { type: Object, description: admin schema without password }
}
```

### update admin:
Edit one or more properties of one admin

url: /admin/:\_id

request
```
method: PUT
body: {
  login:     { type: String, required: false }
  password:  { type: String, required: false }
}
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'admin udated' },
  content : { type: Object, description: admin schema without password }
}
```

### remove admin:

Remove one admin

url: /admin/:\_id

request
```
method: DELETE
```

success response
```
{
  status :  { type: Number, description: value = 204 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'admin deleted' }
}
```

### find all admins:

Get all admins from database

url: /admin

request
```
method: GET
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'all admins found' },
  content : { type: Array, description: array of admins schemas without password }
}
```

### find admin:

Get one admins from database

url: /admin/:\_id

request
```
method: GET
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'admin found' },
  content : { type: Object, description: admin schema without password }
}
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

request
```
method: POST
body: {
  name:        { type: String, required: true },
  type:        { type: String, required: true },
  date:        { type: String, required: true },
  outro_text:  { type: String, required: true }
}
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'campaign add' },
  content : { type: Object, description: campaign just add in database }
}
```

### update campaign:

Edit one or more properties of one campain

url: /campaign/:\_id

request
```
method: PUT
body: {
  name:        { type: String, required: false },
  type:        { type: String, required: false },
  date:        { type: String, required: false },
  outro_text:  { type: String, required: false }
}
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'campaign update' },
  content : { type: Object, description: campaign just edited in database }
}
```

### remove campaign:

Remove one campaign

url: /campaign/:\_id

request
```
method: DELETE
```

success response
```
{
  status :  { type: Number, description: value = 204 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'campaign deleted' }
}
```

### find all campaigns:

Get all campaigns from database

url: /campaign

request
```
method: GET
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'all campaigns found' },
  content : { type: Array, description: array of campaigns schemas }
}
```

### find campaign:

Get one campaigns from database

url: /campaign/:\_id

request
```
method: GET
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'campaign found' },
  content : { type: Object, description: campaign schema }
}
```

### find campaign prospects:

Get all prospects of specific campaign

url: /campaign/:id/prospect

request
```
method: GET
```

success response
```
{
  status :  { type: Number, description: value = 200 },
  success : { type: Number, description: value = 1 },
  message : { type: String, description: value = 'campaign prospects found' },
  content : { type: Array, description: array of prospects schemas }
}
```