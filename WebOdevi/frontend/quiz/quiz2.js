//Sunucudan dönen verilerin diğer tüm fonksiyonlarca erişilebilmesi için global değişken tanımladık.
let sunucudanGelen;

//Sunucuya bağlanmak için bir baglanti nesnesi türettik.
const baglanti = new XMLHttpRequest();

//baglanti nesnesi sunucu bağlantısına hazır olduğunda json dosyasından verileri çekilerek döndürülmesini sağladık.
baglanti.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    sunucudanGelen = JSON.parse(baglanti.responseText);
    soruGetir();
  }
  return sunucudanGelen;
};

//Sunucu bağlantısı için gerekli bilgileri ve aldığı verileri sunucudan gönderme komutunu verdik.
baglanti.open("GET", "data2.json", true);
baglanti.send();

//Kullanıcı arayüzündeki tüm giriş ve çıkış nesnelerini kolay ulaşım için değişkenlere aldık.
const goruntulemeAlani = document.getElementById("sinav");
const cevapSecenekleri = document.querySelectorAll(".secenek");
const mevcutSoru = document.getElementById("soru");

const submitBtn = document.getElementById("submit");
const inputTxt = document.getElementById("text");
const inputHesaplama = document.getElementById("hesapla");
const inputBosluk = document.getElementById("bosluk");

const aAciklama = document.getElementById("aAciklama");
const bAciklama = document.getElementById("bAciklama");
const cAciklama = document.getElementById("cAciklama");
const dAciklama = document.getElementById("dAciklama");

const geriButonu = document.getElementById("geri");
const ileriButonu = document.getElementById("ileri");
const tamamlaButonu = document.getElementById("tamamla");

//Sınavı başlatmadan puanı ve soru sayacını sıfırladık.
let puan = 0;
let sira = 0;
let kSira = 3;

// // klassik
// function klassikSoru() {
//   secimleriSifirla();
//   console.log(sunucudanGelen);
//   let klassikSoru = sunucudanGelen.sorular[kSira];
//   mevcutSoru.innerHTML = klassikSoru.soru;
//   aAciklama.innerText = klassikSoru.secenekA;
//   bAciklama.innerText = klassikSoru.secenekB;
//   cAciklama.innerText = klassikSoru.secenekC;
//   dAciklama.innerText = klassikSoru.secenekD;
// }

//Soruları getirmek için önce varsa seçimleri temizleyip sıradaki soruya ait soru ve cevap seçeneklerini doldurduk.
function soruGetir() {
  secimleriSifirla();
  console.log(sunucudanGelen);

  let siradakiSoruIcerigi = sunucudanGelen.sorular[sira];

  //console.log(siradakiSoruIcerigi);
  mevcutSoru.innerHTML = siradakiSoruIcerigi.soru;

  if (sunucudanGelen.sorular[sira].type === "secenekli") {
    $("#formtxt").css("display", "none");
    $("#formbosluk").css("display", "none");
    $("#formhesaplama").css("display", "none");
    $("ul").show();
    aAciklama.innerText = siradakiSoruIcerigi.secenekA;
    bAciklama.innerText = siradakiSoruIcerigi.secenekB;
    cAciklama.innerText = siradakiSoruIcerigi.secenekC;
    dAciklama.innerText = siradakiSoruIcerigi.secenekD;
  } else if (sunucudanGelen.sorular[sira].type === "txt") {
    $("ul").css("display", "none");
    $("#formbosluk").css("display", "none");
    $("#formhesaplama").css("display", "none");
    $("#formtxt").show();
  } else if (sunucudanGelen.sorular[sira].type === "doldurma") {
    bosluk1a.innerText = siradakiSoruIcerigi.bosluk1a;
    bosluk1b.innerText = siradakiSoruIcerigi.bosluk1b;

    $("ul").css("display", "none");
    $("#formtxt").css("display", "none");
    $("#formhesaplama").css("display", "none");
    $("#formbosluk").show();
  } else {
    $("ul").css("display", "none");
    $("#formtxt").css("display", "none");
    $("#formbosluk").css("display", "none");
    $("#formhesaplama").show();
  }
}
function secimleriSifirla() {
  cevapSecenekleri.forEach((secenek) => (secenek.checked = false));
}

//Kullanıcıdan seçimini işaretlediği şıkkın id bilgisi üzerinden alıp döndürdük.
function secimiAl() {
  let secim;

  cevapSecenekleri.forEach((secenek) => {
    if (secenek.checked) {
      secim = secenek.id;
    }
  });

  return secim;
  //console.log(secim);
}

function clicked() {
    secimleriSifirla();
  var secimTxt = inputTxt.value;
  var secimHesap = inputHesaplama.value;
  var secimBosluk = inputBosluk.value;
  console.log(secimTxt);
  console.log(secimHesap);
  console.log(secimBosluk);
  if (
    (secimTxt === sunucudanGelen.sorular[sira].dogruCevap) ||
    (secimHesap === sunucudanGelen.sorular[sira].dogruCevap) ||
    (secimBosluk === sunucudanGelen.sorular[sira].dogruCevap)
  ) {
    puan++;
    console.log("dogru");
  }
}

// Butona tıklandığında bir önceki soruya döndük
geriButonu.addEventListener("click", () => {
  const secim = secimiAl();

  if (secim === sunucudanGelen.sorular[sira].dogruCevap) {
    puan++;
  }
  if (
    sira === 1 ||
    sira === 2 ||
    sira === 3 ||
    sira === 4 ||
    sira === 5 ||
    sira === 6 ||
    sira === 7 ||
    sira === 8 ||
    sira === 9 ||
    sira === 10
  ) {
    sira--;
    soruGetir();
    $("#ileri").show();
  }

  console.log(`Sira-- ${sira}`);
});

//Butona tıklandığında cevabın doğruluğunu kontrol edip puan ve soru sırasını güncelleyerek sonraki soruya devam ettik.
ileriButonu.addEventListener("click", () => {
  if (dakika.textContent < 5 && dakika.textContent != 0) {
    const secim = secimiAl();

    if (secim === sunucudanGelen.sorular[sira].dogruCevap) {
      puan++;
      secimleriSifirla();
      console.log("oluyo");
    }

    sira++;

    //Son soruya kadar tekrar bir sonraki soruyu getirmeye devam ettik.
    if (sira < sunucudanGelen.sorular.length) {
      soruGetir();
    }
    //console.log(soruSayisi);
    if (sira === 9) {
      $("#ileri").css("display", "none");
    }
    //   const metin = $(".klassik").text();
    //   if((metin === sunucudanGelen.sorular[5].dogruCevap) && (sira === 5)){
    //     console.log('oldu');
    // }
    console.log(`sira++ ${sira}`);
  }
});

// Butona tıklandığında testi bitirdik
tamamlaButonu.addEventListener("click", () => {
  stopTimer();
  const secim = secimiAl();
  if (secim === sunucudanGelen.sorular[sira].dogruCevap) {
    puan++;
  }
  if (dakika.textContent < 5 && dakika.textContent != 0) {
    goruntulemeAlani.innerHTML = `
    <h2> Sınavın bitimine <<${dakika.textContent} : ${
      saniye.textContent
    }>> dakika kala bitirdiniz </h2>
    <h2> Toplam Puanınız : ${(100 / sunucudanGelen.sorular.length) * puan} </h2>
    <h2>Mevcut sorulardan ${puan}/${
      sunucudanGelen.sorular.length
    } oranında başarı sağladınız.</h2>

    <a href="/frontend/index.html">Ana Sayfaya Geri Dön</a>
`;
  } else {
    goruntulemeAlani.innerHTML = `<h2> Süreyi başlatmadığınız veya süre bittikten sonra sınavı sonlandırdığınız için sınav GEÇERSİZ </h2>
    <a href="/frontend/index.html">Ana Sayfaya Geri Dön</a>`;
  }
});

console.log($("#baslat").text());
