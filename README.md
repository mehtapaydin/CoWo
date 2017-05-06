# [CoWo](http://www.mehtapaydin.com/cowo)

This project aims to conduct a `Collaborative Social Learning` experiment based on language learning and communication patterns 
by using following technologies;  

* node.js 
* express.js
* socket.io
* paper.js
* bodymovin.js

#### How to run

This project is a web application that needs both of your computer and mobile device(s).

After clone that repo, and `cd` into it, run the following commands;  

```sh
$> npm install
$> node app.js
```

Then, browse to the your internal network address `http://<your-internal-ip>:3000` like (`http://192.168.1.14:3000`).

#### Usage

To be able to use table and device logic:

- Change the internal network address at `table.js`
- Browse to `http://<your-internal-ip>:3000/table` from your computer
- Now, from your mobile device, navigate to the address shown on your computer screen (or simply use the `qr-code`)

##### Animation with [bodymovin](https://github.com/bodymovin/bodymovin)

- Download `https://github.com/bodymovin/bodymovin/blob/master/build/player/bodymovin.js` and add to your `js/bodymovin.js`

Then put your own created `After Effects` animation `json` (let's say `data.json`) output file at `public/animation_data/`
- like `public/animation_data/data.json`.
- then convert your `data.json` to a `js` file (`data.js`) and add for example `var myData = ` at the beginning of the file.
- then use this `myData` element in your `js/runAnimationWithData.js` file when you define your `animationData` object.

You can call an animate function of a separate js file and play animation in a `div` of your `html` page.
For this, you need to add `js/runAnimationWithData.js` file  and your main `js` file (let's say `table.js`)
which will call function of `runAnimationWithData.js`
to your `html` file (let's say `table.html`);

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Table</title>
    <link rel="stylesheet" type="text/css" href="styles/table.css">

    <script type="text/javascript" src="js/bodymovin.js"></script>
    
    <script type="text/javascript" src="js/table.js"></script>

    <!--animation related-->
    <script src="animation_data/data.js"></script>
    <script src="js/runAnimationWithData.js"></script>
    
</head>
<body>

<div id='animation-container'></div>

</body>
</html>

```

Now, in `table.js` you can call `runAnimation` function of `js/runAnimationWithData.js`.

```js
// table.js

  runAnimation("myAnimation");

```

In the `js/runAnimationWithData.js` you can access `myData` animation data which is coming from `public/animation_data/data.js`.

```js
// runAnimationWithData.js

function runAnimation(targetAnimation) {

  var targetAnimationData;
  if (targetAnimation === "myAnimation") {
    targetAnimationData = myData; // myAnimationData coming from data.js
  } 

  var animData = {
    container: document.getElementById('animation-container'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: targetAnimationData
  };

  var animation;
  setTimeout(function () {
    animation = bodymovin.loadAnimation(animData);
  }, 1000);

  setTimeout(function () {
    document.getElementById('animation-container').innerHTML = "";
  }, 5000);
}
```


#### Use existing animation data

If you will use an already served `data.json` for example at `https://labs.nearpod.com/bodymovin/demo/2016/data.json`,
you can use `path` keyword to give data `url` address.
 
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Main</title>
    <link rel="stylesheet" type="text/css" href="styles/2016.css">
    <script type="text/javascript" src="js/bodymovin.js"></script>
</head>

<body>

<div id='container'></div>

<script type="text/javascript">

  var animData = {
    container: document.getElementById('container'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    // path keyword can be used for existing data endpoints
    path: 'https://labs.nearpod.com/bodymovin/demo/2016/data.json'
  };

  var anim = bodymovin.loadAnimation(animData);

</script>

</body>

</html>
```

### Reference
- Table and card throwing flow is adapted from [Magic click example](https://github.com/heliodolores/magic-tricks-example)
- bodymovin animations 
    - https://codepen.io/airnan/pen/RazwzX
    - https://codepen.io/airnan/pen/YwroOX