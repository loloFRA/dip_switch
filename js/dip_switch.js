const dom = {};
const MAX_INPUT = 254;

const init = () => {
	dom.input = $("#input");
	dom.lastValidInput = null;
	input.addEventListener("input", codification);
};

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
