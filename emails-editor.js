
// TODOS:
/*
✅ 0. Create git repository
0.1 Create box function
✅ 1. Create event listeners with enter, comma.
✅ 2. Create blocks. A block can be deleted.
✅ 3. Create width to match parent.
4. Create scrollable textarea.
✅ 5. If email is not valid, the block is red.
✅ 6. Create button 'add email' that adds a random email (random email generator).
7. Create button 'get emails count' for a user to see an alert with ONLY valid emails count.
8. Create support for creating several emails editors in the DOM.
9. Make sure I can use it as a plugin elsewhere
✅  10. Bundle .css in .js file
11. Match design of the box
12. Add support for control+v and split commas
12.1. Add support for losing focus
13. Think of options ('API calls') and include them
14. Review and refine
15. Document options
*/

class EmailsStore {
	constructor(emails){
		this.emails = emails || [];
	}

	getEmails = () => {
		return this.emails;
	}

	setEmails = (arr) => {
		console.log(this.emails, arr);
		this.emails = [...this.emails,...arr];
		console.log(this.emails, arr);
	}

  addEmails = (emailContainer) => {
		this.clearEmails();
	  this.emails.slice().reverse().forEach(email => {
	    emailContainer.prepend(createEmail(email));
	  });
	}

	removeEmail = (index) => {
		this.emails = [...this.emails.slice(0, index), ...this.emails.slice(index+1)];
	}

	clearEmails = () => {
		document.querySelectorAll('.email').forEach(email => {
	    email.parentElement.removeChild(email);
	  });
	}
}

var store = new EmailsStore([]);

var EmailsEditor = function(args){

		let emailsContainer = document.createElement("div");
		emailsContainer.setAttribute('class', 'emails-container');
		let emailsContainerTitle = document.createElement("div");
		emailsContainerTitle.setAttribute('class', 'emails-container-title');
		emailsContainerTitle.innerHTML = "Share <b>Board Name</b> with others";
		let input = document.createElement("input");
		input.placeholder = "Add more people...";

		var emails = new EmailsStore([]);

		input.addEventListener('keyup', (e) => {
		    if (e.key === 'Enter') {
					if (e.target.value.toString().trim() !== ""){
						e.target.value.split(',').forEach(email => {
			        store.getEmails().push(email);
			      });
			      store.addEmails(emailsContainer);
			      input.value = '';
					}
		    }
		});

		document.addEventListener('click', (e) => {
			console.log(e.target);
		  console.log("tagName", e.target.tagName);
		  if (e.target.tagName === 'I') {
		    const emailLabel = e.target.getAttribute('data-item');
		    const index = store.getEmails().indexOf(emailLabel);
				store.removeEmail(index);
				console.log(store.getEmails());
		    store.addEmails(emailsContainer);
		  }
		})

		let addEmailButton = createAddEmailButton(emailsContainer);
		let getEmailCountButton = createAddEmailButton(emailsContainer);

		emailsContainer.appendChild(input);
		args.container.appendChild(emailsContainerTitle);
		args.container.appendChild(emailsContainer);
		args.container.appendChild(addEmailButton);
		args.container.appendChild(getEmailCountButton);
		input.focus();

		return true;

};

var createAddEmailButton = function(emailsContainer){
	let addEmailButton = document.createElement("button");
	addEmailButton.innerHTML = "Add Email";
	addEmailButton.addEventListener('click', (e) => {
		store.setEmails([generateRandomEmail()])
		store.addEmails(emailsContainer);
	});
	return addEmailButton;
}

var createAddEmailButton = function(emailsContainer){
	let addEmailButton = document.createElement("button");
	addEmailButton.innerHTML = "Add Email";
	addEmailButton.addEventListener('click', (e) => {
		store.setEmails([generateRandomEmail()])
		store.addEmails(emailsContainer);
	});
	return addEmailButton;
}


var helper = function(){

}

function createEmail(label) {
  const div = document.createElement('div');
	let isValid = validateEmail(label);
	if (isValid){
		div.setAttribute('class', 'email');
	} else {
		div.setAttribute('class', 'email email--invalid');
	}
  const span = document.createElement('span');
  span.innerHTML = label;
  const closeIcon = document.createElement('i');
  closeIcon.innerHTML = 'close';
  closeIcon.setAttribute('class', 'material-icons');
  closeIcon.setAttribute('data-item', label);
  div.appendChild(span);
  div.appendChild(closeIcon);
  return div;
}




function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function generateRandomEmail(){
	// Needs work. First letter has to be a char
	var chars = 'abcdefghijklmnopqrstuvwxyz';
	return chars[Math.floor(Math.random()*26)] + Math.random().toString(36).substring(2,11) + '@randomemail.com';
}
