window.addEventListener('DOMContentLoaded', () => {
    // --- Mengambil semua elemen dari HTML ---
    // Elemen utama
    const fileInput = document.getElementById('fileInput');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Elemen slider dan nilainya
    const slidersContainer = document.getElementById('slidersContainer');
    const grayscaleSlider = document.getElementById('grayscaleSlider');
    const contrastSlider = document.getElementById('contrastSlider');
    const brightnessSlider = document.getElementById('brightnessSlider');
    const grayscaleValue = document.getElementById('grayscaleValue');
    const contrastValue = document.getElementById('contrastValue');
    const brightnessValue = document.getElementById('brightnessValue');

    // Elemen tombol
    const applyBtn = document.getElementById('applyBtn');
    const resetBtn = document.getElementById('resetBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    let image = new Image();
    image.crossOrigin = "Anonymous";

    // --- FUNGSI UTAMA ---

    
    const applyFilters = () => {
        if (!image.src) return;

        
        const grayscale = grayscaleSlider.value;
        const contrast = contrastSlider.value;
        const brightness = brightnessSlider.value;

        
        grayscaleValue.textContent = grayscale;
        contrastValue.textContent = contrast;
        brightnessValue.textContent = brightness;
        
        
        ctx.filter = `grayscale(${grayscale}%) contrast(${contrast}%) brightness(${brightness}%)`;
        
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
    };

    // --- EVENT LISTENERS ---

    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                image.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        resetBtn.click(); 
        applyBtn.disabled = false;
        resetBtn.disabled = false;
        slidersContainer.classList.remove('hidden'); 
    };

    
    applyBtn.addEventListener('click', () => {
        
        grayscaleSlider.value = 100;
        contrastSlider.value = 250;
        brightnessSlider.value = 60;
        
        
        applyFilters();
        
        downloadBtn.classList.remove('hidden');
    });

    
    resetBtn.addEventListener('click', () => {
       
        grayscaleSlider.value = 0;
        contrastSlider.value = 100;
        brightnessSlider.value = 100;
        
        applyFilters(); 
        
        downloadBtn.classList.add('hidden');
    });
    
    
    grayscaleSlider.addEventListener('input', applyFilters);
    contrastSlider.addEventListener('input', applyFilters);
    brightnessSlider.addEventListener('input', applyFilters);

    
    downloadBtn.addEventListener('click', (e) => {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        e.currentTarget.href = dataUrl;
        e.currentTarget.download = 'edited-image.jpg';
    });
});