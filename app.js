// Core Logic for Honey Airport Transfers Ltd - Elite 2.0

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Booking System - Honey Airport Transfers
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('travelDate').value;
    const hour = document.getElementById('travelHour').value;
    const minute = document.getElementById('travelMinute').value;
    const time = `${hour}:${minute}`;

    const booking = {
        id: 'HONEY-' + Math.random().toString(36).substr(2, 4).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
        pincode: document.getElementById('pincode').value,
        destination: document.getElementById('destination').value,
        date: date,
        time: time,
        vehicle: document.getElementById('vehicleType').value,
        passengers: document.getElementById('passengerCount').value,
        luggage: document.getElementById('luggageCount').value,
        name: document.getElementById('passengerName').value,
        phone: document.getElementById('passengerPhone').value,
        status: 'SECURED'
    };

    const bookings = JSON.parse(localStorage.getItem('luxury_honey_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('luxury_honey_bookings', JSON.stringify(bookings));

    alert(`Transfer Secured: ${booking.id}\nHoney Airport Transfers thanks you for your trust.`);

    // WhatsApp Priority Dispatch (Updating to latest number 07443880040)
    const message = `*HONEY AIRPORT TRANSFERS LTD*\n*TRANSFER PRIORITY ALERT*\n\nReservation ID: ${booking.id}\nCustomer: ${booking.name}\nPhone: ${booking.phone}\nPickup: ${booking.pincode}\nDestination: ${booking.destination}\nSchedule: ${date} @ ${time}\nVehicle: ${booking.vehicle}\nPax: ${booking.passengers} | Luggage: ${booking.luggage}\n\n_Please confirm vehicle assignment immediately._`;
    const waUrl = `https://wa.me/447443880040?text=${encodeURIComponent(message)}`;

    if (confirm("Would you like to notify our 24/7 Priority Dispatch team on WhatsApp?")) {
        window.open(waUrl, '_blank');
    }
});

function selectFleetClass(vehicle) {
    const vehicleSelect = document.getElementById('vehicleType');
    vehicleSelect.value = vehicle;

    // Smooth scroll to form
    const homeSection = document.getElementById('home');
    homeSection.scrollIntoView({ behavior: 'smooth' });

    // Visual feedback on form
    const bookingCard = document.querySelector('.booking-card');
    bookingCard.style.boxShadow = '0 0 50px rgba(255, 193, 7, 0.5)';
    setTimeout(() => {
        bookingCard.style.boxShadow = '';
    }, 2000);
}

function updateCounter(id, change) {
    const input = document.getElementById(id);
    const display = document.getElementById(id.replace('Count', 'Display'));
    let value = parseInt(input.value) + change;
    if (value < 1) value = 1;
    if (value > 16) value = 16;
    input.value = value;
    display.innerText = value;
}

function login() {
    const email = document.getElementById('loginEmail').value;
    if (!email) {
        alert("Enter your authenticated email address.");
        return;
    }

    const portalLogin = document.getElementById('portal-login');
    const portalData = document.getElementById('portal-data');
    const bookingList = document.getElementById('bookingList');

    const bookings = JSON.parse(localStorage.getItem('luxury_honey_bookings') || '[]');

    portalLogin.style.display = 'none';
    portalData.style.display = 'block';

    if (bookings.length === 0) {
        bookingList.innerHTML = "<p style='text-align: center; color: #999; padding: 40px;'>No elite reservations found.</p>";
    } else {
        bookingList.innerHTML = bookings.map(b => `
            <div style="background: #fafafa; border-left: 4px solid #FFC107; padding: 25px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <strong style="color: #000; letter-spacing: 1px;">REF: ${b.id}</strong><br>
                        <span style="font-size: 1rem; font-weight: 800;">${b.pincode} &rarr; ${b.destination}</span><br>
                        <small style="color: #888;">${b.date} at ${b.time}</small><br>
                        <small style="color: #FFC107; font-weight: 800;">CLASS: ${b.vehicle}</small>
                    </div>
                </div>
            </div>
        `).join('');
    }
}
