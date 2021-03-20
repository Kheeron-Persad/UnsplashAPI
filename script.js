//get acces to input box
const input = document.getElementById("input");

// add event on enter
input.addEventListener("keydown", function(event)
{
  if (event.key == "Enter")
    loadImg();
});

// create an array of images
function createImagesArray(data)
{
  const imageNodes = [];
  for(let i = 0;i < data.results.length;i++)
  {
    imageNodes[i] = document.createElement("div");
    imageNodes[i].className = "img";
    imageNodes[i].style.backgroundImage = "url("+data.results[i].urls.raw+")";
    imageNodes[i].addEventListener("dblclick", function(){
    window.open(data.results[i].links.download, '_blank');
    })
    document.getElementsByClassName("grid")[0].insertAdjacentElement("beforeend", imageNodes[i]);
  }
}

// create the function for loadImg
function loadImg()
{
  removeImages();

  const url = "https://api.unsplash.com/search/photos?query='"+input.value+"'&per_page=9&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo";

  fetch(url)

  .then(response => 
  {
      if(response.ok)
        return response.json();
      else
        console.log(response.status);
  })

  .then(data =>
  { 
    createImagesArray(data);
  });    
}

function removeImages()
{
  var i = 0;
  var list = document.getElementsByClassName("grid")[0];

  while(i < list.childNodes.length)
  {
    list.removeChild(list.childNodes[i]);
  }
}

