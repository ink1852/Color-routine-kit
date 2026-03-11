const KEY_LINKS = "momentum-links";
const MAX_LINKS = 20;

/* ---------------- DOM ---------------- */
const container = document.getElementById("links-container");
const addBtn = document.getElementById("add-link-btn");
const modal = document.getElementById("modal");
const saveBtn = document.getElementById("save-link");
const cancelBtn = document.getElementById("cancel-link");
const nameInput = document.getElementById("link-name");
const urlInput = document.getElementById("link-url");

/* ---------------- 안전한 초기화 ---------------- */
let links = [];
try {
  links = JSON.parse(localStorage.getItem(KEY_LINKS)) || [];
} catch {
  links = [];
}

let dragIndex = null;
let editIndex = null;

/* ---------------- 저장 ---------------- */
function saveLinks() {
  localStorage.setItem(KEY_LINKS, JSON.stringify(links));
}

/* ---------------- 렌더링 ---------------- */
function renderLinks() {
  //render될 때 예전 dropdown이 남지 않음.
  document.querySelectorAll(".dropdown-menu").forEach(menu => menu.remove());

  if (!container) return;
  container.innerHTML = "";

  links.forEach((link, index) => {
    const div = document.createElement("div");
    div.className = "link-item";
    div.draggable = true;

    /* =====================
       드래그 기능
    ====================== */
    div.addEventListener("dragstart", () => {
      dragIndex = index;
    });

    div.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    div.addEventListener("drop", () => {
      if (dragIndex === null || dragIndex === index) return;

      const draggedItem = links[dragIndex];
      links.splice(dragIndex, 1);
      links.splice(index, 0, draggedItem);

      dragIndex = null;
      saveLinks();
      renderLinks();
    });

    /* =========================
       유저가 설정해둔 url로 이동
    ========================== */
    div.addEventListener("click", () => {
      if (!link.url.startsWith("https")){
        alert("wrong protocol");
      }
      else{
        window.location.href = link.url;
      };
      
    });

    /* ==========================
       왼쪽 영역: 이미지 + 텍스트
    =========================== */
    const left = document.createElement("div");
    left.className = "link-left";

    const img = document.createElement("img");
    img.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${link.url}`;

    const span = document.createElement("span");
    span.innerText = link.name;

    left.append(img, span);

    /* ======================================
       오른쪽 영역: (...)버튼 + 드롭다운 메뉴
    ====================================== */
    const right = document.createElement("div");
    right.className = "link-right";

    const moreBtn = document.createElement("button");
    moreBtn.className = "more-btn";
    moreBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="19" cy="12" r="2"/>
      </svg>
    `;

    const dropdown = document.createElement("div");
    dropdown.className = "dropdown-menu";

    /* 수정 버튼 */
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M3 17.25V21h3.75L17.81 9.94
          l-3.75-3.75L3 17.25zm18-11.5
          a1 1 0 0 0 0-1.41l-1.34-1.34
          a1 1 0 0 0-1.41 0l-1.83 1.83
          3.75 3.75L21 5.75z"/>
      </svg>
      수정
    `;

    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      editIndex = index;
      nameInput.value = link.name;
      urlInput.value = link.url;

      if (saveBtn) saveBtn.innerText = "수정";
      modal?.showModal();
    });

    /* 삭제 버튼 */
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M4 7h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10 4h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M6 7l1 13h10l1-13"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
          fill="none"/>
        <path d="M10 11v6M14 11v6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"/>
      </svg>
      삭제
    `;

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      links.splice(index, 1);
      saveLinks();
      renderLinks();
    });

    dropdown.append(editBtn, deleteBtn);

    /* ... 버튼 클릭 */
    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      const rect = moreBtn.getBoundingClientRect();

      dropdown.style.position = "fixed";
      dropdown.style.top = rect.top + "px";
      dropdown.style.left = rect.right + 10 + "px";

      document.querySelectorAll(".dropdown-menu").forEach(menu => {
        if (menu !== dropdown) {
          menu.classList.remove("show");
        }
      });

      dropdown.classList.toggle("show");
    });

    right.append(moreBtn);
    div.append(left, right);
    container.appendChild(div);
    document.body.appendChild(dropdown);
  });
}

/* 바깥 클릭 시 닫기 */
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-menu").forEach(menu => {
    menu.classList.remove("show");
  });
});

/* ---------------- 추가 버튼 ---------------- */
if (addBtn) {
  addBtn.addEventListener("click", () => {
    if (links.length >= MAX_LINKS) {
      alert(`최대 ${MAX_LINKS}개까지만 추가할 수 있습니다.`);
      return;
    }

    editIndex = null;
    nameInput.value = "";
    urlInput.value = "";
    if (saveBtn) saveBtn.innerText = "저장";

    if (modal?.showModal) {
      modal.showModal();
    }
  });
}

/* ---------------- 저장 / 수정 ---------------- */
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    let name = nameInput.value.trim();
    let url = urlInput.value.trim();

    if (!name || !url) return;

    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    if (editIndex !== null) {
      links[editIndex] = { name, url };
      editIndex = null;
    } else {
      if (links.length >= MAX_LINKS) {
        alert(`최대 ${MAX_LINKS}개까지만 추가할 수 있습니다.`);
        return;
      }
      links.push({ name, url });
    }

    saveLinks();
    renderLinks();

    if (modal?.close) {
      modal.close();
    }
  });
}

/* ---------------- 취소 ---------------- */
if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    editIndex = null;
    if (modal?.close) {
      modal.close();
    }
  });
}

/* ESC 닫기 시 edit 초기화 */
if (modal) {
  modal.addEventListener("close", () => {
    editIndex = null;
  });
}

/* ---------------- 초기 실행 ---------------- */
renderLinks();