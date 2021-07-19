// // enable tooltips
// var tooltipTriggerList = [].slice.call(
//     document.querySelectorAll('[data-bs-toggle="tooltip"]')
//   );
//   var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//     return new bootstrap.Tooltip(tooltipTriggerEl);
//   });

//   // click nav&tab go there & click go to form
//   var form = document.getElementById("form");
//   function heightToTop(ele) {
//     let bridge = ele;
//     let root = document.body;
//     let height = 0;
//     do {
//       height += bridge.offsetTop;
//       bridge = bridge.offsetParent;
//     } while (bridge !== root);

//     return height;
//   }
//   function goToTab() {
//     window.scrollTo({
//       top:
//         heightToTop(document.getElementsByClassName("tab-content")[0]) - 70,
//       behavior: "smooth",
//     });
//   }
//   function goForm() {
//     window.scrollTo({
//       top: heightToTop(form) - 170,
//       behavior: "smooth",
//     });
//   }

//   // mobile btn toggle
//   var bottomBtn = document.getElementById("bottomBtn");
//   bottomBtn.style.display = "none";
//   window.onscroll = function () {
//     const t = document.documentElement.scrollTop || document.body.scrollTop;
//     if (bottomBtn !== null) {
//       if (
//         t >
//         heightToTop(document.getElementsByClassName("tab-content")[0]) -
//         100 &&
//         t < heightToTop(form) - 170
//       ) {
//         bottomBtn.style.display = "block";
//       } else {
//         bottomBtn.style.display = "none";
//       }
//     }
//   };



//符合正規表示就打勾，不符合驚嘆號
let formControls = document.querySelectorAll(".form-control");
formControls.forEach(function (item) {
  item.addEventListener("input", function () {
    if (this.validity.valid) {
      this.classList.add("is-valid");
      this.classList.remove("is-invalid");
    } else {
      this.classList.remove("is-valid");
      this.classList.add("is-invalid");
    }
  });
});

const input = document.querySelectorAll("input[name=identity]");
//不同國籍填寫證號之正規表示判斷
input.forEach(function (item) {
  item.addEventListener("change", function () {
    if (item.value == "Taiwanese") {
      document
        .getElementById("identity")
        .setAttribute("pattern", "^[A-Za-z]{1}\\d{9}$");
    } else {
      document
        .getElementById("identity")
        .setAttribute(
          "pattern",
          "^(?!^0+$)[a-zA-Z0-9]{3,20}$|^[a-zA-Z][C|D|c|d][0-9]{8}$"
        );
    }
  });
});
//產品列表
let productItems = [
  {
    name: "(新品)焦糖馬卡龍1",
    price: 450,
    promote: true,
    new: true,
    pic: "https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/student-week1/p-1.png",
  },
  {
    name: "(人氣王)焦糖馬卡龍2",
    price: 450,
    promote: true,
    famous: true,
    pic: "https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/student-week1/p-2.png",
  },
  {
    name: "焦糖馬卡龍3",
    price: 450,
    promote: true,
    pic: "https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/student-week1/p-3.png",
  },
  {
    name: "焦糖馬卡龍4",
    price: 450,
    promote: true,
    pic: "https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/student-week1/p-4.png",
  },
  {
    name: "焦糖馬卡龍5",
    price: 450,
    promote: true,
    pic: "https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/student-week1/p-5.png",
  },
  {
    name: "焦糖馬卡龍6",
    price: 450,
    promote: false,
    pic: "https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/student-week1/p-6.png",
  },
];

const productList = document.querySelector(".product-list");
const modal_body = document.querySelector(".modal-body");
const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

productItems.forEach(function (item,index){
  item.id = index+1;
})

//選單篩選邏輯+active更換背景色
let filter = "all";
const categoryBtns = document.querySelectorAll(".category li a");
categoryBtns.forEach(function (element) {
  element.addEventListener("click", function (e) {
    document.querySelector(".category li a.active").classList.remove("active");
    e.target.classList.add("active");
    //篩選選單
    filter = e.target.getAttribute("data-filter");
    init();
  });
});

//初始
function init() {
  let allCount = productItems.length;
  let promoteCount = (famousCount = newCount = 0);
  productList.innerHTML = "";
  productItems
    .filter(function (item) {
      if (item.promote == true) {
        promoteCount++;
      }
      if (item.famous == true) {
        famousCount++;
      }
      if (item.new == true) {
        newCount++;
      }
      //篩選做相對應切換
      return item[filter] || filter == "all"; //filter: 'new', item[filter] == item.new
    })
    .forEach(function (item, index) {
      // console.log(item);
      productList.appendChild(renderListItem(item, index));
    });

  //所有甜點,本日精選,人氣推薦,新品上市顯示數量
  const allNum = document.querySelector(".allNum");
  allNum.textContent = `所有甜點(${allCount})`;

  const promoteNum = document.querySelector(".promoteNum");
  promoteNum.textContent = `本日精選(${promoteCount})`;

  const famousNum = document.querySelector(".famousNum");
  famousNum.textContent = `人氣推薦(${famousCount})`;

  const newNum = document.querySelector(".newNum");
  newNum.textContent = `新品上市(${newCount})`;
}

//渲染產品列表
function renderListItem(item, index) {
  let product = document.createElement("div");
  product.setAttribute("class", "products");
  product.innerHTML = `<div class="product-photo" >
          <img src="${item.pic}" alt="甜點照">
          <a href="#"><img class="favorite" src="https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/student-week1/favorite_border.png" alt="加入我的最愛"></a>
          <span class="focus${item.promote ? "" : " d-none"}">本日精選</span>
      </div>
      <div class="price">
          <h3>${item.name}</h3>
          <p>NT$ ${item.price}</p>
      </div>
      <div>
        <a class="cart" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">加入購物車</a>
      </div>`;
  //新增至購物車內
  const btnCart = product.querySelector(".cart");
  btnCart.addEventListener("click", function () {
      // 
    let cItem = cartItems.find(function(ci){
      return ci.productId == item.id; 
    });
    if(cItem == undefined){
      cItem = {};
      cItem.productId = item.id;
      cItem.qty = 1;
      cartItems.push(cItem);
    }else{
      cItem.qty++;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    initCart();
  });
  return product;
}

//初始購物車內容
function initCart() {
  modal_body.innerHTML = "";
  cartItems.forEach(function (item, index) {
    modal_body.appendChild(renderCartItem(item, index));
  });
  //購物車刪除邏輯
  const deletes = document.querySelectorAll(".delete");
  deletes.forEach(function (item, index) {
    item.addEventListener("click", function (e) {
      let num = e.target.getAttribute("data-num");
      cartItems.splice(num, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      // initCart();
      e.target.closest('.cartList').remove();
    });
  });
}

//渲染購物車內容
function renderCartItem(item, index) {
  let product = document.createElement("div");
  let productItem = productItems.find(function(p){
    return p.id == item.productId;
  });
  product.innerHTML = `
    <div class="cartList">
      <img class="col-3" src="${productItem.pic}" alt="甜點照">
      <h3 class="col-3">${productItem.name}</h3>
      <p class="col-3">NT$ ${productItem.price}</p>
      <p class="col-1">${item.qty}</p>
      <a class="col-2 delete" href="#" data-num="${index}"></a>
    </div>`;

  return product;
}
// 縣市鄉鎮form validation
(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
  AddressSelectList.Initialize("縣市1", "鄉鎮市區1");
})();

let a = document.querySelectorAll("a");
a.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

init();
initCart();
