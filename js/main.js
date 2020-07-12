let urlTeam;
let urlClasement;

const tokenApi = 'a97d836f073d4d6d845a49eb6014e7dd';

const fetchApi = (url) =>{
  return fetch(url,{
    headers:{
      'X-Auth-Token' : tokenApi
    }
  })
}

const getDataBola = (id) =>{
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
      </div>
      <div id="contentTim">
      </div>`
    document.querySelector("#bodyContent").innerHTML = titleData;

    let clubsData = '';
    data.standings[0].table.forEach((club) => {
      clubsData+=`
      <div class="col-12 my-3">
        <div class="card mb-3 p-3" >
          <div class="row no-gutters">
            <div class="col-md-2">
              <img src="${club.team.crestUrl}" class="card-img logo-team" style="width: 150px" alt="${club.team.name}">
            </div>
            <div class="col-md-10">
              <div class="card-body">
                <h3 class="card-title">${club.team.name} - ${club.points} pts</h3>
                <span class="card-text">#${club.team.position}</span>
                <span class="card-text">Won : ${club.won}</span>
                <span class="card-text">Draw : ${club.draw}</span>
                <span class="card-text">Lost : ${club.lost}</span>
                <br>
                <button type="button">Add to Favorites</button>
              </div>
            </div>
          </div>
        </div>
      </div>`
      document.querySelector("#contentTim").innerHTML=clubsData;
    })

    // document.querySelectorAll(".nav-link a").forEach((elm) => {
    //     elm.addEventListener("click",(event) => {
    //       page = elm.getAttribute("id");
    //       console.log(page);
    //     })
    //   })
  })
}

// function getContent(fragmentId){
//   return fragmentId;
// }

function loadContent(){
  let contentDiv = document.getElementById("bodyContent"),
      fragmentId = location.hash.substr(1);
  getDataBola(fragmentId);
}

if(!location.hash) {
  location.hash = "#2001";
}

loadContent();

window.addEventListener("hashchange", loadContent)
