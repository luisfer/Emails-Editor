
// TODOS:
/*
0. Create git repository
1. Create event listeners with enter, comma, losing focus.
2. Create blocks. A block can be deleted.
3. Create width to match parent.
4. Create scrollable textarea.
5. If email is not valid, the block is red.
6. Create button 'add email' that adds a random email (random email generator).
7. Create button 'get emails count' for a user to see an alert with ONLY valid emails count.
8. Create support for creating several emails editors in the DOM.
9. Make sure I can use it as a plugin elsewhere
10. Bundle .css in .js file
11. Match design of the box
12. Add support for control+v and split commas
13. Think of options ('API calls') and include them
14. Review and refine
15. Document options
*/

var EmailsEditor = function(obj){

		let obj2 = {...obj};
		console.log(document, obj);
		let li = document.createElement("li");
		li.innerHTML = "Hello";
		li.addEventListener("click",function(e) {
	  	console.log("li clicked");
		});
		let store = new EmailsStore([]);
		store.getEmails();
		obj2.container.appendChild(li);
		return true;

};

class EmailsStore {
	constructor(emails){
		this.emails = emails || [];
	}

	getEmails = () => {
		console.log("getEmails called");
	}

}
var helper = function(){

}
