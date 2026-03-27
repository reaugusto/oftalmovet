const fs = require('fs');
const path = require('path');

const dirPath = "c:\\Users\\Renato Sousa\\Desktop\\PJ\\veterinaria";
const files = ["stitch_home.html", "stitch_sobre.html", "stitch_contato.html", "stitch_especialidades.html"];

const standardNav = `<nav class="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl rounded-full px-8 py-3 z-50 shadow-[0px_24px_48px_rgba(27,28,25,0.06)] flex justify-between items-center bg-white/80 backdrop-blur-xl border border-outline-variant/20">
    <div class="text-xl font-bold text-primary font-headline tracking-tight">
        Pet Oftalmovet
    </div>
    <div class="hidden md:flex items-center space-x-8">
        <a class="nav-link font-medium font-headline tracking-tight transition-all duration-300 pb-1" href="stitch_home.html">Home</a>
        <a class="nav-link font-medium font-headline tracking-tight transition-all duration-300 pb-1" href="stitch_sobre.html">Sobre Nós</a>
        <a class="nav-link font-medium font-headline tracking-tight transition-all duration-300 pb-1" href="stitch_especialidades.html">Especialidades</a>
        <a class="nav-link font-medium font-headline tracking-tight transition-all duration-300 pb-1" href="stitch_contato.html">Contato</a>
    </div>
    <div class="flex items-center">
        <a class="bg-primary hover:bg-primary-container text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-md active:scale-95" href="stitch_contato.html">
            Agendar Consulta
        </a>
    </div>
</nav>`;

const animateCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />';

const baseJs = `
<script>
    // Menu Active State & Intersections
    document.addEventListener("DOMContentLoaded", () => {
        const currentPage = window.location.pathname.split('/').pop() || 'stitch_home.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'stitch_home.html')) {
                link.classList.add('text-primary', 'font-extrabold', 'border-b-2', 'border-secondary');
                link.classList.remove('text-slate-600', 'font-medium');
            } else {
                link.classList.add('text-slate-600', 'hover:text-primary');
            }
        });

        // Intersection Observer for Animations (Animate.css)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    entry.target.style.opacity = 1;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Apply observer to all sections to reveal on scroll
        document.querySelectorAll('section, footer').forEach(sec => {
            sec.style.opacity = 0;
            observer.observe(sec);
        });
    });
</script>
`;

const formJs = `
<script>
    // Validacao e Simulacao de Envio do Formulário de Contato
    document.addEventListener("DOMContentLoaded", () => {
        const contactForm = document.querySelector('form');
        if(contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                
                // Mudando estado
                btn.innerHTML = 'Enviando...';
                btn.style.opacity = '0.7';
                
                // Simula latência
                setTimeout(() => {
                    btn.innerHTML = 'Mensagem Enviada! <span class="material-symbols-outlined ml-2">check_circle</span>';
                    btn.classList.add('bg-green-600');
                    btn.classList.remove('bg-secondary');
                    btn.style.opacity = '1';
                    contactForm.reset();
                    
                    // Retorna
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('bg-green-600');
                        btn.classList.add('bg-secondary');
                    }, 4000);
                }, 1500);
            });
        }
    });
</script>
`;

console.log('Acessando pasta:', dirPath);

files.forEach(f => {
    const filePath = path.join(dirPath, f);
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Substituir <nav>
        content = content.replace(/<nav[\s\S]*?<\/nav>/, standardNav);

        // Inserir CSS
        if (!content.includes('animate.min.css')) {
            content = content.replace('</head>', `    ${animateCss}\n</head>`);
        }

        // Inserir base JS
        if (!content.includes('Menu Active State & Intersections')) {
            content = content.replace('</body>', `${baseJs}\n</body>`);
        }

        // Form JS
        if (f === "stitch_contato.html" && !content.includes('Validacao e Simulacao de Envio do Formulário de Contato')) {
            content = content.replace('</body>', `${formJs}\n</body>`);
        }

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`[OK] ${f} atualizado com sucesso!`);
    } catch (err) {
        console.error(`[ERRO] Falha ao processar ${f}:`, err);
    }
});
