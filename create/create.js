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
    // e.preventDefault();
    const selectEl = document.querySelector('select');
    const cars = await getClasses();
    for (let car of cars) {
        const optionEl = document.createElement('option');
        optionEl.value = car.id;
        optionEl.textContent = car.name;
        selectEl.append(optionEl);
    }
});

