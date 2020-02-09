
/* Tasks:

✅ 0. Create git repository
✅ 1. Create event listeners with enter, comma.
✅ 2. Create blocks. A block can be deleted.
✅ 3. Create width to match parent.
✅ 4. Create scrollable textarea.
✅ 5. If email is not valid, the block is red.
✅ 6. Create button 'add email' that adds a random email (random email generator).
✅ 7. Create button 'get emails count' for a user to see an alert with ONLY valid emails count.
✅ 8. Create support for creating several emails editors in the DOM.
✅ 11. Match design of the box
✅ 12. Add support for control+v and split commas
✅ 12.1. Add support for losing focus
✅ 13. Think of options ('API calls') and include them
14. Review and refine
15. Document options
✅  16. Tidy up css

BUGS:
✅ 1. Deleting an email doesn't work
✅ 2. Both container share the same emails
✅ 3. Spaces screw up the email comma listeners

*/

(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {

		define([], function () {
      return (root.EmailsEditor = factory());
    });
  } else if (typeof exports === 'object') {

		module.exports = factory();
  } else {

		root.EmailsEditor = factory();
  }

})(this, function () {

  'use strict';

	class EmailsStore {
		constructor(id, suscriber){
			this.id = id;
			this.suscriber = suscriber;
      this.emails = [];
		}

		setContainer = (container) => {
			this.container = container;
		}

		getEmails = () => {
			return this.emails;
		}

    setEmails = (emails) => {
      emails.forEach((email) => {
        if (email.trim() !== ""){
          this.emails.push(email);
        }
      })
      this.updateContainer();
		}

		removeEmail = (emailLabel) => {
			const index = this.emails.indexOf(emailLabel);
			this.emails = [...this.emails.slice(0, index), ...this.emails.slice(index+1)];
			this.updateContainer();
		}

		updateContainer = () => {
			this.clearEmails();
		  this.emails.slice().reverse().forEach(email => {
		    this.container.prepend(createEmail(email, this.id));
		  });
			if (this.subscriber){
				this.onEmailsChanged();
			}
		}

		clearEmails = () => {
			let emailClass = '.email__' + this.id;
			document.querySelectorAll(emailClass).forEach(email => {
		    email.parentElement.removeChild(email);
		  });
		}

		getValidEmails = () => {
			return this.emails.filter((email) => validateEmail(email) == true);
		}

		onEmailsChanged = () => {
			console.log("New emails list change", this.emails)
		}
	};

	var stores = [];

  var EmailsEditor = function(args){

    let uuid = uuidv4();

    // Array of stores in case this method is called more than once
    // Having several stores allows the user to generate more than one emails editor DOM element

    // Every time the method is called, there is a new unique store calling
    // the class EmailsStore

    let suscriber = false;
    if (args.options && args.options["suscriber"]){
      suscriber = args.options["suscriber"];
    }

		stores.push({id: uuid, store: new EmailsStore(uuid,suscriber)});

		args.container.setAttribute('class', 'container');

		let emailsBox = document.createElement("div");
		emailsBox.setAttribute('id', 'container__' + uuid);
		emailsBox.setAttribute('class', 'emails-box');

		let currentStore = stores.find(x => x.id === uuid).store;

    // Attaching the DOM element to the store
		currentStore.setContainer(emailsBox);

    // Creation of emails editor title

		let containerTitle = document.createElement("div");
		containerTitle.setAttribute('class', 'container-title');
		containerTitle.innerHTML = "Share <span class=\"bold\">Board Name</span> with others";

    // Creation of input with its listeners

    let input = document.createElement("input");
		input.placeholder = "Add more people...";
		input.addEventListener('keyup', (e) => {
		    if (e.key === 'Enter') {
					if (e.target.value.toString().trim() !== ""){
						e.target.value.split(',').forEach(email => {
			        currentStore.setEmails([email]);
			      });
			      input.value = '';
					}
		    }
		});
		input.addEventListener('blur', (e) => {
			if (e.target.value.toString().trim() !== ""){
				e.target.value.split(',').forEach(email => {
					currentStore.setEmails([email]);
				});
				input.value = '';
			}
		})

    // Adding DOM elements to the container

		emailsBox.appendChild(input);
		args.container.appendChild(containerTitle);
		args.container.appendChild(emailsBox);

    // Buttons and buttons container

    let addEmailButton = document.createElement("button");
		addEmailButton.innerHTML = "Add email";
		addEmailButton.addEventListener('click', (e) => {
			currentStore.setEmails([generateRandomEmail()])
		});

		let getEmailCountButton = document.createElement("button");
		getEmailCountButton.innerHTML = "Get email count";
		getEmailCountButton.addEventListener('click', (e) => {
			alert("Valid emails: " + currentStore.getValidEmails().length);
		});

		let buttonsContainer = document.createElement("div");
		buttonsContainer.setAttribute('class', 'buttons-container');
		buttonsContainer.appendChild(addEmailButton);
		buttonsContainer.appendChild(getEmailCountButton);
		args.container.appendChild(buttonsContainer);

		input.focus();

    return currentStore;
	}

  // Function to create an email entry to be added to the input elements

	function createEmail(label, uuid) {
	  const div = document.createElement('div');
		let isValid = validateEmail(label);
		if (isValid){
			div.setAttribute('class', 'email ' + 'email__' + uuid);
		} else {
			div.setAttribute('class', 'email email--invalid ' + 'email__' + uuid);
		}
	  const span = document.createElement('span');
	  span.innerHTML = label;
	  const closeIcon = document.createElement('i');
	  closeIcon.innerHTML = 'close';
	  closeIcon.setAttribute('class', 'material-icons');
	  closeIcon.setAttribute('data-item', label);
		closeIcon.addEventListener('click', (e) => {
			const emailLabel = e.target.getAttribute('data-item');
			const currentStore = stores.find(x => x.id === uuid).store;
			currentStore.removeEmail(emailLabel);
		});
	  div.appendChild(span);
	  div.appendChild(closeIcon);
	  return div;
	}

	// Helper functions: email validation, generation of random emails and generation of unique uuids for the stores

	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	function generateRandomEmail(){
		var chars = 'abcdefghijklmnopqrstuvwxyz';
		return chars[Math.floor(Math.random()*26)] + Math.random().toString(36).substring(2,11) + '@randomemail.com';
	}

	function uuidv4() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	return EmailsEditor;
});
