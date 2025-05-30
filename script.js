document.addEventListener('DOMContentLoaded', function() {
  const textInput = document.getElementById('textInput');
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');
  const fontSelect = document.getElementById('fontSelect');
  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const fontWeightSelect = document.getElementById('fontWeightSelect');
  const textAlignSelect = document.getElementById('textAlignSelect');
  const textColorSelect = document.getElementById('textColorSelect');
  const ratioSelect = document.getElementById('ratioSelect');
  const templateSelect = document.getElementById('templateSelect');
  const uploadBackground = document.getElementById('uploadBackground');
  const backgroundImage = document.getElementById('backgroundImage');
  const backgroundSizeSelect = document.getElementById('backgroundSizeSelect');
  const backgroundBlurSelect = document.getElementById('backgroundBlurSelect');
  const blurValue = document.getElementById('blurValue');
  const backgroundOptions = document.querySelector('.background-options');
  const card = document.getElementById('card');
  const quoteText = document.getElementById('quoteText');
  const titlePreview = document.getElementById('titlePreview');
  const authorPreview = document.getElementById('authorPreview');
  const gradientColor1 = document.getElementById('gradientColor1');
  const gradientColor2 = document.getElementById('gradientColor2');

  // 초기 설정
  updateGradientBackground(); // 초기 그라데이션 설정
  quoteText.style.textAlign = 'left';
  quoteText.style.fontWeight = '400';
  quoteText.style.color = '#1a1a1a';
  card.style.fontFamily = "'Noto Serif KR', serif"; // 기본 폰트 본명조로 설정

  updateCard();

  function updateCard() {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      quoteText.textContent = selectedText;
    }

    titlePreview.textContent = titleInput.value || '작품 제목';
    authorPreview.textContent = authorInput.value || '작가 이름';

    const selectedFont = fontSelect.value; // 선택된 폰트 가져오기
    quoteText.style.fontFamily = selectedFont;
    titlePreview.style.fontFamily = selectedFont; // 제목 폰트 업데이트
    authorPreview.style.fontFamily = selectedFont; // 작가 폰트 업데이트

    const selectedFontSize = fontSizeSlider.value; // 슬라이더 값 가져오기
    quoteText.style.fontSize = selectedFontSize + 'px'; // 폰트 크기 단위를 px로 변경
    fontSizeValue.textContent = selectedFontSize + 'px'; // 현재 폰트 크기 값 표시

    quoteText.style.fontWeight = fontWeightSelect.value;
    quoteText.style.textAlign = textAlignSelect.value;
    titlePreview.style.textAlign = textAlignSelect.value; // 제목 정렬 업데이트
    authorPreview.style.textAlign = textAlignSelect.value; // 작가 이름 정렬 업데이트

    const selectedColor = textColorSelect.value;
    quoteText.style.color = selectedColor;
    titlePreview.style.color = selectedColor; // 제목 색상 업데이트
    authorPreview.style.color = selectedColor; // 작가 이름 색상 업데이트

    card.style.aspectRatio = ratioSelect.value;

    if (templateSelect.value === 'receipt') {
      card.className = 'card receipt-template';
    } else {
      card.className = 'card default-template';
    }
  }

  textInput.addEventListener('mouseup', updateCard);
  titleInput.addEventListener('input', updateCard);
  authorInput.addEventListener('input', updateCard);
  fontSelect.addEventListener('change', updateCard);
  fontSizeSlider.addEventListener('input', updateCard);
  fontWeightSelect.addEventListener('change', updateCard);
  textAlignSelect.addEventListener('change', updateCard);
  textColorSelect.addEventListener('change', updateCard);
  ratioSelect.addEventListener('change', updateCard);
  templateSelect.addEventListener('change', updateCard);

  // 배경 이미지 업로드
  document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('backgroundImage').click();
  });

  // 배경 이미지 파일 선택 이벤트
  document.getElementById('backgroundImage').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const card = document.getElementById('card');
        card.style.backgroundImage = `url(${e.target.result})`;
        card.style.backgroundSize = 'cover'; // 이미지 로드 시 꽉 차게 설정
        card.style.backgroundPosition = 'center';
        card.style.backgroundRepeat = 'no-repeat';
        document.getElementById('imageSize').value = 100; // 슬라이더 값 100%로 초기화
        document.getElementById('imagePositionX').value = 50; // 슬라이더 값 중앙으로 초기화
        document.getElementById('imagePositionY').value = 50; // 슬라이더 값 중앙으로 초기화
        // card.style.background = ''; // 이 줄을 제거하거나 주석 처리하여 그라데이션 설정을 방해하지 않도록 합니다.
      };
      reader.readAsDataURL(file);
    }
  });

  // 배경 이미지 크기 조절
  document.getElementById('imageSize').addEventListener('input', (e) => {
    const card = document.getElementById('card');
    const size = e.target.value;
    card.style.backgroundSize = `${size}%`;
  });

  // 배경 이미지 위치 조절
  document.getElementById('imagePositionX').addEventListener('input', (e) => {
    const card = document.getElementById('card');
    const x = e.target.value;
    const y = document.getElementById('imagePositionY').value;
    card.style.backgroundPosition = `${x}% ${y}%`;
  });

  document.getElementById('imagePositionY').addEventListener('input', (e) => {
    const card = document.getElementById('card');
    const y = e.target.value;
    const x = document.getElementById('imagePositionX').value;
    card.style.backgroundPosition = `${x}% ${y}%`;
  });

  // 예시 배경 이미지 클릭 이벤트
  document.querySelectorAll('.example-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const card = document.getElementById('card');

      // 예시 이미지 로드 시 CORS 속성 추가
      const imgElement = new Image();
      imgElement.crossOrigin = 'Anonymous'; // CORS 허용 시도
      imgElement.onload = () => {
        card.style.backgroundImage = `url(${imgElement.src})`;
        card.style.backgroundSize = 'cover'; // 예시 이미지 클릭 시 꽉 차게 설정
        card.style.backgroundPosition = 'center';
        card.style.backgroundRepeat = 'no-repeat';
        document.getElementById('imageSize').value = 100; // 슬라이더 값 100%로 초기화
        document.getElementById('imagePositionX').value = 50; // 슬라이더 값 중앙으로 초기화
        document.getElementById('imagePositionY').value = 50; // 슬라이더 값 중앙으로 초기화
      };
      imgElement.onerror = (e) => {
        console.error('예시 이미지 로드 실패:', img.src, e);
        alert('예시 이미지 로드에 실패했습니다.');
      };
      imgElement.src = img.src; // 이미지 소스 설정
    });
  });

  // 그라데이션 배경 업데이트 함수
  function updateGradientBackground() {
    const card = document.getElementById('card');
    const color1 = document.getElementById('gradientColor1').value;
    const color2 = document.getElementById('gradientColor2').value;
    card.style.backgroundImage = ''; // 그라데이션 설정 시 이미지 배경 제거
    card.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
  }

  // 그라데이션 색상 입력 이벤트
  document.getElementById('gradientColor1').addEventListener('input', updateGradientBackground);
  document.getElementById('gradientColor2').addEventListener('input', updateGradientBackground);
});

// 폰트별 크기 조절 값 (픽셀 단위) - 모든 폰트에 동일 적용하므로 이 객체는 사용하지 않습니다.
// const fontAdjustments = {
//   "'Noto Serif KR', serif": -5,
//   // 다른 폰트가 있다면 여기에 추가
//   // "'Nanum Gothic', sans-serif": -2,
// };

async function saveImage() {
  const card = document.getElementById('card');
  const quoteText = document.getElementById('quoteText');

  // 현재 폰트 크기와 이름 가져오기
  const originalFontSize = window.getComputedStyle(quoteText).fontSize;
  const originalFontSizeNumber = parseInt(originalFontSize);
  const fontFamily = quoteText.style.fontFamily;

  // 폰트별 보정값 설정
  let offset = 0;
  if (fontFamily.includes('RidiBatang') || fontFamily.includes('Noto Serif')) {
    offset = -2;
  }

  // 임시로 글자 크기 줄이기
  quoteText.style.fontSize = (originalFontSizeNumber + offset) + 'px';

  try {
    const canvas = await html2canvas(card, {
      backgroundColor: null,
      scale: 3
    });

    const link = document.createElement('a');
    link.download = '발췌_이미지.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  } catch (error) {
    console.error('saveImage 오류:', error);
    alert('이미지 저장 중 오류가 발생했습니다. 콘솔을 확인하세요.');
  } finally {
    // 원래 크기로 복원
    quoteText.style.fontSize = originalFontSize;
  }
}


async function copyToClipboard() {
  const card = document.getElementById('card');
  const quoteText = document.getElementById('quoteText');
  const copyButton = document.querySelector('.copy-button');
  const generatedImageContainer = document.getElementById('generatedImageContainer');

  // 기존 이미지 제거
  generatedImageContainer.innerHTML = '';

  // 현재 폰트 크기와 이름 가져오기
  const originalFontSize = window.getComputedStyle(quoteText).fontSize;
  const originalFontSizeNumber = parseInt(originalFontSize);
  const fontFamily = quoteText.style.fontFamily;

  // 폰트별 보정값
  let offset = 0;
  if (fontFamily.includes('RidiBatang') || fontFamily.includes('Noto Serif')) {
    offset = -2;
  }

  quoteText.style.fontSize = (originalFontSizeNumber + offset) + 'px';

  try {
    const canvas = await html2canvas(card, {
      backgroundColor: null,
      scale: 3
    });

    // 미리보기용 이미지 추가
    const imgElement = document.createElement('img');
    imgElement.src = canvas.toDataURL('image/png');
    imgElement.alt = '생성된 발췌 이미지';
    generatedImageContainer.appendChild(imgElement);

    // ✅ 클립보드에 복사
    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        alert('📋 클립보드에 이미지가 복사되었습니다!');
      } catch (copyErr) {
        console.error('클립보드 복사 실패:', copyErr);
        alert('⚠ 클립보드 복사 실패. 브라우저 보안 설정을 확인해주세요.');
      }
    });

  } catch (error) {
    console.error('copyToClipboard 오류:', error);
    alert('복사 중 오류 발생');
  } finally {
    quoteText.style.fontSize = originalFontSize;
  }
}
