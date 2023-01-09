//============ intializing a data reference for all the arrays for pagination 

setTimeout(function () {
  $("#filter").click();
}, 500);


const DATA = { AllCats: [], result: [], SelectedCategoryTarget: [], SelectedCountryTarget: [], SearchTarget: [] }
//============ declaring variables to use get api arrays
let Categories, CoutriesCat, All, AllCat = [];
//============ Search fucntion to search meals by name
document.getElementById("SearchBtn").onclick = function (e) {
  e.preventDefault()
  let SearchValue = document.getElementById("SearchInput").value;
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + SearchValue,
    type: "GET",
    async: false,
    success: function (data) {
      SearchTarget = data.meals;
      DATA.SearchTarget = SearchTarget
      console.log(SearchTarget);
    },
  });
  Paginate("SearchTarget")
}
//============= building a paginaation function to help us arrange arrays come from the api
function Paginate(array, PageId = 1, CardsNum = 6) {
  let Index, StartIndex, EndIndex, Portion = [], Reminder, MaxPageNum;
  //============= initializing variables and asigning to each of them functioanality
  FunctionArray = DATA[array];
  Portion.length = 0;
  Index = PageId * CardsNum;
  StartIndex = Index - CardsNum;
  EndIndex = StartIndex + CardsNum;
  Reminder = FunctionArray.length % CardsNum;
  //=============  Calculating reminder and giving it floor function to not let it be a decimale number
  if (Reminder == 0) {
    MaxPageNum = Math.floor(FunctionArray.length / CardsNum);
  } else {
    MaxPageNum = Math.floor(FunctionArray.length / CardsNum) + 1;
  }
  for (let i = StartIndex; i < EndIndex; i++) {
    Portion.push(FunctionArray[i]);
  }
  //============ building portion cards
  BuildCard(Portion);
  //============= building paginatiion buttons
  BuildPagination(PageId, MaxPageNum, array, CardsNum);
}
//============= building paginatiion buttons functin
function BuildPagination(PageId, MaxPageNum, array, CardsNum) {
  let HtmlPagination = document.querySelector(".pagination");
  HtmlPagination.innerHTML = "";
  //============= building pagination buttons and give them active class or not
  for (let i = 1; i <= MaxPageNum; i++) {
    if (i == PageId) {
      HtmlPagination.innerHTML += `<li class="page-item active">
    <a class="page-link" onclick="Paginate('${String(array)}', ${i}, ${CardsNum})">${i}</a>
    </li>`;
    } else {
      HtmlPagination.innerHTML += `<li class="page-item">
        <a class="page-link" onclick="Paginate('${String(array)}', ${i}, ${CardsNum})">${i}</a>
      </li>`;
    }
  }
}
//============= get categories function from the api and build them in the select input 
function GetCategories() {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    type: "GET",
    async: false,
    success: function (data) {
      Categories = data.categories;
      AddCategories(Categories)
    },
  });
}
//============= invoking function to self build the select
GetCategories();
//============= function to build the select
function AddCategories(data) {
  let sel;
  sel += `<option value="*">All Categories</option>`
  for (let i = 0; i < data.length; i++) {
    if (data[i].strCategory == "Lamb") {
      sel += `<option value="${data[i].strCategory}" selected>${data[i].strCategory}</option>`
      document.getElementById("categ").innerHTML = sel
    } else {
      sel += `<option value="${data[i].strCategory}">${data[i].strCategory}</option>`
      document.getElementById("categ").innerHTML = sel
    }
  }
}
//============= get Areas function from the api and build them in the select input 
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
//============= invoking function to self build the select
GetCountries();
//============= function to build the select
function AddCountry(data) {
  let sel;
  sel += `<option value="*">All Areas</option>`

  for (let i = 0; i < data.length; i++) {
    if (data[i].strArea == "Moroccan") {
      sel += `<option value="${data[i].strArea}" selected>${data[i].strArea}</option>`
      document.getElementById("Countries").innerHTML = sel
    } else {
      sel += `<option value="${data[i].strArea}">${data[i].strArea}</option>`
      document.getElementById("Countries").innerHTML = sel
    }
  }
}
//=========== function to build selected categories and areas in the select 
document.getElementById("filter").onclick = function () {
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
    DATA["SelectedCountryTarget"] = SelectedCountryTarget;
    Paginate("SelectedCountryTarget");

  } else if (SelectedCountry == "*" && SelectedCategory !== "*") {
    DATA["SelectedCategoryTarget"] = SelectedCategoryTarget;
    Paginate("SelectedCategoryTarget");
  } else if (SelectedCategory == "*" && SelectedCountry == "*") {
    AllCat.length = 0;
    for (let i = 0; i < Categories.length; i++) {
      $.ajax({
        url:
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
          Categories[i].strCategory,
        type: "GET",
        async: false,
        success: function (data) {
          All = data.meals;
          AllCat.push(All);
          DATA["AllCats"] = AllCat.flat(1);
        },
      });
    }
    Paginate("AllCats");
  } else {
    BuildCardById(SelectedCategoryTarget, SelectedCountryTarget);
  }
}
//========== function to build array combination of two arrays asssemble id cards
function BuildCardById(array1, array2) {
  let result = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i].idMeal === array2[j].idMeal) {
        result.push(array1[i]);
      }
    }
  }
  DATA["result"] = result;
  Paginate("result")
}