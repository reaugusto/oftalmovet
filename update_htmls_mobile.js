const fs = require('fs');
const path = require('path');

const dirPath = "c:\\Users\\Renato Sousa\\Desktop\\PJ\\veterinaria";
const files = ["stitch_home.html", "stitch_sobre.html", "stitch_contato.html", "stitch_especialidades.html"];

const mobileNav = `<nav id="global-nav" class="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-7xl rounded-[2rem] px-6 md:px-8 py-3 z-50 shadow-[0px_24px_48px_rgba(27,28,25,0.06)] bg-white/90 backdrop-blur-2xl border border-outline-variant/20 transition-all duration-300">
    <div class="flex justify-between items-center w-full">
        <div class="text-xl font-bold text-primary font-headline tracking-tight">
            Pet Oftalmovet
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center space-x-8">
            <a class="nav-link font-medium font-headline tracking-tight transition-all pb-1" href="stitch_home.html">Home</a>
            <a class="nav-link font-medium font-headline tracking-tight transition-all pb-1" href="stitch_sobre.html">Sobre Nós</a>
            <a class="nav-link font-medium font-headline tracking-tight transition-all pb-1" href="stitch_especialidades.html">Especialidades</a>
            <a class="nav-link font-medium font-headline tracking-tight transition-all pb-1" href="stitch_contato.html">Contato</a>
            <a class="bg-primary hover:bg-primary-container text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-md active:scale-95" href="stitch_contato.html">
                Agendar Consulta
            </a>
        </div>

        <!-- Mobile Hamburger Button -->
        <button id="mobile-menu-btn" aria-label="Abrir Menu" class="lg:hidden text-primary p-2 focus:outline-none flex items-center justify-center bg-primary/5 rounded-full hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined text-3xl transition-transform duration-300">menu</span>
        </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div id="mobile-menu" class="hidden lg:hidden flex-col gap-4 mt-6 pb-4 w-full border-t border-surface-variant/30 pt-4 animate__animated animate__fadeIn">
        <a class="nav-link block font-medium font-headline text-center pb-2" href="stitch_home.html">Home</a>
        <a class="nav-link block font-medium font-headline text-center pb-2" href="stitch_sobre.html">Sobre Nós</a>
        <a class="nav-link block font-medium font-headline text-center pb-2" href="stitch_especialidades.html">Especialidades</a>
        <a class="nav-link block font-medium font-headline text-center pb-2" href="stitch_contato.html">Contato</a>
        <a class="bg-primary hover:bg-primary-container text-white px-6 py-4 rounded-full font-bold text-center mt-2 shadow-md w-full transition-colors" href="stitch_contato.html">Agendar Consulta</a>
    </div>
</nav>`;

const mobileMenuJs = `
        // Mobile Menu Logic
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if(btn && menu) {
            const icon = btn.querySelector('.material-symbols-outlined');
            btn.addEventListener('click', () => {
                if(menu.classList.contains('hidden')){
                    menu.classList.remove('hidden');
                    menu.classList.add('flex');
                    icon.innerText = 'close';
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    menu.classList.add('hidden');
                    menu.classList.remove('flex');
                    icon.innerText = 'menu';
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        }
`;

const mapReplacement = `<div class="w-full h-[500px] rounded-xl overflow-hidden shadow-inner relative border border-outline-variant/20">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14625.545939223126!2d-46.6661958!3d-23.6067332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a08fb9275b9%3A0xe7a50fe2d9aabdf9!2sMoema%2C%20S%C3%A3o%20Paulo%20-%20State%20of%20S%C3%A3o%20Paulo!5e0!3m2!1sen!2sbr!4v1711462800000!5m2!1sen!2sbr" class="w-full h-full border-0 absolute inset-0 py-0 my-0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>`;

console.log('Aplicando Sanduiche Menu e Google Maps aos HTMLs...');

files.forEach(f => {
    const filePath = path.join(dirPath, f);
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Substituir <nav>
        content = content.replace(/<nav[\s\S]*?<\/nav>/, mobileNav);

        // Inserir lógica JS do menu mobile no final, antes de fechar o DOMContentLoaded se possível, 
        // ou substituir a tag de fechamento de script se não existir.
        if(!content.includes('Mobile Menu Logic')){
            content = content.replace('// Apply observer', mobileMenuJs + '\n        // Apply observer');
        }
        
        // Se for o contato, substituir o mapa pelo Google Maps Real (iframe)
        if(f === "stitch_contato.html"){
            // Localiza a div inteira do mapa
            const mapRegex = /<div class="w-full h-\[500px\] rounded-xl overflow-hidden bg-surface-container shadow-inner group relative">[\s\S]*?<\/div>/;
            if(mapRegex.test(content)){
                content = content.replace(mapRegex, mapReplacement);
            }
        }

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`[OK] ${f} atualizado com sucess!`);
    } catch (err) {
        console.error(`[ERRO] Falha ao processar ${f}:`, err);
    }
});
