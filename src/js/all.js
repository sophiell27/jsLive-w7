// 1. render data
// 2. select filter + result text 
// 3. search 0 shown
// 4. add new package + form check blank
// 5. chart update **



// get data 

let data = []

axios.get ("https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json")
.then(res => {
    data = res.data;
    renderData("全部地區")
    filterSelect()
    getFormData()
    renderAreaData("全部地區")
})
.catch(function (error) {
  // handle error
  console.log(error);
})

const result = document.querySelector(".result")
const filter = document.querySelector(".filter")
const searchText = document.querySelector(".searchText")
const searchNone = document.querySelector(".searchNone")
const addNewForm = document.querySelector(".addNewForm")
const els = document.querySelectorAll("input, textarea,select") //all inputs in an array 

// console.log(els)

let resultNum = 0;

// render data 

function renderData(area){
    let str ="";

    data.forEach(item => {
        let structure = `<li
    class="relative mt-3 flex flex-col justify-between rounded shadow-3"
  >
    <p
      class="absolute -top-3 left-0 bg-forest-100 px-5 py-2 text-white rounded-r-lg"
    >
     ${item.area}
    </p>
    <div class="">
      <img
        src="${item.imgUrl}"
        alt="travel pic"
        onerror="this.onerror=null;this.src='./src/images/no_found.png';"
        class="h-[180px] w-full object-cover mb-5 rounded"
      />
      <article class="relative px-5">
        <p
          class="absolute -top-9 left-0 bg-primary text-white py-1 px-2"
        >
          ${item.rate}
        </p>
        <h2
          class="font-medium text-2xl pb-1 border-b-2 border-b-forest-200 mb-4"
        >
          ${item.name}
        </h2>
        <p class="text-secondary">
          ${item.description}
        </p>
      </article>
    </div>
    <div class="flex justify-between items-center mt-6 mb-4 px-5">
      <h3 class="font-medium flex items-center">
        <span class="material-icons mr-1"> error </span>
        剩下最後 ${item.group} 組
      </h3>
      <p class="font-medium flex items-center">
        TWD
        <span class="text-3.5xl ml-1"> $${item.price} </span>
      </p>
    </div>
  </li>`
  if (area === "全部地區"){
    str += structure
    resultNum +=1

  }else if (item.area === area){
    str += structure
    resultNum +=1
    // console.log(str)
  }
    })
result.innerHTML =str
    
}


// filter logic 

// console.log(searchText)
function filterSelect(){
    filter.addEventListener("change", (e) => {
      resultNum = 0
        renderData(filter.value)
        if (resultNum === 0){
            result.innerHTML =""
            searchText.textContent = ""
            searchNone.classList.remove("hidden") 
            renderAreaData(filter.value)
        }else{
            searchNone.classList.add("hidden")
            searchText.textContent = `本次搜尋共 ${resultNum} 筆資料 `
        }
    })
    
}

// add new data logic

function getFormData(){
   
    
  addNewForm.addEventListener("submit", (e) => {
    
       e.preventDefault();

       const newObj = {} 
       let keys = Object.keys(data[1])
      //  console.log(keys)

      //  keys + els values in newObj -> push data

      //to be push to data 
      let values = {} // value of input
      els.forEach(item => {
        values[item.id] = item.value
      })
      
        if (values.rate < 0 || values.rate >10 ){
          return
        }else {
          //combines keys and input values in an obj 
            keys.forEach(item => {
              if (item === "id"){
                newObj[item] = data.length
             }else {
              newObj[item] = values[item]
             }
            })
            data.push(newObj)
            addNewForm.reset()
            renderData("全部地區")
            renderAreaData()
          }
          
    })
   
}
 

// show chart logic

function renderAreaData(){
  
  let areaData = [] //chart data orient
  let newData = data.reduce((obj,item) => {
    
    if (item.area in obj){
      obj[item.area] +=1
    }else {
      obj[item.area] =1
    }
    
    return obj
  }, {})  // console.log(newData ) // {areaA: num, areaB: num /..}

  let newDataKeys = Object.keys(newData) 

  // console.log(newDataKeys) //['高雄', '台北', '台中', '台東']
  

    
    newDataKeys.forEach(item => {
      let arr = []
      arr.push(item)
      arr.push(newData[item])
      areaData.push(arr)
    })


    const colors = ["#E68618", "#26C0C7","#5151D3", "pink"]
  // console.log(colors)
  const charColors = newDataKeys.reduce((accu,item,index )=> {
    return {...accu, [item]:colors[index]}
  },{})
  // console.log(charColors);
    var areaChart = c3.generate({
      
    bindto: '#areaChart',
    data: {
      columns:areaData,
      type: "donut",
      colors:charColors,
    },
    donut: {
      title: "套票地區比重",
      label: {
        show:false,
      }
  },
  });

  }

  
  



// `<li
// class="relative mt-3 w-350 flex flex-col justify-between rounded shadow-3"
// >
// <p
//   class="absolute -top-3 left-0 bg-forest-100 px-5 py-2 text-white rounded-r-lg"
// >
//   台北
// </p>
// <div class="">
//   <img
//     src="./images/travel_1.png"
//     alt="travel pic"
//     class="h-[180px] object-cover mb-5 rounded"
//   />
//   <article class="relative px-5">
//     <p
//       class="absolute -top-9 left-0 bg-primary text-white py-1 px-2"
//     >
//       8.6
//     </p>
//     <h2
//       class="font-medium text-2xl pb-1 border-b-2 border-b-forest-200 mb-4"
//     >
//       綠島自由行套裝行程
//     </h2>
//     <p class="text-secondary">
//       嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。
//     </p>
//   </article>
// </div>
// <div class="flex justify-between items-center mt-6 mb-4 px-5">
//   <h3 class="font-medium flex items-center">
//     <span class="material-icons mr-1"> error </span>
//     剩下最後 8 組
//   </h3>
//   <p class="font-medium flex items-center">
//     TWD
//     <span class="text-3.5xl ml-1"> $1,280 </span>
//   </p>
// </div>
// </li>`