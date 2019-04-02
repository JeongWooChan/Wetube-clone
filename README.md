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

<br>

## 6. 템플릿엔진 설치 (PUG)
```bash
npm install pug
```

<br>
<hr>

## Pages : 

- [ ] Home
- [x] Join
- [x] Login
- [x] Search
- [ ] UserDetail 
- [ ] Edit Profile 
- [ ] Change Password 
- [ ] Upload 
- [ ] Video Detail 
- [ ] Edit Video 





[공식홈페이지]:https://nodejs.org/ko/