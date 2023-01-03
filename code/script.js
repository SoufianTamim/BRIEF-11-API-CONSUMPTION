let Random;


function GetRandom() {
  for (let i = 0 ; i < 6 ;i++) {
    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/random.php",
      type: "GET",
      dataType:"json",
      success: function (data) {
        Random = data.meals;
        BuildCard(Random);
      },
    });
  }
}
GetRandom()


function BuildCard(data){
  let CardsPlace = document.getElementById("cards");
  let Card = "";

  for( let i = 0 ; i < 6 ;i++){
    Card += `
    <div class="card" style="width: 18rem; height: 28rem;" id='${
      data[i].idMeal
    }'>
      <img src="${data[i].strMealThumb}" class="card-img-top" alt="Thumbnail ${
      data[i].strMealThumb
    }" width="100">
        <div class="card-body">
            <h5 class="card-title">${data[i].strMeal}</h5>
            <p>${data[i].strCategory} ${" : " +data[i].strArea}</p>
            <button class="btn btn-primary" id="${data[i].idMeal}" data-bs-toggle="modal" data-bs-target="#exampleModal">learn more ..</button>
        </div>
    </div>
    `;
    CardsPlace.innerHTML += Card
  }
}

function DisplayDetails() {
  let modalContent = document.getElementById("modalContent");
  modalContent += `
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Wontons</h1>
                        <img src="" class="card-img-top" alt="Thumbnail" width="100">
                    </div>
                    <div class="modal-body" >
                        <p class="modal-body"> Category </p>
                        <p class="modal-body"> Region </p>
                        <p>Ingredients</p>
                        <p></p>
                    </div>
                    < class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
     `;
  
  modalContent.innerHTML += Card;
      
}


