function jahkuwbhw_wjsksa(url)
{
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
            "x-rapidapi-key": "22a3dd1098mshe1b28ecce445731p1f61c1jsn964bfdf276f8",
            "x-bingapis-sdk": "true"
        }
    })
    .then( response =>{
        return response.json();
    })
    .then(data => {
        data.value.forEach(e=>
        {
            var mainContent = null;
            var mainContainer = null;
            var contentImage = null;
            var contentDescription = null;
            var contentName = null;
            var textBox = null;
            var contentUrl = null;
            var contentDate = null;
            
            if(e.image && (e.image.thumbnail.width >= e.image.thumbnail.height))
            {
                if(document.querySelector('.main-container'))
                {
                    mainContainer = document.querySelector('.main-container');
                }
                else
                {
                    var body = document.querySelector('body');
                    mainContainer = document.createElement('main');
                    mainContainer.setAttribute('class','main-container');
                    body.appendChild(mainContainer);
                }
                
                
                mainContent = document.createElement('article');
                mainContent.setAttribute('class','main-content');
                
                contentImage = document.createElement('img');
                contentImage.setAttribute('class','content-img');
                contentImage.src = e.image.thumbnail.contentUrl+'&w=640&480&p=0';
                mainContent.appendChild(contentImage);

                textBox = document.createElement('div');
                textBox.setAttribute('class','text-box');
        
                contentDate = document.createElement('span');
                contentDate.setAttribute('class','content-date');

                var date = new Date(e.datePublished);
                contentDate.innerHTML = date.toString().slice(0,15);
                textBox.appendChild(contentDate);
        
                contentName = document.createElement('h1');
                contentName.setAttribute('class','content-name');
                contentName.innerHTML = e.name;
                textBox.appendChild(contentName);

                contentDescription = document.createElement('p');
                contentDescription.setAttribute('class','content-description');
                contentDescription.innerHTML = e.description;
                textBox.appendChild(contentDescription);

                contentUrl = document.createElement('a');
                contentUrl.setAttribute('class','content-url');
                contentUrl.href = e.url;
                contentUrl.target = 'blank';
                contentUrl.innerHTML = 'Read More';
                textBox.appendChild(contentUrl);

                mainContent.appendChild(textBox);
                mainContainer.appendChild(mainContent);
            }

        })
    })
    .catch(err => {
	    console.log(err);
    })
}


(function(){
    jahkuwbhw_wjsksa("https://bing-news-search1.p.rapidapi.com/news?count=10&originalImg=true&safeSearch=Off&textFormat=Html");
})();

var newsForm = document.querySelector('.news-form');


newsForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    var main = document.querySelector('.main-container');
    document.querySelector('body').removeChild(main);
    var query = document.querySelector('.query');
    jahkuwbhw_wjsksa(`https://bing-news-search1.p.rapidapi.com/news/search?count=10&originalImg=true&freshness=Day&textFormat=Html&safeSearch=Off&q=${query.value}`);
})


