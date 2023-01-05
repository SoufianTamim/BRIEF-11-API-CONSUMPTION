let Categories,
  CoutriesCat,
  All,
  AllCat=[];

function GetCategories() {
    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/categories.php",
      type: "GET",
      async: false,
      success: function (data) {
        Categories = data.categories;
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

document.getElementById("filter").onclick =function() {
    let SelectedCountry = document.getElementById("Countries").value;
    let SelectedCategory = document.getElementById("categ").value;
    let SelectedCategoryTarget = "", SelectedCountryTarget = "";
      $.ajax({
        url:
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
          SelectedCategory,
        type: "GET",
        async: false,
        success: function (data) {
          SelectedCategoryTarget = data.meals;
        },
      });
    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + SelectedCountry,
      type: "GET",
      async: false,
      success: function (data) {
        SelectedCountryTarget = data.meals;
      },
    });
  if (SelectedCountry !== "*" && SelectedCategory == "*") {
    console.log("countries");
    BuildCard(SelectedCountryTarget );
    
  } else if (SelectedCountry == "*" && SelectedCategory !== "*") {
    console.log("Categories");
    BuildCard(SelectedCategoryTarget);
  } else if (SelectedCategory == "*" && SelectedCountry == "*") {
    console.log("All");

    for (let i = 0; i < Categories.length; i++){
      // for (let j = 0; j < All.lenght; j ++){
        
        $.ajax({
          url:
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
          Categories[i].strCategory,
          type: "GET",
          async: false,
          success: function (data) {
            All = data.meals;
            AllCat.push(All);
            console.log(AllCat[i]);
            BuildCard(AllCat[i]);
            
          },
        });
        // }
      }



  } else {
    console.log("Both");
    BuildCardById(SelectedCategoryTarget, SelectedCountryTarget);
  }
}


function BuildCardById(array1, array2) {
  let result = [];
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i].idMeal === array2[j].idMeal) {
          result.push(array1[i]);
        }
			}
    }
  BuildCard(result)
}