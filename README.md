# Wetube-clone 

## 1. NodeJS 설치 

> NodeJS [공식홈페이지]에서 LTS버전 다운로드 

<br>

## 2. Express 설치 

### 2-1. Package.json 생성 

```bash
cd code 
npm init 
```

### 2-2. express 설치 

```bash
npm install express --save 
```

<br>

## 3. Babel 설치 

```bash
npm install @babel/node
npm install @babel/preset-env
npm install @babel/core
```

<br>

## 4. nodemon 설치 

```bash
npm install nodemon -D
```
-D를 붙인 것은 해당 프로젝트가 필요한 것이 아니라 개발자가 필요로 한 것을 의미함 

<br>

## 5. Middleware 설치 
### 5-1. morgan
```bash
npm install morgan
```
요청에 대한 정보를 콘솔에 기록해주는 미들웨어 

### 5-2. helmet 
```bash
npm install helmet 
```
NodeJS의 보안을 위한 미들웨어 

### 5-3. body-parser
```bash
npm install body-parser --save 
```
body로부터 정보를 얻을 수 있게 해주는 미들웨어

### 5-4. cookie-parser 
```bash
npm install cookie-parser 
```
cookie에 유저 정보를 저장하기 위해 필요한 미들웨어

### 5-5. multer 
```bash
npm install multer
```
file을 upload하고 URL을 반환하는 미들웨어 

<br>

## 6. 템플릿엔진 설치 (PUG)
```bash
npm install pug
```

<br>

## 7. MongoDB 설치 

> MongoDB 공식홈페이지의 [ Download Center]에서 MongoDB Community Server 다운로드 

### 7-1. 설치 확인 
```bash
mongod 
```
만약 mongod 가 실행되지 않는다면 다음과 같이 환경변수 추가 

> 1. [내컴퓨터] 우클릭 → 속성 → 고급 시스템 설정 → 환경변수 클릭 
> 2. 시스템 변수 리스트 중 'Path' 선택후 편집 클릭 
> 3. 'Mongodb'설치경로\bin 추가 
> 4. vscode 재실행 후 터미널에 'mongod' 입력 

### 7-2. 위와같은 방법으로도 mongod 실행이 안될 때 

> 1. mongod를 실행시킬 디렉토리에 data 폴더를 만든다 
> <br>   → mkdir data 
> 2. data폴더로 이동 
> <br>   → cd data 
> 3. ```mongod -dbpath .``` 입력 

### 7-3. mongodb 실행 

> mongod를 실행 시킨 후 다른 터미널에서 ```mongo```명령을 사용하여 시작할 수 있다. 

### 7-4. mongoose 설치 

```bash
npm install mongoose
```
NodeJS에서 MongoDB를 사용하기 위한 MongoDB Object 이다. 

<br>

## 8. Webpack 설치 

```bash
npm install webpack webpack-cli  
```
webpack : 파일에서 webpack을 사용하기 위함 <br>
webpack-cli : 터미널에서 webpack을 쓸 수 있게 해주는 것 

<br>

## 9. Authentication 

```bash
npm install passport-local-mongoose 
npm install passport passport-local
```

```bash
npm install express-session
```


[공식홈페이지]:https://nodejs.org/ko/
[ Download Center]:https://www.mongodb.com/download-center/community