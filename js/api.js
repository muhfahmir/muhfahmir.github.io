let urlTeam;
let urlClasement;

const tokenApi = 'a97d836f073d4d6d845a49eb6014e7dd';

const fetchApi = (url) =>{
	return fetch(url,{
		headers:{
			'X-Auth-Token' : tokenAPI
		}
	})
}

const getDataBola => (id) =>{
	urlClasement = `https://api.football-data.org/v2/competitions/${id}/standings`
	fetchApi(urlClasement).then((response) => {
		return response.json();
	}).then((data) => {
		console.log(data);
		// console.log(`${data.competition.name},${data.season.startDate},${data.season.endDate},${data.competition.area.name}`)
		const titleData = `
		<div class="col-12 my-3">
	      <div class="card">
	        <div class="card-body">
	          <h1 class="card-title">${data.competition.name}</h1>
	          <p class="card-text">Start Date : ${data.season.startDate}</p>
	          <p class="card-text">End Date : ${data.season.endDate}</p>
	          <p class="card-text" style="float: right">Country : ${data.competition.area.name}</p>
	        </div>
	      </div>
	    </div>`
    document.querySelector("#bodyContent").innerHTML = titleData;
	})
}