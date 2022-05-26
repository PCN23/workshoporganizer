import { createParticipant, getClasses, checkAuth } from '../fetch-utils.js';


const form = document.querySelector('.car-form');


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
console.log({
    name: data.get('name'),
    contact: data.get('contact'),
    class_id: data.get('participants'),
    
});
    await createParticipant({
        name: data.get('name'),
        contact: data.get('contact'),
        class_id: data.get('participants'),
        
    });
    window.location.href = '../other-page';
    form.reset();
});

window.addEventListener('load', async (e) => {
    // e.preventDefault();
    const cars = await getClasses();
    const dropdown = document.querySelector('select');
    for (let car of cars) {
        const optionEl = document.createElement('option');
        optionEl.value = car.id;
        optionEl.textContent = car.name;

        dropdown.append(optionEl);
    }
});

checkAuth();