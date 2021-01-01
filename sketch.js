var dog, happyDog, database, foodS, foodStock, food;

var dog1Img, dog2Img;

var feed,addFood;

var fedTime,lastFed;

var foodObj;

//var milk;

function preload()
{
  dog1Img = loadImage("images/dogImg.png");
  dog2Img = loadImage("images/dogImg1.png");

  }


function setup() {
  createCanvas(800,800);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

 //milk = new Food(100,100,300,400);

  dog = createSprite(300,300,10,10);
  dog.addImage(dog1Img);
  dog.scale=0.5;

  feed = createButton("Feed the Dog");
  feed.x=700;
  feed.y=95;
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.x=800;
  addFood.y=95;
  addFood.mousePressed(addFoods);

}


function draw() {  
  background("green");
  
  foodObj.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

        fill(255,255,254);
        textSize(15);
        
        if(lastFed>=12){
          text("Last Feed: "+lastFed%12 +" PM",350,30);
        } else if (lastFed === 0){
          text("Last Feed: 12 PM",350,30);
        } else {
          text("Last Feed: "+lastFed +" PM",350,30);
        }

    drawSprites();
  
  //milk.display();
}

function feedDog () {
  dog.addImage(dog2Img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime: hour()
  })

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock (data) {
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function writeStock (x) {
  if(x<=0){
    x = 0;
  }else{
    x=x-1;
  }
   database.ref('/').update({
     food:x
   })

}



