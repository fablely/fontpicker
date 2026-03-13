document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const fontGrid = document.getElementById('font-grid');
    const btnCopy = document.getElementById('btn-copy');
    const toast = document.getElementById('toast');

    // 리스트 제공된 폰트 파일 목록 (list_dir 결과 기반)
    const fontFiles = [
        "강원교육모두.ttf",
        "강원교육새음.ttf",
        "강원교육현옥샘.ttf",
        "더페이스샵.ttf",
        "마포꽃섬.ttf",
        "바른히피.ttf",
        "배달의민족도현체.ttf",
        "배달의민족연성체.ttf",
        "배달의민족을지로체.ttf",
        "배달의민족주아체.ttf",
        "배달의민족한나체Air.ttf",
        "배달의민족한나체Pro.ttf",
        "빙그레싸만코.ttf",
        "상상토끼꽃길.ttf",
        "평창평화체.ttf",
        "학교안심여행.ttf",
        "학교안심우산.ttf",
        "학교안심우주.ttf"
    ];

    let selectedFont = null;

    // 1. 폰트 동적 로드 및 @font-face 생성
    async function initFonts() {
        fontGrid.innerHTML = '';
        const styleSheet = document.createElement('style');
        document.head.appendChild(styleSheet);

        for (const fileName of fontFiles) {
            const fontName = fileName.split('.')[0];
            const fontUrl = `fonts/${encodeURIComponent(fileName)}`;

            // @font-face 추가
            styleSheet.sheet.insertRule(`
                @font-face {
                    font-family: "${fontName}";
                    src: url("${fontUrl}") format("truetype");
                    font-display: swap;
                }
            `, styleSheet.sheet.cssRules.length);

            // 폰트 아이템 UI 생성
            createFontItem(fontName);
        }
    }

    // 2. 폰트 아이템 UI 생성 함수
    function createFontItem(fontName) {
        const item = document.createElement('div');
        item.className = 'font-item glass-card';
        item.dataset.font = fontName;

        const info = document.createElement('div');
        info.className = 'font-info';
        info.innerHTML = `<span class="font-name">${fontName}</span>`;

        const preview = document.createElement('div');
        preview.className = 'preview-text';
        preview.style.fontFamily = `"${fontName}", sans-serif`;
        preview.textContent = textInput.value || "미리보기 텍스트를 입력하세요";

        item.appendChild(info);
        item.appendChild(preview);

        item.addEventListener('click', () => {
            // 이전 선택 해제
            document.querySelectorAll('.font-item').forEach(el => el.classList.remove('selected'));
            // 현재 선택
            item.classList.add('selected');
            selectedFont = fontName;
        });

        fontGrid.appendChild(item);
    }

    // 3. 텍스트 입력 실시간 리액션
    textInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const previews = document.querySelectorAll('.preview-text');
        previews.forEach(p => {
            p.textContent = val || "미리보기 텍스트를 입력하세요";
        });
    });

    // 4. 복사 기능
    btnCopy.addEventListener('click', async () => {
        const text = textInput.value.trim();
        
        if (!text) {
            showToast('복사할 내용을 입력해주세요!');
            return;
        }
        
        if (!selectedFont) {
            showToast('폰트를 먼저 선택해주세요!');
            return;
        }

        const copyContent = `[폰트:${selectedFont}]\n내용 : ${text}`;

        try {
            await navigator.clipboard.writeText(copyContent);
            showToast('성공적으로 복사되었습니다!');
        } catch (err) {
            console.error('Failed to copy: ', err);
            showToast('복사에 실패했습니다. 직접 선택해서 복사해주세요.');
        }
    });

    // 5. 토스트 메시지
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    // 초기화
    initFonts();
});
