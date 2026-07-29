const DEFAULT_PROJECTS = [
  {
    id: "tum-pa-guay",
    category: { lo: "ເວັບໄຊຕ໌ຮ້ານອາຫານ", th: "เว็บไซต์ร้านอาหาร", en: "Restaurant Website" },
    name: { lo: "ຮ້ານຕຳຕູບປ່າກ້ວຍ", th: "ร้านตำตูบป่าก้วย", en: "Tum Pa Guay Restaurant" },
    description: {
      lo: "ເວັບໄຊຕ໌ຮ້ານອາຫານ ພ້ອມເມນູ ແຜນທີ່ ປຸ່ມຕິດຕໍ່ ແລະ ຮອງຮັບຫຼາຍພາສາ",
      th: "เว็บไซต์ร้านอาหาร พร้อมเมนู แผนที่ ปุ่มติดต่อ และรองรับหลายภาษา",
      en: "A restaurant website with menu, map, contact actions and multilingual support."
    },
    url: "https://nutthaphon5599.github.io/tum-pa-guay-restaurant-6.2/",
    image: "assets/portfolio.jpg"
  }
];

function getProjects() {
  try {
    const saved = localStorage.getItem("lws-projects");
    if (!saved) return DEFAULT_PROJECTS;
    const projects = JSON.parse(saved);
    return Array.isArray(projects) ? projects.slice(0, 6) : DEFAULT_PROJECTS;
  } catch (error) {
    return DEFAULT_PROJECTS;
  }
}

function saveProjects(projects) {
  localStorage.setItem("lws-projects", JSON.stringify(projects.slice(0, 6)));
}
