import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function getDeliverOptions(deliverOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliverOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption;
}
function isWeekend(day){
    if (day==='Saturday'||day==='Sunday'){
        return true;
    }
}
export function calculateDeliveryDate(deliveryOption){

    let remainingDate=deliveryOption.deliveryDays;
    let deliveryDate=dayjs();

    while(remainingDate>0){
        deliveryDate=deliveryDate.add(1,'day');
        const stringDate=deliveryDate.format('dddd');

        if (!isWeekend(stringDate)){
            remainingDate--;
        }
    }

    return deliveryDate.format('dddd, MMMM D');
}

export const deliveryOptions=[
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];