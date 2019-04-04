# MongoDB

## 1. 실행 

```bash 
cd C:\Users\woochan\Downloads\mongodb-win32-x86_64-2008plus-ssl-4.0.8\mongodb-win32-x86_64-2008plus-ssl-4.0.8\data
mongod --dbpath . 
```

<br>

## 2. 연동 

```js
import mongoose from "mongoose"; 

mongoose.connect("mongodb://localhost:포트번호/Database이름"); 
```

<br>

## 3. 데이터 모델 만들기 

```js
// models/Video.js
import mongoose from "mongoose"; 

const CommentSchema = new mongoose.Schema({
    text: {
        type: String, 
        required: "Text is reqired"
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
}); 

const model = mongoose.model("Comment", CommentSchema); 

export default model;
```
```js
//init.js 
import "./models/Video"; 
```

<br>

## 4. 데이터의 관계성 

> 한쪽에서 video를 생성하고, 다른 쪽에서 comment를 생성했을 때 둘을 어떻게 연관시켜야 할까? 
> <br> 이에 대한 해결책은 comment에 video의 ID를 저장하거나, video가 comment ID의 array를 가지고 있도록 하면 된다. 

```js
// models/Comment.js 
import mongoose from "mongoose"; 

const CommentSchema = new mongoose.Schema({
    ....,
    video: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Video"
    }
});
```
> type으로 Schema 타입의 ObjectId를 받아오며, ```ref: "Video"```와 같이 어떤 objectID가 어디서 온건지 알려줘야 한다. 

<br>

## 5. async/await 

> 데이터 모델을 실제로 적용해서 사용하기 위해서는 async/await를 사용해야 한다. 
> <br> async는 어떠한 것을 기다려주는 것이다. 예를들어 home 화면을 rendering 하기 전에 db에서 데이터를 먼저 가져와야 한다면 rendering 하기 전에 db를 살펴보고 있어야 할 것이다. 
> ```js
> // controllers/videoController.js
> export const home = (req, res) => {
>   // look for videos 
>   res.render("home", { pageTitle: "Home", videos });
> } 
> ```
> 사용방법은 아래와 같다. 
> ```js
> // controllers/videoController.js
> ...
> import Video from "../models/Video";
> 
> export const home = async (req, res) => {
>   const videos = await Video.find({});  
>   res.render("home", { pageTitle: "Home", videos });
> } 
> ```
> 이렇게 하면 home화면을 render 하기 전에 데이터베이스에 있는 모든 Video를 가져오게 된다. await를 해줌으로써 await 부분이 끝나기 전까지는 render 부분을 실행하지 않을 것이다. 
> 이 코드에서 주의할 점은 await는 끝나기를 기다리는 것이지 성공여부에 판단은 하지 않는다. 즉 에러가 발생하더라도 끝난것으로 판단을 하고 다음 코드로 넘어가 render를 진행할 것이다. 
> <br> 이러한 문제점을 해결하기 위해서는 아래와 같이 수정할 수 있다. 
> ```js
> // controllers/videoController.js
> ...
> import Video from "../models/Video";
> 
> export const home = async (req, res) => {
>    try {
>        const videos = await Video.find({});
>        res.render("home", { pageTitle: "Home", videos });
>    } catch (error) {
>        console.log(error);
>        res.render("home", { pageTitle: "Home", videos: [] });
>    }
> } 
> ```
> try~catch문을 사용해서 에러가 발생한 경우 예외처리를 할 수 있다. 