const fs = require('fs');
const path = require('path');

const dirPath = "c:\\Users\\Renato Sousa\\Desktop\\PJ\\veterinaria";
const files = ["stitch_home.html", "stitch_sobre.html", "stitch_contato.html", "stitch_especialidades.html"];

const newFooter = `<footer class="w-full py-12 px-8 rounded-t-[3rem] mt-20 bg-slate-50 dark:bg-slate-900 border-t border-outline-variant/10 shadow-inner">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="flex flex-col items-center md:items-start gap-2">
                <div class="text-2xl font-bold text-primary font-headline">Pet Oftalmovet</div>
                <p class="font-body text-sm text-slate-500 text-center md:text-left">© 2024 Pet Oftalmovet - Oftalmologia Veterinária de Precisão.</p>
            </div>
            
            <div class="flex gap-4">
                <a href="#" class="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                    <span class="material-symbols-outlined">public</span>
                </a>
                <a href="#" class="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                    <span class="material-symbols-outlined">photo_camera</span>
                </a>
            </div>
        </div>
    </footer>`;

files.forEach(f => {
    const filePath = path.join(dirPath, f);
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        content = content.replace(/<footer[\s\S]*?<\/footer>/, newFooter);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`[OK] Link do footer removidos em ${f}`);
    } catch(err) {
        console.error(err);
    }
});
