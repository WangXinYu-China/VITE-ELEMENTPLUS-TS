<template>
    <div class="login-box" id="demo">
        <div class="input-content">
			<div class="login_tit">
				<div>
					<i class="tit-bg left"></i>
					GE JU
					<i class="tit-bg right"></i>
				</div>
				<p>Everyday · you need to know what you want . keep move .</p>
			</div>
            <p class="p user_icon">
                <input type="text" placeholder="账号" autocomplete="off" class="login_txtbx" v-model="ruleForm.account">
            </p> 
            <p class="p pwd_icon">
                <input type="text" placeholder="密码" autocomplete="off" class="login_txtbx" v-model="ruleForm.password">
            </p>      
            <div class="p val_icon">
                <div class="checkcode">
                    <input type="text" id="J_codetext" placeholder="验证码" autocomplete="off" maxlength="4" class="login_txtbx">
                    <canvas class="J_codeimg" id="myCanvas" @click="createCode" onselectstart="return false">对不起，您的浏览器不支持canvas，请下载最新版浏览器!</canvas>
                </div>
                <a class="ver_btn" onselectstart="return false" @click="createCode">看不清，换一张</a>
            </div>      
            <div class="signup">
                <a class="gv" href="#" @click="validate">登&nbsp;&nbsp;录</a>
                <a class="gv" href="#">清&nbsp;&nbsp;空</a>
            </div>
		</div>
        <div class="canvaszz"></div>
        <canvas id="canvas"></canvas>
    </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from 'vue-router';
export default {
    name: "login",
    setup() {
        const state: any = reactive({
            verificationCode: '', // 验证码
            ruleForm: {
                account: '',
                password: ''
            },
        });
        const router = useRouter();
        onMounted(() => {
            canvasInit();
            createCode();
        });
        /**
         * canvas绘制 初始化
         */
        const canvasInit = () => {
            let canvas = document.getElementById("canvas"),
			ctx = (canvas as any).getContext("2d"),
			w = (canvas as any).width = window.innerWidth,
			h = (canvas as any).height = window.innerHeight,
			hue = 217,
			stars: string|any[] = [],
			count = 0,
			maxStars = 2500; //星星数量
            let canvas2 = document.createElement("canvas"),
            ctx2 = canvas2.getContext("2d");
            canvas2.width = 100;
            canvas2.height = 100;
            let half = canvas2.width / 2,
			gradient2 = (ctx2 as any).createRadialGradient(
				half,
				half,
				0,
				half,
				half,
				half
			);
            gradient2.addColorStop(0.025, "#CCC");
            gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
            gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
            gradient2.addColorStop(1, "transparent");
            (ctx2 as any).fillStyle = gradient2;
            (ctx2 as any).beginPath();
            (ctx2 as any).arc(half, half, half, 0, Math.PI * 2);
            (ctx2 as any).fill();
            // End cache
            function random(min: any = 0, max: any) {
                if (arguments.length < 2) {
                    max = min;
                    min = 0;
                }
                if (min > max) {
                    let hold = max;
                    max = min;
                    min = hold;
                }
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            function maxOrbit(x:any, y:any) {
                let max = Math.max(x, y),
                    diameter = Math.round(Math.sqrt(max * max + max * max));
                return diameter / 2;
                //星星移动范围，值越大范围越小，
            }
            // this:any
            let Star = function () {
                /**
                 * 函数内调用this，应指向函数本身，vscode报错。
                 * 经查，解决方案：tsconfig配置打开 
                 * "noImplicitThis": true 此方案未解决。
                 * "noImplicitThis": false 解决 
                 * Implicit   含蓄的; 不直接言明的; 成为一部分的; 内含的; 完全的; 无疑问的;
                 * 后 arguments 参数内添加this：any 解决
                 * console.log("查看函数内的arguments this",this);
                 * resolve
                 */
                this.orbitRadius = random(0, maxOrbit(w, h));
                this.radius = random(60, this.orbitRadius) / 18;
                //星星大小
                this.orbitX = w / 2;
                this.orbitY = h / 2;
                this.timePassed = random(0, maxStars);
                this.speed = random(0, this.orbitRadius) / 500000;
                //星星移动速度
                this.alpha = random(2, 10) / 10;
                count++;
                stars[count] = this;
            };

            Star.prototype.draw = function () {
                let x =
                        Math.sin(this.timePassed) * this.orbitRadius +
                        this.orbitX,
                    y =
                        Math.cos(this.timePassed) * this.orbitRadius +
                        this.orbitY,
                    twinkle = random(0,10);

                if (twinkle === 1 && this.alpha > 0) {
                    this.alpha -= 0.05;
                } else if (twinkle === 2 && this.alpha < 1) {
                    this.alpha += 0.05;
                }

                ctx.globalAlpha = this.alpha;
                ctx.drawImage(
                    canvas2,
                    x - this.radius / 2,
                    y - this.radius / 2,
                    this.radius,
                    this.radius
                );
                this.timePassed += this.speed;
            };

            for (let i = 0; i < maxStars; i++) {
                new Star();
            }

            function animation() {
                ctx.globalCompositeOperation = "source-over";
                ctx.globalAlpha = 0.5; //尾巴
                ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 2)";
                ctx.fillRect(0, 0, w, h);

                ctx.globalCompositeOperation = "lighter";
                for (let i = 1, l = stars.length; i < l; i++) {
                    stars[i].draw();
                }

                window.requestAnimationFrame(animation);
            }

            animation();
        };
        /**
         * 绘制验证码-展示
         */
        const showVerificationCode = (a:any) => {
            let c = document.getElementById("myCanvas");
            let ctx = (c as any).getContext("2d");
            ctx.clearRect(0,0,1000,1000);
            ctx.font = "80px 'Microsoft Yahei'";
            ctx.fillText(a,0,100);
            ctx.fillStyle = "rgba(255,255,255,.9)";
        };
        /**
         * 生成四位验证码
         */
        const createCode = () => {
            state.verificationCode = "";       
            let codeLength = 4;
            let selectChar = new Array('1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');      
            for(let i=0;i<codeLength;i++) {
                let charIndex = Math.floor(Math.random()*35);
                state.verificationCode +=selectChar[charIndex];
            }      
            if(state.verificationCode.length !== codeLength){
                createCode();      
            }
            showVerificationCode(state.verificationCode);
        }
        /**
         *  验证验证码是否一致  
         */
        const validate = () => {
            router.replace("/home");
            return;
            let inputCode = (document as any).getElementById("J_codetext").value.toUpperCase();
            let codeToUp=state.verificationCode.toUpperCase();
            if(inputCode.length <=0) {
                (document as any).getElementById("J_codetext").placeholder = "请输入验证码";
                createCode();
                return false;
            }else if(inputCode != codeToUp ){
                (document as any).getElementById("J_codetext").value="";
                (document as any).getElementById("J_codetext").placeholder = "验证码错误";
                createCode();
                return false;
            }
            else {
                (document as any).getElementById("J_codetext").value="";
                createCode();
                router.replace("/home");
            }
        }
        return {
            ...toRefs(state),
            canvasInit,
            showVerificationCode,
            createCode,
            validate
        };
    },
};
</script>

<style lang="scss" scope>
/** */
body {margin:0 auto;overflow:hidden;}  
.login-box{
	margin:0 auto;
	width:100%;
	height:100%;
	background-color:#000;
	position:relative;
}
.login-box>canvas {
	width:100%;
	height:auto;
	display:inline-block;
	vertical-align:baseline;
	position:absolute;
    left: 0;
    /* z-index: -1; */
}
.login-box .canvaszz{
	width:100%;
	background-image: url(@/assets/img/in_top_bj.png);
	height:800px;
	position:absolute;
	z-index:10;
    filter:alpha(opacity=40);  
    -moz-opacity:0.4;  
    -khtml-opacity: 0.4;  
    opacity: 0.4;
}
.login_tit{
	position: absolute;
	top:-60px;
	left:-5px;
	width:420px;
	color:#fff;
	text-align: center;

}
.tit-bg{position:absolute;top:50%;display: inline-block;width:90px;height:1px;background:url(@/assets/img/login-tit.png)}
.tit-bg.left{left:0;transform:rotate(180deg)}
.tit-bg.right{right:0}
.login_tit>div{
	position: relative;
	font-size: 22px;font-weight: bold;
}
.login_tit>p{
	font-size: 18px;font-family: "arial";
	margin:10px 0;
}
	
.login-box .signup{
	margin-top: 40px;
	text-align: center
}
.login-box .signup a.gv { 
	text-decoration:none; 
	background:url(@/assets/img/nav_gv.png) repeat 0px 0px; 
	width: 130px; 
	height: 43px; 
	display: inline-block; 
	text-align:center;
	line-height:43px;
	cursor:pointer;
	margin:8px 20px 8px 20px;
	font:18px/43px 'microsoft yahei'; color:#066197;
	}
.login-box .signup a.gv span {
	 display: none;
	 	
}
.login-box .signup a.gv:hover { 
	background: url(@/assets/img/nav_gv.png) repeat 0px -43px; 
	color:#1d7eb8;
	-webkit-box-shadow: 0 0 6px #1d7eb8;
	transition-duration: 0.5s;
	}
	
.login-box	.topcn{
	width: 980px;
	top:200px;
	left: 50%;
	margin-left: -490px;
	position:absolute;
	z-index:20;

	}
	/*登录界面*/
.input-content{
    position: absolute;z-index:9999;padding:30px;width:350px;left:50%;margin-left:-205px;top:25%
}
.input-content .p {
    margin: 10px 0;
    height: 44px;
    position: relative;
}
.input-content .p .login_txtbx {
    font-size: 14px;
    height: 26px;
    line-height: 26px;
    padding: 8px 9%;
    width: 81%;
    text-indent: 1em;
    border: 1px solid #1d7eb8;
    background: rgba(0,0,0,.1);
    color: white;
}
.login_txtbx::-webkit-input-placeholder {
  color:rgba(255,255,255,0.9);
 }
.login_txtbx:-moz-placeholder { 
	/* Mozilla Firefox 4 to 18 */
	color:rgba(255,255,255,0.9);
}
.login_txtbx::-moz-placeholder {  /** Mozilla Firefox 19+  */
	color:rgba(255,255,255,0.9);
}
.login_txtbx:-ms-input-placeholder { /* Internet Explorer 10+ */
	color:rgba(255,255,255,.9);
}
.input-content .p .login_txtbx:focus,.input-content p .login_txtbx:hover{
	-webkit-box-shadow: 0 0 6px #1d7eb8;
	transition-duration: 0.5s;
}
.input-content .p.user_icon:before {
    content: "u";
}
.input-content .p.pwd_icon:before {
    content: "p";
}
.input-content .p.opwd_icon:before {
    content: "o";
}
.input-content .p.npwd_icon:before {
    content: "n";
}
.input-content .p.rpwd_icon:before {
    content: "r";
}
.input-content .p.val_icon:before {
    content: "n";
}
.input-content .p:before {
    font-family: 'adminthemesregular';
    position: absolute;
    top: 0;
    left: 14px;
    height: 42px;
    line-height: 42px;
    font-size: 20px;
    color: #fff;
}
.input-content .p .checkcode {
    float: left;
    width: 235px;
    height: 44px;
    overflow: hidden;
}
.input-content .p .checkcode input {
    float: left;
    width: 140px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #1d7eb8;
    padding: 3px;
    color: white;
    outline: none;
    text-indent: 3.1em;
}
.input-content .p .checkcode canvas {
    display: block;
    float: right;
    width: 80px;
    height: 38px;
    padding: 3px;
    z-index: 0;
    background: rgba(28, 122, 178,.3);
}
.input-content .p .ver_btn {
    color: #f4f4f4;
    height: 42px;
    line-height: 42px;
    margin: 0;
    z-index: 1;
    position: relative;
    float: right;
    cursor: pointer;
    font-size: 14px;
}
.passwordTit{ position:relative;padding:10px;font-size: 12px; color:#fff;line-height: 18px;margin-bottom: -20px; }
.passwordTit .border{position: absolute;display: inline-block;width:20px;height:20px;border:1px solid #1d7eb8}
.border.left{left:0;top:0;border-right:none;border-bottom:none}
.border.right{right:0;bottom:0;border-left:none;border-top:none}
</style>
