const links = document.querySelectorAll(".menu-link");
links.forEach(link => {
    link.addEventListener("click", function() {
        links.forEach(item => item.classList.remove("bg-black", "text-white"));
        this.classList.add("bg-black", "text-white");
    });
});


let kCalc = document.getElementById("kCalc");
let dCalc = document.getElementById("dCalc");
let aCalc = document.getElementById("aCalc");
let iCalc = document.getElementById("iCalc");

let elektrik = document.getElementById("elektrik");
let hibrid = document.getElementById("hibrid");
let diger = document.getElementById("diger");


dCalc.style.display = "none";
aCalc.style.display = "none";
iCalc.style.display = "none"; 
hibrid.style.display = "none";
diger.style.display = "none";

function deyis(c) {
    
    kCalc.style.display = (c == "kredit") ? "flex" : "none";
    dCalc.style.display = (c == "depozit") ? "flex" : "none";
    aCalc.style.display = (c == "avto") ? "flex" : "none";
    iCalc.style.display = (c == "ipoteka") ? "flex" : "none"; 

    
    if(c == "avto") {
        deyis1('elektrik');
    }
}

function deyis1(a) {
    elektrik.style.display = (a == "elektrik") ? "flex" : "none";
    hibrid.style.display = (a == "hibrid") ? "flex" : "none";
    diger.style.display = (a == "diger") ? "flex" : "none";
}

const kMeblegInp = document.getElementById("kredit-mebleg-input");
const kMuddetInp = document.getElementById("kredit-muddet-input");
const kFaizInp = document.getElementById("kredit-faiz-input");

const kMeblegVal = document.getElementById("kredit-mebleg-val");
const kMuddetVal = document.getElementById("kredit-muddet-val");
const kFaizVal = document.getElementById("kredit-faiz-val");
const kNetice = document.getElementById("kredit-ayliq-netice");

function kreditHesabla() {
    let m = parseFloat(kMeblegInp.value);
    let a = parseInt(kMuddetInp.value);
    let f = parseFloat(kFaizInp.value);

    
    kMeblegVal.innerText = `${m} ₼`;
    kMuddetVal.innerText = `${a} ay`;
    kFaizVal.innerText = `${f} %`;

    
    let ayliqFaiz = (f / 100) / 12;
    let ayliqOdenis = (m * ayliqFaiz) / (1 - Math.pow(1 + ayliqFaiz, -a));

    
    kNetice.innerText = ayliqOdenis.toFixed(2)+'₼';
}


kMeblegInp.addEventListener("input", kreditHesabla);
kMuddetInp.addEventListener("input", kreditHesabla);
kFaizInp.addEventListener("input", kreditHesabla);


kreditHesabla();

let dMebleg = 10000;
let dMuddet = 12;
let dFaiz = 8; 
let odenisTipi = 'ayliq';

const dMeblegInp = document.getElementById("depozit-mebleg-input");
const dMeblegVal = document.getElementById("depozit-mebleg-val");
const dUmumiQazanc = document.getElementById("depozit-umumi-qazanc");
const dAyliqQazanc = document.getElementById("depozit-ayliq-qazanc");
const dFaizDerecesiText = document.getElementById("depozit-faiz-derecesi");

function depozitHesabla() {
    dMebleg = parseFloat(dMeblegInp.value);
    dMeblegVal.innerText = `${dMebleg.toLocaleString()} ₼`;

    
    let qazanc = (dMebleg * dFaiz * (dMuddet / 12)) / 100;
    let ayliq = qazanc / dMuddet;

    dUmumiQazanc.innerText = qazanc.toFixed(2) + " ₼";
    dAyliqQazanc.innerText = ayliq.toFixed(2) + " ₼";
    dFaizDerecesiText.innerText = dFaiz + "%";
}


function depozitMuddetSet(ay, btn) {
    dMuddet = ay;
    
    document.querySelectorAll('.d-muddet-btn').forEach(b => {
        b.classList.remove('bg-black', 'text-white');
        b.classList.add('bg-gray-200');
    });
    btn.classList.add('bg-black', 'text-white');
    depozitHesabla();
}


function depozitFaizSet(tip) {
    odenisTipi = tip;
    const btnAyliq = document.getElementById('btn-ayliq');
    const btnIllik = document.getElementById('btn-illik');

    if (tip === 'ayliq') {
        dFaiz = 8; 
        btnAyliq.classList.add('bg-black', 'text-white');
        btnIllik.classList.remove('bg-black', 'text-white');
    } else {
        dFaiz = 10; 
        btnIllik.classList.add('bg-black', 'text-white');
        btnAyliq.classList.remove('bg-black', 'text-white');
    }
    depozitHesabla();
}
dMeblegInp.addEventListener("input", depozitHesabla);
depozitHesabla();
function avtoKalkulyator(prefix, faizDerecesi) {
    const rangeQiymet = document.getElementById(`${prefix}-qiymet-range`);
    const rangeIlkin = document.getElementById(`${prefix}-ilkin-range`);
    const rangeMuddet = document.getElementById(`${prefix}-muddet-range`);
    if (!rangeQiymet) return;

    function hesabla() {
        let qiymet = parseFloat(rangeQiymet.value);
        let ilkinFaiz = parseFloat(rangeIlkin.value);
        let muddet = parseInt(rangeMuddet.value);
        document.getElementById(`${prefix}-qiymet-txt`).innerText = qiymet.toLocaleString() + " ₼";
        document.getElementById(`${prefix}-ilkin-txt`).innerText = ilkinFaiz + " %";
        document.getElementById(`${prefix}-muddet-txt`).innerText = muddet + " ay";
        let ilkinManat = (qiymet * ilkinFaiz) / 100;
        let kreditMeblegi = qiymet - ilkinManat;
        let ayliqFaiz = (faizDerecesi / 100) / 12;
        let ayliqOdenis = (kreditMeblegi * ayliqFaiz) / (1 - Math.pow(1 + ayliqFaiz, -muddet));
        let komissiya = Math.max(kreditMeblegi * 0.005, 20); 
        let umumiOdenis = (ayliqOdenis * muddet) + komissiya;
        document.getElementById(`${prefix}-ayliq-res`).innerText = ayliqOdenis.toFixed(2) + " ₼";
        document.getElementById(`${prefix}-kredit-mebleg`).innerText = kreditMeblegi.toFixed(0) + " ₼";
        document.getElementById(`${prefix}-komissiya`).innerText = komissiya.toFixed(2) + " ₼";
        document.getElementById(`${prefix}-cemi`).innerText = umumiOdenis.toFixed(2) + " ₼";
        document.getElementById(`${prefix}-faiz-txt`).innerText = faizDerecesi + " %";
    }

    rangeQiymet.oninput = hesabla;
    rangeIlkin.oninput = hesabla;
    rangeMuddet.oninput = hesabla;
    
    hesabla(); 
}

avtoKalkulyator('el', 10);    
avtoKalkulyator('hib', 12);   
avtoKalkulyator('dig', 14); 


























    










var currentRate = 4; 

function updateResults() {
    const amountInput = document.getElementById("ip-m-inp");
    const yearInput = document.getElementById("ip-a-inp");

    if (!amountInput || !yearInput) return;

    const amount = Number(amountInput.value);
    const years = Number(yearInput.value);

    const monthlyRate = currentRate / 100 / 12;
    const months = years * 12;

    let monthlyPayment = 0;

    if (months > 0) {
        if (monthlyRate > 0) {
            const x = Math.pow(1 + monthlyRate, months);
            monthlyPayment = amount * (monthlyRate * x) / (x - 1);
        } else {
            monthlyPayment = amount / months;
        }
    }

    
    
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;
    const avgMonthlyInterest = months > 0 ? totalInterest / months : 0;

    
    document.getElementById("ip-m-val").innerText = amount.toLocaleString() + " ₼";
    document.getElementById("ip-a-val").innerText = years + " il";
    document.getElementById("ip-res-ayliq").innerText = monthlyPayment.toFixed(2);
    
    
    const resFaizAy = document.getElementById("ip-res-faiz-ay");
    if(resFaizAy) resFaizAy.innerText = avgMonthlyInterest.toFixed(2);

    
    const resFaizIl = document.getElementById("ip-res-faiz-il");
    if(resFaizIl) resFaizIl.innerText = currentRate + "%";
}


function ipFaizDeyis(rate) {
    currentRate = rate;
    updateResults();
}


document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("ip-m-inp");
    const yearInput = document.getElementById("ip-a-inp");

    if (amountInput) amountInput.addEventListener("input", updateResults);
    if (yearInput) yearInput.addEventListener("input", updateResults);

    updateResults(); 
});
function avtoKalkulyator(prefix, faiz) {
    const qRange = document.getElementById(`${prefix}-qiymet-range`);
    const iRange = document.getElementById(`${prefix}-ilkin-range`);
    const mRange = document.getElementById(`${prefix}-muddet-range`);

    
    if (!qRange || !iRange || !mRange) return;

    function hesabla() {
        let qiymet = parseFloat(qRange.value);
        let ilkinF = parseFloat(iRange.value);
        let muddet = parseInt(mRange.value);

        
        const qiymetTxt = document.getElementById(`${prefix}-qiymet-txt`);
        const ilkinTxt = document.getElementById(`${prefix}-ilkin-txt`);
        const muddetTxt = document.getElementById(`${prefix}-muddet-txt`);
        const ayliqRes = document.getElementById(`${prefix}-ayliq-res`);
        const kreditMebleg = document.getElementById(`${prefix}-kredit-mebleg`);
        const komissiyaTxt = document.getElementById(`${prefix}-komissiya`);
        const cemiTxt = document.getElementById(`${prefix}-cemi`);
        const faizTxt = document.getElementById(`${prefix}-faiz-txt`);

        
        let ilkinManat = (qiymet * ilkinF) / 100;
        let kreditM = qiymet - ilkinManat;
        let ayliqFaiz = (faiz / 100) / 12;
        let ayliqOdenis = (kreditM * ayliqFaiz) / (1 - Math.pow(1 + ayliqFaiz, -muddet));
        let komissiya = Math.max(kreditM * 0.005, 20);
        let umumi = (ayliqOdenis * muddet) + komissiya;

        
        if (qiymetTxt) qiymetTxt.innerText = qiymet.toLocaleString() + " ₼";
        if (ilkinTxt) ilkinTxt.innerText = ilkinF + " %";
        if (muddetTxt) muddetTxt.innerText = muddet + " ay";
        if (ayliqRes) ayliqRes.innerText = ayliqOdenis.toFixed(2) + " ₼";
        if (kreditMebleg) kreditMebleg.innerText = kreditM.toLocaleString() + " ₼";
        if (komissiyaTxt) komissiyaTxt.innerText = komissiya.toFixed(2) + " ₼";
        if (cemiTxt) cemiTxt.innerText = umumi.toFixed(2) + " ₼";
        if (faizTxt) faizTxt.innerText = faiz + " %";
    }

    qRange.oninput = hesabla;
    iRange.oninput = hesabla;
    mRange.oninput = hesabla;
    
    hesabla();
}


avtoKalkulyator('el', 10);
avtoKalkulyator('hib', 12);
avtoKalkulyator('dig', 14);