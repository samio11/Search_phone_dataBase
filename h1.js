let loadMainData = async (searchText, para) => {
    let url = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    let data = await url.json();
    let data1 = data.data;
    gettingCard(data1, para);
}

let gettingCard = (data, para) => {
    const container = document.getElementById('parent_card');
    container.textContent = '';
    console.log(para);
    if (data.length > 6 && !para) {
        data = data.slice(0, 6);
        document.getElementById('s1').classList.remove('hidden')
    }
    else {
        document.getElementById('s1').classList.add('hidden')
    }
    data.forEach(element => {
        let div = document.createElement('div');
        console.log(element);
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
        <figure><img src="${element.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${element.phone_name}</h2>
            <p>This is a awesome Phone.you Should buy it</p>
            <div class="flex justify-center">
            
            <!-- Open the modal using ID.showModal() method -->
            <button onclick="showModal1('${element.slug}')" class="btn" btn-primary">open modal</button>
            
            </div>
        </div>
    </div>
        `;
        container.appendChild(div)
    });
    toggle(false);
}


let searchBtn = (para) => {
    toggle(true)
    let valueOfInput = document.getElementById('input_field').value;
    loadMainData(valueOfInput, para);
}

let toggle = (hasValue) => {
    if (hasValue) {
        document.getElementById('spinner_container').classList.remove('hidden')
    }
    else {
        document.getElementById('spinner_container').classList.add('hidden')
    }
}

let loadMoreBtn = () => {
    // console.log('BTN CLICKED')
    searchBtn(true)
}

let showModal1 =async (id) =>{
    let url2 = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    let data2 = await url2.json();
    let data3 = data2.data
    getDetail(data3)
}
let getDetail = data2 =>{
    console.log(data2);
    // showModal
    let container = document.getElementById('modal_full_container');
    console.log(container);
    let div = document.createElement('div')
    div.innerHTML = `
    <div class="flex justify-center">
    <img src="${data2.image}">
    </div>
     <p>Storage:- ${data2.mainFeatures.storage}</p>
     <p>Display:- ${data2.mainFeatures.displaySize}</p>
     <p>Chipset:- ${data2.mainFeatures.chipSet}</p>
     <p>Memory:- ${data2.mainFeatures.memory}</p>
     <p>Phone Sensor:- ${data2.mainFeatures.sensors.map(x => x)}</p>
     <p>Phone Release Date:-${data2.releaseDate}</p>
    `;
    container.appendChild(div)

    my_modal_info.showModal();
}