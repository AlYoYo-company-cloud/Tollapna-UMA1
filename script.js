// بيانات المستخدمين
const accounts = {
    "1001": { 
        pass: "pass1", 
        name: "يحيى حسين احمد",
        grade: "الفرقة الثالثة",
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
    "1002": { 
        pass: "pass2", 
        name: "محمود ابو العزايم",
        grade: "الفرقة الثانية",
        section: "2/1",
        health: "جيدة",
        rating: 4.5,
        achievements: [
            "امين عام اتحاد الطلاب في المدرسة",
            "طالب اذاعة مدرسية"
        ]
    },
    "1003": { 
        pass: "pass3",
        name: "مصطفى أشرف محمد",
        grade: "الفرقة الثانية",
        section: "10/2",
        health: "جيدة",
        rating: 3.5,
        achievements: [
            "مقرر اللجنة الثقافية باتحاد الطلاب المدرسة"
        ],
        absent: 11
    },
    "1004": { 
        pass: "pass4",
        name: "عبدالله محمد عبدالله",
        grade: "الفرقة الثانية",
        section: "2/8",
        health: "جيدة",
        rating: 3.5,
        achievements: [
            "مقرر رياضي لهذا العام اتحاد الطلاب",
            "مقرر ثقافي للعام السابق"
        ],
        absent: 7
    }
};

// تسجيل الدخول
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

// عرض الشاشة الرئيسية
function showHome() {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("student-screen").classList.add("hidden");
    document.getElementById("initiatives-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
}

// عرض بيانات الطالب
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

// عرض المبادرات
function showInitiatives() {
    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("student-screen").classList.add("hidden");
    document.getElementById("initiatives-screen").classList.remove("hidden");
}

// العودة للشاشة الرئيسية
function backHome(){
    showHome();
}

// فتح الروابط والخدمات
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

// فتح بوت التليجرام
function openTelegram(){
    window.open("https://t.me/nasr_military_students_bot", "_blank");
}

// حفظ الجلسة عند فتح الموقع
window.onload = function(){
    const code = localStorage.getItem("loggedInUser");
    if(code && accounts[code]){
        showHome();
    }
}

// تسجيل خروج
function logout(){
    localStorage.removeItem("loggedInUser");
    location.reload();
        }
