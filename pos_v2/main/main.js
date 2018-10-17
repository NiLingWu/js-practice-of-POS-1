'use strict';

var allList = new Array();
var buylist = new Array();
allList = Item.all();
var list = '';

function printReceipt(inputs) {
  //var _ = require('lodash');
  inputs.forEach(function (item) {
    
    var buyitem;
    if(buylist.length==0)
    {
      if(item.indexOf('-')==-1)
      {
        allList.forEach(function (allitem) {
          if(allitem.barcode == item)
          {
            buyitem = allitem;
            buyitem.count = 1;
            buylist.push(buyitem);
          }
        });
      }
      else
      {
        allList.forEach(function (allitem) {
          if(allitem.barcode == item.substr(0,item.indexOf('-')))
          {
            buyitem = allitem;
            buyitem.count = item.substr(item.indexOf('-')+1,item.length);
            buylist.push(buyitem);
          }
        });
      }
    }
    else
    {
      var mark =0;
      if(item.indexOf('-')==-1)
      {

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
              buyitem = allitem;
              buyitem.count = 1;
              buylist.push(buyitem);
            }
          });
        }
      }
      else
      {
        buylist.forEach(function (buy) {
          if(buy.barcode == item.substr(0,item.indexOf('-')))
          {
            buy.count=parseInt(buy.count)+parseInt(item.substr(item.indexOf('-')+1,item.length));
            mark = 1;
          }
        });
        if(mark == 0)
        {
          allList.forEach(function (allitem) {
            if(allitem.barcode == item.substr(0,item.indexOf('-')))
            {
              buyitem = allitem;
              buyitem.count = item.substr(item.indexOf('-')+1,item.length);
              buylist.push(buyitem);
            }
          });
        }
      }
    }
  });

  buylist.forEach(function (buy) {
    buy.sum = buy.price * buy.count;
  });

  var salelist = Promotion.all();
  var salenum=0;
  salelist.forEach(function (slist) {
    if(slist.type=='BUY_TWO_GET_ONE_FREE')
    {
      var barlist = slist.barcodes;
      barlist.forEach(function (bar) {
        buylist.forEach(function (buy) {
          if(buy.barcode==bar)
          {
            var num = Math.floor(buy.count/3);
            salenum+=num*buy.price;
            buy.sum = buy.sum-num*buy.price;
          }
        });
      });
    }
  });

  var sum = 0;
  var now = new Date();
  var list = '***<没钱赚商店>收据***'
    + '\n' + '打印时间：' + now.getFullYear() + "年" + PrefixInteger((now.getMonth() + 1),2) + "月" + now.getDate() + "日 "
    + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
    + '\n'+'----------------------';
  buylist.forEach(function (listItem) {
    list += '\n' + '名称：' + listItem.name + '，数量：' + listItem.count + listItem.unit + '，单价：' + listItem.price.toFixed(2) + '(元)，小计：' + (listItem.sum).toFixed(2) + '(元)';
    sum +=listItem.sum;
  });
  list += '\n' + '----------------------'
    + '\n' + '总计：'+ sum.toFixed(2) + '(元)'
    + '\n' + '节省：'+ salenum.toFixed(2) + '(元)'
    + '\n' + '**********************';
  console.log(list);
}

function PrefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n);

}
