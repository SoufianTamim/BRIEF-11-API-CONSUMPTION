let Random,arr = [],ide,SearchTarget;
  

function GetRandom() {
  for (let i = 0; i < 6; i++) {
    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/random.php",
      type: "GET",
      async: false,
      success: function (data) {
        Random = data.meals[0];
        arr.push(Random)
      },
    });
  }
  BuildCard(arr);
}

GetRandom()

function BuildCard(data) {
  document.getElementById("cards").innerHTML = ""

  if (data === null || data.length == 0  ){
    document.getElementById("cards").innerHTML = `<h3>No item Found</h3>`
  }else{
    for (let i = 0; i < data.length; i++) {
      let Card = `
      <div class="card mt-4" style="width: 18rem; ">
        <img src="${data[i].strMealThumb}" class="card-img-top" alt="Thumbnail ${data[i].strMealThumb}" width="100">
          <div class="card-body">
              <h5 class="card-title">${data[i].strMeal}</h5>
              <p>...</p>
              <button class="btn btn-primary"  onclick="DisplayDetails(${data[i].idMeal})" >More ...</button>
          </div>
      </div>
      `;
      document.getElementById("cards").innerHTML += Card
    }
  }
}

function DisplayDetails(id) {

  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id,
    type: "GET",
    async: false,
    success: function (data) {
      ide = data.meals;
    },
  });
  let modalContent = document.getElementById("modalContent");

  if (ide[0].strTags == null || ide[0].strTags == "") {
    document.getElementById("tag").style.display = "none"
  } else if (ide[0].strArea == null || ide[0].strArea == "Unknown") {
    document.getElementById("area").style.display = "none"
  }

  let Ingred = "", Measure = "";
  
  for(let i = 1 ; i < 20 ;i++ ){
    if (ide[0]["strIngredient"+i] !== null && ide[0]["strIngredient"+i] !== ""&& ide[0]["strIngredient"+i] !== " "){
      Ingred += `<li>${ide[0]["strIngredient"+i]}</li>`
    }
    if (ide[0]["strMeasure"+i] !== null && ide[0]["strMeasure"+i] !== ""&& ide[0]["strMeasure"+i] !== " "){
      Measure += `<li>${ide[0]["strMeasure"+i]}</li>`
    }
  }

  modalContent.innerHTML = `
  <div class="modal-header d-flex justify-content-center ">
  <h1 class="modal-title fs-5" id="exampleModalLabel">${ide[0].strMeal}</h1> 
  </div>
  <div class="modal-body d-flex">
  <div > 
  <img src="${ide[0].strMealThumb}" class="rounded"  alt="Thumbnail ${ide[0].strMeal}" width="400">
  </div>
  <div class="col-md-8"> 
  <div class="ms-3">
  <div class="border rounded-3 m-1 ps-4">
  </ul class="m-1 p-2">
  <li> id : ${ide[0].idMeal}</li>
  <li> Category : ${ide[0].strCategory}</li>
  <li id="area"> Area : ${ide[0].strArea}</li>
  <li id="tag"> Tag : ${ide[0].strTags}</li>
  </ul>
  </div>
  <div class="border rounded-3 m-1 p-2">
  <h5>Instructions</h5>
  <p>${ide[0].strInstructions}</p>
  </div>
  <div class="border rounded-3 m-1 p-2  d-flex flex-row justify-content-around">
  <div>
  <h5>Ingredients</h5>
  <ol>${Ingred}</ol>  
  </div>
  <div>
  <h5>Measures</h5>
  <ol>${Measure}</ol>   
  </div>
  </div>
  </div>
  </div>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>  
  <a href="${ide[0].strYoutube}" target="_blank"><button type="button" class="btn btn-primary" >Go <i class="fa-brands fa-youtube"></i></button></a>
  </div>`;
  $('#exampleModal').modal('show');
}

