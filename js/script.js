'use strict';

function titleClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  // console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  //   console.log('Atribute name:', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors',
};

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(opts.titleListSelector);
  /* remove contents of titleList */
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);
  // console.log('customSelector:', customSelector);

  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML =
			'<li><a href="#' +
			articleId +
			'"><span>' +
			articleTitle +
			'</span></a></li>';

    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  // titleList.insertAdjacentHTML('afterbegin', html);
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  //znalezienie najmniejszej i największej liczby wystąpień
  //te dwie liczby mają zostać zwrócone w postaci obiektu, który będzie zawierał dwa klucze: max i min
  //!! ma zwracać największą i najmniejszą liczbę wystąpień TEGO SAMEGO tagu (???) - nie rozumiem

  // console.log('tags:', tags);
  const calculatedParams = {};
  const paramsArray = [];
  //iterate over tags
  for (let tag in tags){
    const tagParam = tags[tag];
    paramsArray.push(tagParam);
  }
  const minParam = Math.min(...paramsArray);
  const maxParam = Math.max(...paramsArray);

  calculatedParams.min = minParam;
  calculatedParams.max = maxParam;

  return calculatedParams;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * opts.cloudClassCount + 1 );
  return opts.cloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opts.articleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    /* split tags into array */
    const articleTags = article.getAttribute('data-tags').split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTags) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';
      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
      // console.log('tagLink:', linkHTML);
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('afterbegin', html);
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  // const tagList = document.querySelector('.list .tags');
  const tagList = document.querySelector(opts.tagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' ' + '</a>';
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* (???)DODANE PRZEZE MNIE - add class 'active' to clicked tag */
  clickedElement.classList.add('active');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag =  href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let tagLink of activeTagLinks) {
  /* remove class active */
    tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allClickedTags = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(allClickedTags);
  /* START LOOP: for each found tag link */
  for (let clickedTag of allClickedTags) {
  /* add class active */
    clickedTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  const linksList = document.querySelectorAll('.tags a');

  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }

  for (let link of linksList) {
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(opts.authorsListSelector);
  let allArticlesAuthors = {};
  let allAuthorsHTML = '';

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find authors name wrapper */
    const authorsWrapper = article.querySelector(opts.articleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get author name from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    if(!allArticlesAuthors.hasOwnProperty(articleAuthor)){
      allArticlesAuthors[articleAuthor] = 1;
    } else {
      allArticlesAuthors[articleAuthor]++;
    }
    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthor + '">' + 'by ' + articleAuthor + '</a>';
    // console.log(linkHTML);
    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.insertAdjacentHTML('afterbegin', html);
    /* END LOOP: for every article: */
  }
  for (let author in allArticlesAuthors) {
    allAuthorsHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allArticlesAuthors[author] + ') ' + '</a></li>';
    authorsList.innerHTML += allAuthorsHTML;
  }
}

generateAuthors();

function authorClickHandler(event) {
/* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* (???)DODANE PRZEZE MNIE - add class 'active' to clicked tag */
  clickedElement.classList.add('active');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag =  href.replace('#author-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for (let tagLink of activeTagLinks) {
    /* remove class active */
    tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allClickedTags = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(allClickedTags);
  /* START LOOP: for each found tag link */
  for (let clickedTag of allClickedTags) {
    /* add class active */
    clickedTag.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  const links = document.querySelectorAll('.post-author a');

  const linksList = document.querySelectorAll('.authors a');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }

  for (let link of linksList) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();