

const CONVENIENCE_FEES = 99;
document.addEventListener('DOMContentLoaded', function () {
  onLoad();
});

let bagItemObject;

function onLoad() {
  loadBagItemObject();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemObject() {
  console.log(bagItems);

  bagItemObject = bagItems.map(itemId => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObject);
}



function displayBagItems() {
  const bagItemsElement = document.querySelector('.bag-items-container');
  let innerHTML = '';

  bagItemObject.forEach(bagitem => {
    innerHTML += generateItemHtml(bagitem);
  });

  if (bagItemsElement) {
    bagItemsElement.innerHTML = innerHTML;
  } else {
    console.error('Element with class "bag-items-container" not found.');
  }
};

function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItem = bagItemObject.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObject.forEach(bagItems => {
    totalMRP += bagItems.original_price;
    totalDiscount += bagItems.original_price - bagItems.current_price

  });
  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  bagSummaryElement.innerHTML = `
              <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">$${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-$${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">$ 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">$${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
  `

};

function RemoveFromBag(itemId) {
  bagItems = bagItems.filter(bagItemId => bagItemId !== itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObject();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();

}

function generateItemHtml(item) {
  return `
    <div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="${item.image}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount-percentage">${item.discount_percentage}% OFF</span>
        </div>
        <div class="return-period">
          <span class="return-period-days">${item.return_period}</span> return available
        </div>
        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
      </div>
      <div class="remove-from-cart" onclick="RemoveFromBag(${item.id})">X</div>
    </div>`;
}

