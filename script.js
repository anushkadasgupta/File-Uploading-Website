const drop = document.getElementById("drag-drop");
const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
const fileNameDisplay = document.getElementById("fileNameDisplay");
const fileSizeDisplay = document.getElementById("fileSizeDisplay");
const preview = document.getElementById("preview-file");
const trash = document.getElementById("trash");
const supportedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4'];
const maxSize = 50 * 1024 * 1024; 


['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  drop.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

drop.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  handleFile(file);
});

drop.addEventListener('drop', (e) => {
  const file = e.dataTransfer.files[0];
  if (!file) return;
  handleFile(file);
});

function handleFile(file) {
  preview.innerHTML = '';
  previewContainer.style.display = 'none';

  const fileType = file.type;
  const fileSize = file.size;

  if (fileSize > maxSize) {
    alert('File size exceeds the 50MB limit!');
    fileInput.value = '';
    return;
  }

  if (!supportedTypes.includes(fileType)) {
    alert('Unsupported file type! Only JPEG, PNG, PDF, or MP4 are allowed.');
    fileInput.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const fileURL = e.target.result;
    previewContainer.style.display = 'block';
    fileNameDisplay.textContent = file.name;
    let sizeText = "";
    if (fileSize < 1024) {
      sizeText = `${fileSize} B of ${fileSize} B`;
    }
    else if (fileSize < 1024 * 1024) {
      sizeText = `${(fileSize / 1024).toFixed(0)} KB of ${(fileSize / 1024).toFixed(0)} KB`;
    } 
    else {
      sizeText = `${(fileSize / 1024).toFixed(0)} MB of ${(fileSize / 1024).toFixed(0)} MB`;
    }
    fileSizeDisplay.textContent = sizeText;
    

    if (fileType === 'image/jpeg' || fileType === 'image/png') {
      const img = document.createElement('img');
      img.src = fileURL;
      img.style.width = "100px";
      img.style.height = "80px";
      img.style.margin = "20px";
      img.style.borderRadius = "8px";
      preview.appendChild(img);
    } 
    
    else if (fileType === 'application/pdf') {
      const embed = document.createElement('embed');
      embed.src = fileURL;
      embed.type = 'application/pdf';
      embed.style.width = '100px';
      embed.style.height = '80px';
      embed.style.margin = '20px';
      preview.appendChild(embed);
    } 
    
    else if (fileType === 'video/mp4') {
      const video = document.createElement('video');
      video.src = fileURL;
      video.controls = true;
      video.style.width = "100px";
      video.style.height = "80px";
      video.style.margin = "20px";
      preview.appendChild(video);
    }
  };

  trash.addEventListener('click', () => {
    previewContainer.innerHTML='';
    previewContainer.style.display = 'none';
  });
  
  reader.readAsDataURL(file);
}
