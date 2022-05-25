import { createParticipant, getClasses } from '../fetch-utils.js';


const form = document.querySelector('car-form');


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    await createParticipant({
        name: data.get('class'),
        contact: data.get('participants'),
    });
    window.location.href = '../other-page';
    form.reset();
});

window.addEventListener('load', async (e) => {
    const cars = await getClasses();
    const selectEl = document.querySelector('select');
    for (let car of cars) {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = car.name;
        selectEl.append(option);
    }
});

