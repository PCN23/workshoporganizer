import { checkAuth, deleteParticipant, getClasses, logout } from '../fetch-utils.js';

checkAuth();
const carBrands = document.querySelector('.car-brands');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayCars() {
    const classes = await getClasses();
    console.log(classes);
    classes.textContent = '';

    for (let carro of classes) {
        const vehicleEl = document.createElement('div');
        vehicleEl.classList.add('car');

        const nameEl = document.createElement('h3');
        nameEl.textContent = carro.name;

        const participantsEl = document.createElement('div');
        participantsEl.classList.add('trucks');

        for (let person of carro.participants) {
            const carEl = document.createElement('div');
            carEl.classList.add('car');
            carEl.textContent = person.name;

            carEl.addEventListener('click', async () => {
                await deleteParticipant(person.id);
                displayCars();
            });
            participantsEl.append(carEl);
        }
        vehicleEl.append(participantsEl, nameEl);
        carBrands.append(vehicleEl);
    }
}
displayCars();