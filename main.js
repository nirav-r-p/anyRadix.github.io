//for user inpt number.
var input = document.getElementById("givenNumber");
//for answer
var answer = document.getElementById("answer");
//for button
let getResult = document.getElementById("getResult");

var CustomRadix = document.getElementById("CustomRadix");
var contain = document.querySelector('.container1');
var methods = document.getElementById('methods');
var showex = document.createElement('div');
var removemethod = document.getElementById("removeMthod");
var showMethod = document.getElementById("method");
var divCr = document.getElementById('Cr')

var title = document.createElement('h3');
var title1 = document.createElement('h3');
var title2 = document.createElement('h3');
var title3 = document.createElement('h3');

var inputRadix = document.querySelector('#iR');
var outputRadix = document.querySelector('#aR');

var radixblock=document.getElementById('Radix');
var CustomTextRadix=document.createElement('h4');
var Custom_InR=document.getElementById('InRx');
var Custom_outR=document.getElementById('OutRx');
var inputR,outputR;



radixblock.style.visibility='hidden';

showMethod.addEventListener('click', () => {
   
   methods.appendChild(showex);
})

CustomRadix.addEventListener('click',()=>{
   radixblock.style.visibility= radixblock.style.visibility=='visible'?'hidden':'visible';
   inputRadix.disabled=radixblock.style.visibility=='visible'?true:false;
   outputRadix.disabled=radixblock.style.visibility=='visible'?true:false;
   CustomRadix.style.color= inputRadix.disabled==true?'rgb(186, 27, 186)':'black';
   if(inputRadix.disabled==true){
      Custom_InR.value='';
      Custom_outR.value='';
   }
 
})


getResult.addEventListener('click', () => {
   while (showex.lastChild) {
      showex.removeChild(showex.lastChild);
   }
   if (methods.lastChild) {
      methods.removeChild(showex);
   }
   
})
//when user click button then applied method.
getResult.addEventListener('click', () => {
   if(radixblock.style.visibility=='hidden'){
      inputR=inputRadix.value;
      outputR=outputRadix.value;
   }
   else{
      inputR=Custom_InR.value;
      outputR=Custom_outR.value;
      
   }
 
   
   answer.ariaPlaceholder = "Calculating";
   var number = input.value;
   Calculate(number, inputR,outputR);
 

})
function Calculate(num, iR, oR) {
   
  
   //1st check the given number in radix system or not.
   if (check(num, iR,oR)) {
      input.style.backgroundColor = 'white';
      input.style.color='black';
      var ansRadix = isNaN(oR)? giveNumber(oR):oR;
      var inputRadix = isNaN(iR)? giveNumber(iR):iR;
      if (ansRadix == inputRadix || num == 0) {
         answer.innerHTML = num;
         return;
      }
      //if input is not in decimal form then convert to decimal.
      if (inputRadix != 10) {

         var changNF = 0;

         var changN = 0;
         var fractionalint = num;

         var nf = num.toString().split(".");


         if (num - Math.floor(fractionalint) != 0 && inputRadix < 10) {

            title3.innerHTML = 'For Fractional Part';
            showex.appendChild(title3);
            console.log(num,Math.floor(fractionalint));
            var inpf = (num - Math.floor(fractionalint)).toPrecision(num.toString().split(".")[1].length).toString();
            console.log(inpf);
            for (let i = 2; i < inpf.length; i++) {

               const element = inpf[i];
               
               changNF += ((isNaN(inpf[i]) ? getNumber(inpf[i]) : inpf[i]) * (1 / Math.pow(inputRadix, i - 1)));
               
               var frs = element + '*' + '1/' + Math.pow(inputRadix, i - 1) + '=' + element * (1 / Math.pow(inputRadix, i - 1));
               let h_tage = document.createElement('h5');
               h_tage.innerHTML = frs;
               showex.appendChild(h_tage);
            }

         }
         else if (num.includes(".")) {
            title3.innerHTML = 'For Fractional Part';
            showex.appendChild(title3);
            var inpf = nf[1];
            console.log(inpf);
            for (let i = 1; i <= inpf.length; i++) {

               const element = inpf[i - 1];

               changNF += ((isNaN(element) ? getNumber(element) : element) * (1 / Math.pow(inputRadix, i)));

               var frs = element + '*' + '1/' + Math.pow(inputRadix, i) + '=' + (isNaN(element) ? getNumber(element) : element) * (1 / Math.pow(inputRadix, i));
               let h_tage = document.createElement('h5');
               h_tage.innerHTML = frs;
               showex.appendChild(h_tage);
            }
         }
         title1.innerHTML = 'Covert to decimal';
         showex.appendChild(title1);
         var num2 = inputRadix > 9 ? nf[0] : Math.floor(fractionalint).toString();
         
         for (var i = 0; i < num2.length; i++) {
            //for output.
            let stringmethod = num2[i] + "*" + Math.pow(inputRadix, num2.length - i - 1) + '=' + [(isNaN(num2[i]) ? getNumber(num2[i]) : num2[i]) * Math.pow(inputRadix, num2.length - i - 1)];
            let h_tage = document.createElement('h5');
            h_tage.innerText = stringmethod;
            showex.appendChild(h_tage);

            changN += ((isNaN(num2[i]) ? getNumber(num2[i]) : num2[i]) * Math.pow(inputRadix, num2.length - i - 1));
         }

         num = changN + changNF;
         var con_sum = document.createElement('h4');
         con_sum.innerHTML = 'sum: ' + num;
         showex.appendChild(con_sum);

      }
      if (ansRadix == 10) {
         answer.innerHTML = num;
      }
      else {
         ansCalculate(num, ansRadix);// convert into ans Radix.
      }
      
   }
   else {
      
      //input.value = 'Wrong input';
      input.style.backgroundColor = 'rgb(203, 64, 64)';
      input.style.color='white';
      // alert("Wrong Input");
      answer.innerHTML='Wrong Input';
   }

}

function check(n, r,o) {
   var num=n.toString().split('.');
   var radix = isNaN(r)? giveNumber(r):r;
   var radixo= isNaN(o)? giveNumber(o):o;
   if(radix<=16 &&  radix>1 && radixo<=16 && radixo>1){
      for (let index = 0; index < n.length; index++) {
         if ((isNaN(n[index]) ? getNumber(n[index]) : n[index]) > radix - 1) {
            
            return false;
         }
      }
   }
   else{
     
      return false;
   }
   if(num.length>2){
      
      return false;
   }
   return true;
}

function giveNumber(rNum) {
   switch (rNum) {
      case 'decimal':
         return 10;
      case 'binary':
         return 2;
      case 'hex':
         return 16;
      case 'octal':
         return 8;

      default:

         break;
   }
}

function ansCalculate(inp, rN) {
   let s = '';
   let s2 = '.';

   //for fractional part logic
   if (inp - Math.floor(inp) != 0) {
      var f = inp - Math.floor(inp);
      title2.innerHTML = 'For Fractional Part';
      showex.appendChild(title2);

      inp = Math.floor(inp);
      while (f != 1) {

         let string_fra = f.toPrecision(5);

         f = f * rN;
         string_fra += ('*' + rN + '=' + f.toPrecision(5));
         let h_tage = document.createElement('h5');

         var nf = Math.floor(f);
         h_tage.innerHTML = (string_fra + "//adding Part: " + (nf > 9 ? getchar(nf) : nf));
         showex.appendChild(h_tage);
         s2 += nf > 9 ? getchar(nf) : nf;

         if (s2.length > 12) {
            s2 += '...'
            break;
         }

         f = f - nf;
         if (f == 0) {
            break;
         }
      }
   }

   //for  decimal to anthor radix.
   
   if(inp==0){
      s+='0';
      answer.innerHTML=s+s2;
   }else{
      title.innerHTML = 'Decimal to ' + (isNaN(iR)?document.querySelector('#aR').value:'Input Radix') + ' Method';
   showex.appendChild(title);
   while (inp > 0) {
      let remider = inp % rN;
      let stringmethod = (inp / rN >= 1 ? rN : '–') + ' |  ' + inp + ' | ' + (inp / rN >= 1 ? remider : '⤴');
      let h_tage = document.createElement('h5');
      h_tage.innerText = stringmethod;
      showex.appendChild(h_tage);

      inp = Math.floor(inp / rN);

      let element = '';
      if (remider > 9) {
         s += getchar(remider);
      }
      else {
         s += remider;
      }
      //for reverse strings.
      for (let index = s.length - 1; index >= 0; index--) {

         element += s[index];
      }
      element += s2.length >= 2 ? s2 : '';
      // console.log(element);
      answer.innerText = element;
   }
 }   
}

function getNumber(num) {
   switch (num.toLowerCase()) {
      case 'a':
         return 10;
      case 'b':
         return 11;
      case 'c':
         return 12;
      case 'd':
         return 13;
      case 'e':
         return 14;
      case 'f':
         return 15;
      case '.':
         return ;
      default:
         return 16;
        
   }
}
function getchar(remider) {
   switch (remider) {
      case 10:
         return 'a';

      case 11:
         return 'b';

      case 12:
         return 'c';

      case 13:
         return 'd';

      case 14:
         return 'e';

      case 15:
         return 'f';

      default:

         break;
   }
}

