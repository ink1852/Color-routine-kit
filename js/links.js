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
  if (!container) return;

  container.innerHTML = "";

  links.forEach((link, index) => {
    const div = document.createElement("div");
    div.className = "link-item";
    div.draggable = true;

    /* 드래그 시작 */
    div.addEventListener("dragstart", () => {
      dragIndex = index;
    });

    /* 드래그 오버 */
    div.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    /* 드롭 */
    div.addEventListener("drop", () => {
      if (dragIndex === null || dragIndex === index) return;

      const draggedItem = links[dragIndex];
      links.splice(dragIndex, 1);
      links.splice(index, 0, draggedItem);

      dragIndex = null;
      saveLinks();
      renderLinks();
    });

    /* 새 탭 열기 */
    div.addEventListener("click", () => {
      if (!link.url) return;
      window.open(link.url, "_blank");
    });

    /* 아이콘 */
    const img = document.createElement("img");
    img.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${link.url}`;

    /* 이름 */
    const span = document.createElement("span");
    span.innerText = link.name;

    /* 수정 버튼 */
    const editBtn = document.createElement("i");
    editBtn.classList.add("edit-btn", "fa-solid", "fa-pen");

    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      editIndex = index;
      nameInput.value = link.name;
      urlInput.value = link.url;

      if (saveBtn) saveBtn.innerText = "수정";

      if (modal?.showModal) {
        modal.showModal();
      }
    });

    /* 삭제 버튼 */
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      links.splice(index, 1);
      saveLinks();
      renderLinks();
    });

    const left = document.createElement("div");
    left.classList.add("imgContent");
    left.append(img, span);

    const right = document.createElement("div");
    right.classList.add("imgContent");
    right.append(editBtn, deleteBtn);

    div.append(left, right);
    container.appendChild(div);
  });
}

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