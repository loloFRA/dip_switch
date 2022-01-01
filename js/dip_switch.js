const dom = {};
const MAX_INPUT = 254;

const init = () => {
	dom.input = $("#input");
	dom.lastValidInput = null;
	input.addEventListener("input", codification);
    findByDip()
    search_by_dip.addEventListener("click", ()=>container_box_by_dip.style.display='block')
    close_page.addEventListener("click", ()=>container_box_by_dip.style.display='none')
};

const setDip = (index, elm) => {
    $(elm).val()=="0"?$(".btn_by_dip").eq(index).css('margin-top',2):$(".btn_by_dip").eq(index).css('margin-top',32);
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

const isInputValid = (input) => {
	const regExp = new RegExp('^[0-9]+$');
	return regExp.test(input);
};

const codification = () => {
	let input = $("#input").val();
	let intInput = Number(input);

	if(input && !isInputValid(input) || intInput > MAX_INPUT){
		$("#input").val(dom.lastValidInput);
		return;
	}
	
	dom.lastValidInput = intInput;
	$(".btn").each(function(index){
			intToBinary(input)[index]=="0"?$(this).css('margin-top',21):$(this).css('margin-top',3);
	});
    $(".btn1").each(function(index){
		intToBinary(input).split('').reverse().join('')[index]=="0"?$(this).css('margin-top',21):$(this).css('margin-top',3);
	});	
};

const intToBinary = (str) => {
	let binary =  Number(str).toString(2);
	while(binary.length<8) binary = "0"+ binary;
	return binary;
};

window.onload = init;
