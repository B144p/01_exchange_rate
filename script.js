const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');

const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const rate_text = document.getElementById('rate');
const swap = document.getElementById('btn');

currency_one.addEventListener('change',cal_money);
currency_two.addEventListener('change',cal_money);
// ถ้า currency_one มีการเปลี่ยนแปลง ให้ใช้ฟังก์ชัน cal_money
amount_one.addEventListener('input',cal_money);
amount_two.addEventListener('input',cal_money);
// ถ้า input เข้าไปให้ใช้ฟังก์ชัน cal_money

function cal_money(){
    const one = currency_one.value;
    const two = currency_two.value;
    let url = `https://v6.exchangerate-api.com/v6/b6bea117caec3d9e70f76da5/latest/${one}`;
    fetch(url)                  // เรียกใช้ API ได้เป็น Promise
    .then(res=>res.json())      // เปลี่ยนให้เป็น json
    .then(data=>{               // แล้วเก็บข้อมูลลงใน data
        // console.log(data.conversion_rates[two]);
        const rate = data.conversion_rates[two];
        rate_text.innerText = `1 ${one} = ${rate} ${two}`;
        amount_two.value = (amount_one.value * rate).toFixed(2);    // แสดงทศนิยม 2 ตำแหน่ง
    })
}
swap.addEventListener('click',()=>{
    const currency_temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = currency_temp;

    const amount_temp = amount_one.value;
    amount_one.value = amount_two.value;
    amount_two.value = amount_temp;
    cal_money();
})


cal_money();        // สั่งให้ทำงานตั้งแต่เริ่มโปรแกรม