let currentSlide = 0;
let slides;
let totalSlides;

// Function to update the slide display and navigation controls
function updateSlideDisplay() {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Show the current slide
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }

    // Update the slide counter text
    document.getElementById('slideCounter').textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;

    // Enable/disable previous and next buttons
    document.getElementById('prevBtn').disabled = (currentSlide === 0);
    document.getElementById('nextBtn').disabled = (currentSlide === totalSlides - 1);
}

// Function to go to the next slide
function goToNextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlideDisplay();
    }
}

// Function to go to the previous slide
function goToPrevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlideDisplay();
    }
}

// Function to create the chart for global challenges
function createGlobalChallengesChart() {
    const ctx = document.getElementById('globalChallengesChart');
    if (!ctx) return; // Don't run if the chart element isn't on the current slide

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Conflict & War', 'Poverty & Inequality', 'Climate Change', 'Forced Migration', 'Political Polarization'],
            datasets: [{
                label: 'Urgency for Hope & Action',
                data: [90, 85, 88, 78, 82], // Representative data
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(155, 89, 182, 0.7)'
                ],
                borderColor: [
                    '#c0392b',
                    '#f39c12',
                    '#27ae60',
                    '#2980b9',
                    '#8e44ad'
                ],
                borderWidth: 2
            }]
        },
        options: {
            indexAxis: 'y', // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` A call for a Jubilee response of level: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Level of Challenge'
                    }
                }
            }
        }
    });
}

// Initialize the presentation when the page loads
window.addEventListener('load', function() {
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
    
    updateSlideDisplay();
    createGlobalChallengesChart(); // Create the chart on load

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToPrevSlide();
        }
    });
});
