const items = document.querySelectorAll(".roll>.item");
const imgs = document.querySelectorAll(".roll>.item>img");
const itemsList = [
    {name: "YEEZY BOOST 700 MNVN", cost: 27999},
    {name: "PUREMOTION", cost: 5999},
    {name: "LITE RACER 2.0", cost: 3999},
    {name: "ZX 1K BOOST", cost: 6999},
    {name: "GAZELLE", cost: 8699},
    {name: "OZWEEGO PURE", cost: 6399},
    {name: "ADILETTE", cost: 2999},
    {name: "NITE JOGGER", cost: 12999},
    {name: "BUSENITZ VULC II", cost: 6699},
    {name: "NMD_R1", cost: 7999},
    {name: "BASKET PROFI", cost: 7999},
    {name: "NIZZA HI RF", cost: 8699},
    {name: "BROOMFIELD", cost: 8699},
    {name: "SUPERSTAR", cost: 8399},
    {name: "MADRID", cost: 8999}
];

let max = itemsList.reduce((max,e)=>e.cost>max?e.cost:max,0);
itemsList.forEach(e=>e.chance=Math.ceil(1/(e.cost/max)));

function GeneratePool(){
    return itemsList.reduce((res,e)=>{
        for(var i=1; i<=e.chance*10; i++)
            res.push(e);
        return res;
    },[]).sort(()=>Math.random()-0.5);
}
var pool = GeneratePool();

var inRoll = false;
function Roll(){
    if(inRoll) return
    inRoll = true;
    document.querySelector(".prize").classList.remove("active");
    let speed = 1500+Math.random()*600;
    let translate = 0;
    Fill();
    let move = setInterval(()=>{
        translate+=speed/100;
        speed-=2;
        if(translate>items[0].offsetWidth){
            pool = pool.slice(1);
            translate = 0;
            Fill();
        }
        items.forEach(e=>e.style.transform = "translateX(" + -1*translate+ "px)")
        if(speed<-10){
            Win();
            clearInterval(move);
        }
    },10)

    function Win(){
        inRoll = false;
        let item = Array.prototype.reduce.call(items,(best,e)=>Distance(best)>Distance(e)?e:best);
        item = itemsList.find(e=>e.name==item.dataset.model);
        document.querySelector(".prize>.model").innerHTML = item.name;
        document.querySelector(".prize>.cost").innerHTML = item.cost + " P";
        document.querySelector(".prize").classList.add("active");
        pool = GeneratePool();

        function Distance(node){
            return Math.abs((node.offsetLeft+node.offsetWidth/2)-window.screen.width/2);
        }
    }
}

function Fill(){
    imgs.forEach((e,i)=>e.src="assets/"+pool[i].name+".jpg");
    items.forEach((e,i)=>e.dataset.model=pool[i].name);
}

Fill();