
//função que insere nome, imagem e faz a tela de seleção da pizza aparecer
function chooseOne(json) {
    
    cleanColor()
    document.getElementById('large').classList.add('botao-color')
    SizeValidationL = true;

    let sabor = json.name;
    document.getElementById('result-sabor').innerHTML = sabor;
    document.getElementsByClassName('container-choose')[0].style.display = 'flex';
    document.getElementById('result-valor').innerHTML = json.price[2].toFixed(2);

    let img = document.getElementById('img-choose');
    img.setAttribute('src', json.img);
    price(json);
}

//função que calcula o valor da pizza de acordo com a quantidade e insere no HTML
function price(json) {
    let valor = 0;
    if (priceS) {
        valor = json.price[0];
    } else if (priceM) {
        valor = json.price[1];
    } else if (priceL) {
        valor = json.price[2];
    };

    let howMany = document.getElementById('howManyPizza').value;
    let finalValue = valor * howMany;
    document.getElementById('result-valor').innerHTML = finalValue.toFixed(2);
    amount = howMany;
    obj = json;

}
//função que fecha o campo de seleção da pizza no botão cancel
function cancel() {
    document.getElementsByClassName('container-choose')[0].style.display = 'none';
}
//função que fecha o campo de seleção da pizza com a tecla ESC
function cancelEsc(e) {
    if (e.keyCode == 27) {
        document.getElementsByClassName('container-choose')[0].style.display = 'none';
    }
}
//função que abre a barra de finalização
function openCar() {
    if (SizeValidationS === true || SizeValidationM === true || SizeValidationL === true) {
        document.getElementsByTagName('aside')[0].style.display = 'flex';
        document.getElementsByClassName('container-choose')[0].style.display = 'none';
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        window.alert('ESCOLHA O TAMANHO DA PIZZA!')
    }
}
//função que abre a barra de finalização no mobile
function openCarMob() {
    if (listChoose.length > 0) {
        if (quantityCar > 0) {
            document.getElementsByTagName('aside')[0].style.display = 'flex';
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

        } else {
            window.alert('NENHUMA PIZZA NO CARRINHO');
        }
    }
}
//função que fecha a barra de finalização no mobile
function closeCarMob() {

    document.getElementsByTagName('aside')[0].style.display = 'none';

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

}
//função que insere o pedido na barra de finalização
function addToCar(howMany, json) {
    if (SizeValidationS === true || SizeValidationM === true || SizeValidationL === true) {
        let container = document.getElementById('pizza-end');
        container.innerHTML += `<div class="pizza-car"> 
                                        <div class="box-checkout-car">
                                            <div>
                                                <img class="pizza-ph" src=${json.img} alt="">
                                                <h4>${json.name} <span id="size">${sizeChoose}</span></h4>
                                            </div>
                                            <div>
                                                <input type="number" name="" class="newhowManyPizza" maxlength="3" min="1" max="50" id="${listChoose.length}" onclick="newValue(this.id), pizzaQuantity()" onkeyup="newValue(this.id), pizzaQuantity()">
                                                
                                                <img  class="close" src="assets/imagens/close.svg" alt="" id="${listChoose.length}" onclick="removeChoose(this.id)">
                                            </div>
                                        </div>
                                </div>`;

        SizeValidationS = false;
        SizeValidationM = false;
        SizeValidationL = false;
        cleanColor();


        cretingNewJson(obj, sizeChoose, howMany)
        amountPizzaInput(listChoose)
        somaFinal(listChoose)
    }
}

//função que faz a verificação do tamanho da pizza
function pizzaSize(item) {
    if (item == 'small') {
        small = false;
        SizeValidationS = true;
        sizeChoose = "p";
        cleanColor()
        cleanPriceSize()
        priceS = true;
        document.getElementById('small').classList.add('botao-color')
    } else if (item == 'medium') {
        medium = false;
        SizeValidationM = true;
        sizeChoose = "M";
        cleanColor()
        cleanPriceSize()
        priceM = true;
        document.getElementById('medium').classList.add('botao-color')
    } else if (item == 'large') {
        large = false;
        SizeValidationL = true;
        sizeChoose = "G";
        cleanColor()
        cleanPriceSize()
        priceL = true;
        document.getElementById('large').classList.add('botao-color')
    }
    price(pizzaJson[i])
}

//função que reseta as cores dos botões de tamanho
function cleanColor() {
    document.getElementById('small').classList.remove('botao-color')
    document.getElementById('medium').classList.remove('botao-color')
    document.getElementById('large').classList.remove('botao-color')
}

//função para resetar as variaveis que verificam qual o tamanho da pizza pra condicionar o preço
function cleanPriceSize() {
    priceS = false;
    priceM = false;
    priceL = false;
}

//função para resetar o input number da aba de escolha do pedido
function restartPrice() {
    document.getElementById('howManyPizza').value = 1;
}
//Criando um novo json pra armazenar as pizzas escolhidas
function cretingNewJson(newJson, size, howMany) {

    let sizeArray;
    if (size == 'G') {
        sizeArray = 2;
    } else if (size == "M") {
        sizeArray = 1;
    } else if (size == "p") {
        sizeArray = 0;
    };
    let jsonChoose = {
        name: newJson.name,
        quantity: howMany,
        price: newJson.price[sizeArray],
    };
    listChoose.push(jsonChoose)
    console.log(listChoose)

}
//função para inputar quantidade de pizzar selecionadas no input da finalização
function amountPizzaInput(newJson) {
    for (let n in newJson) {
        let inputNumber = document.getElementsByClassName('newhowManyPizza')[n];
        inputNumber.value = newJson[n].quantity;
    };
};
//Função para armazenar o valor de cada pizza no array *lisValue
function somaFinal(newJson) {
    let jsonSize = newJson.length - 1;
    let qnt = parseFloat(newJson[jsonSize].quantity);
    let preco = parseFloat(newJson[jsonSize].price);
    let multValor = qnt * preco;
    listValue.push(multValor);

    lastValue()
};

//função para somar os valores totais e desconto
function lastValue() {
    //Soma dos valores totais *SUBTOTAL
    totValue = totValue + listValue[positionArray];
    positionArray++

    //calculo do desconto de 10% *DESCONTO
    descTen = totValue * 0.10;

    //Valor total com desconto *TOTAL
    totValueWdesc = totValue - descTen;

    //chamando função para inputar valores na pagina
    valuePage();
};

//Função para inputar valores na pagina
function valuePage() {
    let subtotal = document.getElementById('subTot');
    let desc = document.getElementById('desc');
    let total = document.getElementById('total');


    subtotal.innerHTML = totValue.toFixed(2);
    desc.innerHTML = descTen.toFixed(2);
    total.innerHTML = totValueWdesc.toFixed(2);


}
//função para quando a quantidade das pizzas forem alteradas na finalização
function newValue(id) {
    let input = document.getElementById(id);
    if (input.value == '') {
        //Validação de caracteres no input        

    } else {
        listChoose[id].quantity = input.value;
        let qnt = parseFloat(listChoose[id].quantity);
        let preco = parseFloat(listChoose[id].price);
        let multValor = qnt * preco;
        valorAntigo = listValue[id]
        listValue[id] = multValor

        changeValue(id)
        idatual = id;
    };
}
//função para somar os valores totais e desconto caso haja alguma alteração na finalização
function changeValue(id) {
    //Soma dos valores totais *SUBTOTAL
    totValue = totValue - valorAntigo;
    totValue = totValue + listValue[id];

    //calculo do desconto de 10% *DESCONTO
    descTen = totValue * 0.10;

    //Valor total com desconto *TOTAL
    totValueWdesc = totValue - descTen;

    //chamando função para inputar valores na pagina
    valuePage();

}
//função para remover a pizza do carro de finalização
function removeChoose(id) {
    document.getElementsByClassName('pizza-car')[id].style.display = 'none';
    valorAntigo = listValue[id];
    listValue[id] = 0;
    listChoose[id].quantity = 0;

    removeValuePage(id)
    pizzaQuantity()
};
//função para subtrair o valor da pizza que foi removida do valor total e fechar o carrinho de finalização caso todas as pizzas sejam removidas
function removeValuePage(id) {
    //Soma dos valores totais *SUBTOTAL
    totValue = totValue - valorAntigo;

    //calculo do desconto de 10% *DESCONTO
    descTen = totValue * 0.10;

    //Valor total com desconto *TOTAL
    totValueWdesc = totValue - descTen;

    //chamando função para inputar valores na pagina
    if (totValueWdesc <= 0 ) {
        document.getElementsByTagName('aside')[0].style.display = 'none';
    }
    valuePage();
}

function pizzaQuantity() {
    quantityCar = 0;
    for (let n in listChoose) {
        let valueFinalCar = parseInt(listChoose[n].quantity);
        quantityCar += valueFinalCar;
    }

    let carPage = document.getElementById('qnt-pizza');
    carPage.innerHTML = quantityCar;
}


//função para travar o scroll quando o menu estiver aberto
addEventListener('scroll', block)
function block() {
    let menu = document.getElementById('menu-key').getAttribute('src');
    if (menu == 'assets/imagens/close.svg') {
        window.scrollTo(0, 0)
    }
}
//função para abrir menu
function openMenu() {
    let menu = document.getElementById('menu-key');
    let atributo = document.getElementById('menu-key').getAttribute('src')
    if (atributo == 'assets/imagens/menu.svg') {
        menu.setAttribute('src', 'assets/imagens/close.svg');
        document.querySelectorAll('.menu ul')[0].style.display = 'flex';
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'

        })
    } else {
        menu.setAttribute('src', 'assets/imagens/menu.svg');
        document.querySelectorAll('.menu ul')[0].style.display = 'none';
    }
}




restartPrice()
let i; // Posição do meu Objeto no array pizzaJson
let amount; // Quantidade de pizzas selecionadas
let obj; // Json selecionado
let small = false; // pizza pequena
let medium = false; // pizza media
let large = false; // pizza grande
let sizeChoose = "G"; // Tamanho escolhido
let SizeValidationS;
let SizeValidationM;
let SizeValidationL;
let priceS; // definir valor pelo tamanho
let priceM; // definir valor pelo tamanho
let priceL = true; // definir valor pelo tamanho
let positionArray = 0; //Posição do Array para saber qual o valor da pizza atual
let listChoose = []; // array dos itens já adicionados no carrinho
let listValue = []; // lista de valores somados
let descTen = 0; //Desconto de 10% sobre o valor total
let totValue = 0; //Valor total da compra
let totValueWdesc = 0 //Valor total com desconto 
let valorAntigo = 0;
let quantityCar = 0; // Quantidade de pizzas no carrinho
let idatual = 0;


