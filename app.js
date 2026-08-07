'use strict';

const restaurantPhone = '33615095201';
const knownScheduleEnd = new Date('2027-05-31T23:59:59');

const serviceTimes = {
  thursday: ['19:00', '19:30', '20:00', '20:30', '21:00'],
  friday: ['12:00', '12:30', '13:00', '19:00', '19:30', '20:00', '20:30', '21:00'],
  saturday: ['12:00', '12:30', '13:00', '19:00', '19:30', '20:00', '20:30'],
  sunday: ['12:00', '12:30', '13:00']
};

function setupNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

function toLocalDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

function isSummerSeason(date) {
  const month = date.getMonth() + 1;
  return month >= 6 && month <= 9;
}

function timesForDate(date) {
  if (date > knownScheduleEnd) return null;

  const day = date.getDay();
  if (day === 5) return serviceTimes.friday;
  if (day === 6) return serviceTimes.saturday;
  if (day === 0) return serviceTimes.sunday;
  if (day === 4 && isSummerSeason(date)) return serviceTimes.thursday;
  return [];
}

function setMinimumDate() {
  const input = document.getElementById('booking-date');
  if (!input) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  input.min = `${year}-${month}-${day}`;
}

function updateAvailableTimes() {
  const dateInput = document.getElementById('booking-date');
  const timeSelect = document.getElementById('booking-time');
  const status = document.getElementById('form-status');
  if (!dateInput || !timeSelect || !status) return;

  timeSelect.replaceChildren();
  status.textContent = '';

  if (!dateInput.value) {
    timeSelect.add(new Option('Choisissez d’abord une date', ''));
    return;
  }

  const date = toLocalDate(dateInput.value);
  const times = timesForDate(date);

  if (times === null) {
    timeSelect.add(new Option('Horaires à confirmer directement', 'contact'));
    status.textContent = 'La période choisie dépasse les horaires publics actuellement documentés.';
    return;
  }

  if (!times.length) {
    timeSelect.add(new Option('Restaurant fermé ce jour', ''));
    status.textContent = 'Aucun service public n’est annoncé ce jour-là.';
    return;
  }

  timeSelect.add(new Option('Choisir un horaire', ''));
  times.forEach((time) => timeSelect.add(new Option(time, time)));
}

function formatFrenchDate(value) {
  const date = toLocalDate(value);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function buildReservationMessage(form) {
  const data = new FormData(form);
  const dateLabel = formatFrenchDate(data.get('date'));
  const guests = data.get('guests') === 'groupe' ? 'plus de 10 personnes' : `${data.get('guests')} personne${data.get('guests') === '1' ? '' : 's'}`;
  const time = data.get('time') === 'contact' ? 'horaire à convenir' : data.get('time');
  const notes = String(data.get('notes') || '').trim();

  const lines = [
    'Bonjour Le Boomerang,',
    '',
    'Je souhaite faire une demande de réservation :',
    `• Nom : ${data.get('name')}`,
    `• Téléphone : ${data.get('phone')}`,
    `• Date : ${dateLabel}`,
    `• Horaire souhaité : ${time}`,
    `• Nombre : ${guests}`
  ];

  if (notes) lines.push(`• Précisions : ${notes}`);

  lines.push('', 'Pouvez-vous me confirmer si une table est disponible ? Merci.');
  return lines.join('\n');
}

function setupBookingForm() {
  const form = document.getElementById('booking-form');
  const dateInput = document.getElementById('booking-date');
  const status = document.getElementById('form-status');
  if (!form || !dateInput || !status) return;

  dateInput.addEventListener('change', updateAvailableTimes);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const time = form.elements.time?.value;
    if (!time) {
      status.textContent = 'Choisissez un jour et un horaire de service.';
      return;
    }

    const message = buildReservationMessage(form);
    const whatsappUrl = `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(message)}`;
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (!opened) {
      status.textContent = 'Votre navigateur a bloqué l’ouverture de WhatsApp. Utilisez le bouton d’appel ou autorisez les fenêtres.';
      return;
    }

    status.textContent = 'La demande a été préparée dans WhatsApp. Pensez à l’envoyer et à attendre la confirmation du restaurant.';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setMinimumDate();
  setupBookingForm();
});
