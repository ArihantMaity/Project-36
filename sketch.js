var dog,sadDog,happyDog;
var feedPet, addFood;
var foodObj;
var database;
var foodS,foodStock;
var lastFed,fedTime;


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database()
  createCanvas(1000,500);
 
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedPet=createButton("Feed The Dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food()
   
}

function draw() {
  background(46,139,87);

fedTime =database.ref("FeedTime")
fedTime.on("value",function(data){
  lastFed = data.val();
})

 fill(255);
 textSize(20);
 if(lastFed>=12){
   text("Last Fed : "+lastFed+"PM",150,30);
 }
else if(lastFed===0){
  text("Last Fed : 12 AM",150,30);
}
else{
  text("Last Fed : "+lastFed+"AM",150,30);
}
  foodObj.display();

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj = updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);


    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  
 database.ref("/").update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
 })
}

function addFoods(){
  foodObj.updateFoodStock(foodObj.getFoodStock()+1)
  database.ref("/").update({
    Food:foodObj.getFoodStock()
  })
  
}
