# Webpack

<br>

## #4.0 Introduction to Webpack  

> Webpack은 module bundler 인데, 그 말인즉슨, 우리가 많은 파일들을 가져와서 webpack에게 주면 webpack은 그것들을 완전히 호환이 되는 static 파일들로 변환해서 준다. 

### webpack.config.js 생성 

> config 파일 안에서 명심해야 할 점은 server 코드와는 연관시키지 않는다는 것이다. 
> <br> <b>즉 완전한 클라이언트 코드</b> 이다.
> <br> webpack은 두가지를 가지고 있는데 하나는 entry 다른 하나는 output이다. entry는 파일이 어디에서 왔는가? 이고 output은 그걸 어디에 넣을 것인가 이다. 
```js
const path = require("path"); 
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); 
const OUTPUT_DIR = path.join(__dirname, "static"); 

const config = {
    entry: ENTRY_FILE, 
    mode: MODE,
    // webpack이 module을 만났을 때 규칙을 정해줌 
    module: {
        // 여기서 loader를 실행시켜야 함 
        // loader란 webpack에게 파일을 처리하는 방법을 알려주는 역할을 함 
        rules: [
            {
                test: /\.(js)$/, 
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                 test: /\.(scss)$/, //  파일을 만나면 그 파일이 scss인지 알아보는 부분 
                 // scss파일을 찾았을 때는, 가장 먼저 그 SCSS를 CSS로 바꾸고 
                 // 그 CSS에 해당하는 텍스트 전체를 취해서 CSS파일로 저장해야 한다.
                 use: ExtractCSS.extract([
                    {
                        loader: "css-loader" //webpack이 css를 이해하도록 가르친다.
                    },
                    {
                        // 인터넷 익스플로러와 호환되게 만드는 것 
                        loader: "postcss-loader",
                        options: {
                            plugins() {
                                return [autoprefixer({browsers: "cover 99.5%"})]
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ])
            }
        ]
    }
    output: {
        path: OUTPUT_ DIR,
        filename: "[name].js" 
    },
    plugins: [new ExtractCSS("styles.css")] 
};

module.exports = config;
```
> 이 상태에서 webpack은 scss 파일 형식을 이해하지 못하고 에러를 띄어줄 것이다. 그러므로 앞으로 사용할 모든 파일 형식들을 webpack한테 가르쳐줘야 한다. 

> webpack에선 loader를 사용할 때 끝에서부터 시작해서 처음으로 진행된다. 그래서 webpack이 이걸 실행하면, 먼저 scss파일을 다루는 것 부터 하고, 다음엔 css파일 다루는걸 하고, 그런다음 추출을 진행하는 것이다. 

> #### 설치한 모듈 
> ```bash
> npm install extract-text-webpack-plugin@next   //베타버전으로 설치됨 
> npm install css-loader postcss-loader sass-loader 
> npm install autoprefixer 
> npm install node-sass
> npm install babel-loader
> ```


### package.json의 "scripts" 변경 

```js
  "scripts": {
    "dev:server": "nodemon --exec babel-node init.js --delay 2",
    "dev:assets": "webpack --mode development -w",
    "build:assets": "webpack --mode production"
  }
```
> 누군가 dev:assets라고 치면, webpack을 불러오도록 설정해 놓은것
> <br> → 그러면 webpack은 자동적으로 webpack.config.js라는 파일을 찾음 

<br>

> #### 실행 방법 
> 스크립트를 수정했기 때문에 더이상 npm start를 하지 않는다. 
> - 서버 실행<br> 
> npm run dev:server 
> - 클라이언트 실행 <br>
> npm run dev:assets