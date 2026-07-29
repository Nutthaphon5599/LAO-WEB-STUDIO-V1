const form=document.getElementById('project-form');
const list=document.getElementById('project-list');
const count=document.getElementById('count');
const cancel=document.getElementById('cancel-edit');
let currentImage='';
const $=id=>document.getElementById(id);

function render(){
  const projects=getProjects(); count.textContent=`(${projects.length}/6)`;
  list.innerHTML=projects.length?projects.map(p=>`<article class="admin-item"><img src="${p.image}" alt=""><div><h3>${p.name.lo || p.name.th || p.name.en}</h3><p>${p.url}</p><div class="item-actions"><button class="text-btn" data-edit="${p.id}">ແກ້ໄຂ</button><button class="text-btn danger" data-delete="${p.id}">ລຶບ</button></div></div></article>`).join(''):'<div class="empty-admin">ຍັງບໍ່ມີຜົນງານ</div>';
  form.querySelector('button[type="submit"]').disabled=projects.length>=6 && !$('edit-id').value;
}
function resetForm(){form.reset();$('edit-id').value='';currentImage='';$('form-title').textContent='ເພີ່ມຜົນງານ';cancel.hidden=true;render();}
function fileToDataUrl(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file)});}
async function compressImage(file){
  const data=await fileToDataUrl(file); const img=new Image(); img.src=data; await img.decode();
  const max=1600, scale=Math.min(1,max/img.width); const canvas=document.createElement('canvas'); canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);
  canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height); return canvas.toDataURL('image/jpeg',.82);
}
form.addEventListener('submit',async e=>{
  e.preventDefault(); const projects=getProjects(); const editId=$('edit-id').value;
  if(!editId && projects.length>=6){alert('ເພີ່ມໄດ້ສູງສຸດ 6 ຜົນງານ');return;}
  const file=$('project-image').files[0]; let image=currentImage || 'assets/portfolio.jpg'; if(file) image=await compressImage(file);
  const project={id:editId || `project-${Date.now()}`,category:{lo:$('category-lo').value,th:$('category-th').value,en:$('category-en').value},name:{lo:$('name-lo').value,th:$('name-th').value,en:$('name-en').value},description:{lo:$('desc-lo').value,th:$('desc-th').value,en:$('desc-en').value},url:$('project-url').value,image};
  const next=editId?projects.map(p=>p.id===editId?project:p):[...projects,project]; saveProjects(next); resetForm();
});
list.addEventListener('click',e=>{
  const edit=e.target.dataset.edit, del=e.target.dataset.delete; const projects=getProjects();
  if(del){if(confirm('ຕ້ອງການລຶບຜົນງານນີ້ບໍ?')){saveProjects(projects.filter(p=>p.id!==del));resetForm();}return;}
  if(edit){const p=projects.find(x=>x.id===edit);if(!p)return;$('edit-id').value=p.id;currentImage=p.image;$('category-lo').value=p.category.lo||'';$('category-th').value=p.category.th||'';$('category-en').value=p.category.en||'';$('name-lo').value=p.name.lo||'';$('name-th').value=p.name.th||'';$('name-en').value=p.name.en||'';$('desc-lo').value=p.description.lo||'';$('desc-th').value=p.description.th||'';$('desc-en').value=p.description.en||'';$('project-url').value=p.url||'';$('form-title').textContent='ແກ້ໄຂຜົນງານ';cancel.hidden=false;window.scrollTo({top:0,behavior:'smooth'});render();}
});
cancel.addEventListener('click',resetForm);
$('reset-all').addEventListener('click',()=>{if(confirm('ກັບຄືນຜົນງານເລີ່ມຕົ້ນບໍ?')){localStorage.removeItem('lws-projects');resetForm();}});
render();
