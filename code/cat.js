let Categories,CoutriesCat;

function GetCategories() {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    type: "GET",
    async: false,
    success: function (data) {
      Categories = data.categories;
      AddCategories(Categories);
      console.log(Categories[0].strCategory);
    },
    });
}
GetCategories();
function AddCategories(data){
  for(let i = 0 ; i < data.length ; i++){
    let sel =`<option value="${data[i].strCategory}">${data[i].strCategory}</option>`
    document.getElementById("categ").innerHTML += sel
  }
}

function GetCountries() {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
    type: "GET",
    async: false,
    success: function (data) {
      CoutriesCat = data.meals;
      AddCountry(CoutriesCat);
      console.log(CoutriesCat[0].strArea);
    },
    });
}

GetCountries();
function AddCountry(data){
  for(let i = 0 ; i < data.length ; i++){
    let sel =`<option value="${data[i].strArea}">${data[i].strArea}</option>`
    document.getElementById("Countries").innerHTML += sel
  }
}