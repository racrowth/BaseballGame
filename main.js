var inputNumber = document.getElementById("inputNumber");
var inputArr;
var shuffledNums;
var gameNums;
let lives = 10;
var strike = 0;
var ball = 0;
const nums = [1,2,3,4,5,6,7,8,9];
var inputHistory = [];

function 번호생성() {
    shuffledNums = [...nums].sort(() => Math.random() - 0.5);
    gameNums = shuffledNums.slice(0,3);
}

function 카운터() {
    strike = 0;
    ball = 0;
    lives -= 1;

    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 3; i++) {
            if (gameNums[j] == inputArr[i])
            ball += 1;
        }
    } // ball counter 같은게 있으면 일단 ball로 카운트 //

    for (var i = 0; i < 3; i++) {
        if (gameNums[i] == inputArr[i]) {
            ball -= 1;
            strike += 1;
        }
    } // 자릿수까지 같은게 있으면 strike로 카운트하고, 중복된 ball 만큼 빼줌 //

}


function 메세지주기(a)  {
    document.getElementById("warningMsg").innerHTML = a;
    setTimeout(function() {
        document.getElementById("warningMsg").innerHTML = "";
    }, 1500);
}

function 중복입력값검사(myArray) 
    {
        for (var i = 0; i < myArray.length; i++) 
        {
            for (var j = 0; j < myArray.length; j++) 
            {
                if (i != j) 
                {
                    if (myArray[i] == myArray[j]) 
                    {
                        return true; // means there are duplicate values
                    }
                }
            }
        }
        return false; // means there are no duplicate values.
    }

function 아까했던숫자인지검사(Arr) {
    for (var i = 0; i < Arr.length; i++) {
        if (Arr == inputHistory[i]) {
            return true;
        }
    }
    return false;
}

function 리셋() {
    번호생성();
    document.getElementById("gameBox").innerHTML = ""
    inputHistory = []
}

function 첫게임확인() {
    if (lives == 10) {
        리셋()
    }
}

document.getElementById("submit").addEventListener("click", function(){

    inputArr = [...inputNumber.value.toString()].map(Number); //입력값 배열화//

    if (inputNumber.value == "") {
        메세지주기("입력란이 빈칸입니다");
        return;
        }
    else if (inputNumber.value.length < 3) {
        메세지주기("숫자가 짧습니다. 3자리 숫자를 입력해주세요");
        return;
        }
    else if (inputNumber.value.length > 3) {
        메세지주기("숫자가 깁니다. 3자리 숫자를 입력해주세요");
        return;
        }
    else if (중복입력값검사(inputArr) == true) {
        메세지주기("중복되지 않은 3자리 숫자를 입력해주세요");
        return;
        }
    else if (아까했던숫자인지검사(inputNumber.value) == true) {
        메세지주기("아까 했던 숫자인데요? 다른값을 입력해주세요");
        return;
        }
    

    첫게임확인();
    카운터();
  
    inputHistory.push(inputNumber.value);
    document.getElementById("gameBox").innerHTML += " > ";
    document.getElementById("gameBox").innerHTML += inputNumber.value += "<br>"; //입력값 append//
    document.getElementById("gameBox").innerHTML += `<span>${strike} strike / ${ball} ball / ${lives} lives<span>`;
    document.getElementById("gameBox").innerHTML += "<br>";

    inputNumber.value = ""; //입력창 지워줌//


    if (strike == 3) {
        document.getElementById("gameBox").innerHTML += `<span id="end">축하합니다! 정답입니다!<span>`;
        lives = 10;   
    }
    
    if (lives == 0) {
        document.getElementById("gameBox").innerHTML += `<span id="end">기회 끝! 아쉽네요! 다시 도전하세요!<span>`;
        lives = 10;
    }

})



