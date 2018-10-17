'use strict';

function printReceipt(inputs) {
	var list = '***<没钱赚商店>收据***' ;
	var sum = 0;
	inputs.forEach(function (item) {
    list += '\n' + '名称：' + item.name + '，数量：' + item.count + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + (item.count*item.price).toFixed(2) + '(元)';
    sum += item.count*item.price;
  });
	list += '\n' + '----------------------'
    + '\n' + '总计：'+ sum.toFixed(2) + '(元)'
    + '\n' +'**********************';
  console.log(list);
}
