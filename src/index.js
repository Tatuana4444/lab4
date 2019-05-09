var apiKey = 'apiKey=02f5fb5b27fd467cb014b23a2d18c566';
var listNewsId = [];
var urlNow ='';
var countNews = 5;
var veiw = {
    
    displayText: function(output){
        var listNews = document.getElementById('news');
        listNews.innerHTML = output;
        return;
    },
    displaySourcesList: function(output){
        for(let i = 0; i<7; i++){
            var listNews = document.getElementById('header__list__btn'+String(i));
            listNews.innerHTML = '<a href=#>'+output.sources[i].name;
            listNewsId[i] = output.sources[i].id;
        }
    },
    hideButton: function(){
        document.getElementById('btn-load-more').removeAttribute('class');
        document.getElementById('btn-load-more').innerHTML='';
    },
    showButton: function(){
        document.getElementById('btn-load-more').setAttribute('class', 'button');
        document.getElementById('btn-load-more').innerHTML='<li >Load more</li>';
    },
    displayNothing: function(){
        var listNews = document.getElementById('news');
        listNews.innerHTML = '<h4>There are no articles matching your request</h4>';
    }
};

var module = {
    getContent: function(url,str){
        let k = url.indexOf('&');
        urlNow = url.substr(0, k);
        let req = new Request(url); 
        fetch(req)
            .then(function(response){
                return response.json();
            }).then(function(data){
                if (data.status == 'ok'){
                    if (str =='List')
                        veiw.displaySourcesList(data);
                    else
                        module.doText(data);
                    
                }
            });
    },   
    doText: function(data){
        var output ='';
        let n;
        if (data.articles.length < countNews)
            n = data.articles.length;
        else
            n = countNews;

        if (n == 0){            
            veiw.displayNothing();
            veiw.hideButton();
            return;
        }
        veiw.showButton();
        if ( (data.articles.length == data.totalResults) || (n == 40) )
            veiw.hideButton();
        for (let i = 0; i<n; i++){
            let urlToImage = data.articles[i].urlToImage;
            let title = data.articles[i].title;
            let description = data.articles[i].description;
            let source =  data.articles[i].source.name;
            if (description==null) 
                description='';
            if (urlToImage ==null)
                urlToImage='./picture/pic.jpg';
            let url = data.articles[i].url;
            output +='<li><img src='+urlToImage+'><a href='+url + ' <h3>' + title + '</h3></a><h6>' + source +'</h6><p>' + description + '</p></li>';
             
        }
        veiw.displayText(output);
    },
    doSearch: function(){
        var searchText = document.getElementById('header__searth-text');
        module.getContent('https://newsapi.org/v2/everything?q='+searchText.value+'&pageSize=5&'+apiKey,'q');
        
    },
    handle: function(e){
        if (e.keyCode === 13){        
            document.getElementById('header__searth-btn').click();
            return false;
        }
    }
  
};

var controller = {
    init: function(){
        module.getContent('https://newsapi.org/v2/sources?'+apiKey,'List');
        module.getContent('https://newsapi.org/v2/top-headlines?country=us&pageSize=5&' + apiKey,'Text');
        for (let i = 0; i<7; i++)
            document.getElementById('header__list__btn'+String(i)).addEventListener('click', function(){
                countNews = 5;
                module.getContent('https://newsapi.org/v2/top-headlines?sources=' + listNewsId[i] + '&pageSize=5&' + apiKey,'Text');
            });
        document.getElementById('btn-load-more').addEventListener('click', function(){
            countNews += 5;
            module.getContent(urlNow+ '&pageSize='+countNews+'&' + apiKey,'Text');
            return false;

        });
        document.getElementById('header__searth-btn').onclick = module.doSearch;
        
        document.getElementById('header__searth-text').addEventListener('keyup', module.handle);
        
    }
};
controller.init();