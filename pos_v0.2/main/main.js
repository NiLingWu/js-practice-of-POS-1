'use strict';

function printReceipt(inputs) {
  var allList = new Array();
  var buylist = new Array();
  allList = loadAllItems();
  var list = '';
  inputs.forEach(function (item) {
    if(buylist.length==0)
    {
        allList.forEach(function (allitem) {
          if(allitem.barcode == item)
          {
            var buyitem = allitem;
            buyitem.count = 1;
            buylist.push(buyitem);
          }
        });
    }
    else
    {
      var mark =0;
      buylist.forEach(function (buy) {
        if(buy.barcode == item)
        {
          buy.count++;
          mark = 1;
        }
      });
      if(mark == 0)
      {
        allList.forEach(function (allitem) {
          if(allitem.barcode == item)
          {
            var buyitem = allitem;
            buyitem.count = 1;
            buylist.push(buyitem);
          }
        });
      }
    }
  });
  var list = '***<没钱赚商店>收据***' ;
  var sum = 0;
  buylist.forEach(function (listItem) {
    list += '\n' + '名称：' + listItem.name + '，数量：' + listItem.count + listItem.unit + '，单价：' + listItem.price.toFixed(2) + '(元)，小计：' + (listItem.count*listItem.price).toFixed(2) + '(元)';
    sum += listItem.count*listItem.price;
  });
  list += '\n' + '----------------------'
    + '\n' + '总计：'+ sum.toFixed(2) + '(元)'
    + '\n' +'**********************';
  console.log(list);
}
