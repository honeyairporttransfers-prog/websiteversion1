// Core Logic for Honey Airport Transfers Ltd - Elite 2.0

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Booking System - The Elite Standard
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const dateTime = document.getElementById('travelTime').value;
    const [date, time] = dateTime.split('T');

    const booking = {
        id: 'ELITE-' + Math.random().toString(36).substr(2, 4).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
        pincode: document.getElementById('pincode').value,
        destination: document.getElementById('destination').value,
        date: date,
        time: time,
        vehicle: document.getElementById('vehicleType').value,
        status: 'SECURED'
    };

    const bookings = JSON.parse(localStorage.getItem('luxury_honey_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('luxury_honey_bookings', JSON.stringify(bookings));

    alert(`Elite Reservation Secured: ${booking.id}\nHoney Airport Transfers Ltd thanks you for your trust.`);

    // WhatsApp Elite Dispatch
    const message = `*HONEY AIRPORT TRANSFERS LTD*\n*ELITE PRIORITY ALERT*\n\nReservation ID: ${booking.id}\nPickup Pincode: ${booking.pincode}\nDestination: ${booking.destination}\nSchedule: ${date} @ ${time}\nVehicle Category: ${booking.vehicle}\n\n_Please confirm vehicle assignment immediately._`;
    const waUrl = `https://wa.me/441865999999?text=${encodeURIComponent(message)}`;

    if (confirm("Would you like to notify our 24/7 Priority Dispatch team on WhatsApp?")) {
        window.open(waUrl, '_blank');
    }
});

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
