const samplePrompts = [
  {id:"sample-1",title:"Cinematic Miniature House",category:"Image Prompts",description:"A photorealistic miniature house concept for a satisfying DIY transformation video.",image_prompt:"Create an ultra-photorealistic miniature house on a realistic workbench. Show carefully constructed tiny brick walls, natural wood textures, soft workshop lighting, realistic shadows, precise proportions, and a cinematic close-up composition. Vertical 9:16, no text, no watermark.",video_prompt:"Animate a smooth cinematic camera push-in toward the miniature house. Keep every object physically consistent, with subtle natural workshop movement and realistic lighting. No sudden transformations, no floating objects, no text, no music.",youtube_url:"",created_at:"2026-10-01",symbol:"⌂"},
  {id:"sample-2",title:"Ultra-Realistic AI Portrait",category:"Image Prompts",description:"A flexible portrait prompt for realistic character concepts and profile visuals.",image_prompt:"Create a photorealistic editorial portrait with natural skin texture, believable facial proportions, soft directional light, a clean background, realistic lens depth, and carefully controlled highlights. Preserve the reference identity when a reference image is supplied. No beauty filters, no text, no watermark.",video_prompt:"",youtube_url:"",created_at:"2026-09-28",symbol:"◉"},
  {id:"sample-3",title:"Satisfying DIY Craft Transformation",category:"Video Prompts",description:"Plan a believable step-by-step craft video with consistent objects and camera position.",image_prompt:"Create a photorealistic vertical 9:16 DIY craft reference image showing a tidy workbench, realistic tools, natural materials, and a partially completed craft project. Keep all objects physically plausible and clearly visible. No text or watermark.",video_prompt:"Create a realistic step-by-step DIY craft sequence. Keep the same character, clothing, workbench, tools, lighting, and object dimensions in every shot. Show only actions that can physically happen, with natural hand movement and believable material behavior. Use steady camera motion, natural workshop sounds, vertical 9:16 framing, and no text or music.",youtube_url:"",created_at:"2026-09-25",symbol:"✂"},
  {id:"sample-4",title:"Consistent Avatar Video",category:"Avatar Prompts",description:"A reusable identity-lock prompt for keeping your AI avatar consistent between scenes.",image_prompt:"Use the supplied reference image as the exact same character. Preserve facial features, skin tone, hairstyle, facial hair, body proportions, and clothing. Keep realistic anatomy and natural skin texture. Do not redesign the character or change clothing unless explicitly requested. Vertical 9:16, photorealistic, no text.",video_prompt:"Maintain exact character identity and clothing from the reference image throughout the full clip. Use natural body mechanics, realistic hand movement, consistent lighting, and a stable camera. Do not change the face, hairstyle, clothing, or body proportions. No extra fingers, no flicker, no morphing, no text, no music.",youtube_url:"",created_at:"2026-09-20",symbol:"◉"},
  {id:"sample-5",title:"Cinematic AI Landscape",category:"Image Prompts",description:"Create a dramatic landscape concept with believable atmospheric depth.",image_prompt:"Create a photorealistic cinematic landscape with a clear foreground, layered distant mountains, realistic atmospheric perspective, physically plausible sunlight, detailed natural textures, and balanced composition. Use a refined filmic color grade without oversaturation. Vertical 9:16, no text, no watermark.",video_prompt:"",youtube_url:"",created_at:"2026-09-17",symbol:"⛰"},
  {id:"sample-6",title:"Image-to-Video Camera Move",category:"Video Prompts",description:"A controlled motion prompt for turning a still reference image into a short video.",image_prompt:"",video_prompt:"Use the supplied image as the first-frame visual reference. Preserve the exact subject, object count, shape, colors, and environment. Add only subtle, physically realistic movement and a slow, stable camera push-in. Do not invent new objects, alter the subject, warp edges, or change the scene. Smooth motion, natural lighting, no text, no watermark, no music.",youtube_url:"",created_at:"2026-09-14",symbol:"▶"}
];
const cfg = window.APP_CONFIG || {};
let prompts = [...samplePrompts];
let selectedCategory = "All";
let activePrompt = null;
const $ = id => document.getElementById(id);
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function formatDate(value){if(!value)return "Prompt";const d=new Date(value);return Number.isNaN(d.getTime())?"Prompt":d.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});}
function getFiltered(){
  const q=$("searchInput").value.trim().toLowerCase();
  let arr=prompts.filter(p=>(selectedCategory==="All"||p.category===selectedCategory)&&(!q||[p.title,p.category,p.description,p.image_prompt,p.video_prompt].join(" ").toLowerCase().includes(q)));
  if($("sortSelect").value==="title")arr.sort((a,b)=>a.title.localeCompare(b.title));else arr.sort((a,b)=>String(b.created_at||"").localeCompare(String(a.created_at||"")));
  return arr;
}
function render(){
  const arr=getFiltered();$("resultsCount").textContent=arr.length;
  $("promptGrid").innerHTML=arr.map(p=>`<article class="prompt-card">
    <div class="card-art"><span class="tag">${escapeHtml(p.category)}</span><span class="art-symbol">${escapeHtml(p.symbol||"✦")}</span></div>
    <div class="card-body"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.description||"Open this prompt to see details and copy the text.")}</p>
    <div class="card-bottom"><span class="card-date">${escapeHtml(formatDate(p.created_at))}</span><button class="text-button" data-open="${escapeHtml(p.id)}">View prompt ↗</button></div></div></article>`).join("");
  $("emptyState").classList.toggle("hidden",arr.length>0);$("promptGrid").classList.toggle("hidden",arr.length===0);
}
function openPrompt(id){
  const p=prompts.find(x=>String(x.id)===String(id));if(!p)return;activePrompt=p;
  $("modalTitle").textContent=p.title;$("modalCategory").textContent=p.category||"Prompt";$("modalDate").textContent=formatDate(p.created_at);$("modalDescription").textContent=p.description||"";
  $("modalImagePrompt").textContent=p.image_prompt||"";$("modalVideoPrompt").textContent=p.video_prompt||"";
  $("imagePromptWrap").classList.toggle("hidden",!p.image_prompt);$("videoPromptWrap").classList.toggle("hidden",!p.video_prompt);
  const yt=$("youtubeLink");const url=(p.youtube_url||"").trim();let valid=false;try{const u=new URL(url);valid=["https:","http:"].includes(u.protocol)&&["youtube.com","www.youtube.com","youtu.be","m.youtube.com"].includes(u.hostname); }catch{}
  yt.classList.toggle("hidden",!valid);if(valid)yt.href=url;
  $("promptModal").classList.remove("hidden");document.body.style.overflow="hidden";
}
function closeModal(){$("promptModal").classList.add("hidden");document.body.style.overflow="";}
async function copyText(text){
  try{await navigator.clipboard.writeText(text);}catch(e){const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();}
  const toast=$("toast");toast.textContent="Prompt copied to clipboard";toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800);
}
async function loadFromSupabase(){
  if(!cfg.supabaseUrl||!cfg.supabaseAnonKey)return;
  try{
    const response=await fetch(`${cfg.supabaseUrl}/rest/v1/prompts?select=*&published=eq.true&order=created_at.desc`,{headers:{apikey:cfg.supabaseAnonKey,Authorization:`Bearer ${cfg.supabaseAnonKey}`}});
    if(!response.ok)throw new Error("Could not load remote prompts");
    const remote=await response.json();
    if(Array.isArray(remote))prompts=remote.length?remote:samplePrompts;
  }catch(err){console.warn("Using demo prompts:",err);}
  render();
}
document.addEventListener("click",e=>{
  const cat=e.target.closest("[data-category]");if(cat){selectedCategory=cat.dataset.category;document.querySelectorAll(".category-card").forEach(b=>b.classList.toggle("active",b===cat));render();}
  const open=e.target.closest("[data-open]");if(open)openPrompt(open.dataset.open);
  const copy=e.target.closest("[data-copy]");if(copy&&activePrompt){const val=copy.dataset.copy==="image"?activePrompt.image_prompt:activePrompt.video_prompt;if(val)copyText(val);}
  if(e.target.dataset.close==="true"||e.target.id==="closeModal")closeModal();
});
$("searchInput").addEventListener("input",render);$("sortSelect").addEventListener("change",render);
$("resetFilters").addEventListener("click",()=>{$("searchInput").value="";selectedCategory="All";document.querySelectorAll(".category-card").forEach(b=>b.classList.toggle("active",b.dataset.category==="All"));render();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
$("year").textContent=new Date().getFullYear();render();loadFromSupabase();
