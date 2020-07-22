document.addEventListener("DOMContentLoaded",function(){
	loadNav()
	function loadNav(){
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.querySelectorAll(".navbar-nav").forEach((elemen) => {
					elemen.innerHTML = xhttp.responseText;
				});
				
				document.querySelector(".navbar-brand").addEventListener("click", () => {
					loadContent('2001');
				});

				document.querySelectorAll(".navbar-nav a").forEach((elemen) =>{
					elemen.addEventListener("click", (event) => {
						let pageId = elemen.getAttribute("id");
						loadContent(pageId);
					});
				});
			}
		};
		xhttp.open("GET", `navbar.html`, true);
		xhttp.send();
	}
	let loadContent = (pageId) =>{
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let content = document.querySelector("#bodyContent");
				content.innerHTML = this.responseText;
				getDataBola(pageId);
			}
		};
		xhttp.open("GET", `pages/content.html`, true);
		xhttp.send();
	}
	loadContent('2001');
});