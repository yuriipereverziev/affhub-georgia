// export default () => {
//     function sponsors() {
//     var flipCardContainers = document.querySelectorAll(".lots__items");
//     var presentList = document.querySelector(".lots");

//     presentList.addEventListener("click", function (e) {
//       var front = e.target.closest(".flip__front");
//       if (front) {

//         flipCardContainers.forEach(function (container) {
//           container.classList.remove("flipped");
//         });

//         var card = front.closest(".lots__items");
//         if (card) card.classList.add("flipped");
//       }

//       if (
//         e.target.closest(".flip__back") ||
//         e.target.closest(".flip__text")
//       ) {
//         var backCard = e.target.closest(".lots__items");
//         if (backCard) backCard.classList.remove("flipped");
//       }
//     });
//   }

//   sponsors();
// }