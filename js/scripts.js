//const jsonData= require('../Files/proyects.json');


menuIdSelected = 'homeMenuBarLink';

var proyectList = [];

function loadProyects(){
  
  const dire = 'https://ideaschacon.com/ich/proyects/getAll.php';
  
  fetch(dire)
  .then(response => {
     return response.json();
  })
  .then(jsondata => {
    proyectList = jsondata;
    proyectList.forEach(proyect => {
      interpolation(proyect)
    });
    document.getElementById('portfolio-spinner').innerHTML ="";
  });
  showFullImage(false,0);
}

function getMinUrl(url,text){
  let parts = url.split(".");
  let response = "";

  
  response = parts[parts.length-2]+text+'.'+parts[parts.length-1] ;
  for(let i = parts.length-3 ; i>=0; i--){
      response = parts[i]+'.'+response;
  }

  return response;
}

function interpolation(proyect){
  const id = proyect.id;
  const name = proyect.name;
  const company = proyect.company;
  const techs = proyect.techs;
  const description = proyect.description;
  const dateData = proyect.dateData;
  const imgUrls = proyect.imgUrls;
  const link = proyect.link == '#nogo'?'':proyect.link;
  let buttons = "";
  let count = 0;
  imgUrls.forEach( url =>{
    let shortUrl = getMinUrl(url,'_min');
    let fullUrl = url;
    count++;
    buttons += '<button class="portfolio-item-card-list-option" onclick="setImage('+id+',\''+shortUrl+'\',\''+fullUrl+'\','+count+','+imgUrls.length+')" id="btnItem'+id+'_'+count+'">'+count+'</button>';
  });
  const imgMin = imgUrls.length >0 ?  getMinUrl(imgUrls[0],'_min') : '';
  const fullUrl = imgUrls.length >0 ?  imgUrls[0] : '';
  
  const newItemStr = 
    ' <div class="col-12 col-md-12 pageContainer" >'+
    '  <div class="portfolio-item-card-shadow">'+
    '      <div class="card portfolio-item-card">'+
    '          <div class="row">'+
    '              <div class="col-12" style="text-align: center;margin-bottom: 35px;">'+
    '                  <span class="text-span-colored-blue" style="font-size: 50px;">'+name+'</span>'+
    '              </div>'+
    '              <div class="col-12 col-md-7">'+
    '                  <span class="portfolio-item-card-preview">'+
    '                      <span class="portfolio-item-card-img-container" onclick="showFullImage(true,'+id+');">'+
    '                          <img src="'+imgMin+'" alt="" class="imgPreviewClass"  id="imgPreview'+id+'">'+
    '                          <input value="'+fullUrl+'" type="hidden" id="imgInput'+id+'">'+
    '                      </span>'+
    '                      <span class="portfolio-item-card-img-selector">'+
    '                          <span class="portfolio-item-card-list">'+
 buttons+
    '                          </span>'+
    '                      </span>'+
    '                  </span>'+
    ''+
    '              </div>'+
    '              <div class="col-12 col-md-5" style="border-left: 2px solid #e5e5e5;">'+
    '                  <h3>'+company+'</h3>'+
    '                  <span style="min-height: 16vh;">'+
    '                      <p class="portfolio-item-card-p-link">'+
    '                          <a class="" href="'+link+'" target="_blank" >'+
                                            link+
    '                          </a>'+
    '                      </p>'+
    '                      <p>'+description+'</p>'+
    '                  </span>'+
    ''+
    '                  <p class="date-text">'+dateData+'</p>'+
    '                  '+
    '                  <b>'+techs+'</b>'+
    '              </div>'+
    '          </div>'+
    '      </div>'+
    '  </div>'+
    ''+
    '</div>';

  document.getElementById('portfolio').innerHTML = document.getElementById('portfolio').innerHTML + newItemStr;

  document.getElementById('btnItem'+id+'_1').classList = ['portfolio-item-card-list-option active'];
}

function showFullImage(show,id){
  if(id != 0)
    document.getElementById('modal-image-full').src = document.getElementById('imgInput'+id).value;
  
  document.getElementById('modal-image-view-id').style = show ? 'display: inherit': 'display: none';
}


function setImage(id,src,fullUrl,count,length){
  document.getElementById('imgPreview'+id).src = src;
  document.getElementById('imgInput'+id).value = fullUrl;

  for(let i = 1; i<length+1; i++){

    document.getElementById('btnItem'+id+'_'+i).classList = ['portfolio-item-card-list-option'];
  }
  document.getElementById('btnItem'+id+'_'+count).classList = ['portfolio-item-card-list-option active'];
}

function selectMenuOption(id,className){
  menuIdSelected = id;
  //Obtenemos elementos activos y les quitamos la propiedad de activo
  let selectedList = document.getElementsByClassName('btn-menu-active');
  for(let i= 0; i< selectedList.length;i++){
    const elem = selectedList[i];
    
    var list2 = [];
    
    for(let j= 0; j< document.getElementById(elem.id).classList.length;j++){
      const c = document.getElementById(elem.id).classList[j];
    
      if(c == 'btn-menu-active'){
        list2[j] = 'btn-menu';
      } else {
        list2[j] = c ;
      }
    }
    
    document.getElementById(elem.id).classList = list2.join(' ');
  }

  //Marcamos nuevo elemento activo
  var list = [];
  
  for(let i= 0; i< document.getElementById(id).classList.length;i++){
    const c = document.getElementById(id).classList[i];
    if(c == 'btn-menu'){
      list[i] = 'btn-menu-active';
    } else {
      list[i] = c;
    }
  }
  
  document.getElementById(id).classList = list.join(' ');
}

function detectEdges(){
  menuIdSelected = 'homeMenuBarLink';
  let elemId = '';
  
  let elems = ['home','about','portfolio','contact'];
  let acumulador = 0;
  let ends = false;
  elems.forEach( elemName =>{
    acumulador += document.getElementById(elemName).getBoundingClientRect().height;
    if( scrollY <= acumulador && !ends){
      elemId = elemName;
      ends = true;
    }
  });
  
 // document.getElementById('seeData').innerHTML = 'scroll:'+scrollY+'| name:'+elemId;


  selectMenuOption(elemId+'MenuBarLink','btn-menu');
}