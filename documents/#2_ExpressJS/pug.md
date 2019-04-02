# PUG

<br>

## 1. Layout with Pug  

> - html 기반이지만 태그 없이 <b>들여쓰기</b>로 태그를 구분해준다. 
> ```js 
> // views/layouts/main.pug
> doctype html
> html
>     head
>         title WeTube
>     body
>         header
>             h1 WeTube
>         main
>             block content
>         footer
>             span &copy; WeTube
> ```
> header와 footer는 모든 페이지가 거의 동일할 것이다. 만약 header 부분에 변화를 하나 주고 싶다면, 모든 템플릿들의 header를 바꿔줘야 한다.<br> 현재 프로젝트의 경우에는 크지 않아서 모든페이지마다 일일이 바꿔줘야하는데에 있어서 큰 비용을 소모하진 않지만, 어떤때에는 템플릿만 수백개가 존재하는 경우도 있을 것이다. 이러한 경우에는 일일이 바꿔주는데에 드는 시간적비용이 굉장히 많이 소모된다. <br><br>
> 이러한 문제를 해결하기 위해 <b>Layout</b>을 만드는 것이다. <br>
> 위와 같은 main.pug 라는 레이아웃을 만든 후, 다른 파일의 제일 윗부분에 <b>extension</b>이라는 것을 할 것이다. 사용법은 아래와 같다. 
> ```js 
> // views/home.pug 
> extends layouts/main
>
> block content 
>     p Hello
> ```
> 이렇게 코드를 작성하게 되면 home에서는 이제 main.pug 의 block content가 들어가는 자리에 Hello 라는 p태그를 보여줄 수 있게 된다. 물론 mian.pug의 header,footer와 같이. 
> <br><br> 정리하자면 레이아웃 파일을 extends 함으로써 레이아웃 전체 코드를 복사해 올 수 있으며, 그 위에 덮어쓰기를 할 수 있다. 덮어쓰는 위치는 block이라는 것을 통해서 위치를 지정할 수 있다. 

<br>

## 2. Partials with Pug 

### 2-1. Partials
> - partials는 페이지의 일부분이다. 
> <br> 현재 진행중인 프로젝트에서는 header와 footer를 partials로 분리하였다. 
> ```js
> // views/partials/footer.pug 
> footer.footer 
>     .footer__icon
>         i.fab.fa-youtube
>     span.footer__text &copy; 2019 WeTube
> ```
> footer.pug 파일에는 보는바와 같이 footer에 대한 코드 밖에 없다. 이제 footer.pug 파일을 main.pug에다가 include 시켜 주면 된다. (header도 동일한 방법으로 진행)
> ```js 
> // views/layouts/main.pug
> doctype html
> html
>     head
>         title WeTube
>     body
>         include ../partials/header
>         main
>             block content
>         include ../partials/footer
> ```
> 이렇게 partials로 쪼개서 하는 이유는 이러한 방식이 더 조직적인 방식이기 때문이다. 

### 2-2. pug파일에 js 추가 방법 

> #{ } 안에 javascript 코드를 작성하면 된다. 
> ```js
> footer.footer 
>     .footer__icon
>         i.fab.fa-youtube
>     span.footer__text &copy; #{new Data().getFullYear()} WeTube
> ``` 

<br>

## 3. Local Variables in Pug

### 3-1. 컨트롤러에 있는 정보를 템플릿 전체에 추가하는 방법 

> partials의 header파일이 라우트 객체에 접근하도록 하고 싶다.
> <br> → 미들웨어를 사용해야 한다. 
> <br> 먼저 global 변수로 사용할 수 있는 local변수를 만들어 줘야한다. local 기능을 통해 변수에 접근할 수 있다. 
> ```js
> // app.js 
> import { localMiddleware } from "./middlewares";
>
> ...
> app.use(localMiddleware);
> ``` 
> middleware 파일에 locals를 추가한다. locals를 추가하게 되면 이제 그것들을 템플릿, 컨트롤러 어디에서든 쓸 수 있게 된다. 
> ```js 
> // middlewares.js 
> import routes from "./routes";
> export const localMiddleware = (req, res, next) => {
>     res.locals.siteName ='WeTube'; 
>     res.locals.routes = routes; 
>     next();
> };
> ``` 
> res.locals 이후로는 아무이름으로 설정해주면 된다. 여기서는 siteName이라는 명으로 설정해 주었다. 이렇게 ```res.locals.siteName```으로 값을 설정해 주면 다음과 같이 사용할 수 있다. 
> ```js 
> // views/layouts/main.pug
> doctype html
> html
>     head
>         title #{siteName}
>     body
>         include ../partials/header
>         main
>             block content
>         include ../partials/footer
> ```
> title 이름을 직접 적는 대신에 #{ siteName }이라고 적어주는 것으로 사용할 수 있다. <br>이와 같은 방식으로 routes의 routes.js 객체를 추가할 수도 있다. 
> 먼저 routes 파일을 import 해준 후 ```res.locals.routes=routes;``` 로 routes를 쓸 수 있다. 
> ```js 
> header.header
>     .header__column
>         i.fab.fa-youtube
>     .header__column
>         ul
>             li
>                 a(href=routes.join) Join
>             li 
>                 a(href=routes.login) Log In
> ``` 
> 함수로 만들어준 미들웨어이기 때문에 next() 함수로 넘겨줘야 하는 것을 잊지말자. 

### 3-2. 컨트롤러에 있는 정보를 특정 템플릿에 추가하는 방법 

> contriller에서 특정 화면에서만 사용하는 변수를 추가 할 수 있다. 
> <br> render함수의 첫번째 인자는 템플릿이고, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체인데 두번째 인자를 이용하면 된다. 
> ```js 
> // controllers/videoController.js 
> export const home = (req, res) => res.render("home", { pageTitle: "Home"});
> ``` 
> 위와 같이 사용하는 것은 pageTitle을 home 템플릿에 전달하겠다는 것이다. 
> ```js 
> // views/layouts/main.pug
> doctype html
> html
>     head
>         title #{pageTitle} | #{siteName}
>     body
>         include ../partials/header
>         main
>             block content
>         include ../partials/footer
> ```
> #{pageTitle}부분에 Home이라는 문구가 들어가게 될것이다. 
