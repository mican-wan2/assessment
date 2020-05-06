'use strict'
const userNameInput = document.getElementById('username');
const assesmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
assesmentButton.onclick = () =>{
    const userNae = userNameInput.value;
    if(userNae.length === 0){
        return;
    }

    removeAllChild(resultDivided);
    removeAllChild(tweetDivided);

    const header = document.createElement('h3');
    header.innerHTML = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assesment(userNae);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    console.log(userNae);

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag' +encodeURIComponent('あなたの良いところ')+ '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたの良いところ';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

  
}

userNameInput.onkeydown = event=>{
    if(event.key === 'Enter'){
        assesmentButton.onclick();
    }
}

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声はみんなを引きつけ、心に残ります。',
    '{userName}のいいいことろßは情熱です。{userName}の情熱に周りの人は感化されます。'
];

console.assert(
    assesment('太郎') ===
    '太郎のいいところは声です。太郎の特徴的な声はみんなを引きつけ、心に残ります。',
    '診断結果が正しくない'
)

/**
 * 
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果 
 */
function assesment(userName){
    let sumOfCharCode = 0;
    for(let i=0; i < userName.length; i++){
        sumOfCharCode += userName.charCodeAt(i);
    }
    
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g,userName);

    return result;
}

/**
 * 
 * @param {HTMLElement} element HTML要素 
 */
function removeAllChild(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}
