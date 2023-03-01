let pizzaJson = [
    {i: 0, id: 0, name: 'Mussarela', img: 'assets/imagens/pizza.png', price: [9.80, 12.14, 20.19], sizes: ['100g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    {i: 1,  id: 1, name: 'Bahiana', img: 'assets/imagens/pizza2.png', price: [7.47, 14.51, 24.29], sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    {i: 2,  id: 2, name: 'Napolitana', img: 'assets/imagens/pizza3.png', price: [6.84, 10.20, 32.12], sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    {i: 3,  id: 3, name: '4 Queijos', img: 'assets/imagens/pizza4.png', price: [4.54, 13.45, 32.12], sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    {i: 4,  id: 4, name: 'Moda da Casa', img: 'assets/imagens/pizza5.png', price: [8.45, 14.20, 26.12], sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    {i: 5,  id: 5, name: 'Bacalhau', img: 'assets/imagens/pizza6.png', price: [6.84, 10.25, 27.19], sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    {i: 6,  id: 6, name: 'Chocolate', img: 'assets/imagens/pizza7.png', price: [9.87, 14.20, 18.19], sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    {i: 7,  id: 7, name: 'Calabresa', img: 'assets/imagens/pizza.png', price: [7.65, 15.20, 29.24], sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    {i: 8,  id: 8, name: 'Camarão', img: 'assets/imagens/pizza2.png', price: [8.45, 16.45, 24.19], sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' }
];

//função que insere as pizzas do Json no site
function pizzasOnScreen(json) {
    pizzaJson.map((item)=>{document.querySelector('.container-pizza').innerHTML += `<div class="box-pizza">
    <div class="photo">
        <img id="img-choose" src=${item.img} alt="">
        <button class="add" onclick="chooseOne(pizzaJson[${item.id}]), i = ${item.i}">+</button>
    </div>
    <div class="text">
        <h3 id="texto">R$ <span id="valor-pizza1">${item.price[2]}</span></h3>
        <h2 class="sabor">${item.name}</h2>
        <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias culpa incidunt ab earum distinctio</h5>
    </div>
</div>`})    
}

pizzasOnScreen()