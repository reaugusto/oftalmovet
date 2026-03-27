import os
import re
import codecs

# Definir diretório de trabalho absoluto
dir_path = r"c:\Users\Renato Sousa\Desktop\PJ\veterinaria"
files = ["stitch_home.html", "stitch_sobre.html", "stitch_contato.html", "stitch_especialidades.html"]

standard_nav = """<nav class="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl rounded-full px-8 py-3 z-50 shadow-[0px_24px_48px_rgba(27,28,25,0.06)] flex justify-between items-center bg-white/80 backdrop-blur-xl border border-outline-variant/20">
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
</nav>"""

animate_css = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />'

base_js = """
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
"""

form_js = """
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
                
                // Simula latência de rede de 1.5s
                setTimeout(() => {
                    btn.innerHTML = 'Mensagem Enviada! <span class="material-symbols-outlined ml-2">check_circle</span>';
                    btn.classList.add('bg-green-600');
                    btn.classList.remove('bg-secondary');
                    btn.style.opacity = '1';
                    contactForm.reset();
                    
                    // Retorna ao estado original após 4 segundos
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
"""

print(f"Acessando pasta: {dir_path}")

for f in files:
    file_path = os.path.join(dir_path, f)
    try:
        with codecs.open(file_path, "r", "utf-8") as file:
            content = file.read()
            
        # 1. Substituir bloco <nav> dinamicamente
        content = re.sub(r'<nav[^>]*>[\s\S]*?</nav>', standard_nav, content)
        
        # 2. Inserir link do animate.css antes da tag head se n houver
        if "animate.min.css" not in content:
            content = content.replace("</head>", f"    {animate_css}\n</head>")
            
        # 3. Inserir JavaScript Base (Navegação Global e Animações) se n houver
        if "Menu Active State & Intersections" not in content:
            content = content.replace("</body>", f"{base_js}\n</body>")
            
        # 4. Inserir Custom Form JS para pag de contato
        if f == "stitch_contato.html" and "Validacao e Simulacao de Envio do Formulário de Contato" not in content:
            content = content.replace("</body>", f"{form_js}\n</body>")

        with codecs.open(file_path, "w", "utf-8") as file:
            file.write(content)
            
        print(f"[OK] {f} atualizado com sucesso!")
    except Exception as e:
        print(f"[ERRO] Falha ao processar {f}: {e}")
