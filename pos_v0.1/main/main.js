'use strict';

function printReceipt(inputs) {
  var newList = new Array();
  inputs.forEach(function (item) {
    if(newList.length==0)
    {
      item.count=1;
      newList.push(item);
    }
    else
    {
      var mark =0;
      newList.forEach(function (item2) {
        if(item.barcode == item2.barcode)
        {
          item2.count++;
          mark =1;
        }
      });
      if(mark==0)
      {
        item.count = 1;
        newList.push(item);

      }
    }
  });
  var list = '***<没钱赚商店>收据***' ;
  var sum = 0;
  newList.forEach(function (listItem) {
    list += '\n' + '名称：' + listItem.name + '，数量：' + listItem.count + listItem.unit + '，单价：' + listItem.price.toFixed(2) + '(元)，小计：' + (listItem.count*listItem.price).toFixed(2) + '(元)';
    sum += listItem.count*listItem.price;
  });
  list += '\n' + '----------------------'
    + '\n' + '总计：'+ sum.toFixed(2) + '(元)'
    + '\n' +'**********************';
  console.log(list);
}
