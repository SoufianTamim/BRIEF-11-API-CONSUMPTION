const DATA ={AllCats:[] ,result :[],SelectedCategoryTarget:[],SelectedCountryTarget:[],SearchTarget:[]}

let Categories,CoutriesCat,All,AllCat=[]; 









document.getElementById("SearchBtn").onclick = function(e){
  e.preventDefault()
  let SearchValue = document.getElementById("SearchInput").value;
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + SearchValue,
    type: "GET",
    async: false,
    success: function (data) {
      SearchTarget = data.meals;
      DATA.SearchTarget=SearchTarget
      console.log(SearchTarget);
    },
  });
  Paginate("SearchTarget")
}














function Paginate(array, PageId =1, CardsNum=6){
  console.log("Wooooow");
  FunctionArray = DATA[array];
  let Index, StartIndex, EndIndex,Portion = [],Reminder, MaxPageNum;
  Portion.length = 0
  Index = PageId * CardsNum
  StartIndex = Index - CardsNum
  EndIndex = StartIndex + CardsNum
  Reminder = FunctionArray.length % CardsNum
  if(Reminder == 0){
    MaxPageNum = Math.floor(FunctionArray.length / CardsNum)
  } else {
    MaxPageNum = Math.floor(FunctionArray.length / CardsNum) + 1
  }
  for (let i = StartIndex ; i < EndIndex ;i++){
    Portion.push(FunctionArray[i])
  }
  BuildCard(Portion)
  BuildPagination(PageId , MaxPageNum, array ,CardsNum)
}
function BuildPagination(PageId, MaxPageNum, array, CardsNum){
  let HtmlPagination = document.querySelector(".pagination")
  HtmlPagination.innerHTML = ""

for( let i = 1 ; i <= MaxPageNum ;i++){
  HtmlPagination.innerHTML += `<li class="page-item"><a class="page-link" onclick="Paginate('${String(array)}', ${i}, ${CardsNum})">${i}</a></li>`
}
}

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
    DATA["SelectedCountryTarget"]=SelectedCountryTarget;
    Paginate("SelectedCountryTarget" );
    
  } else if (SelectedCountry == "*" && SelectedCategory !== "*") {
    DATA["SelectedCategoryTarget"]=SelectedCategoryTarget;
    Paginate("SelectedCategoryTarget");
  } else if (SelectedCategory == "*" && SelectedCountry == "*") {
    AllCat.length = 0;
    for (let i = 0; i < Categories.length; i++){ 
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
function BuildCardById(array1, array2) {
  let result = [];
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i].idMeal === array2[j].idMeal) {
          result.push(array1[i]);
        }
			}
    }
    DATA["result"]=result;

  Paginate("result")
}