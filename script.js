window.addEventListener('load', () => {
    const opening = document.getElementById('opening-animation');
    const mainContent = document.querySelector('.main-content');

    if (opening && mainContent) {
        mainContent.style.opacity = '0'; // Garante que comece escondido
        document.body.style.overflow = 'hidden'; // Trava a rolagem

        setTimeout(() => {
            opening.style.opacity = '0';
            opening.style.pointerEvents = 'none';

            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
            document.body.style.overflow = 'auto'; // Libera a rolagem
        }, 4800); // Aumentei um pouco o tempo para a animação das pétalas
    } else {
        console.error("Elemento da abertura ou conteúdo principal não encontrado!");
        if(mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }
        document.body.style.overflow = 'auto';
    }

    // Script do coração
    const heartContainer = document.getElementById('crystalHeart');
    if (heartContainer) {
        document.body.addEventListener('mousemove', (e) => {
            const rect = document.body.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const sensitivity = 28;
            const rotateY = (mouseX - centerX) / sensitivity;
            const rotateX = (centerY - mouseY) / sensitivity;
            heartContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        document.body.addEventListener('mouseleave', () => {
            heartContainer.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            heartContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });

        heartContainer.addEventListener('transitionend', () => {
            heartContainer.style.transition = 'transform 0.08s ease-out';
        });
    }

    // Embaralhar fotos
    const photoGallery = document.querySelector('.photo-gallery');
    if (photoGallery) {
        const photoPlaceholders = Array.from(photoGallery.querySelectorAll('.photo-placeholder'));
        const imageNumbers = [];
        for (let i = 1; i <= 14; i++) {
            imageNumbers.push(i);
        }

        // Algoritmo de Fisher-Yates para embaralhar
        for (let i = imageNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [imageNumbers[i], imageNumbers[j]] = [imageNumbers[j], imageNumbers[i]];
        }

        photoPlaceholders.forEach((placeholder, index) => {
            const img = placeholder.querySelector('img');
            if (img && imageNumbers[index]) {
                const photoNumber = imageNumbers[index];
                img.src = `${photoNumber}.jpg`; // Assume que as fotos estão nomeadas de 1.jpg a 14.jpg
                img.alt = `Nossa Lembrança ${photoNumber}`;
                
                // Esconde o texto de placeholder se a imagem for carregada
                const captionPlaceholder = placeholder.querySelector('.caption-text-placeholder');
                if (captionPlaceholder) {
                    captionPlaceholder.style.display = 'none';
                }
            } else if (img) {
                // Caso haja mais placeholders do que números de imagem (não deveria acontecer com 14)
                // ou se a imagem não for encontrada, o alt e o placeholder de texto podem ser úteis.
                 const captionPlaceholder = placeholder.querySelector('.caption-text-placeholder');
                if (captionPlaceholder) {
                    captionPlaceholder.textContent = `(Foto ${index + 1} não encontrada)`;
                    captionPlaceholder.style.display = 'block';
                }
            }
        });
    }
});