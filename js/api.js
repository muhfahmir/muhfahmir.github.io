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

const getBgColor = (index) => {
  const color = ["primary","secondary","success","danger","warning","info","dark"];
  return color[index];
}

const getRankColor = (rank) => {
  const color = ["dark","danger","warning","info"]
  return color> 3?color[0]:color[rank];
}

const getDataBola = (id) =>{
  urlClasement = `https://api.football-data.org/v2/competitions/${id}/standings`
  fetchApi(urlClasement).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    // console.log(`${data.competition.name},${data.season.startDate},${data.season.endDate},${data.competition.area.name}`)
    let indexColor = Math.floor(Math.random()*7);
    let bgColor = getBgColor(indexColor);
    const titleData = `
    <div class="col-md-12 my-3 text-white">">
        <div class="card titleLeague bg-${bgColor}">
          <div class="card-body">
            <h2 class="card-title">${data.competition.name}</h2>
            <span class="card-text">Start Date : ${data.season.startDate}</span><br>
            <span class="card-text">End Date : ${data.season.endDate}</span>
            <span class="countryLeague">Country : ${data.competition.area.name}</span>
          </div>
        </div>
    </div>`
    document.querySelector("#contentHome").innerHTML = titleData;

    let clubsData = '';
    data.standings[0].table.forEach((club) => {
      let colorRank = getRankColor(club.position);
      clubsData+=`
      <div class="col-md-12 col-sm-12 my-3 col-xs-12">
        <div class="card cardTeam" >
          <div class="row no-gutters">
            <div class="col-md-2 col-sm-3 p-3 col-xs-12 text-center">
              <img src="${club.team.crestUrl}" class="card-img imgTeam"alt="${club.team.name}">
            </div>
            <div class="col-md-10 col-sm-9 col-xs-12">
              <div class="card-body">
                <span class="card-title nameTeam">${club.team.name} -<b> ${club.points} pts</b></span>
                <span class="card-text rankTeam text-${colorRank}">#${club.position}</span><br>
                <span class="statusTeam bg-success text-white"><b>Won : ${club.won}</b></span>
                <span class="statusTeam bg-warning text-white"><b>Draw : ${club.draw}</b></span>
                <span class="statusTeam bg-danger text-white"><b>Lost : ${club.lost}</b></span><br>
                <span class="card-text "><b><i class="far fa-clock"></i> Jumlah Pertandingan : ${club.playedGames}</b></span><br>
                <span class="card-text "><b><i class="far fa-futbol"></i> Goals : ${club.goalsFor}</b></span><br>
              </div>
            </div>
          </div>
        </div>
      </div>`
      document.querySelector("#contentTim").innerHTML=clubsData;
    })
  })
}