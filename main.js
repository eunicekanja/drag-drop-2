//constants
const dateText=document.querySelector('.date');
const addBtn=document.querySelector('.add-btn')
const trashBtn=document.querySelector('.trash')
const input=document.querySelector('.todoInput')
const listItems=document.querySelector('.listItems')
let ListItems=[];
let index=0;
let dragStartIndex;
let deleteItem;
//event listener
addBtn.addEventListener('click',addTodo)
document.addEventListener('keydown',enterTodo)
trashBtn.addEventListener('drop',DragDrop)

//functions
function enterTodo(e){
    if(e.key==='Enter'){
        addTodo()
    }
}
function addTodo(){
    const todo=input.value;
    if(!todo) return
    if(todo){trashBtn.style.display='block'}
    const listItem=document.createElement('li');
    listItem.classList.add('item')
    listItem.setAttribute('data-id',index)
    listItem.innerHTML=`
    <div class='draggable' draggable='true'>
    <i class="check-btn fas fa-check"></i>
    <p class="text">${todo}</p>
    </div>
    `
    listItems.appendChild(listItem)
    ListItems.push(listItem);
    input.value='';
    index++;
    const items=document.querySelectorAll('.item')
    items.forEach(item=>{
        item.addEventListener('click',completeTodo)
    })
    //add drag function
    DragDrop();
   
}

function completeTodo(e){
   if(e.target.classList.contains('check-btn')){
       this.querySelector('.text').classList.toggle('lineThrough')
   }
}

function dragStart(){
    dragStartIndex=+this.closest('li').getAttribute('data-id');  
}
function dragEnter(){
   
}
function dragOver(e){
    e.preventDefault()
   
}
function dragLeave(){
    
}
function dragDrop(){
    const dragEndIndex=+this.getAttribute('data-id');
    deleteItem=this.getAttribute('trash')
    swap(dragStartIndex,dragEndIndex);
}
function trashDrop(dragStart){
   ListItems.pop(ListItems[dragStart])
     console.log('fuck')
}

function DragDrop(){
    const draggables=document.querySelectorAll('.draggable');
    const draggableItems=document.querySelectorAll('.listItems li')
    draggables.forEach(item=>{
        item.addEventListener('dragstart',dragStart);
    })
    draggableItems.forEach(item=>{
        item.addEventListener('dragover',dragOver);
        item.addEventListener('dragenter',dragEnter);
        item.addEventListener('dragleave',dragLeave);
        item.addEventListener('drop',dragDrop);
    }) 
}
trashBtn.addEventListener('drop',trashDrop(dragStartIndex))
function swap(startIndex,endIndex){
    const itemOne=ListItems[startIndex].querySelector('.text');
    const itemTwo=ListItems[endIndex].querySelector('.text');
    ListItems[startIndex].appendChild(itemTwo)
    ListItems[endIndex].appendChild(itemOne)
}
// function deleteTodo(e){
//     if(e.target.classList.contains('trash-btn')){
//         ;
//     }
// }

//setting browser date
const today=new Date();
const localDate=navigator.locale;
const options={
    weekday:'long',
    year:'numeric',
    month:'short',
    day:'numeric'
}
const dateToday=new Intl.DateTimeFormat(localDate,options).format(today)
dateText.innerHTML=dateToday;