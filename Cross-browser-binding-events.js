//JavaScript 跨浏览器绑定事件函数优化

//
//方法一
//缺点：每次函数调用时都会做重复工作——检测浏览器的类型
//
//跨浏览器添加事件
function addHandler(target, eventType, handler) {
　　if(target.addEventListener) { //DOM2 events
　　　　target.addEventListener(eventType, handler, false);
　　} else { //IE
　　　　target.attachEvent("on" + eventType, handler);
　　}
}
 
//跨浏览器移除事件
function removeHanler(target, eventType, handler) {
　　if(target.removeEventListener) { //DOM2 events
　　　　target.removeEventListener(eventType, handler, false);
　　} else { //IE
　　　　target.detachEvent("on", eventType, handler);
　　}
}


//方法二
//我们在两个函数的最后一行，都调用了被重写了的新函数
//添加事件
function addHandler(target, eventType, handler) {
 
　　//检测浏览器类型，并且重写addHanler方法
　　if(target.addEventListener) { //DOM2
　　　　addHandler = function(target, eventType, handler) {
　　　　　　target.addEventListener(eventType, handler, false);
　　　　};
　　} else { //IE
　　　　addHandler = function(target, eventType, handler) {
　　　　　　target.attachEvent("on" + eventType, handler);
　　　　};
　　}
　　 
　　//调用新的函数
　　addHandler(target, eventType, handler);
}
 
//移除事件removeHanler
function removeHandler(target, eventType, handler) {
 
　　//检测浏览器类型，并且重写removeHandler方法
　　if(target.removeEventListener) { //DOM2
　　　　removeHandler = function(target, eventType, handler) {
　　　　　　target.removeEventListener(eventType, handler, false);
　　　　};
　　} else { //IE
　　　　removeHandler = function(target, eventType, handler) {
　　　　　　target.detachEvent("on" + eventType, handler);
　　　　};
　　}
 
　　//调用新的函数
　　removeHandler(target, eventType, handler);
}

//方法三
//我们可以使用一个三目条件运算符（?...:）来实现
//绑定事件
var addHandler = document.body.addEventListener ?
　　　　　　　　　　function(target, eventType, handler) { //DOM2
　　　　　　　　　　　　target.addEventListener(eventType, handler,false);
　　　　　　　　　　} :
　　　　　　　　　　function(target, eventType, handler) { //IE
　　　　　　　　　　　　target.attachEvent("on" + eventType, handler);
　　　　　　　　　　};

//移除事件
var removeHandler = document.body.removeEventListener ?
　　　　　　　　　　　　function(target, eventType, handler) { //DOM2
　　　　　　　　　　　　　　target.removeEventListener(eventType, handler, false);
　　　　　　　　　　　　} :
　　　　　　　　　　　　function(target, eventType, handler) { //IE
　　　　　　　　　　　　　　target.detachEvent("on" + eventType, handler);
　　　　　　　　　　　　}
