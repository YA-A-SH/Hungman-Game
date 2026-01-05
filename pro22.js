let letterDiv = document.querySelector('.letters');
let randomWord;

// نعمل الحروف  
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let letArray = Array.from(letters);

letArray.forEach(letter => {
    let span = document.createElement('span');
    let txt = document.createTextNode(letter);
    span.className = 'letter';
    span.appendChild(txt);
    letterDiv.appendChild(span);
});

// أوبيكت فيه الكلمات 
let category = {
    football: ['KROOS', 'RONALDO', 'MESSI', 'MBAPPE', 'VALVERDI', 'RODRIGO', 'BENZEMA', 'MALDINI', 'REAL MADRED', 'BARCELONA', 'ATLITIC MADRED', 'BENFICA', 'BAYERN MUNICH', 'DORTMOND', 'MAN CITY', 'MAN UNITED', 'LIVERPOLL', 'TOTTENHAM'],
    countries: ['PALESTINE', 'JORDAN', 'EGYPT', 'UAE', 'MOROCCO', 'AMERICA', 'RUSSIA', 'GERMANY', 'MAURITANIA', 'LONDON', 'PARIS', 'INDIA', 'KOREA', 'CHINA'],
};

window.onload = function () {
    let x = Object.keys(category);
    let randomCategory = Math.floor(Math.random() * x.length);
    let ranCatValue = x[randomCategory];

    let category_span = document.querySelector('.wordFrom');
    category_span.innerHTML = ranCatValue;

    let randomCategoryValue = Math.floor(Math.random() * category[ranCatValue].length);
    randomWord = category[ranCatValue][randomCategoryValue];
    let foot = document.querySelector('.foot');
    let randomWordArray = Array.from(randomWord);

    randomWordArray.forEach(ltr => {
        let span2 = document.createElement('span');
        if (ltr === ' ') {
            span2.className = 'letterAnswerSpace';
        } else {
            span2.className = 'letterAnswer';
        }
        foot.appendChild(span2);
    });

    let answerSpans = document.querySelectorAll('.foot span');
    let wrong = 0;

    letterDiv.addEventListener('click', (ele) => {
        let status = false;

        if (ele.target.classList.contains('letter') && !ele.target.classList.contains('clicked')) {
            ele.target.classList.add('clicked');

            let clickedLetter = ele.target.innerHTML;
            randomWordArray.forEach((wordLetter, wordIndex) => {
                if (clickedLetter === wordLetter) {
                    status = true;
                    answerSpans.forEach((span, spanIndex) => {
                        if (wordIndex === spanIndex) {
                            span.innerHTML = wordLetter;
                        }
                    });
                }
            });

            if (!status) {
                wrong++;
                let draw = document.querySelector('.draw');
                draw.classList.add(`wrong-${wrong}`);

                if (wrong === 9) {
                    // تأخير بسيط ليرسم الأقدام قبل إظهار الرسالة
                    setTimeout(() => {
                        document.getElementById('final-word').textContent = randomWord;
                        document.querySelector('.lose-popup').classList.remove('hidden');
                    }, 400);
                }
            } else {
                // تحقق إذا كل الأحرف انكشفت
                let allRevealed = true;
                answerSpans.forEach((span, index) => {
                    if (randomWord[index] !== ' ' && span.innerHTML === '') {
                        allRevealed = false;
                    }
                });

                if (allRevealed) {
                    setTimeout(() => {
                        document.querySelector('.win-popup').classList.remove('hidden');
                    }, 300);
                }
            }
        }
    });
};
