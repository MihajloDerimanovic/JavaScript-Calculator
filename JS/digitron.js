class digitronButton{
	constructor(text, order){
		this.order = order;
		this.text = text;
	}
}
class basicDigitron{
	constructor(id){
		this.PUSTENO = "pusteno";
		this.PRITISNUTO = "pritisnuto";
		this.wrapper = document.getElementById(id);
		this.rezultat = null;
		this.temp = "";
		this.izraz = "";
		this.operacija = "";
		this.dugmici = new Array(17);
		this.rez;
		this.rez2;
		this.dugmici[0] = new digitronButton("0",15);
		this.dugmici[1] = new digitronButton("1",10);
		this.dugmici[2] = new digitronButton("2",11);
		this.dugmici[3] = new digitronButton("3",12);
		this.dugmici[4] = new digitronButton("4",6);
		this.dugmici[5] = new digitronButton("5",7);
		this.dugmici[6] = new digitronButton("6",8);
		this.dugmici[7] = new digitronButton("7",2);
		this.dugmici[8] = new digitronButton("8",3);
		this.dugmici[9] = new digitronButton("9",4);
		this.dugmici[10] = new digitronButton("+",5);
		this.dugmici[11] = new digitronButton("-",9);
		this.dugmici[12] = new digitronButton("*",13);
		this.dugmici[13] = new digitronButton("/",17);
		this.dugmici[14] = new digitronButton("=",16);
		this.dugmici[15] = new digitronButton("C",14);
		this.dugmici[16] = new digitronButton("rez",1);
	}
	ApplyOperation(op,op2){
		if(this.rezultat===null){
			this.rezultat = parseInt(this.temp);
			this.izraz += this.temp;
			this.temp = "";
			this.rez2.innerHTML = this.izraz;
		}
		if(this.operacija==="" && this.rezultat !== null){
			this.rez2.innerHTML = this.izraz;
			this.rez.innerHTML = this.rezultat;
		}
		switch(op){
			case "+":{
				this.rezultat += parseInt(this.temp);
				this.izraz += " + " + this.temp;
				this.rez.innerHTML = this.rezultat;
				this.temp = "";
				this.rez2.innerHTML = this.izraz;
			}break;
			case "-":{
				this.rezultat -= parseInt(this.temp);
				this.izraz += " - " + this.temp;
				this.rez.innerHTML = this.rezultat;
				this.temp = "";
				this.rez2.innerHTML = this.izraz;
			}break;
			case "*":{
				this.rezultat *= parseInt(this.temp);
				this.izraz += " * " + this.temp;
				this.rez.innerHTML = this.rezultat;
				this.temp = "";
				this.rez2.innerHTML = this.izraz;
			}break;
			case "/":{
				this.rezultat /= parseInt(this.temp);
				this.izraz += " / " + this.temp;
				this.rez.innerHTML = this.rezultat;
				this.temp = "";
				this.rez2.innerHTML = this.izraz;
			}break;
		}
		if(op2==="="){
			this.operacija = "";
			this.rez.innerHTML = this.rezultat;
			this.rez2.innerHTML = this.izraz + "=";
			this.temp = "";
		}
		if(op2==="C"){
			this.rezultat = null;
			this.temp = "";
			this.izraz = "";
			this.operacija = "";
			this.rez.innerHTML = "0";
			this.rez2.innerHTML = "";
		}
	}
	
	print(){
		let digitron = document.createElement('div');
		digitron.classList.add(this.PUSTENO);
		digitron.id = "digitron";
		this.wrapper.appendChild(digitron);
		//crtanje dugmića
		this.dugmici.forEach((el)=>{
			let dugme = document.createElement('div');
			dugme.style.order = el.order;
			dugme.classList.add(this.PUSTENO);
			//kreiranje dela za prikaz rezultata
			if(el.text == "rez"){
				dugme.id = "rez";
				let part1 = document.createElement('div');
				part1.id = "izraz";
				this.rez2 = part1;
				let part2 = document.createElement('div');
				part2.id = "rezultat";
				this.rez = part2;
				part2.innerHTML = "0";
				dugme.appendChild(part1);
				dugme.appendChild(part2);
			}
			else{
				dugme.innerHTML = el.text;
				dugme.id = "button"+el.text;
				//kreiranje funkcija za pritiske na operacije
				if(el.text === "-" || el.text === "+" || 
				   el.text === "*" || el.text === "/" ){
					dugme.onmousedown = ()=>{
						this.ApplyOperation(this.operacija);
						this.operacija = el.text;
						dugme.classList.remove(this.PUSTENO);
						dugme.classList.add(this.PRITISNUTO);
					}
					dugme.onmouseup = ()=>{
						dugme.classList.remove(this.PRITISNUTO);
						dugme.classList.add(this.PUSTENO);
					}	
					dugme.onmouseout = ()=>{
						dugme.classList.remove(this.PRITISNUTO);
						dugme.classList.add(this.PUSTENO);
					}
				}
				//kreiranje funkcija za pritiske na = i C
				else if(el.text === "=" || el.text === "C"){
					dugme.onmousedown = ()=>{
						this.ApplyOperation(this.operacija,el.text);

						dugme.classList.remove(this.PUSTENO);
						dugme.classList.add(this.PRITISNUTO);
					}
					dugme.onmouseup = ()=>{
						dugme.classList.remove(this.PRITISNUTO);
						dugme.classList.add(this.PUSTENO);
					}	
					dugme.onmouseout = ()=>{
						dugme.classList.remove(this.PRITISNUTO);
						dugme.classList.add(this.PUSTENO);
					}
				}
				else{
					//kreiranje samih dugmića
					dugme.onmousedown = ()=>{
						this.temp += el.text;
						this.rez.innerHTML = this.temp;
						dugme.classList.remove(this.PUSTENO);
						dugme.classList.add(this.PRITISNUTO);
					}
					dugme.onmouseup = ()=>{
						dugme.classList.remove(this.PRITISNUTO);
						dugme.classList.add(this.PUSTENO);
					}
					dugme.onmouseout = ()=>{
						dugme.classList.remove(this.PRITISNUTO);
						dugme.classList.add(this.PUSTENO);
					}
				}
			}	
			digitron.appendChild(dugme);
		});
	};
}