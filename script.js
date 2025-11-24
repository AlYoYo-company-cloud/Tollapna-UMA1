// ===============================
// بيانات المستخدمين (طلاب + مشرفين)
// ===============================

// الطلاب
const accounts = {
  "d92k1a9m3": { // يحيى حسين احمد
    pass: "p9f2k1a8",
    name: "يحيى حسين احمد",
    grade: "الفرقة الثانية",
    section: "3/8",
    health: "جيدة",
    rating: 4.5,
    achievements: [
      "امين مساعد اتحاد طلاب المدرسة",
      "نائب رئيس جماعة مناهضة التدخين والإدمان بالمدرسة",
      "قام بإلقاء ندوة عن ذلك في المدرسة وموثقة على صفحة المدرسة في فيسبوك",
      "مقرر اجتماعي لاتحاد العام السابق"
    ]
  },
  "k29xqp811": { // محمود أبو العزايم محمود
    pass: "m4k1a2q9",
    name: "محمود أبو العزايم محمود",
    grade: "الفرقة الثانية",
    section: "2/1",
    health: "جيدة",
    rating: 4.5,
    achievements: [
      "امين عام اتحاد الطلاب في المدرسة",
      "طالب إذاعة مدرسية"
    ]
  },
  "a12k9m3n7": { // مصطفى أحمد محمد أحمد مصطفى
    pass: "z9x1c3v8",
    name: "مصطفى أحمد محمد أحمد مصطفى",
    grade: "الفرقة الثانية",
    section: "4/2",
    health: "جيدة",
    rating: 3.5,
    achievements: [
      "مقرر اجتماعي اتحاد الطلاب لهذا العام",
      "أمين فصل 2/4"
    ],
    absent: 5
  },
  "q8w2e9r3t": { // عبدالله محمد عبدالله
    pass: "b3v7m1k9",
    name: "عبدالله محمد عبدالله",
    grade: "الفرقة الثانية",
    section: "2/8",
    health: "جيدة",
    rating: 3.5,
    achievements: [
      "مقرر رياضي لهذا العام اتحاد الطلاب",
      "مقرر علمي للعام الدراسي السابق"
    ],
    absent: 7
  },
  "m9n2b3v7x": { // محمد سيد أحمد
    pass: "k4j1l2p9",
    name: "محمد سيد أحمد",
    grade: "الفرقة الثانية",
    section: "2/6",
    health: "جيدة",
    rating: 3.5,
    achievements: []
  },
  "z8x1c3v6b": { // أياد محمد ياسر
    pass: "t9y1u2o7",
    name: "أياد محمد ياسر",
    grade: "الفرقة الأولى",
    section: "1/6",
    health: "جيدة",
    rating: 3.5,
    achievements: [
      "مقرر فني اتحاد الطلاب"
    ]
  },

  // المشرفين
  "adm9x1k2b": {
    pass: "adm12345",
    name: "أ/ عمري كامل",
    role: "admin",
    title: "مدير عام المدرسة"
  },
  "adm8v2p9m": {
    pass: "adm98765",
    name: "أ/ محمد عارف",
    role: "admin",
    title: "مشرف اتحاد الطلاب"
  },
  "adm7b3n4k": {
    pass: "adm24680",
    name: "أ/ عز كدواني",
    role: "admin",
    title: "مسؤول IT بالمدرسة"
  }
};

// ===============================
// تسجيل الدخول
// ===============================
function login() {
  const code = document.getElementById("code").value.trim();
  const pass = document.getElementById("password").value;

  if(!code || !pass){ alert("من فضلك أدخل الكود وكلمة السر"); return; }

  if(accounts[code] && accounts[code].pass === pass){
    localStorage.setItem("loggedInUser", code);
    showHome();
  } else {
    alert("الكود أو كلمة السر غير صحيحة");
  }
}

// ===============================
// عرض الشاشة الرئيسية
// ===============================
function showHome() {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("student-screen").classList.add("hidden");
  document.getElementById("initiatives-screen").classList.add("hidden");
  document.getElementById("home-screen").classList.remove("hidden");
}

// ===============================
// عرض بيانات الطالب
// ===============================
function showStudent() {
  const code = localStorage.getItem("loggedInUser");
  if(!code || !accounts[code]){ alert("سجل الدخول أولاً"); return; }

  const user = accounts[code];
  let achievementsHTML = user.achievements.map(a => `<li>${a}</li>`).join("");

  document.getElementById("user-info").innerHTML = `
    <div class="user-card">
      <h3>${user.name}</h3>
      <p>الفرقة: ${user.grade}</p>
      <p>الفصل: ${user.section}</p>
      <p>الحالة الصحية: ${user.health}</p>
      <p>التقييم: ${user.rating}</p>
      ${user.absent ? `<p>أيام الغياب: ${user.absent}</p>` : ""}
      <h4>الإنجازات:</h4>
      <ul>${achievementsHTML}</ul>
    </div>
  `;
  document.getElementById("home-screen").classList.add("hidden");
  document.getElementById("student-screen").classList.remove("hidden");
}

// ===============================
// البحث عن الطلاب للمشرفين
// ===============================
function searchStudent() {
  const searchInput = document.getElementById("search-student").value.toLowerCase();
  const resultsDiv = document.getElementById("search-results");
  resultsDiv.innerHTML = "";

  Object.keys(accounts).forEach(code => {
    const user = accounts[code];
    if(user.role === "student" && user.name.toLowerCase().includes(searchInput)){
      let achievementsHTML = user.achievements.map(a => `<li>${a}</li>`).join("");
      resultsDiv.innerHTML += `
        <div class="user-card">
          <h3>${user.name}</h3>
          <p>الفرقة: ${user.grade}</p>
          <p>الفصل: ${user.section}</p>
          <p>الحالة الصحية: ${user.health}</p>
          <p>التقييم: ${user.rating}</p>
          ${user.absent ? `<p>أيام الغياب: ${user.absent}</p>` : ""}
          <h4>الإنجازات:</h4>
          <ul>${achievementsHTML}</ul>
        </div>
      `;
    }
  });
}

// ===============================
// عرض المبادرات
// ===============================
function showInitiatives() {
  document.getElementById("home-screen").classList.add("hidden");
  document.getElementById("student-screen").classList.add("hidden");
  document.getElementById("initiatives-screen").classList.remove("hidden");
}

// ===============================
// العودة للشاشة الرئيسية
// ===============================
function backHome(){
  showHome();
}

// ===============================
// فتح الروابط والخدمات
// ===============================
function openPage(name){
  switch(name){
    case "حالة":
      showStudent();
      break;
    case "المبادرات":
      showInitiatives();
      break;
    case "وزارة":
      window.location.href = "https://ellibrary.moe.gov.eg/books/";
      break;
    case "مسابقات":
      window.location.href = "https://ellibrary.moe.gov.eg/books/";
      break;
    case "اعلانات":
      window.location.href = "https://whatsapp.com/channel/0029VbBX4wo1SWstPmiejS0F";
      break;
    default:
      alert("الرابط غير موجود");
  }
}

// ===============================
// فتح بوت التليجرام
// ===============================
function openTelegram(){
  window.open("https://t.me/nasr_military_students_bot", "_blank");
}

// ===============================
// حفظ الجلسة عند فتح الموقع
// ===============================
window.onload = function(){
  const code = localStorage.getItem("loggedInUser");
  if(code && accounts[code]){
    showHome();
  }
}

// ===============================
// تسجيل خروج
// ===============================
function logout(){
  localStorage.removeItem("loggedInUser");
  location.reload();
      }
