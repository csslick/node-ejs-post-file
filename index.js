const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');

let posts = [];  // 글 데이터
// 파일 읽기
const readFile = fs.readFileSync('postDB.json', 'utf-8');
// 오브젝트 코드로 변환
const jsonData = JSON.parse(readFile);
console.log(jsonData)
posts = [...jsonData]; // post에 배열값 추가

// ejs를 view 엔진으로 설정
app.set('view engine', 'ejs');

// 정적파일 경로 지정
app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// home
app.get('/', function(요청, 응답){
  응답.render('pages/index.ejs', { posts })
})

// about
app.get('/about', function(req, res) {
  res.render('pages/about.ejs')
})

// 글쓰기 요청 /create
app.post('/create', function(req, res) {
  const 글 = req.body.post;
  posts.push(글); // posts 배열에 글 추가
  console.log('posts = ', posts);
  // DB file에 글 저장
  fs.writeFileSync('postDB.json', JSON.stringify(posts))
  res.redirect('/'); // 홈으로 이동
})

// 글삭제 요청 /delete
app.post('/delete/:id', function(req, res) {
  const id = req.params.id;
  console.log(id)
  // posts 배열의 값을 삭제
})



const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`)
})