// main.js - interactions: theme toggle, language toggle, project filter, copy email, animations, footer date
(function(){
  "use strict";

  // Elements
  const themeBtn = document.getElementById('themeToggle');
  const langBtn = document.getElementById('langToggle');
  const langText = document.getElementById('langText');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailCard = document.getElementById('copyEmailCard');
  const toast = document.getElementById('toast');
  const curYear = document.getElementById('curYear');
  const lastUpdated = document.getElementById('lastUpdated');

  // Language content
  const translations = {
    en: {
      langBtn: 'العربية',
      siteTag: 'Computer Science Student • Embedded & Web Developer',
      heroTitle: 'Hello — I\'m <strong>Philopateer Osama</strong>',
      heroLead: 'Computer Science student at ECU specializing in Cybersecurity. Currently mastering Python through #100DaysOfCode challenge as a key tool for cybersecurity. Strong skills in programming, embedded systems, and competitive programming.',
      aboutTitle: 'About Me',
      aboutText: 'I\'m Philopateer Osama, a motivated Computer Science student specializing in Cybersecurity with strong skills in Python, C++, and embedded systems. Currently participating in the #100DaysOfCode challenge to master Python as a key tool for cybersecurity. I have proven experience in web development and competitive programming, and I\'m adept at working in teams, solving problems efficiently, and delivering high-quality projects under deadlines.',
      skillsTitle: 'Skills',
      skill1Title: 'Programming Languages',
      skill1Text: 'Python · C++ · JavaScript',
      skill2Title: 'Web Development', 
      skill2Text: 'HTML · CSS · Git · GitHub',
      skill3Title: 'Tools & Concepts',
      skill3Text: 'Embedded Systems · Version Control · PowerPoint',
      projectsTitle: 'Projects',
      filterAll: 'All',
      filterEmbedded: 'Embedded',
      filterWeb: 'Web',
      experienceTitle: 'Experience & Activities',
      educationTitle: 'Education',
      certificationsTitle: 'Courses & Certifications',
      contactTitle: 'Contact',
      contactText: 'Feel free to reach out — I check messages regularly.',
      viewProjects: 'View Projects',
      downloadCV: 'Download CV',
      projects: 'Projects',
      copyEmail: 'Copy Email'
    },
    ar: {
      langBtn: 'English',
      siteTag: 'طالب علوم حاسوب • مطور أنظمة مدمجة وويب',
      heroTitle: 'مرحباً — أنا <strong>فيلوباتير أسامة</strong>',
      heroLead: 'طالب علوم حاسوب في جامعة ECU متخصص في الأمن السيبراني. أتقن حالياً لغة Python من خلال تحدي #100DaysOfCode كأداة أساسية للأمن السيبراني. مهارات قوية في البرمجة والأنظمة المدمجة والبرمجة التنافسية.',
      aboutTitle: 'نبذة عني',
      aboutText: 'أنا فيلوباتير أسامة، طالب علوم حاسوب متحمس متخصص في الأمن السيبراني بمهارات قوية في Python وC++ والأنظمة المدمجة. أشارك حالياً في تحدي #100DaysOfCode لإتقان Python كأداة أساسية للأمن السيبراني. لدي خبرة مثبتة في تطوير الويب والبرمجة التنافسية، وأجيد العمل في فرق وحل المشاكل بكفاءة وتسليم مشاريع عالية الجودة في المواعيد المحددة.',
      skillsTitle: 'المهارات',
      skill1Title: 'لغات البرمجة',
      skill1Text: 'Python · C++ · JavaScript',
      skill2Title: 'تطوير الويب',
      skill2Text: 'HTML · CSS · Git · GitHub',
      skill3Title: 'الأدوات والمفاهيم',
      skill3Text: 'الأنظمة المدمجة · التحكم في الإصدارات · PowerPoint',
      projectsTitle: 'المشاريع',
      filterAll: 'الكل',
      filterEmbedded: 'مدمجة',
      filterWeb: 'ويب',
      // Projects content
      project1Title: 'روبوت مكافحة الحرائق',
      project1Subtitle: 'مدمج — روبوت كشف الحرائق مع أجهزة استشعار وتحكم',
      project1Desc: 'روبوت مستقل لمكافحة الحرائق يتميز بتكامل أجهزة الاستشعار المتقدمة وخوارزميات التحكم PID واتخاذ القرارات في الوقت الفعلي. ينفذ أجهزة استشعار درجة الحرارة والأشعة تحت الحمراء لكشف اللهب مع نظام مضخة مياه يتحكم فيه محرك سيرفو. محسن للموثوقية وكفاءة الطاقة في سيناريوهات الاستجابة للطوارئ.',
      project2Title: 'TailTalk',
      project2Subtitle: 'ويب — منصة مجتمعية لأصحاب الحيوانات الأليفة',
      project2Desc: 'منصة مجتمعية شاملة تربط أصحاب الحيوانات الأليفة لخدمات التبني والترتيبات المؤقتة للرعاية والموارد البيطرية. تتميز بالمراسلة في الوقت الفعلي ومصادقة المستخدم والخدمات القائمة على الموقع مع تصميم متجاوب وهندسة RESTful API.',
      project3Title: 'ديوان الزمان',
      project3Subtitle: 'ويب — مختارات إلكترونية حديثة للشعر العربي',
      project3Desc: 'مختارات إلكترونية حديثة تجمع مجموعة غنية من القصائد الجميلة والاقتباسات من الشعراء العرب المشهورين عبر عصور مختلفة. تتميز بتخطيط متجاوب ووضع مظلم/فاتح ووظائف المشاركة/النسخ وتصميم UX للنصوص العربية والمحتوى المصنف مع تجربة مستخدم معاصرة.',
      project4Title: 'CyberNile',
      project4Subtitle: 'ويب — منصة تعليم الأمن السيبراني وإرشاد المهنة',
      project4Desc: 'مشروع ويب ثابت حديث يوفر تعليماً شاملاً للأمن السيبراني مع خرائط طريق المهنة وموارد التعلم ومنصات الممارسة. يتميز بتخطيط HTML/CSS متجاوب وانتقالات صفحات سلسة ورسوم متحركة مخصصة وروابط منسقة للدورات ومواقع الويب لمحترفي الأمن السيبراني.',
      experienceTitle: 'الخبرة والأنشطة',
      exp1: 'البرمجة التنافسية ICPC – فريق جامعة ECU — شاركت في حل مسائل خوارزمية معقدة باستخدام C++. عززت هياكل البيانات وتحسين التعقيد الزمني والعمل الجماعي تحت الضغط.',
      exp2: 'بطولة مصر للروبوتات (21 فبراير 2025) — حصلت على شهادة للمشاركة الناجحة والممتازة في بطولة مصر للروبوتات، مما يدل على المهارات التقنية والابتكار.',
      exp3: 'تدريب البرمجة التنافسية (اكتمل فبراير 2025) — أكملت 50 ساعة من التدريب المكثف في جامعة ECU وأكاديمية Coach، محققاً أداءً قوياً في المسابقة النهائية.',
      exp4: 'تدريب تطوير البرمجيات — أكملت برنامج التدريب في HITS Solutions، اكتسبت خبرة عملية في تطوير البرمجيات وأفضل الممارسات في الصناعة.',
      educationTitle: 'التعليم',
      educationText: 'الجامعة المصرية الصينية (ECU) — بكالوريوس العلوم في علوم الحاسوب',
      educationGrad: 'التخرج المتوقع: يونيو 2027',
      certificationsTitle: 'الدورات والشهادات',
      cert1: '100 Days of Code: دورة Python الشاملة (قيد التقدم) — دورة Udemy شاملة تغطي برمجة Python، البرمجة الكائنية، تطوير الويب (Flask)، APIs، الأتمتة، أساسيات علم البيانات، وتطبيقات GUI. أشارك حالياً في تحدي #100DaysOfCode مع مشاريع يومية ومساهمات GitHub.',
      cert2: 'تدريب محلل SOC (قيد التقدم) — المعهد القومي للاتصالات (NTI) تدريب متخصص في تحليل مركز عمليات الأمان، كشف التهديدات، الاستجابة للحوادث، ومراقبة الأمن السيبراني.',
      cert3: 'شهادة Internet & Computing Core (اكتملت 21 أغسطس 2025) — شهادة برنامج التدريب في HITS Solutions تثبت الكفاءة في تطوير البرمجيات وأساسيات الحوسبة.',
      cert4: 'شهادة IC3 Internet & Computing Core (اكتملت أكتوبر 2021) — معتمدة من الجهاز المركزي للتنظيم والإدارة بدرجة ممتازة في برنامج 30 ساعة يغطي مهارات الحاسوب والإنترنت الأساسية.',
      contactTitle: 'التواصل',
      contactText: 'لا تتردد في التواصل — أتحقق من الرسائل بانتظام.',
      viewProjects: 'عرض المشاريع',
      downloadCV: 'تحميل السيرة الذاتية',
      projects: 'المشاريع',
      copyEmail: 'نسخ البريد الإلكتروني'
    }
  };

  // init
  curYear.textContent = new Date().getFullYear();
  lastUpdated.textContent = (new Date()).toLocaleDateString();

  // Theme toggle with localStorage
  const userPrefTheme = localStorage.getItem('philo-theme');
  if(userPrefTheme === 'dark') document.body.classList.add('dark');

  themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('philo-theme', isDark ? 'dark' : 'light');
    themeBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
  });

  // Language toggle
  const storedLang = localStorage.getItem('philo-lang') || 'en';
  if(storedLang === 'ar') {
    document.documentElement.setAttribute('lang', 'ar');
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('data-lang', 'ar');
    updateLanguage('ar');
  }

  langBtn.addEventListener('click', () => {
    const currentLang = document.documentElement.getAttribute('data-lang') || 'en';
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
    
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newDir);
    document.documentElement.setAttribute('data-lang', newLang);
    localStorage.setItem('philo-lang', newLang);
    
    updateLanguage(newLang);
    showToast(newLang === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English');
  });

  function updateLanguage(lang) {
    const t = translations[lang];
    langText.textContent = t.langBtn;
    
    // Update text content
    document.querySelector('.site-tag').textContent = t.siteTag;
    document.querySelector('.hero-text h2').innerHTML = t.heroTitle;
    document.querySelector('.lead').textContent = t.heroLead;
    document.querySelector('#about h3').textContent = t.aboutTitle;
    document.querySelector('#about p').textContent = t.aboutText;
    document.querySelector('#skills h3').textContent = t.skillsTitle;
    
    // Update skills content
    const skillCards = document.querySelectorAll('.skill-card');
    if(skillCards[0]) {
      skillCards[0].querySelector('h4').textContent = t.skill1Title;
      skillCards[0].querySelector('p').textContent = t.skill1Text;
    }
    if(skillCards[1]) {
      skillCards[1].querySelector('h4').textContent = t.skill2Title;
      skillCards[1].querySelector('p').textContent = t.skill2Text;
    }
    if(skillCards[2]) {
      skillCards[2].querySelector('h4').textContent = t.skill3Title;
      skillCards[2].querySelector('p').textContent = t.skill3Text;
    }
    
    document.querySelector('#projects h3').textContent = t.projectsTitle;
    
    // Update filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    if(filterBtns[0]) filterBtns[0].textContent = t.filterAll;
    if(filterBtns[1]) filterBtns[1].textContent = t.filterEmbedded;
    if(filterBtns[2]) filterBtns[2].textContent = t.filterWeb;
    
    // Update project content
    const projectCards = document.querySelectorAll('.project-card');
    if(projectCards[0]) {
      projectCards[0].querySelector('h4').textContent = t.project1Title;
      projectCards[0].querySelector('.muted').textContent = t.project1Subtitle;
      projectCards[0].querySelector('.project-desc').textContent = t.project1Desc;
    }
    if(projectCards[1]) {
      projectCards[1].querySelector('h4').textContent = t.project2Title;
      projectCards[1].querySelector('.muted').textContent = t.project2Subtitle;
      projectCards[1].querySelector('.project-desc').textContent = t.project2Desc;
    }
    if(projectCards[2]) {
      projectCards[2].querySelector('h4').textContent = t.project3Title;
      projectCards[2].querySelector('.muted').textContent = t.project3Subtitle;
      projectCards[2].querySelector('.project-desc').textContent = t.project3Desc;
    }
    if(projectCards[3]) {
      projectCards[3].querySelector('h4').textContent = t.project4Title;
      projectCards[3].querySelector('.muted').textContent = t.project4Subtitle;
      projectCards[3].querySelector('.project-desc').textContent = t.project4Desc;
    }
    
    document.querySelector('#experience h3').textContent = t.experienceTitle;
    
    // Update experience content
    const expItems = document.querySelectorAll('#experience .timeline li');
    if(expItems[0] && t.exp1) expItems[0].textContent = t.exp1;
    if(expItems[1] && t.exp2) expItems[1].textContent = t.exp2;
    if(expItems[2] && t.exp3) expItems[2].textContent = t.exp3;
    if(expItems[3] && t.exp4) expItems[3].textContent = t.exp4;
    
    document.querySelector('#education h3').textContent = t.educationTitle;
    
    // Update education content
    const eduSection = document.querySelector('#education p');
    if(eduSection && t.educationText && t.educationGrad) {
      eduSection.innerHTML = `<strong>${t.educationText}</strong><br><em>${t.educationGrad}</em>`;
    }
    
    document.querySelector('#certifications h3').textContent = t.certificationsTitle;
    
    // Update certifications content
    const certItems = document.querySelectorAll('#certifications .timeline li');
    if(certItems[0] && t.cert1) certItems[0].textContent = t.cert1;
    if(certItems[1] && t.cert2) certItems[1].textContent = t.cert2;
    if(certItems[2] && t.cert3) certItems[2].textContent = t.cert3;
    if(certItems[3] && t.cert4) certItems[3].textContent = t.cert4;
    
    document.querySelector('#contact h3').textContent = t.contactTitle;
    document.querySelector('#contact .muted').textContent = t.contactText;
    
    // Update buttons
    const viewProjectsBtn = document.querySelector('a[href="#projects"].btn.primary');
    const downloadBtn = document.querySelector('a[download]');
    const heroProjectsBtn = document.querySelector('.hero-ctas a');
    const copyEmailBtn = document.querySelector('#copyEmailBtn');
    
    if(viewProjectsBtn) viewProjectsBtn.textContent = t.viewProjects;
    if(downloadBtn) downloadBtn.textContent = t.downloadCV;
    if(heroProjectsBtn) heroProjectsBtn.textContent = t.projects;
    if(copyEmailBtn) copyEmailBtn.textContent = t.copyEmail;
  }

  // Copy email helper
  function showToast(msg){
    toast.hidden = false;
    toast.textContent = msg;
    setTimeout(()=> toast.hidden = true, 2000);
  }

  function copyEmail(email){
    navigator.clipboard?.writeText(email).then(()=> {
      showToast('Email copied to clipboard');
    }).catch(()=> {
      showToast('Copy failed — open mail client');
    });
  }

  copyEmailBtn?.addEventListener('click', (e) => {
    const email = e.currentTarget.dataset.email;
    copyEmail(email);
  });

  copyEmailCard?.addEventListener('click', (e) => {
    const email = e.currentTarget.dataset.email;
    copyEmail(email);
  });

  // Project filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active'); b.setAttribute('aria-selected','false');
      });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const cat = card.dataset.category || 'all';
        if(filter === 'all' || cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Simple scroll reveal (respect prefers-reduced-motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced) {
    const animEls = document.querySelectorAll('[data-anim]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if(en.isIntersecting) {
          en.target.style.opacity = 1;
          en.target.style.transform = 'translateY(0)';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    animEls.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'opacity 220ms ease, transform 220ms ease';
      io.observe(el);
    });
  }

  // Smooth scroll for internal links (respect motion)
  if(!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
  }

})();
