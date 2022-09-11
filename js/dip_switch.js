let inputNum = ''
const MAX_INPUT = 255;
let dots = []
let c, ctx, W, H, delLastHeight = 200
let supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

const random = (max=1, min=0) => Math.random() * (max - min) + min;

const setDip = (index, elm) => {
    $(elm).val()=="0"?$(".btn_by_dip").eq(index).css('margin-top',3.2):$(".btn_by_dip").eq(index).css('margin-top',35);
    $(elm).val( $(elm).val()=="0"?"1":"0")
}

const findNumber = () => {
    let numberBin = ""
    $(".switch_by_dip").each(function(){
        numberBin += $(this).val()
	});
    let numberUrmet = parseInt(numberBin, 2);
    let numberComelit = parseInt(numberBin.split('').reverse().join(''), 2);
    number_urmet.innerHTML = numberUrmet
    number_comelit.innerHTML = numberComelit
}

const findByDip = () => {
    $(".switch_by_dip").each(function(index, elm){
        $(this).val('0')
        elm.addEventListener("click", () => {
            setDip(index,elm)
            findNumber()
        })
	});
}


const intToBinary = (str) => {
	let binary =  Number(str).toString(2);
	while(binary.length<8) binary = "0"+ binary;
	return binary;
};

class Dot {
	constructor(a){
		this.x = random(W)
		this.y = random(H)
		this.r = random(2,1)
		this.s = { x:random(0.7,-0.7),y:random(0.7,-0.7)}
		this.dir = {x:1,y:1}
	}
	draw() {
		ctx.beginPath()
		ctx.fillStyle = 'white'
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
		ctx.fill()
	}
	update() {
		if(this.x>W-this.r||this.x<this.r)this.dir.x*=-1
		if(this.y>H-this.r||this.y<this.r)this.dir.y*=-1
		this.x += this.s.x*this.dir.x
		this.y += this.s.y*this.dir.y
		this.draw()
	}
}

const updateDots = ()=> {
	for(let i=0; i<dots.length; i++){
		dots[i].update();
		for(let j=i; j<dots.length; j++){
			let d = Math.hypot(dots[i].x - dots[j].x,dots[i].y - dots[j].y)
			if(d<60&&i!==j){
				ctx.beginPath()
				ctx.strokeStyle = 'rgba(0,255,255,' + 20/d + ')'
				ctx.lineWidth =  1
				ctx.moveTo(dots[i].x, dots[i].y);
				ctx.lineTo(dots[j].x, dots[j].y);
				ctx.stroke();
			}
		}
	}
}

const searchOn = () => {
    cont.style.display='none'
    clavier.style.display='none'
    search_by_dip.style.display='none'
    container_box_by_dip.style.display='block'
    delLastHeight = 0
    reInitCanvas()
}

const searchOff = () => {
    cont.style.display='block'
    clavier.style.display='block'
    search_by_dip.style.display='flex'
    container_box_by_dip.style.display='none'
    delLastHeight = 200
    reInitCanvas()
}

const getNum = () => {
    let nums = document.getElementsByClassName("num")
    for(let i=0; i<nums.length; i++){
        nums[i].addEventListener("click",function() {
            addNewNum(nums[i].innerText)
            animBtns(nums[i])
        });
    }
}

const animBtns = (elm) => {
    elm.style.transform = "scale(0.9)"
    setTimeout(()=>{
        elm.style.transform = "scale(1)"
    }, 100)
}

const findDipOn = () => {
    let comelitOn = ''
    let urmetOn = ''
    let binaryUrmet = intToBinary(inputNum)
    let binaryComelit = binaryUrmet.split('').reverse().join('')
    for(let i=0; i<binaryUrmet.length; i++){
        if(binaryUrmet[i] == 1) {
            if(urmetOn.length>0){
                urmetOn+= ', '
            }
            urmetOn+= i+1
        }
    }
    for(let i=0; i<binaryComelit.length; i++){
        if(binaryComelit[i] == 1){
            if(comelitOn.length==0){
                comelitOn = ''
            }
            if(comelitOn.length>0){
                comelitOn+= ', '
            }
            comelitOn+= i+1
        }
    }
    outSwitch_comelit.innerText = comelitOn
    outSwitch_urmet.innerText = urmetOn
}

const showDipNum = () =>{
    $(".btn").each(function(index){
		intToBinary(inputNum)[index]=="0"?$(this).css('margin-top',21):$(this).css('margin-top',3);
	});
    $(".btn1").each(function(index){
		intToBinary(inputNum).split('').reverse().join('')[index]=="0"?$(this).css('margin-top',21):$(this).css('margin-top',3);
	});
}

const addNewNum =(num) => {
    if(inputNum==0)inputNum=''
    if (Number(inputNum + num)<=MAX_INPUT){
        inputNum+=num
        outputNum.innerHTML = inputNum
    }
    showDipNum()  
    findDipOn()
}

const delLastNum = () => {
    if(inputNum.length>=0&&inputNum!=0)inputNum = inputNum.slice(0, -1)
    if(inputNum.length==0)inputNum=0
    outputNum.innerHTML = inputNum
    showDipNum()
    findDipOn()
}

const reInitCanvas = () => {
    dots = []
    for(let i=0;i<50;i++) dots.push(new Dot())
}

const resize = () =>{
    search_by_dip.style.fontSize = "0.8em"
    search_by_dip.style.transform = "scale(0.7)"
    cont.style.transform = "scale(0.7)"
}

const evenRotation = () => {
	c.width = W = window.innerWidth;
    	c.height = H = window.innerHeight-delLastHeight;
	reInitCanvas()
}

const init = () => {
    getNum()
    findByDip()
    search_by_dip.addEventListener("click", searchOn)
    close_page.addEventListener("click", searchOff)
    delNum.addEventListener("click", delLastNum)
    c = document.getElementById("cnv");
    c.width = W = window.innerWidth;
    c.height = H = window.innerHeight-delLastHeight;
    c.style.display = "block"
    if(innerHeight<600&&innerWidth<innerHeight)resize()
    ctx = c.getContext("2d");
    for(let i=0;i<50;i++) dots.push(new Dot())     
    window.addEventListener(orientationEvent, function(){ 
	    alert(innerHeight)
	   setTimeout(function(){
		   alert(innerHeight)
	   },1000)
	    evenRotation()
    }, false);
    requestAnimationFrame(animate);
};

const animate = () => {
    ctx.clearRect(0, 0, W, H);
	updateDots();
	requestAnimationFrame(animate);
};

window.onload = init;
