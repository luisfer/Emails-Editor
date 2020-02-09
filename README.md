# Emails-Editor

2020, Luisfer Romero Calero in Leiden for Miro

This is an Emails-Editor box that creates emails from input.

The main features are:

- Allows copy-pasted emails
- Validates emails (blue=valid, red=invalid)
- Allows email split by commas
- Counts valid emails and display them in a HTML alert (button 'Get email count')
- Adds random emails ("@randomemail.com") (button 'Add email')
- Allows adding more than one box

## Load

Once you have downloaded the .css and .js files included in this repository, create an HTML file in the same folder
To load Emails-Editor, add this to your HTML:

```
<link rel="stylesheet" href="emails-editor.css" />
<script type="text/javascript" src="./emails-editor.js"></script>
```

## Usage

After loading the files, the best way to call the ``EmailsEditor`` method is to attach the method to a DOM element (preferably a `<div>`). In the following example, after creating an HTML element called #emails-editor, we create a Javascript object and pass it as a parameter to ``EmailsEditor``.

```
<div id="emails-editor"></div>
<script type="text/javascript">
    const container = document.querySelector('#emails-editor');

    EmailsEditor({container: container, ...options});

</script>
```

#### How to implement options

Options are, for now, limited to one. Setting a subscriber that will capture every time the list of emails is updated, and will log to the browser console. The way to call it is:

```
    const options = {
      "suscriber": true
    }
    EmailsEditor({container: container, ...options});

```

If options are not needed, ``suscriber`` will be ``false`` by default, and be called the following way:

```
    EmailsEditor({container: container});

```

or

```
    const options = {};
    EmailsEditor({container: container, {}});
    // or also EmailsEditor({container: container, options: options})

```

When using the suscriber, every time the log shows an update of emails, it will be presented like this:

``"New emails list change", <emails>``

### API Methods

When creating an instance of EmailsEditor by calling the method and rendering a box in the DOM,
the method returns by default the store instance generated, called ``EmailsStore`` in the code.

There are three methods that can be called (and used) with the returned store object.

- ``getEmails()``: returns an array with all emails currently displayed in the box. Use:

```
const emailsInstance = EmailsEditor({container: container, ...options});
const emails = emailsInstance.getEmails();
console.log(emails); // will log an array with all emails
```

- ``getValidEmails()``: returns an array with all valid emails currently displayed in the box. This has the same outcome as using the 'Get email count' button in the box. Use:

```
const emailsInstance = EmailsEditor({container: container, ...options});
const validEmails = emailsInstance.getValidEmails();
console.log(validEmails); // will log an array with all valid emails
```

- ``setEmails()``: sets emails from an array and adds to the HTML element. Use:

```
const emailsInstance = EmailsEditor({container: container, ...options});
emailsInstance.setEmails(['example1@randomemail.zz', 'example2@randomemail.zz']);
```

### Example of using more than one box

```
<div id="emails-editor"></div>
<div id="emails-editor-2"></div>
<script type="text/javascript">
    const container = document.querySelector('#emails-editor');
    const container2 = document.querySelector('#emails-editor-2');
    EmailsEditor({container: container});
    EmailsEditor({container: container2});
</script>
```

Will create two boxes with independent stores.
