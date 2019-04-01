# Express 

## 1. 서버란? 

> - 물리적으로는 항상 켜져있는 컴퓨터이다. 
> - 소프트웨어적인 서버란 인터넷에 연결된 한 덩어리의 코드이다. 
>   - 일종의 네트워크에 연결 된 것 
>   - URL에 응답하고, 접속을 허용하는 일 등을 함 
> - 접속을 받아주는 무언가이다 → 어떤 접속을 Listen하고 있음 

<br>

## 2. Express란?

> - node.js에서 작동하는 프레임워크이다. 
>   - 우리가 원하는 것을 좀더 빠르게 만들 수 있도록 도와준다. 

### 2-1. Express를 사용하는 이유 

> 1. 유명함 
> 2. 매우 안정적 → 새로운 버전이 많이 안나왔다! 
> 3. 간단하게 서버를 구축할 수 있다. 

<br>

## 3. Middleware

> express에서 middleware란 처리가 끝날 때까지 연결되어 있는 것이다. <br>
> express에서는 거의 모든 함수가 middleware가 될 수 있다. next() 함수를 이용해서 미들웨어임을 표시해 줘야 한다. <br>
> ```js
> const betweenHome = (req, res, next) => {
>    console.log('Between'); 
>    next();  
>};
> app.get("/", betweenHome, handleHome);
> app.get("/profile", handleProfile);
> ```
> 하지만 이렇게 사용하게 되면 모든 라우트에 적용되지 않고 일일히 함수 사이에 미들웨어 함수를 넣어 줘야 한다. 만약 모든 라우트에 미들웨어를 적용하고자 하면 ```app.use();```를 사용하면 된다. 
> ```js
> const betweenHome = (req, res, next) => {
>    console.log('Between'); 
>    next();  
>};
> app.use(betweenHome);
> app.get("/", handleHome);
> app.get("/profile", handleProfile);
> ```

<br>

## 0. Express 강의를 들으며 알게 된 것 (TIP) 

### 0-1. npm start로 index.js 실행 

> node를 실행하기 위해서는 항상 터미널에 ```node index.js```를 입력해서 실행했어야 하는데, <b>package.json</b> 파일에 
> ```"scripts": {"start" : "node index.js"}``` 를 추가하면 ```npm start``` 명령어로만 노드를 실행시킬 수 있다. 

#### 0-1-1. nodemon, babel 적용
> nodemon과 babel 설치 후 ```"scripts": {"start" : "nodemon --exec babel-node index.js --delay 2"}``` 로 수정해준다.<br> 
> 마지막에 delay 2를 넣어주는 이유로는 babel이 변환을 완료할 때까지의 시간을 주기 위해서이다. delay가 없으면 nodemon이 실행됐을때, babel이 변환이 완료됐을 때 총 2번의 서버 재시작이 이뤄지게 된다. 