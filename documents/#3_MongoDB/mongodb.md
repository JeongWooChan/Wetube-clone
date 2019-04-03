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