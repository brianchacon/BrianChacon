
window.onscroll = function() {

  var home      = document.getElementById('home');
  var about     = document.getElementById('about');
  var portfolio = document.getElementById('portfolio');
  var contact   = document.getElementById('contact');

  var posicionhome       = home.getBoundingClientRect();
  var posicionabout      = about.getBoundingClientRect();
  var posicionportfolio  = portfolio.getBoundingClientRect();
  var posicioncontact    = contact.getBoundingClientRect();

  //Limpiamos los colores
  editElementsByClass("navImg",null,"navBotActive");

  let selected = "navBotHome";

  if(posicioncontact.y<98)
     selected = "navBotContact";   
  
  else if(posicionportfolio.y<98)
      selected = "navBotPortfolio";
  
  else if(posicionabout.y<98)
     selected = "navBotAbout";
  
  else if(posicionhome.y<98)
      selected = "navBotHome";
 
  //agregamos a quien debe tener la clase necesitamos agregar
  editElementClass(selected,"navBotActive",null);
  editElementClass(selected+"Mobile","navBotActive",null);
};


//Agregar y/o quitar clases a un elemento by id
function editElementClass(id,addClass,deleteClass){

  var elem = document.getElementById(id);

  if(deleteClass !=  null)
    elem.classList.remove(deleteClass);
  if(addClass !=  null) 
    elem.classList.add(addClass);
}

//Agregar y/o quitar clases a un conjunto de elementos by class
function editElementsByClass(className,addClass,deleteClass){

  var elems = document.getElementsByClassName(className);

  for (var i = 0; i<elems.length; i++) {

    if(deleteClass !=  null)
      elems[i].classList.remove(deleteClass);
    if(addClass !=  null) 
      elems[i].classList.add(addClass);
  }
}