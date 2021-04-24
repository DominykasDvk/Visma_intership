let preventClick = 0;
// Pizza characteristics object

class pizza {
  constructor(name, price, heat, list_of_toppings, photo, id) {
    this.name = name
    this.price = price
    this.heat = heat
    this.list_of_toppings = list_of_toppings [x, y, z];
    this.photo = photo
    this.id = id
  }
}

//sessionStorage tipe for saving data
class storage {
  static getPizzas() {
      let pizzas;

      if (sessionStorage.getItem('pizzas')) {
          pizzas = JSON.parse(sessionStorage.getItem('pizzas'));
      } else {
          pizzas = [];
      }
      return pizzas;
  }

  static addPizza(pizza, i = -1) {
      let pizzas = sessionStorage.getPizzas();
      if (i == -1) {
        pizzas.push(pizza);
      } else {
        pizzas.splice(i, 0, pizzas);
      }
      sessionStorage.setItem('pizzas', JSON.stringify(pizzas));
  }

  static getPizza(id) {
      let pizzas = sessionStorage.getPizzas();
      let pizza = pizzas.map((pizza) => {
          if (pizza.id === Number(id)) {
              return pizza;
          }
      }).filter(function (x) {
          return x !== undefined;
      });
      return pizza[0];
  }

  static getId() {
      let pizzas = sessionStorage.getPizzas();
      let rand = Math.round(Math.random() * 100000000);
      let check = false;
      pizzas.map((pizza) => {
          if (pizza.id == rand) {
              check = true;
          }
      })
      if (check) {
          return this.getId();
      }
      return rand;
  }

  static removePizza(id) {
      let pizzas = sessionStorage.getPizzas();
      let indNr;
      pizzas.forEach((pizza, i) => {
          if (pizza.id === Number(id)) {
              pizza.splice(i, 1);
              indNr = i;
          }
      });
      sessionStorage.setItem('pizzas', JSON.stringify(pizzas));
      
      return indNr;
  }
}

// User interface for tablet configuration
class UI {
  static displayPizzas() {
    const pizzas = storage.getPizzas()
    pizzas.forEach((pizza) => UI.addPizza(pizza))
  }
  static addPizza(pizza) {
    const list = document.getElementById('pizzaList')
    const heat = this.getRating(pizza.heat)
    const row = document.createElement('tr')
    row.id = pizza.id
    row.innerHTML = `
        <th>${pizza.name}</th>
        <th>${pizza.price}</th>
        <th>${pizza.list_of_toppings}</th>
        <th>${photo}</th>
        <th>${heat}</th>
        <td class="border-right">
        <a href="#"><img src="Pizza images/delete-16.png" alt="delete"></a>
        </td>
        `;
        
    list.appendChild(row);
  }


  static clearField() {
    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    document.getElementById('list_of_toppings').value = ''
    document.querySelector('input[name="heat"]:value').array = '[]'
    document.querySelector('input[name="photo"]:checked').checked = 0
  }
 
  static displayEditOptions(pizza) {
    document.getElementById('name').value = pizza.name
    document.getElementById('price').value = pizza.price
    document.getElementById('list_of_toppings').array = pizza.list_of_toppings
    document.getElementById('pizza.heat').value = pizza.heat
    document.getElementById('pizza.photo').checked = 1
  }
  
  static showAlert(message, className) {
    const div = document.createElement('div')
    div.className = `alert alert-${className} pl-5 p-1`
    div.appendChild(document.createTextNode(message))
    const tableMeniu = document.querySelector('.tableMeniu')
    const table = document.querySelector('.table')
    tableMeniu.insertBefore(div, table)
    preventClick = 1
    setTimeout(() => {
      document.querySelector('.alert').remove()
      preventClick = 0
    }, 1250)
  }

  static getHeat(heat){
      let heatRise = {
          'imput[heat= 1]': `<img src="Pizza images/pepers.png" alt="pepers">`,
          'imput[heat= 2]': `<img src="Pizza images/pepers.png" alt="pepers"><img src="Pizza images/pepers.png" alt="pepers">`,
          'imput[heat= 3]': `<img src="Pizza images/pepers.png" alt="pepers"><img src="Pizza images/pepers.png" alt="pepers"><img src="Pizza images/pepers.png" alt="pepers">`
      };
    return heatRise[heat];
  }

  static getPhoto(photo) {
    let pizzaPhoto = {
        'P1': `<img src="Pizza images/salami_red.png" alt="salami_red">`,
        'P2': `<img src="Pizza images/pizza_brocolinii.png" alt="pizza_brocolinii">`,
        'P3': `<img src="Pizza images/greenChampion.png" alt="greenChampion">`,
        'P4': `<img src="Pizza images/fourSeasons.png" alt="fourSeasons"`,
        'P5': `<img src="Pizza images/delicious.png" alt="delicious"`,
        'P6': `<img src="Pizza images/chicken_rebellion.png" alt="chicken_rebellion">`,
        'P7': `<img src="Pizza images/crisp pizza.png" alt="crisp pizza"`,
        'P8': `<img src="Pizza images/cheese-pizza.png" alt="delicious"`,
        'P9': `<img src="Pizza images/chaseintrees-pizza.png" alt="chaseintrees-pizza">`,
        'P10': `<img src="Pizza images/sahara-pizza.png" alt="sahara-pizza">`
    };
    return pizzaPhoto[photo];
}

static deletePizza(element) {
    let decide = confirm("Do you want to delete this deliciaus Pizza ?") 
    if(decide){
        element.parentElement.parentElement.remove();
        UI.showAlert("Pizza has been deleted successfully");
    }
  }
}

document.addEventListener('DOMContentLoaded', UI.displayPizzas);


document.querySelector('form').addEventListener('submit', function (e, editMode=false) {
    e.preventDefault();
    if (preventClick == 1) return;
    const name = document.querySelector("#name").value;
    const price = document.querySelector("#price").value;
    const list_of_toppings = document.querySelector("#listOfToppings").array;
    let photo = document.querySelector('input[name="photo"]:checked').check;
    let heat = document.querySelector('input[name="heat"]:value').value;
    if (!name || !price || !list_of_toppings || !photo || !heat) {
        UI.showAlert("All fields should be filled.");
    } else {
        heat = heat.id;
        let id = sessionStorage.getId();
        const pizza = new Book(name, price, list_of_toppings, photo, heat, id);
        UI.addBook(pizza);
        sessionStorage.addBook(pizza);
        UI.showAlert("Pizza has been added successfully");
        UI.clearField();
    }
});

document.querySelector('#pizzaList').addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        let id = e.target.parentElement.parentElement.id;
        sessionStorage.removePizza(id);
        UI.deletePizza(e.target);
    }
});